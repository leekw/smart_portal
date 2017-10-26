package net.smart.web.changerequest.dao;

import java.util.List;

import net.smart.web.domain.changerequest.ChangeRequestTarget;
import net.smart.web.domain.changerequest.ChangeRequestVolume;

public interface SourceChangeRequestDao {
	
	public List<String> getSvnFileList(String programId);
	
	public List<ChangeRequestVolume> getSourceProgramByDeveloper(ChangeRequestVolume param);
	
	public List<ChangeRequestTarget> getSourceProgramList(ChangeRequestTarget param);

}
