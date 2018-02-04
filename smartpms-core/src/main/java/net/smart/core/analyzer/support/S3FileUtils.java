package net.smart.core.analyzer.support;

import com.amazonaws.util.IOUtils;
import net.smart.common.exception.BizException;
import net.smart.common.support.s3.S3Client;
import net.smart.common.support.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Component
public class S3FileUtils {

    @Autowired
    private S3Client s3Client;

    public String getFile(String targetDir, String key) {
        File file = new File(targetDir + "/" + DateUtil.getCurrentYyyymmdd() + "/" + key);
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
