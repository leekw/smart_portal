package net.smart.common.controller;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.smart.common.annotation.IntegrationRequest;
import net.smart.common.annotation.IntegrationResponse;
import net.smart.common.domain.IntUser;
import net.smart.common.domain.based.BasedFile;
import net.smart.common.domain.based.BasedFileInfo;
import net.smart.common.domain.based.BasedResource;
import net.smart.common.domain.based.BasedResourceRole;
import net.smart.common.domain.based.BasedUser;
import net.smart.common.domain.based.SessionUser;
import net.smart.common.exception.BizException;
import net.smart.common.service.SmartCommonService;
import net.smart.common.support.comparator.SessionComparator;
import net.smart.common.support.constant.BizCode;
import net.smart.common.support.constant.ErrorCode;
import net.smart.common.support.s3.S3Client;
import net.smart.common.support.util.DateUtil;
import net.smart.common.support.util.FileUtil;
import net.smart.common.support.util.IntegrationHttpSessionCollector;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/permit/res/**")
public class PermitResourceController extends AbstractPageController {

	@Autowired
	private S3Client s3Client;

	@Autowired
	private SmartCommonService smartCommonService;
	
	@Autowired
	private SessionRegistry sessionRegistry;

	
	@RequestMapping(value = "/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="resources")
	public List<BasedResource> getResourceList(@IntegrationRequest BasedResource param) {
		String mainResourceId = smartCommonService.getSysPropertieValue("MAIN_RESOURCE_ID");
		param.setRoles(smartCommonService.getSessionRoles());
		List<BasedResource> temps =  smartCommonService.getResourceList(param);
		List<BasedResource> results = new ArrayList<BasedResource>();
		for (BasedResource result : temps) {
			if (param.getViewType() == null && !smartCommonService.isSuperAmin()) {
				if (param.getAdminYn() == null || !"Y".equals(param.getAdminYn()))
					if (!smartCommonService.isPermitResource(smartCommonService.getSessionRoles(), result.getResourceKey())) continue;
			}
			
			if (mainResourceId != null 
					&& mainResourceId.equals(result.getResourceId())) {
				result.setMainResourceYn("Y");
				result.setMainResource(true);
			} else {
				result.setMainResource(false);
				result.setMainResourceYn("N");
			}
			results.add(result);
		}
		return results;
	}
	
	@RequestMapping(value = "/svc/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="resources")
	public List<BasedResource> getMenuServiceList(@IntegrationRequest BasedResource param) {
		return smartCommonService.getMenuServiceList(param);
	}
	
	@RequestMapping(value = "/file/add.{metadataType}", method = RequestMethod.POST)
	public void addUploadFile(@IntegrationRequest List<BasedFile> params) {
		List<BasedFile> files = new ArrayList<BasedFile>();
		for (BasedFile file : params) {
			if ("I".equals(file.getDataMode())) {
				if (file.getResourceId() != null && !"".equals(file.getResourceId())) {
					file.setTargetId(file.getResourceId());
					file.setRelationType("MENU");
				} else {
					file.setTargetId(file.getBoardNo() + ":" + file.getBoardId());
					file.setRelationType("BOARD");
				}
				files.add(file);
			}
		}
		smartCommonService.addUploadFile(files);
	}
	
	@RequestMapping(value = "/file/download.{metadataType}", method = RequestMethod.GET)
	public ModelAndView fileDownload(@PathVariable("metadataType") String metadataType,
			HttpServletRequest request, HttpServletResponse response, ModelAndView modelAndView) {
		modelAndView.setViewName("fileDownload");
		Map<String, Object> data = smartCommonService.getFileDownload(request);
		data.put("metadataType", metadataType);
		modelAndView.addObject(BizCode.RequestKey.PARAM_KEY.getValue(), data);
		return modelAndView;
	}
	
	@RequestMapping(value = "/excel/upload.file", method = RequestMethod.POST)
	public ModelAndView excelupload(BasedFileInfo fileInfo, HttpServletRequest request, HttpServletResponse response, ModelAndView modelAndView) throws IOException {
		String path = smartCommonService.getSysPropertieValue("UPLOAD_PATH");
		if (fileInfo.getFileupload().isEmpty()) {
			throw new BizException("File Upload Error");
		}
		MultipartFile file = fileInfo.getFileupload().get(0);
		String filePath =  FileUtil.saveFile(file, path);
		List<BasedFile> files = new ArrayList<BasedFile>();
		BasedFile uploadFile = new BasedFile();
		uploadFile.setFileName(file.getOriginalFilename());
		uploadFile.setFilePysName(file.getName());
		uploadFile.setFilePath(filePath);
		uploadFile.setFileSize((file.getSize() /1024) + "KB");
		files.add(uploadFile);
		Map<String,Object> userDataMap = new HashMap<String,Object>();
		userDataMap.put("success", files);
		modelAndView.addObject(BizCode.RequestKey.PARAM_KEY.getValue(),userDataMap);
		return modelAndView;
	}

	@RequestMapping(value = "/file/upload.file", method = RequestMethod.POST)
	public ModelAndView fileupload(BasedFileInfo fileInfo, HttpServletRequest request, HttpServletResponse response, ModelAndView modelAndView) throws IOException {
		String path = smartCommonService.getSysPropertieValue("UPLOAD_PATH");
		List<BasedFile> files = new ArrayList<BasedFile>();
		if (fileInfo.getFileupload() != null && !fileInfo.getFileupload().isEmpty()) {
			for (MultipartFile file : fileInfo.getFileupload()) {
				String filePath = FileUtil.saveFile(file, path);
				if (filePath != null) {
					BasedFile uploadFile = new BasedFile();
					uploadFile.setFileNo(0);
					uploadFile.setFileName(file.getOriginalFilename());
					uploadFile.setFilePysName(file.getName());
					uploadFile.setFilePath(filePath);
					uploadFile.setFileSize((file.getSize() /1024) + "KB");
					uploadFile.setDataMode("I");
					files.add(uploadFile);
				}
				
			}
		}
		Map<String,Object> userDataMap = new HashMap<String,Object>();
		userDataMap.put("success", files);
		modelAndView.addObject(BizCode.RequestKey.PARAM_KEY.getValue(),userDataMap);
		return modelAndView;
	}


    @RequestMapping(value = "/source/file/upload.file", method = RequestMethod.POST)
    public ModelAndView sourceFileupload(BasedFileInfo fileInfo, HttpServletRequest request, HttpServletResponse response, ModelAndView modelAndView) throws IOException {

        //TO_DO S3
        String path = smartCommonService.getAnalysisFileDir();
        List<BasedFile> files = new ArrayList<BasedFile>();
        if (fileInfo.getFileupload() != null && !fileInfo.getFileupload().isEmpty()) {

             for (MultipartFile file : fileInfo.getFileupload()) {

                File s3File = new File(file.getOriginalFilename());
			 	file.transferTo(s3File);

			 	try {
					 String url = s3Client.uploadFile(s3File, "analysis");
					 System.out.println("URL : " + url);
				 } catch (InterruptedException e) {
					 e.printStackTrace();
				 }

				BasedFile uploadFile = new BasedFile();
				uploadFile.setFileNo(0);
				uploadFile.setFileName(file.getOriginalFilename());
				uploadFile.setFilePysName(file.getOriginalFilename());
				uploadFile.setFilePath("analysis");
				uploadFile.setFileSize((file.getSize() /1024) + "KB");
				uploadFile.setDataMode("I");
				files.add(uploadFile);

            }

        }
        Map<String,Object> userDataMap = new HashMap<String,Object>();
        userDataMap.put("success", files);
        modelAndView.addObject(BizCode.RequestKey.PARAM_KEY.getValue(),userDataMap);
        return modelAndView;
    }



	@RequestMapping(value = "/mobile/file/upload.file", method = RequestMethod.POST)
	public ModelAndView mobileFileupload(BasedFileInfo fileInfo, HttpServletRequest request, HttpServletResponse response, ModelAndView modelAndView) throws IOException,InterruptedException {


		List<BasedFile> files = new ArrayList<BasedFile>();
		if (fileInfo.getFileupload() != null && !fileInfo.getFileupload().isEmpty()) {

			for (MultipartFile file : fileInfo.getFileupload()) {

				File s3File = new File(file.getOriginalFilename());
				file.transferTo(s3File);

				try {
					String url = s3Client.uploadFile(s3File, "mobile");
 				} catch (InterruptedException e) {
					throw e;
				}

				BasedFile uploadFile = new BasedFile();
				uploadFile.setFileNo(0);
				uploadFile.setFileName(file.getOriginalFilename());
 				uploadFile.setFilePath("mobile");
				uploadFile.setFileSize((file.getSize() /1024) + "KB");
				uploadFile.setDataMode("I");
				files.add(uploadFile);

			}

		}

		smartCommonService.addAnalysisMobileFile(files.get(0));

		Map<String,Object> userDataMap = new HashMap<String,Object>();
		userDataMap.put("success", files.get(0));
		modelAndView.addObject(BizCode.RequestKey.PARAM_KEY.getValue(),userDataMap);
		return modelAndView;
	}


	@RequestMapping(value = "/file/remove.{metadataType}", method = RequestMethod.POST)
	public void removeFile(@IntegrationRequest BasedFile file) {
		File delFile = new File(file.getFilePath());
		if (!delFile.exists()) {
			throw new BizException("ERROR.0000", "지울 대상 파일이 없습니다.");
		}
		delFile.delete();
		if ("R".equals(file.getDataMode())) {
			smartCommonService.removeUploadFile(file);
		}
	}
	
	@RequestMapping(value = "/add.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="resource")
	public BasedResource addResource(@IntegrationRequest BasedResource param) {
		BasedResource result = new BasedResource();
		if (param.getParentResourceId() == null)
			param.setParentResourceId("TOP");
		param.setResourceId("RE_" + System.currentTimeMillis());
		if (param.getUrl() != null && param.getUrl().equals("")) 
			param.setUrl(null);
		if (param.getResourceContent() != null && param.getResourceContent().equals(""))
			param.setResourceContent(null);
		smartCommonService.addResource(param);
		BeanUtils.copyProperties(param, result);
		return result;
	}
	
	
	@RequestMapping(value = "/list/remove.{metadataType}", method = RequestMethod.POST)
	public void removeResourceList(@IntegrationRequest List<BasedResource> param) {
		smartCommonService.removeResource(param);
	}
	
	@RequestMapping(value = "/remove.{metadataType}", method = RequestMethod.POST)
	public void removeResource(@IntegrationRequest BasedResource param) {
		smartCommonService.removeResource(param);
	}
	
	@RequestMapping(value = "/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyResource(@IntegrationRequest List<BasedResource> params) {
		smartCommonService.modifyResource(params);
	}
	
	@RequestMapping(value = "/role/add.{metadataType}", method = RequestMethod.POST)
	public void addResourceRole(@IntegrationRequest BasedResourceRole param) {
		if (param.getIncludeYn() == null) {
			param.setIncludeYn("Y");
		}
		List<BasedResourceRole> temps = smartCommonService.getResourceRoleList(param);
		if (temps.size() > 0) {
			throw new BizException("ERROR.0001", "이미 등록된 리소스 입니다.");
		}
		smartCommonService.addResourceRole(param);
	}
	
	@RequestMapping(value = "/role/remove.{metadataType}", method = RequestMethod.POST)
	public void removeResourceRole(@IntegrationRequest List<BasedResourceRole> params) {
		smartCommonService.removeResourceRole(params);
	}
	
	@RequestMapping(value = "/role/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyResourceRole(@IntegrationRequest BasedResourceRole param) {
		smartCommonService.modifyResourceRole(param);
	}
	
	@RequestMapping(value = "/content/modify.{metadataType}", method = RequestMethod.POST)
	public void modifyResourceContent(@IntegrationRequest BasedResource param) {
		smartCommonService.modifyResourceByContent(param);
		if (param.getMainResourceYn() != null && "Y".equals(param.getMainResourceYn())) {
//			PortalInfo info = new PortalInfo();
//			info.setMainResorceId(param.getResourceId());
//			portalSercice.modifyPortalProjectStatusByMainResource(info);
		}
	}
	
	@RequestMapping(value = "/check/modify.{metadataType}", method = RequestMethod.POST)
	public void checkModifyResource(@IntegrationRequest BasedResource param) {
		boolean checked = smartCommonService.getVaildModifyMenu(param.getResourceId());
		String name = smartCommonService.getLockMenuByUserName(param.getResourceId());
		if (!checked) {
			throw new BizException(ErrorCode.SYSTEM_ERROR.getValue(), "해당 메뉴는 " + name + "이(가) 수정하고 있습니다.");
		}
	}
	
	@RequestMapping(value = "/complete/modify.{metadataType}", method = RequestMethod.POST)
	public void completeModifyResource(@IntegrationRequest BasedResource param) {
		smartCommonService.modifyCompleteMenu(param.getResourceId());
	}
	
	@RequestMapping(value = "/role/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="resources")
	public List<BasedResourceRole> getResourceRoleList(@IntegrationRequest BasedResourceRole param) {
		return smartCommonService.getResourceRoleList(param);
	}
	
	@RequestMapping(value = "/session/user/list/get.{metadataType}", method = RequestMethod.POST)
	@IntegrationResponse(key="users")
	public List<IntUser> getSessionUserList() {
		List<IntUser> results = new ArrayList<IntUser>();
		Map<String, HttpSession> sessions = IntegrationHttpSessionCollector.getConnectionSession();
		List<HttpSession> expireSessionList = new ArrayList<HttpSession>();
		int index = 0;
		Iterator<Entry<String, HttpSession>> ie = sessions.entrySet().iterator();
		while(ie.hasNext()) {
			Entry<String, HttpSession> e = ie.next();
			HttpSession session = e.getValue();
			IntUser user = (IntUser) session.getAttribute("SAVED_USER");
			if (user == null) {
				expireSessionList.add(session);
				continue;
			}
			user.setRowId(++index);
			user.setSessionId(session.getId());
			user.setLastActionDateByStr(DateUtil.getDateByFormat(user.getLastActionDate(), DateUtil.Format.YYYY_MM_DD_HH_MI_SS.getValue()));
			results.add(user);
		}
		Collections.sort(results, new SessionComparator());
		return results;
	}
	
	@RequestMapping(value = "/session/invalid.{metadataType}", method = RequestMethod.POST)
	public void invalidSessions(@IntegrationRequest List<SessionUser> params) {
		Map<String, HttpSession> sessions = IntegrationHttpSessionCollector.getConnectionSession();
		Map<String, SessionInformation> sessionData = new HashMap<String, SessionInformation>();
		List<Object> principals = sessionRegistry.getAllPrincipals();
		for (Object obj : principals) {
			for (SessionInformation ss : sessionRegistry.getAllSessions(obj, false)) {
				sessionData.put(ss.getSessionId(), ss);
			}
		}
		for (SessionUser param : params) {
			HttpSession session = sessions.get(param.getSessionId());
			if (session != null) {
				session.invalidate();
			}
			SessionInformation si = sessionData.get(param.getSessionId());
			si.expireNow();
		}
	}
	
	@RequestMapping(value = "/org/user/save.{metadataType}", method = RequestMethod.POST)
	public void saveOrgUser(@IntegrationRequest BasedUser param) {
		smartCommonService.addOrgUser(param);
	}
	
	@RequestMapping(value = "/org/user/remove.{metadataType}", method = RequestMethod.POST)
	public void removeOrgUser(@IntegrationRequest BasedUser param) {
		smartCommonService.removeOrgUser(param);
	}

}
