package net.smart.common.support.cache.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.List;
import java.util.ResourceBundle;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.ehcache.Element;

public class CacheFileUtil {
	
	private static Logger logger = LoggerFactory.getLogger(CacheFileUtil.class);
	
	public static String getCachePath() {
    	String result = null;
    	
        ResourceBundle resourceBundle = ResourceBundle.getBundle("prm");

        try {
        	result = resourceBundle.getString("cache_file_path");            	
        } catch (Exception e) {
        	logger.error("Invalid property");
        }
    	
        return result;
    }
	
	public static boolean isCacheObjectFile(String yyyymm, String cacheName) {
		File file = new File(CacheFileUtil.getCachePath() + "/" + yyyymm + "/" + cacheName + ".ser" );
		return file.exists();
	}
	
	public static Object readObjectFromFile(String yyyymm, String cacheName) {
        Object cache = null;
        FileInputStream fis = null;
        ObjectInputStream ois = null;
        BufferedInputStream bis = null;
        try {
            File file = new File(CacheFileUtil.getCachePath() + "/" + yyyymm + "/" + cacheName + ".ser" );
            fis = new FileInputStream(file);
            bis = new BufferedInputStream(fis);

            ois = new ObjectInputStream(bis);
            cache = (Object) ois.readObject();
        } catch (IOException e) {
        	logger.error(e.getMessage());
        } catch (ClassNotFoundException e) {
        	logger.error(e.getMessage());
        } catch (NullPointerException e) {
        	logger.error(e.getMessage());
        } finally {
            if (ois != null) {
                try {
                    ois.close();
                } catch (IOException e) {
                	logger.error(e.getMessage());
                }
            }
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                	logger.error(e.getMessage());
                }
            }
            if (bis != null) {
                try {
                	bis.close();
                } catch (IOException e) {
                	logger.error(e.getMessage());
                }
            }
        }
        return cache;
    }
	
	public static void writeEhcache(String yyyymm, String cacheName, List<Element> elements) {
		FileOutputStream fos = null;
        ObjectOutputStream oos = null;
        BufferedOutputStream bos = null;

        try {
            File file = new File(CacheFileUtil.getCachePath() + "/" + yyyymm);
            if (!file.exists())
            	file.mkdirs();

            fos = new FileOutputStream(file.getAbsolutePath() + "/" + cacheName + ".ser");
            
            bos = new BufferedOutputStream(fos);

            oos = new ObjectOutputStream(bos);
            oos.writeObject(elements);

        } catch (IOException e) {
        	logger.error(e.getMessage());
        } finally {
            try {
                if (oos != null) {
                    oos.close();
                }
                if (fos != null) {
                    fos.close();
                }
                if (bos != null) {
                	bos.close();
                }
            } catch (IOException e) {
            	logger.error(e.getMessage());
            }
        }
	}
}
