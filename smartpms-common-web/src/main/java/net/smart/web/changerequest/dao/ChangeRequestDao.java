package net.smart.web.changerequest.dao;

import java.util.List;

import net.smart.web.domain.changerequest.ChangeRequestComboInfo;
import net.smart.web.domain.changerequest.ChangeRequestItem;
import net.smart.web.domain.changerequest.ChangeRequestTarget;

public interface ChangeRequestDao {
	
	public List<ChangeRequestItem> getChangeRequestTartgetList(ChangeRequestItem param);
	
	public List<ChangeRequestComboInfo> getRepositoryComboList(ChangeRequestComboInfo param);
	
	public void modifyChangeRequestJira(List<ChangeRequestItem> params, String sessionUserId);
	
	public String getSvnValidationCheckYn();
	
	public void updateSvnValidationCheckYn(String svnCheckYn);
	
	public List<ChangeRequestTarget>  getProgramListByJiraId(ChangeRequestTarget param);

	
}
