package net.smart.common.support.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.Upload;
import com.amazonaws.services.s3.transfer.model.UploadResult;
import lombok.extern.slf4j.Slf4j;
import net.smart.common.exception.BizException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.InputStream;

@Slf4j
@Component
public class S3Client {

    @Value("${smart.aws.s3.bucket.name}")
    private String bucketName;

    @Value("${smart.aws.s3.result.dir}")
    private String targetDir;

    public static final String S3_URL_FORMAT = "https://s3.ap-northeast-2.amazonaws.com/%s/%s";

    @Autowired
    private TransferManager transferManager;

    public String getTargetDir() {
        return targetDir;
    }

    public String uploadFile(File file, String dirName) throws InterruptedException {
        String key = createKey(dirName, file.getName().trim());
        Upload upload = transferManager.upload(bucketName, key, file);

        UploadResult result = upload.waitForUploadResult();
        log.info("Upload Completed!");

        return createUrl(result.getKey());
    }

    public InputStream getS3ObjectInputStream(String key) {
        return getFile(key).getObjectContent();
    }

    public S3Object getFile(String key) {
        AmazonS3 s3Client = transferManager.getAmazonS3Client();

        return s3Client.getObject(bucketName, key);
    }

    private String createKey(String dirName, String fileName) {
        if (fileName.lastIndexOf('.') == -1) {
            throw new BizException("file name error");
        }
        return String.format("%s/%s", dirName, fileName);
    }

    private String createUrl(String key) {
        return String.format(S3_URL_FORMAT, bucketName, key);
    }
}
