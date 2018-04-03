package net.smart.core.analyzer.request;

import com.amazonaws.util.IOUtils;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import net.smart.common.domain.AnalysisRequestTarget;
import net.smart.common.domain.AnalysisRequestTool;
import net.smart.common.domain.AnalysisStatus;
import net.smart.common.exception.BizException;
import net.smart.common.support.s3.S3Client;
import net.smart.common.support.util.DateUtil;
import net.smart.core.analyzer.store.AnalysisAssetDao;
import net.smart.core.analyzer.support.S3FileUtils;
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
	private S3FileUtils s3FileUtils;

	@Autowired
	private AnalysisAssetDao analysisAssetDao;

    @Value("${analysis.target.path}")
    private String analysisTargetPath;

	@Value("${analysis.result.path}")
	private String analysisResultPath;

	@Value("${smart.aws.s3.result.dir}")
	private String targetDir;

	@Autowired
	private S3Client s3Client;

    @Transactional
	public AnalysisRequestTarget getNextAnalysisTargetFile(String currentStatus, String nextStatus) {
		AnalysisRequestTarget requestTarget = analysisAssetDao.getNextAnalysisTargetFile(currentStatus);
		if (requestTarget != null) {
			requestTarget.setAnalysisStatus(nextStatus);
			analysisAssetDao.modifyAnalysisTargetFile(requestTarget);
		}
		return requestTarget;
	}

    @Transactional
	public AnalysisRequestTarget nextAnalysisRequestTarget() {
		AnalysisRequestTarget requestTarget = getNextAnalysisTargetFile(AnalysisStatus.N.name(), AnalysisStatus.P.name());
		if (requestTarget == null) {
			return null;
		}

		requestTarget.setAnalysisRequestToolList(Lists.newArrayList(AnalysisRequestTool.PMD, AnalysisRequestTool.CALL_TREE));

		String binaryKey = requestTarget.getAnalysisRequestTargetBinaryPath();
		requestTarget.setAnalysisRequestTargetBinaryPath(s3FileUtils.getFile(analysisTargetPath, binaryKey));

        String sourceKey = requestTarget.getAnalysisRequestTargetSourcePath();
        requestTarget.setAnalysisRequestTargetSourcePath(s3FileUtils.getFile(analysisTargetPath, sourceKey));
		return requestTarget;
	}

	@Transactional
	public AnalysisRequestTarget nextAnalysisResult() {
		AnalysisRequestTarget requestTarget = getNextAnalysisTargetFile(AnalysisStatus.P.name(), AnalysisStatus.Y.name());
		if (requestTarget == null) {
			return null;
		}

		String key = targetDir + "/" + DateUtil.getCurrentYyyymmdd() + "/" + requestTarget.getAnalysisRequestTargetSourceName() + ".csv";
		log.info("key : {}", key);
		File file = new File(analysisResultPath + "/" + DateUtil.getCurrentYyyymmdd() + "/" + requestTarget.getAnalysisRequestTargetSourceName() + ".csv");
		try {
			File dir = new File(file.getParentFile().getPath());
			if (!dir.exists()) {
				dir.mkdirs();
			}
			IOUtils.copy(s3Client.getS3ObjectInputStream(key), new FileOutputStream(file));
		} catch (IOException e) {
			throw new BizException("## s3 file download to local save error", e);
		}

		log.info("local file path : {}", file.getAbsolutePath());
		requestTarget.setAnalysisRequestTargetResultPath(file.getAbsolutePath());

		return requestTarget;
	}
}
