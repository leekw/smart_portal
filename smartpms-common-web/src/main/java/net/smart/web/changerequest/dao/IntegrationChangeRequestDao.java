package net.smart.web.changerequest.dao;

import java.util.List;

import net.smart.web.domain.changerequest.ChangeRequestJira;
import net.smart.web.domain.changerequest.ChangeRequestLimit;
import net.smart.web.domain.changerequest.ChangeRequestLog;
import net.smart.web.domain.changerequest.ChangeRequestTarget;
import net.smart.web.domain.changerequest.ChangeRequestVolume;

public interface IntegrationChangeRequestDao {
	
	public List<ChangeRequestTarget>  getProgramListByJiraId(ChangeRequestTarget param);
	
	
	
	public void mergeChangeRequestJira(ChangeRequestJira param);
	
	public void removeChangeProgram(ChangeRequestJira param);
	
	public void addChangeProgram(ChangeRequestJira param);
	
	public Integer getProgramNextIssueId();
	
	public List<ChangeRequestLog> getChangeRequestLogSummary(ChangeRequestLog param);
	
	public void removeChangeRequestLog(ChangeRequestJira param);
	
	public void addChangeRequestLog(List<ChangeRequestLog> params);
	
	public List<ChangeRequestLimit> getChangeRequestLimit(ChangeRequestLimit param);
	
	public List<ChangeRequestLog> getChangeRequestSummary(ChangeRequestLog param);
	
	public List<ChangeRequestVolume> getTargerProgramByTeamInfo(ChangeRequestVolume param);
	
	public List<ChangeRequestVolume> getTargetProgramByDeveloper(ChangeRequestVolume param);
	
	public List<ChangeRequestVolume> getSourceProgramByDeveloperSubscribe(ChangeRequestVolume param);
	
}
