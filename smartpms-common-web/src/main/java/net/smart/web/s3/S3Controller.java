package net.smart.web.s3;

import com.amazonaws.util.IOUtils;
import net.smart.common.support.s3.S3Client;
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

@Controller
public class S3Controller {

    @Autowired
    private S3Client s3Client;

    @RequestMapping(value = "/s3/upload.{metadataType}", method = RequestMethod.GET)
    public void upload() {
        File file = new File("/Users/ags0688/Downloads/18_tech08_skcnc.pdf");
        try {
            String url = s3Client.uploadFile(file, "smart");
            System.out.println("URL : " + url);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
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
            e.printStackTrace();
        }
        return null;
    }
}
