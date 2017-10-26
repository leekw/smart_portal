package net.smart.common.support.security;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.Assert;

/**
 * 
 * net.smart.common.support.security.Compression.java
 * <pre>
 *  암호화 된 데이터를 송수신 시 데이터를 암축/압축해제 하기 위한 클래스
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public abstract class Compression {
	
	private static  Logger logger = LoggerFactory.getLogger(Compression.class);
    
	public static byte[] zipStringToBytes(String input) {
		ByteArrayOutputStream byteArrayOutputStream = null;
		GZIPOutputStream gzipOutputStream = null;
		BufferedOutputStream bufferedOutputStream = null;
		try {
			byteArrayOutputStream = new ByteArrayOutputStream();
			gzipOutputStream = new GZIPOutputStream(byteArrayOutputStream);
			bufferedOutputStream = new BufferedOutputStream(gzipOutputStream);
			bufferedOutputStream.write(input.getBytes());

			Assert.notNull(bufferedOutputStream, "No OutputStream specified");
			Assert.notNull(gzipOutputStream, "No OutputStream specified");
			Assert.notNull(byteArrayOutputStream, "No OutputStream specified");
		} catch (IOException e) {
			logger.debug(e.getMessage());
		} finally {
			try {
				if (bufferedOutputStream != null)
					bufferedOutputStream.close();
				if (gzipOutputStream != null)
					gzipOutputStream.close();
				if (byteArrayOutputStream != null)
					byteArrayOutputStream.close();
			} catch (IOException e) {
				logger.debug(e.getMessage());
			}
		}
		return byteArrayOutputStream.toByteArray();

	}

	public static String unzipStringFromBytes(Object bytes) {
		ByteArrayInputStream byteArrayInputStream = null;
		GZIPInputStream gzipInputStream = null;
		BufferedInputStream bufferedInputStream = null;
		ByteArrayOutputStream byteArrayOutputStream = null;
		try {
			byteArrayInputStream = new ByteArrayInputStream((byte[])bytes);
			gzipInputStream = new GZIPInputStream(byteArrayInputStream);
			bufferedInputStream = new BufferedInputStream(gzipInputStream);
			byteArrayOutputStream = new ByteArrayOutputStream();
			byte[] buffer = new byte[8129];

			int length;
			while ((length = bufferedInputStream.read(buffer)) > 0) {
				byteArrayOutputStream.write(buffer, 0, length);
			}
			Assert.notNull(byteArrayOutputStream, "No OutputStream specified");
			Assert.notNull(bufferedInputStream, "No InputStream specified");
			Assert.notNull(gzipInputStream, "No InputStream specified");
			Assert.notNull(byteArrayInputStream, "No InputStream specified");
		} catch (IOException e) {
			logger.debug(e.getMessage());
		} finally {
			try {
				if(bufferedInputStream != null) bufferedInputStream.close();
				if(gzipInputStream != null) gzipInputStream.close();
				if(byteArrayInputStream != null) byteArrayInputStream.close();
				if(byteArrayOutputStream != null) byteArrayOutputStream.close();
			} catch (IOException e) {
				logger.debug(e.getMessage());
			}
		}

		return byteArrayOutputStream != null ? byteArrayOutputStream.toString() : null;
	}
}
