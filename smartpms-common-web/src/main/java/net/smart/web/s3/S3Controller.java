package net.smart.web.s3;

import com.amazonaws.util.IOUtils;
import lombok.extern.slf4j.Slf4j;
import net.smart.common.exception.BizException;
import net.smart.common.support.s3.S3Client;
import net.smart.common.support.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;

@Slf4j
@Controller
public class S3Controller {

    @Autowired
    private S3Client s3Client;

    @RequestMapping(value = "/s3/upload.{metadataType}", method = RequestMethod.GET)
    public void defaultUpload(@RequestParam String targetFilePath) {
        File file = new File(targetFilePath);
        if (!file.exists()) {
            throw new BizException("File Not Found Error:" + file.getAbsolutePath());
        }
        try {
            String url = s3Client.uploadFile(file, "analysis");
            log.info("URL : " + url);
        } catch (InterruptedException e) {
            throw new BizException("S3 File Upload Error", e.getMessage());
        }
    }

    @RequestMapping(value = "/s3/upload", method = RequestMethod.GET)
    public ResponseEntity upload(@RequestParam String targetFilePath, @RequestParam String targetDir) {
        File file = new File(targetFilePath);
        if (!file.exists()) {
            throw new BizException("File Not Found Error:" + file.getAbsolutePath());
        }
        try {
            String url = s3Client.uploadFile(file, targetDir + "/" + DateUtil.getCurrentYyyymmdd());
            log.info("URL : " + url);
        } catch (InterruptedException e) {
           throw new BizException("S3 File Upload Error", e.getMessage());
        }
        String result = "upload completed!";
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.TEXT_PLAIN);
        httpHeaders.setContentLength(result.length());
        return new ResponseEntity<>(result, httpHeaders, HttpStatus.OK);
    }

    @RequestMapping(value = "/s3/download", method = RequestMethod.GET)
    public ResponseEntity<byte[]> download(@RequestParam String key) {
        try {
            byte[] bytes = IOUtils.toByteArray(s3Client.getS3ObjectInputStream(key));
            String filename = URLEncoder.encode(key, "UTF-8").replaceAll("\\+", "%20");


            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            httpHeaders.setContentLength(bytes.length);
            httpHeaders.setContentDispositionFormData("attachment", filename);

            return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
        } catch (IOException e) {
            throw new BizException("S3 File Download Error", e.getMessage());
        }
    }
}
