package net.smart.core.analyzer.request;

import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import net.smart.common.domain.AnalysisRequestTarget;
import net.smart.common.domain.AnalysisRequestTool;
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
		requestTarget.setAnalysisRequestTargetBinaryPath(s3FileUtils.getFile(analysisTargetPath, binaryKey));

        String sourceKey = requestTarget.getAnalysisRequestTargetSourcePath();
        requestTarget.setAnalysisRequestTargetSourcePath(s3FileUtils.getFile(analysisTargetPath, sourceKey));
		return requestTarget;
	}
}
