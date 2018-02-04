package net.smart.core.analyzer.request;

import com.amazonaws.util.IOUtils;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import net.smart.common.domain.AnalysisRequestTarget;
import net.smart.common.domain.AnalysisRequestTool;
import net.smart.common.exception.BizException;
import net.smart.common.support.s3.S3Client;
import net.smart.common.support.util.DateUtil;
import net.smart.core.analyzer.store.AnalysisAssetDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Slf4j
@Component
public class AnalysisRequestTargetProvider {

	@Autowired
	private S3Client s3Client;

	@Value("${analysis.target.path}")
	private String analysisTargetPath;

	@Autowired
	private AnalysisAssetDao analysisAssetDao;

    @Transactional
	public AnalysisRequestTarget getNextAnalysisTargetFile() {
		AnalysisRequestTarget requestTarget = analysisAssetDao.getNextAnalysisTargetFile();
		if (requestTarget != null) {
			analysisAssetDao.modifyAnalysisTargetFile(requestTarget);
		}
		return requestTarget;
	}

    @Transactional
	public AnalysisRequestTarget nextAnalysisRequestTarget() {
		AnalysisRequestTarget requestTarget = getNextAnalysisTargetFile();
		if (requestTarget == null) {
			return null;
		}

		requestTarget.setAnalysisRequestToolList(Lists.newArrayList(AnalysisRequestTool.PMD));

		String binaryKey = requestTarget.getAnalysisRequestTargetBinaryPath();
		requestTarget.setAnalysisRequestTargetBinaryPath(getS3File(binaryKey));

        String sourceKey = requestTarget.getAnalysisRequestTargetSourcePath();
        requestTarget.setAnalysisRequestTargetSourcePath(getS3File(sourceKey));
		return requestTarget;
	}

	private String getS3File(String key) {
        File file = new File(analysisTargetPath + "/" + DateUtil.getCurrentYyyymmdd() + "/" + key);
        try {
            File dir = new File(file.getParentFile().getPath());
            if (!dir.exists()) {
                dir.mkdirs();
            }
            IOUtils.copy(s3Client.getS3ObjectInputStream(key), new FileOutputStream(file));
        } catch (IOException e) {
            throw new BizException("s3 file download to local save error", e);
        }
        return file.getAbsolutePath();
    }
}
