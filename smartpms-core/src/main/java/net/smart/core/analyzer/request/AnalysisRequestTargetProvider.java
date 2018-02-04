package net.smart.core.analyzer.request;

import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import net.smart.common.domain.AnalysisRequestTarget;
import net.smart.common.domain.AnalysisRequestTool;
import net.smart.common.domain.AnalysisStatus;
import net.smart.common.support.util.DateUtil;
import net.smart.core.analyzer.store.AnalysisAssetDao;
import net.smart.core.analyzer.support.S3FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
	public AnalysisRequestTarget getNextAnalysisTargetFile(String analysisStatus) {
		AnalysisRequestTarget requestTarget = analysisAssetDao.getNextAnalysisTargetFile(analysisStatus);
		if (requestTarget != null) {
			requestTarget.setAnalysisStatus(AnalysisStatus.P.name());
			analysisAssetDao.modifyAnalysisTargetFile(requestTarget);
		}
		return requestTarget;
	}

    @Transactional
	public AnalysisRequestTarget nextAnalysisRequestTarget() {
		AnalysisRequestTarget requestTarget = getNextAnalysisTargetFile(AnalysisStatus.N.name());
		if (requestTarget == null) {
			return null;
		}

		requestTarget.setAnalysisRequestToolList(Lists.newArrayList(AnalysisRequestTool.PMD));

		String binaryKey = requestTarget.getAnalysisRequestTargetBinaryPath();
		requestTarget.setAnalysisRequestTargetBinaryPath(s3FileUtils.getFile(analysisTargetPath, binaryKey));

        String sourceKey = requestTarget.getAnalysisRequestTargetSourcePath();
        requestTarget.setAnalysisRequestTargetSourcePath(s3FileUtils.getFile(analysisTargetPath, sourceKey));
		return requestTarget;
	}

	@Transactional
	public AnalysisRequestTarget nextAnalysisResult() {
		AnalysisRequestTarget requestTarget = getNextAnalysisTargetFile(AnalysisStatus.P.name());
		if (requestTarget == null) {
			return null;
		}

		String key = targetDir + "/" + DateUtil.getCurrentYyyymmdd() + "/" + requestTarget.getAnalysisRequestTargetSourceName() + ".csv";
		requestTarget.setAnalysisRequestTargetResultPath(s3FileUtils.getFile(analysisResultPath, key));

		return requestTarget;
	}
}
