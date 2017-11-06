package net.smart.common.support.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.UUID;

import net.smart.common.exception.BizException;
import net.smart.common.support.constant.ErrorCode;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

public class FileUtil {
	
	private static String getDateFilePath() {
		String days = DateUtil.getNowByFormat(DateUtil.Format.YYYYMMDD.getValue());
		return days.substring(0,4) + "/" + days.substring(4, 6) + "/" + days.substring(6, 8);
	}
	
	public static String saveExcel(HSSFWorkbook workbook, String writeFilePath)  {
		return FileUtil.saveExcel(workbook, writeFilePath, null);
	}
	
	public static String saveExcel(HSSFWorkbook workbook, String writeFilePath, String fileName)  {
		
		String tempName = UUID.randomUUID().toString();
		File dir = new File(writeFilePath + "/"  + FileUtil.getDateFilePath());
		if(!dir.exists())
			dir.mkdirs();
		String fileFullPath = writeFilePath + "/"  + FileUtil.getDateFilePath() + "/" + (fileName == null ? tempName : fileName);
		File file = new File(fileFullPath); 
		BufferedOutputStream fileOutput = null;
		try {
			
			fileOutput = new BufferedOutputStream(new FileOutputStream(file));
			
			workbook.write(fileOutput);
			fileOutput.close();
			return fileFullPath;
		} catch (IOException e) {		
			throw new BizException(ErrorCode.SYSTEM_ERROR.getValue(), e);
		} finally {
			if (fileOutput != null) {
				try {
					fileOutput.close();
				} catch (IOException e) {
					throw new BizException(ErrorCode.SYSTEM_ERROR.getValue(), e);
				}
			}
		}
	}
	
	public static String saveFile(MultipartFile multipartFile, String writeFilePath) throws IOException, BizException {
		InputStream inputStream = null;
		OutputStream outputStream = null;
		String tempName = UUID.randomUUID().toString();
		boolean makeDirResult = false;

		if (multipartFile.getSize() > 0) {
			try {
				File dir = new File(writeFilePath + "/"  + FileUtil.getDateFilePath());
				if (!dir.exists()) {
					makeDirResult = dir.mkdirs();
					if (!makeDirResult) {
						throw new BizException("ERROR.9999");
					}
				}
				
				String fileFullPath = writeFilePath + "/"  + FileUtil.getDateFilePath() + "/" + tempName;
				File newFile = new File(fileFullPath);
				multipartFile.transferTo(newFile);
				return fileFullPath;
			} catch (Exception ex) {
				if (outputStream != null) outputStream.close();
				if (inputStream != null) inputStream.close();
			} finally {
				if (outputStream != null) outputStream.close();
				if (inputStream != null) inputStream.close();
			}
		}
		return null;
	}

}
