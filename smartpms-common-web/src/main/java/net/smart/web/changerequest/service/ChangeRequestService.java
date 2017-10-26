package net.smart.web.changerequest.service;

import java.util.List;

import net.smart.web.domain.changerequest.ChangeRequestComboInfo;
import net.smart.web.domain.changerequest.ChangeRequestItem;
import net.smart.web.domain.changerequest.ChangeRequestJira;
import net.smart.web.domain.changerequest.ChangeRequestLimit;
import net.smart.web.domain.changerequest.ChangeRequestLog;
import net.smart.web.domain.changerequest.ChangeRequestTarget;
import net.smart.web.domain.changerequest.ChangeRequestVolume;

public interface ChangeRequestService {
	
	public List<ChangeRequestItem> getChangeRequestTartgetList(ChangeRequestItem param);
	
	public List<ChangeRequestComboInfo> getRepositoryComboList(ChangeRequestComboInfo param);
	
	public List<ChangeRequestComboInfo> getJiraComboList(ChangeRequestComboInfo param);
	
	public void modifyChangeRequestJira(List<ChangeRequestItem> params);
	
	public String getSvnValidationCheckYn();
	
	public void updateSvnValidationCheckYn(String svnCheckYn);
	
	public List<ChangeRequestJira> getChangeRequestJiraList(ChangeRequestJira param);
	
	public List<ChangeRequestTarget>  getProgramListByJiraId(ChangeRequestTarget param);

	public List<ChangeRequestTarget> getSourceProgramList(ChangeRequestTarget param);
	
	public List<ChangeRequestTarget> getOriginalProgramList(ChangeRequestTarget param);
	
	public void addChangeRequest(ChangeRequestJira param);
	
	public void validateChangeRequestJiraFile(ChangeRequestJira param);
	
	public List<ChangeRequestLog> getChangeRequestLogSummary(ChangeRequestLog param);
	
	public List<ChangeRequestLimit> getChangeRequestLimit(ChangeRequestLimit param);
	
	public List<String> getSvnFileList(String programId);
	
	public List<ChangeRequestLog> getChangeRequestSummary(ChangeRequestLog param);
	
	public List<ChangeRequestVolume> getChangeRequestVolumeList(ChangeRequestVolume param);
}
