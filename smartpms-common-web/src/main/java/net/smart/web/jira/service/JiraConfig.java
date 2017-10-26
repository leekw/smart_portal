package net.smart.web.jira.service;

import java.util.concurrent.atomic.AtomicInteger;

import javax.annotation.PostConstruct;

import net.smart.web.domain.jira.JiraDefaultData;
import net.smart.web.jira.dao.JiraDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

//@Component("jiraConfig")
public class JiraConfig {
	
	@Value("${jira.cutover.project}") 
	private String project;
	
	@Value("${jira.cutover.issuetype}") 
	private String issueType;
	
	@Value("${jira.url}") 
	private String jiraUrl;
	
	@Value("${jira.username}") 
	private String jiraUserName;
	
	@Value("${jira.password}") 
	private String jiraPassword;
	
	@Value("${jira.cutover.reporter}") 
	private String cutoverReporter;
	
	@Value("${jira.cutover.th}")
	private String th;
	
	@Value("${jira.cutover.step}")
	private String step;
	
	@Value("${jira.cutover.dtl}")
	private String dtl;
	
	@Value("${jira.user.uri}")
	private String userUri;
	
	@Value("${jira.cutover.issuetypename}")
	private String issueTypeName;
	
	@Value("${jira.cutover.category}")
	private String category;
	
	@Value("${jira.cr.project}")
	private String crProject;
	
	@Value("${jira.cr.issuetype}")
	private String crIssueType;
	
	@Value("${jira.base.url}")
	private String baseUrl;
	
	@Value("${jira.upload.target.dir}")
	private String uploadTargeDir;

	@Value("${jira.common.user}")
	private String commonUser;
	
	@Value("${jira.common.password}")
	private String commonPassword;
	
	
	@Autowired
	@Qualifier("jiraDao")
	private JiraDao jiraDao;
	
	private AtomicInteger sync = new AtomicInteger(0);
	
	
	public String getCommonUser() {
		return commonUser;
	}

	public void setCommonUser(String commonUser) {
		this.commonUser = commonUser;
	}

	public String getCommonPassword() {
		return commonPassword;
	}

	public void setCommonPassword(String commonPassword) {
		this.commonPassword = commonPassword;
	}

	public String getUploadTargeDir() {
		return uploadTargeDir;
	}

	public void setUploadTargeDir(String uploadTargeDir) {
		this.uploadTargeDir = uploadTargeDir;
	}

	public String getBaseUrl() {
		return baseUrl;
	}

	public void setBaseUrl(String baseUrl) {
		this.baseUrl = baseUrl;
	}

	public String getCrProject() {
		return crProject;
	}

	public void setCrProject(String crProject) {
		this.crProject = crProject;
	}

	public String getCrIssueType() {
		return crIssueType;
	}

	public void setCrIssueType(String crIssueType) {
		this.crIssueType = crIssueType;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getIssueTypeName() {
		return issueTypeName;
	}

	public void setIssueTypeName(String issueTypeName) {
		this.issueTypeName = issueTypeName;
	}

	public String getUserUri() {
		return userUri;
	}

	public void setUserUri(String userUri) {
		this.userUri = userUri;
	}

	public String getProject() {
		return project;
	}

	public void setProject(String project) {
		this.project = project;
	}

	public String getIssueType() {
		return issueType;
	}

	public void setIssueType(String issueType) {
		this.issueType = issueType;
	}

	public String getJiraUrl() {
		return jiraUrl;
	}

	public void setJiraUrl(String jiraUrl) {
		this.jiraUrl = jiraUrl;
	}

	public String getJiraUserName() {
		return jiraUserName;
	}

	public void setJiraUserName(String jiraUserName) {
		this.jiraUserName = jiraUserName;
	}

	public String getJiraPassword() {
		return jiraPassword;
	}

	public void setJiraPassword(String jiraPassword) {
		this.jiraPassword = jiraPassword;
	}

	public String getCutoverReporter() {
		return cutoverReporter;
	}

	public void setCutoverReporter(String cutoverReporter) {
		this.cutoverReporter = cutoverReporter;
	}

	public String getTh() {
		return th;
	}

	public void setTh(String th) {
		this.th = th;
	}

	public String getStep() {
		return step;
	}

	public void setStep(String step) {
		this.step = step;
	}

	public String getDtl() {
		return dtl;
	}

	public void setDtl(String dtl) {
		this.dtl = dtl;
	}
	
	@PostConstruct
	public void init() {
		this.syncDefaultCutoverData();
	}
	
	private void syncDefaultCutoverData() {
		JiraDefaultData defaultData = jiraDao.getCutvoerDefaultValue();
		if (defaultData != null) {
			synchronized(sync) {
				this.setTh(defaultData.getCutoverScenario());
				this.setStep(defaultData.getCutoverTransition());
				this.setDtl(defaultData.getCutoverTransitionDetail());
			}
		}
	}
	
	@Scheduled(cron="0 0/5 * * * ? ")
	public void syncData() {
		final String jiraUnSync = System.getProperty("jiraUnSync");
		if (jiraUnSync == null || jiraUnSync.equals("N")) {
			this.syncDefaultCutoverData();
		}
	}

}
