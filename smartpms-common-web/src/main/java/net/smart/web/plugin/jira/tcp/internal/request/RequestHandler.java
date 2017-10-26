/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.tcp.internal.request;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.smart.web.plugin.jira.common.Constants;
import net.smart.web.plugin.jira.common.Utils;
import net.smart.web.plugin.jira.config.Configuration;
import net.smart.web.plugin.jira.rest.client.RestClientManager;
import net.smart.web.plugin.jira.rest.internal.search.JqlSearcher;
import net.smart.web.plugin.jira.rest.search.SearchService;
import net.smart.web.plugin.jira.tcp.internal.response.CustomFieldsResponseBuilder;
import net.smart.web.plugin.jira.tcp.internal.response.DefectFieldsResponseBuilder;
import net.smart.web.plugin.jira.tcp.internal.response.DescriptionResponse;
import net.smart.web.plugin.jira.tcp.internal.response.ErrorResponse;
import net.smart.web.plugin.jira.tcp.internal.response.FieldResponse;
import net.smart.web.plugin.jira.tcp.internal.response.StatusResolutionFieldsResponseBuilder;
import net.smart.web.plugin.jira.tcp.internal.response.StringResponse;
import net.smart.web.plugin.jira.tcp.response.IResponse;

import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import com.atlassian.jira.rest.client.api.RestClientException;
import com.atlassian.jira.rest.client.api.domain.BasicIssue;
import com.atlassian.jira.rest.client.api.domain.BasicProject;
import com.atlassian.jira.rest.client.api.domain.Comment;
import com.atlassian.jira.rest.client.api.domain.Issue;
import com.atlassian.jira.rest.client.api.domain.Project;
import com.atlassian.jira.rest.client.api.domain.ServerInfo;
import com.atlassian.jira.rest.client.api.domain.Transition;
import com.atlassian.jira.rest.client.api.domain.input.ComplexIssueInputFieldValue;
import com.atlassian.jira.rest.client.api.domain.input.FieldInput;
import com.atlassian.jira.rest.client.api.domain.input.IssueInput;
import com.atlassian.jira.rest.client.api.domain.input.TransitionInput;
import com.atlassian.jira.rest.client.internal.ServerVersionConstants;
import com.google.common.collect.Iterables;

/**
 * Manage the requests for the creation, modification and deletion of remote
 * JIRA objects on the remote JIRA server. It facilitates the sequence of remote
 * method calls to various JIRA REST services to fulfill specific requests.
 */
public class RequestHandler extends AbstractRequestHandler {

    private static final Logger logger = Logger.getLogger(RequestHandler.class.getPackage().getName());
    private static final boolean DUMP_DEBUG = new Boolean(System.getProperty(Constants.DUMP_DEBUG_PROPERTY));

    private RestClientManager restClientManager;
    private SearchService searchService;
    private IssueFieldsMapper issueFieldsMapper;
    
    private String jiraServerUrl;
    private String jiraUsername;
    private String jiraPassword;

    private int queryBatchSize = Constants.JQL_BATCH_SIZE;
    private String defectBatch;

    private String segmentFilter;
    private String projectList;

    private String configFile;
    private Configuration configuration;
    
    private ServerInfo serverInfo = null;
    
	public void setJiraServerUrl(String jiraServerUrl) {
		this.jiraServerUrl = jiraServerUrl;
	}

	public void setJiraUsername(String jiraUsername) {
		this.jiraUsername = jiraUsername;
	}

	public void setJiraPassword(String jiraPassword) {
		this.jiraPassword = jiraPassword;
	}

	public void setDefectBatch(String defectBatch) {
		this.defectBatch = defectBatch;
	}

	public void setConfigFile(String configFile) {
		this.configFile = configFile;
	}

	/**
     * Default constructor.
     */
    public RequestHandler() {
    	
    }

    /**
     * Initialize the REST client and configuration. This must be done before
     * using any of the useful methods in this request handler.
     * 
     * @throws Exception
     */
    public void initialize() throws Exception {
    	if (this.jiraServerUrl == null) {
            throw new Exception("The jiraServerUrl is null.");
    	}
    	if (this.jiraUsername == null) {
            throw new Exception("The jiraUsername is null.");
    	}
    	if (this.jiraPassword == null) {
            throw new Exception("The jiraPassword is null.");
    	}
        initRestClientManager();
        initConfig();
        initDefectBatch();
        this.issueFieldsMapper = new IssueFieldsMapper(this.restClientManager, this.configuration);
        this.searchService = new JqlSearcher(this.restClientManager);
   }

    private void initConfig() throws Exception {
        // Create the config parser
        configuration = new Configuration(configFile);
        // Parse the config.xml
        configuration.parse();
        // Log the parsed configuration info
        logger.info(configuration.toString());
    }

    private void initDefectBatch() {
        // Get the query batch size
        if (defectBatch != null) {
            try {
                int size = Integer.parseInt(defectBatch);
                if (size > 0) {
                    queryBatchSize = size;
                }
            } catch (NumberFormatException e) {
            	logger.log(Level.WARNING, e.getMessage());
            }
        }
        logger.info("JIRA query batch size is set to: " + queryBatchSize);
    }

    private void initRestClientManager() throws Exception {
		restClientManager = new RestClientManager(this.jiraServerUrl, this.jiraUsername, this.jiraPassword);
		if (restClientManager == null) {
            throw new Exception("Error occurred while connecting to the JIRA server: "
                            + "rest client manager initialization error.");
		}
		// Make sure the JIRA server version is 5 or greater.
		if (restClientManager.getExtendedMetadataClient().getServerInfo().claim()
				.getBuildNumber() < ServerVersionConstants.BN_JIRA_5) {
            throw new Exception("This DTG JIRA plugin only support JIRA server version 5 or greater.");
		}
    }

    /**
     * @see com.perforce.p4dtg.plugin.jira.tcp.IRequestHandler#getId()
     */
    public String getId() throws RequestException {
    	if (serverInfo == null) {
            serverInfo = restClientManager.getExtendedMetadataClient().getServerInfo().claim();
    	}
        if (serverInfo != null) {
        	return serverInfo.getVersion();
        }
        return "";
    }

    public StringResponse createDefect(Element request) throws RequestException {
        String projId = getFieldValue(request, PROJID);
        if (projId == null) {
            throw new RequestException(new ErrorResponse(
                    "Missing PROJID in createDefect", "0"));
        }
        if (projId.equalsIgnoreCase(Constants.DTG_PROJECT_ALL)) {
            throw new RequestException(new ErrorResponse(
                    "Invalid PROJID in newDefect", "0"));
        }
        Project project = null;
        try {
            project = restClientManager.getProjectClient().getProject(projId).claim();
        } catch (RestClientException e) {
        	logger.log(Level.SEVERE, e.toString(), e);
            throw new RequestException(new ErrorResponse(
                    "Error occurred while retrieving project: " + projId + " :"
                            + e.toString(), "0"));
        }
        if (project == null) {
            throw new RequestException(new ErrorResponse(
                    "Defect requested for unknown project: " + projId, "0"));
        }

        Map<String, String[]> defectFields = getDefectFields(request);
        // Remove *Project* field from map
        if (defectFields.containsKey(Constants.DTG_PROJECT)) {
            defectFields.remove(Constants.DTG_PROJECT);
        }

        IssueInputFieldsBuilder iifBuilder = new IssueInputFieldsBuilder(
        		projId, defectFields, this.issueFieldsMapper, this.restClientManager);

        BasicIssue basicIssue = null;
        try {
        	IssueInput issueInput = iifBuilder.build();
            basicIssue = restClientManager.getExtendedIssueClient().createIssue(issueInput).claim();
        } catch (RestClientException e) {
        	logger.log(Level.SEVERE, e.toString(), e);
            throw new RequestException(new ErrorResponse(
                    "Error occurred while creating defect: " + e.toString(), "0"));
        }

        if (basicIssue == null) {
            throw new RequestException(new ErrorResponse(
                    "Unable to create defect", "0"));
        }

        Issue issue = restClientManager.getExtendedIssueClient().getIssue(basicIssue.getKey()).claim();
       
		// Update the status of the newly created issue, if it is different
		if (defectFields != null) {
			// Extract only the status and resolution fields
			Map<String, String[]> statusResolutionFields = issueFieldsMapper.getStatusResolutionMap(defectFields);
			// Check if the update status/resolution differs from the issue
			if (!issueFieldsMapper.isDifferentStatusResolution(issue, statusResolutionFields)) {
		        // Prevent updating of the status/resolution
		        if (defectFields.containsKey(Constants.ISSUE_FIELD_STATUS)) {
		            defectFields.remove(Constants.ISSUE_FIELD_STATUS);
		        }
			}
        	// Update the issue status
        	issue = updateIssueStatus(issue, defectFields);
        }
        
        return new StringResponse(issue.getKey());
    }

    /**
     * Gets the defect.
     *
     * @param request
     *            the request
     * @return the defect
     * @throws RequestException
     *             the request exception
     * @see com.perforce.p4dtg.plugin.jira.tcp.IRequestHandler#getDefect(org.w3c.dom.Element)
     */
    public FieldResponse[] getDefect(Element request) throws RequestException {
        String projId = request.getAttribute(PROJID);
        if (projId == null) {
            throw new RequestException(new ErrorResponse(
                    "Missing PROJID in getDefect", "0"));
        }
        String defectId = request.getAttribute(DEFECT);
        if (defectId == null) {
            throw new RequestException(new ErrorResponse(
                    "Missing DEFECT in getDefect", "0"));
        }

        Issue issue = null;
        try {
            issue = restClientManager.getExtendedIssueClient().getIssue(defectId).claim();
        } catch (RestClientException e) {
        	logger.log(Level.SEVERE, e.toString(), e);
            throw new RequestException(new ErrorResponse(
                    "Error occurred while retrieving defect: " + defectId
                            + " :" + e.toString(), "0"));
        }
        if (issue == null) {
            throw new RequestException(new ErrorResponse("Defect: "
                    + defectId + " not found", "0"));
        }

        DefectFieldsMapBuilder dfmBuilder = new DefectFieldsMapBuilder(issue,
        		this.issueFieldsMapper, this.configuration);
        Map<String, String[]> fieldValueMap = dfmBuilder.build();
        
        DefectFieldsResponseBuilder dfrBuilder = new DefectFieldsResponseBuilder();
        dfrBuilder.setFieldValueMap(fieldValueMap);

        FieldResponse[] fieldResponses = dfrBuilder.build();

        List<FieldResponse> fields = new ArrayList<FieldResponse>();
        fields.addAll(Arrays.asList(fieldResponses));

        // Add a special *Project* field with value projectId
        fields.add(new FieldResponse(Constants.DTG_PROJECT, issue.getProject().getKey()));

        return fields.toArray(new FieldResponse[fields.size()]);
    }

    /**
     * Gets the project.
     *
     * @param request
     *            the request
     * @return the project
     * @throws RequestException
     *             the request exception
     * @see com.perforce.p4dtg.plugin.jira.tcp.IRequestHandler#getProject(org.w3c.dom.Element)
     */
    public StringResponse getProject(Element request) throws RequestException {
        String name = request.getAttribute(PROJECT);
        if (name == null) {
            throw new RequestException(new ErrorResponse(
                    "Missing PROJECT in getProject", "0"));
        }
        if (Constants.DTG_PROJECT_ALL.equalsIgnoreCase(name)) {
            return new StringResponse(name);
        }
        try {
            Project project = restClientManager.getProjectClient().getProject(name).claim();
            if (project == null) {
                throw new RequestException(new ErrorResponse(
                        "Unknown project requested: " + name, "0"));
            }
        } catch (RestClientException e) {
        	logger.log(Level.SEVERE, e.toString(), e);
            throw new RequestException(new ErrorResponse(
                    "Error occurred while retrieving projec: " + name + " :"
                            + e.toString(), "0"));
        }
        return new StringResponse(name);
    }

    /**
     * Gets the field value.
     *
     * @param element
     *            the request
     * @param field
     *            the field
     * @return the field value
     */
    private String getFieldValue(Element element, String field) {
        if (element != null && field != null) {
	        NodeList nl = element.getElementsByTagName(FIELD);
	        if (nl != null && nl.getLength() > 0) {
	            for (int i = 0; i < nl.getLength(); i++) {
	                Element e = (Element) nl.item(i);
	                if (e != null) {
	                    if (e.getAttribute(FIELD_NAME) != null &&
	                    		e.getAttribute(FIELD_NAME).equalsIgnoreCase(field)) {
	                        return e.getAttribute(FIELD_VALUE);
	                    }
	                }
	            }
	        }
        }
        return null;
    }

    /**
     * Gets the defect fields.
     *
     * @param element
     *            the element
     * @return the defect fields
     */
    public Map<String, String[]> getDefectFields(Element element) {
        if (element != null) {
	        Map<String, String[]> nameValueMap = new HashMap<String, String[]>();
	        NodeList nl = element.getElementsByTagName(FIELD);
	        if (nl != null && nl.getLength() > 0) {
	            for (int i = 0; i < nl.getLength(); i++) {
	                Element e = (Element) nl.item(i);
	                if (e != null) {
	                    String name = e.getAttribute(FIELD_NAME);
	                    String value = e.getAttribute(FIELD_VALUE);
	                    if (name != null && value != null) {
	                        nameValueMap.put(name, new String[] { value });
	                    }
	                }
	            }
	        }
	        return nameValueMap;
        }
        return null;
    }

    /**
     * List defects.
     *
     * @param request
     *            the request
     * @return the string response
     * @throws RequestException
     *             the request exception
     * @see com.perforce.p4dtg.plugin.jira.tcp.IRequestHandler#listDefects(org.w3c.dom.Element)
     */
    public StringResponse listDefects(Element request) throws RequestException {
        String projId = request.getAttribute(PROJID);
        String date = request.getAttribute("DATE");
        String max = request.getAttribute("MAX");
        String modBy = request.getAttribute("MODBY");
        String modDate = request.getAttribute("MODDATE");
        String user = request.getAttribute("USER");

        if (projId == null) {
            throw new RequestException(new ErrorResponse("Missing PROJID in listDefects", "0"));
        }
        // Return error if the segment filter contains "Status/Resolution"
        if (segmentFilter != null) {
            if (segmentFilter.contains("(Status/Resolution=")) {
                throw new RequestException(
                        new ErrorResponse("Segmentation on Status/Resolution field is not supported","0"));
            }
        }
        // Normalize date with space in its parts (i.e. DATE="2014/ 3/ 6 11:39: 3")
        if (date != null) {
			try {
				date = Utils.formatDate(Utils.parseDate(date, Constants.DATE_PATTERN), Constants.DATE_PATTERN);
			} catch (ParseException e) {
                throw new RequestException(
                        new ErrorResponse("Invalid date","0"));
			}
        }
        
        Map<String, String> allIssueKeys = new HashMap<String, String>();
        List<String> projectIds = getProjectList(projId);
        if (projectIds != null) {
            for (String projectId : projectIds) {
                if (projectId != null) {
                    Map<String, String> issueKeys = queryDefects(projectId,
                            date, max, modBy, modDate, user, segmentFilter);
                    if (issueKeys != null) {
                        allIssueKeys.putAll(issueKeys);
                    }
                }
            }
        }

        return new StringResponse(allIssueKeys.keySet().toArray(new String[allIssueKeys.size()]));
    }

    /**
     * Gets the project list.
     *
     * @param projId
     *            the proj id
     * @return the project list
     * @throws RequestException
     *             the request exception
     */
    private List<String> getProjectList(String projId) throws RequestException {
        if (projId == null) {
            throw new RequestException(new ErrorResponse("Missing PROJID in listDefects", "0"));
        }

        List<String> projectIds = new ArrayList<String>();
        // Check to see if it is *All* projects
        if (projId.equalsIgnoreCase(Constants.DTG_PROJECT_ALL)) {
            if (projectList != null && !projectList.equalsIgnoreCase(Constants.DTG_PROJECT_ALL)) {
                String[] projects = projectList.split(Constants.DTG_PROJECT_SEPARATOR);
                if (projects != null) {
                    for (String project : projects) {
                        if (project != null) {
                            projectIds.add(project);
                        }
                    }
                }
            } else { // Default to all projects
                try {
                    Iterable<BasicProject> projects = restClientManager.getProjectClient().getAllProjects().claim();
                    if (projects != null) {
                        for (BasicProject project : projects) {
                            if (project != null) {
                                projectIds.add(project.getKey());
                            }
                        }
                    }
                } catch (RestClientException e) {
                	logger.log(Level.SEVERE, e.toString(), e);
                    throw new RequestException(
                    		new ErrorResponse("Error occurred while retrieving all projects: " + e.toString(), "0"));
                }
            }
        } else {
            projectIds.add(projId);
        }

        return projectIds;
    }

    /**
     * Query defects.
     *
     * @param projId
     *            the proj id
     * @param date
     *            the date
     * @param max
     *            the max
     * @param modBy
     *            the mod by
     * @param modDate
     *            the mod date
     * @param user
     *            the user
     * @param segmentFilter
     *            the segment filter
     * @return the map
     * @throws RequestException
     *             the request exception
     */
    private Map<String, String> queryDefects(String projId, String date, String max,
    		String modBy, String modDate, String user, String segmentFilter) throws RequestException {
        if (projId == null) {
            throw new RequestException(new ErrorResponse("Missing PROJID in listDefects", "0"));
        }

        Project project = null;
        try {
            project = restClientManager.getProjectClient().getProject(projId).claim();
        } catch (RestClientException e) {
        	logger.log(Level.SEVERE, e.toString(), e);
            throw new RequestException(new ErrorResponse(
                    "Error occurred while retrieving project: "
                    		+ projId + ": " + e.toString(), "0"));
        }
        if (project == null) {
            throw new RequestException(new ErrorResponse("Unknown project: "
                    + projId, "0"));
        }
        // Make sure the user exists before appending it in the JQL
        boolean userExists = false;
        try {
            userExists = (restClientManager.getUserClient().getUser(user).claim() != null);
        } catch (RestClientException e) {
        	logger.log(Level.SEVERE, e.toString(), e);
        }
        int limit = 0;
        if (max != null) {
            try {
                limit = Integer.parseInt(max);
            } catch (NumberFormatException e) {
                logger.log(Level.SEVERE, "Exception parsing max issues limit.", e);
            }
        }
        if (limit <= 0) {
            limit = Integer.MAX_VALUE;
        }
 
        Map<String, String> issueKeys = new HashMap<String, String>();
        int maxBatchResults = (queryBatchSize > limit ? limit : queryBatchSize);
        String query = null;
        JqlSearchBuilder jqlBuilder = new JqlSearchBuilder();
        try {
        	jqlBuilder.setProjId(projId);
        	jqlBuilder.setDate(date);
        	jqlBuilder.setModBy(modBy);
        	jqlBuilder.setModDate(modDate);
        	jqlBuilder.setUserName(userExists ? user : null);
        	jqlBuilder.setSegmentFilter(segmentFilter);
        	jqlBuilder.setOrderBy("ORDER BY key ASC");
        	query = jqlBuilder.build();
            if (DUMP_DEBUG) {
                logger.log(Level.INFO, "Jira query with batch size (" + queryBatchSize + "): " + query);
            }
            // Minus potential memory consuming fields.
	    	Set<String> fields = new HashSet<String>(Arrays.asList(new String[] {"-description", "-comment"}));
	    	for (int startAt=0 ; ; startAt+=maxBatchResults) {
		    	Iterable<Issue> issues = searchService.searchIssues(query.toString(), maxBatchResults, startAt, fields);
		    	// Very important to break out the infinite loop when there are no more issues.
				if (issues == null || Iterables.size(issues) == 0) {
					break;
				}
	            for (Issue issue : issues) {
	                issueKeys.put(issue.getKey(), issue.getKey());
	            }
	    	}
        } catch (RestClientException e) {
        	logger.log(Level.SEVERE, e.toString(), e);
            throw new RequestException(new ErrorResponse(
                    "Error occurred while retrieving defects from project: "
                            + projId + ": " + e.toString(), "0"));
        }

        return issueKeys;
    }

    /**
     * List fields.
     *
     * @param request
     *            the request
     * @return the description response[]
     * @throws RequestException
     *             the request exception
     * @see com.perforce.p4dtg.plugin.jira.tcp.IRequestHandler#listFields(org.w3c.dom.Element)
     */
    public DescriptionResponse[] listFields(Element request) throws RequestException {
        String projId = request.getAttribute(PROJID);
        if (projId == null) {
            throw new RequestException(new ErrorResponse("Missing PROJID in listFields", "0"));
        }

        Map<String, String> issueTypesMap = issueFieldsMapper.getIssueTypesMap(projId);
        Map<String, String> prioritiesMap = issueFieldsMapper.getPrioritiesMap();
        Map<String, String> resolutionsMap = issueFieldsMapper.getResolutionsMap();
        Map<String, String> statusesMap = issueFieldsMapper.getStatusesMap();
        Map<String, String> customFieldsMap = issueFieldsMapper.getCustomFieldsMap();

        List<DescriptionResponse> descs = new LinkedList<DescriptionResponse>();
        descs.add(new DescriptionResponse(Constants.ISSUE_FIELD_KEY,
                IResponse.TYPE_WORD, IResponse.ACCESS_DEFECT_ID, null));
        descs.add(new DescriptionResponse(Constants.ISSUE_FIELD_REPORTER,
                IResponse.TYPE_WORD, IResponse.ACCESS_RO, null));
        descs.add(new DescriptionResponse(Constants.ISSUE_FIELD_ASSIGNEE,
                IResponse.TYPE_WORD, IResponse.ACCESS_RO, null));
        descs.add(new DescriptionResponse(Constants.ISSUE_FIELD_SUMMARY,
                IResponse.TYPE_LINE, IResponse.ACCESS_RW, null));
        descs.add(new DescriptionResponse(Constants.ISSUE_FIELD_DESCRIPTION,
                IResponse.TYPE_TEXT, IResponse.ACCESS_RW, null));
        descs.add(new DescriptionResponse(Constants.ISSUE_FIELD_ENVIRONMENT,
                IResponse.TYPE_TEXT, IResponse.ACCESS_RW, null));
        descs.add(new DescriptionResponse(Constants.ISSUE_FIELD_COMMENTS,
                IResponse.TYPE_TEXT, IResponse.ACCESS_RO, null));
        descs.add(new DescriptionResponse(Constants.ISSUE_FIELD_DUEDATE,
                IResponse.TYPE_DATE, IResponse.ACCESS_RO, null));
        descs.add(new DescriptionResponse(Constants.ISSUE_FIELD_UPDATED,
                IResponse.TYPE_DATE, IResponse.ACCESS_MOD_DATE, null));
        descs.add(new DescriptionResponse(Constants.ISSUE_FIELD_ISSUETYPE,
                IResponse.TYPE_SELECT, IResponse.ACCESS_RW, issueTypesMap
                        .keySet().toArray(new String[issueTypesMap.keySet().size()])));
        descs.add(new DescriptionResponse(Constants.ISSUE_FIELD_PRIORITY,
                IResponse.TYPE_SELECT, IResponse.ACCESS_RW, prioritiesMap
                        .keySet().toArray(new String[prioritiesMap.keySet().size()])));
        descs.add(new DescriptionResponse(Constants.ISSUE_FIELD_RESOLUTION,
                IResponse.TYPE_SELECT, IResponse.ACCESS_RO, resolutionsMap
                        .keySet().toArray(new String[resolutionsMap.keySet().size()])));
        descs.add(new DescriptionResponse(Constants.ISSUE_FIELD_STATUS,
                IResponse.TYPE_SELECT, IResponse.ACCESS_RO, statusesMap
                        .keySet().toArray(new String[statusesMap.keySet().size()])));
        descs.add(new DescriptionResponse(Constants.ISSUE_FIELD_AFFECTSVERSIONS,
        		IResponse.TYPE_LINE, IResponse.ACCESS_RO, null));
        descs.add(new DescriptionResponse(Constants.ISSUE_FIELD_FIXVERSIONS,
                IResponse.TYPE_LINE, IResponse.ACCESS_RO, null));
        descs.add(new DescriptionResponse(Constants.ISSUE_FIELD_COMPONENTS,
                IResponse.TYPE_LINE, IResponse.ACCESS_RO, null));
        descs.add(new DescriptionResponse(Constants.DTG_FIELD_FIX,
                IResponse.TYPE_FIX, IResponse.ACCESS_RW, null));
        // Build Status/Resolution fields response
        StatusResolutionFieldsResponseBuilder srfBuilder = new StatusResolutionFieldsResponseBuilder(this.configuration);
        srfBuilder.setStatusesMap(statusesMap);
        srfBuilder.setResolutionsMap(resolutionsMap);
        DescriptionResponse srf = srfBuilder.build();
        if (srf != null) {
            descs.add(srf);
        }
        // Build custom fields
        CustomFieldsResponseBuilder cfBuilder = new CustomFieldsResponseBuilder(this.configuration);
        cfBuilder.setCustomFieldsMap(customFieldsMap);
        List<DescriptionResponse> cfs = cfBuilder.build();
        if (cfs != null) {
            descs.addAll(cfs);
        }
        return descs.toArray(new DescriptionResponse[descs.size()]);
    }

    /**
     * List projects.
     *
     * @param request
     *            the request
     * @return the string response
     * @throws RequestException
     *             the request exception
     * @see com.perforce.p4dtg.plugin.jira.tcp.IRequestHandler#listProjects(org.w3c.dom.Element)
     */
    public StringResponse listProjects(Element request) throws RequestException {
        List<String> projectKeys = new ArrayList<String>();
        try {
            Iterable<BasicProject> projects = restClientManager.getProjectClient().getAllProjects().claim();
            if (projects != null) {
                for (BasicProject project : projects) {
                    projectKeys.add(project.getKey());
                }
            }
        } catch (RestClientException e) {
        	logger.log(Level.SEVERE, e.toString(), e);
            throw new RequestException(new ErrorResponse(
                    "Error occurred while getting project list: " + e.toString(), "0"));
        }
        return new StringResponse(projectKeys.toArray(new String[projectKeys.size()]));
    }

    /**
     * Gets the segment filters.
     *
     * @param request
     *            the request
     * @return the segment filters
     * @throws RequestException
     *             the request exception
     * @see com.perforce.p4dtg.plugin.jira.tcp.IRequestHandler#getSegmentFilters(org.w3c.dom.Element)
     */
    public StringResponse getSegmentFilters(Element request)
            throws RequestException {
        String projId = request.getAttribute(PROJID);
        projectList = request.getAttribute(PROJECT_LIST);
        segmentFilter = request.getAttribute(SEGMENT_FILTER);
        
        SegmentFilterTranslator translator = new SegmentFilterTranslator();
        translator.setCustomFieldsMap(issueFieldsMapper.getCustomFieldsMap());
        translator.setIssueTypesMap(issueFieldsMapper.getIssueTypesMap(projId));
        translator.setPrioritiesMap(issueFieldsMapper.getPrioritiesMap());
        translator.setResolutionsMap(issueFieldsMapper.getResolutionsMap());
        translator.setStatusesMap(issueFieldsMapper.getStatusesMap());
        translator.setSegmentFilter(segmentFilter);
        // This will be used in the listDefects() method
        segmentFilter = translator.translate();
        if (DUMP_DEBUG) {
            logger.log(Level.INFO, SEGMENT_FILTER + ": " + segmentFilter);
            logger.log(Level.INFO, PROJECT_LIST + ": " + projectList);
        }
        return new StringResponse("OK");
    }

    /**
     * Login.
     *
     * @param request
     *            the request
     * @return the string response
     * @throws RequestException
     *             the request exception
     * @see com.perforce.p4dtg.plugin.jira.tcp.IRequestHandler#login(org.w3c.dom.Element)
     */
    public StringResponse login(Element request) throws RequestException {
        this.jiraServerUrl = request.getAttribute(JIRA_URL);
        if (this.jiraServerUrl == null) {
            throw new RequestException(new ErrorResponse(
                    "Missing JIRA_URL in login", "0"));
        }
        this.jiraUsername = request.getAttribute(JIRA_USER);
        if (this.jiraUsername == null) {
            throw new RequestException(new ErrorResponse(
                    "Missing JIRA_USER in login", "0"));
        }
        this.jiraPassword = request.getAttribute(JIRA_PASSWORD);
        if (this.jiraPassword == null) {
            throw new RequestException(new ErrorResponse(
                    "Missing JIRA_PASSWORD in login", "0"));
        }
        try {
            initialize();
        } catch (Exception e) {
        	logger.log(Level.SEVERE, "Error occurred while logging into the JIRA server.", e);
            throw new RequestException(new ErrorResponse(
                    "Error occurred while logging into the JIRA server. "
                            + "Please make sure the JIRA server URL, "
                            + "username and password are correct. "
                            + e.getMessage(), "0"));
        }
        return new StringResponse(getId());
    }

    /**
     * Connect.
     *
     * @param request
     *            the request
     * @return the string response
     * @throws RequestException
     *             the request exception
     * @see com.perforce.p4dtg.plugin.jira.tcp.BaseRequestHandler#connect(org.w3c.dom.Element)
     */
    public StringResponse connect(Element request) throws RequestException {
        return new StringResponse("connected");
    }

    /**
     * Ping.
     *
     * @param request
     *            the request
     * @return the string response
     * @see com.perforce.p4dtg.plugin.jira.tcp.IRequestHandler#ping(org.w3c.dom.Element)
     */
    public StringResponse ping(Element request) {
        return new StringResponse("PONG");
    }

    /**
     * Gets the server date.
     *
     * @param request
     *            the request
     * @return the server date
     * @throws RequestException
     *             the request exception
     * @see com.perforce.p4dtg.plugin.jira.tcp.IRequestHandler#getServerDate(org.w3c.dom.Element)
     */
    public StringResponse getServerDate(Element request) throws RequestException {
        DateFormat format = new SimpleDateFormat(DATE_PATTERN);
        Date serverDate = null;
        try {
            ServerInfo serverInfo = restClientManager.getExtendedMetadataClient().getServerInfo().claim();
            if (serverInfo != null) {
            	serverDate = serverInfo.getServerTime().toDate();
            }
        } catch (RestClientException e) {
        	logger.log(Level.SEVERE, e.toString(), e);
            throw new RequestException(new ErrorResponse(
                    "Error occurred while getting the JIRA server date time: " + e.toString(), "0"));
        }
        return new StringResponse(format.format(serverDate));
    }

    /**
     * New defect.
     *
     * @param request
     *            the request
     * @return the field response[]
     * @throws RequestException
     *             the request exception
     * @see com.perforce.p4dtg.plugin.jira.tcp.IRequestHandler#newDefect(org.w3c.dom.Element)
     */
    public FieldResponse[] newDefect(Element request) throws RequestException {
        String projId = request.getAttribute(PROJID);
        if (projId == null) {
            throw new RequestException(new ErrorResponse("Missing PROJID in newDefect", "0"));
        }
        if (projId.equalsIgnoreCase(Constants.DTG_PROJECT_ALL)) {
            throw new RequestException(new ErrorResponse("Invalid PROJID in newDefect", "0"));
        }
        Project project = null;
        try {
            project = restClientManager.getProjectClient().getProject(projId).claim();
        } catch (RestClientException e) {
        	logger.log(Level.SEVERE, e.toString(), e);
            throw new RequestException(new ErrorResponse(
                    "Error occurred while retrieving project: "
                    		+ projId + " :" + e.toString(), "0"));
        }
        if (project == null) {
            throw new RequestException(new ErrorResponse("Unknown project: " + projId, "0"));
        }

        Map<String, String[]> defectFields = getDefectFields(request);
        // Remove *Project* field from map
        if (defectFields.containsKey(Constants.DTG_PROJECT)) {
            defectFields.remove(Constants.DTG_PROJECT);
        }

        DefaultDefectFieldsMapBuilder ddfmBuilder = new DefaultDefectFieldsMapBuilder(this.restClientManager);
        defectFields = ddfmBuilder.build();

        DefectFieldsResponseBuilder dfrBuilder = new DefectFieldsResponseBuilder();
        dfrBuilder.setFieldValueMap(defectFields);
        
        FieldResponse[] fieldResponses = dfrBuilder.build();

        List<FieldResponse> fields = new ArrayList<FieldResponse>();
        fields.addAll(Arrays.asList(fieldResponses));

        // Add a special *Project* field with value projectId
        fields.add(new FieldResponse(Constants.DTG_PROJECT, projId));

        return fields.toArray(new FieldResponse[fields.size()]);
    }

    /**
     * Save defect.
     *
     * @param request
     *            the request
     * @return the string response
     * @throws RequestException
     *             the request exception
     * @see com.perforce.p4dtg.plugin.jira.tcp.IRequestHandler#saveDefect(org.w3c.dom.Element)
     */
    public StringResponse saveDefect(Element request) throws RequestException {
        String projId = getFieldValue(request, PROJID);
        if (projId == null) {
            throw new RequestException(new ErrorResponse("Missing PROJID in saveDefect", "0"));
        }
        String defectName = getFieldValue(request, DEFECTID);
        if (defectName == null) {
            throw new RequestException(new ErrorResponse("Missing DEFECT in saveDefect", "0"));
        }

        Issue issue = null;
        try {
            issue = restClientManager.getExtendedIssueClient().getIssue(defectName).claim();
        } catch (RestClientException e) {
        	logger.log(Level.SEVERE, e.toString(), e);
            throw new RequestException(new ErrorResponse(
            		"Error occurred while retrieving defect: "
            				+ defectName + " :" + e.toString(), "0"));
        }
        if (issue == null) {
            throw new RequestException(new ErrorResponse(
            		"Defect: " + defectName + " not found", "0"));
        }

        try {
            Map<String, String[]> defectFields = getDefectFields(request);
            if (defectFields != null) {
	            // Remove *Project* field from map
                defectFields.remove(Constants.DTG_PROJECT);
                // Update issue
                issue = updateIssue(issue, defectFields);
            }
        } catch (RestClientException e) {
        	logger.log(Level.SEVERE, e.toString(), e);
            throw new RequestException(new ErrorResponse(
            		"Error occurred while saving defect: "
            				+ defectName + " :" + e.toString(), "0"));
        }

        return new StringResponse(issue.getKey());
    }

    /**
     * Updates the issue with the specified fields and transitions the issue
     * with the target status and resolution.
     */
    private Issue updateIssue(Issue issue, Map<String, String[]> defectFields) throws RequestException {
    	if (defectFields != null) {
    		Transition transition = null;
    		FieldInput resolutionFieldInput = null;
    		Comment comment = null;
            List<FieldInput> fieldInputs = new ArrayList<FieldInput>();

            // Get the status and resolution
            String[] status = defectFields.remove(Constants.ISSUE_FIELD_STATUS);
            if (!Utils.isEmpty(status)) {
            	transition = issueFieldsMapper.getTransitionForTargetStatus(issue, status[0]);
            	if (transition != null) {
            		String[] resolution = defectFields.remove(Constants.ISSUE_FIELD_RESOLUTION);
            		if (!Utils.isEmpty(resolution)) {
            			resolutionFieldInput = new FieldInput(
            					Constants.ISSUE_FIELDS.get(Constants.ISSUE_FIELD_RESOLUTION),
            					ComplexIssueInputFieldValue.with("name", resolution[0]));
            		}
            	}
            }
            // Get the fix as a comment
            String[] fix = defectFields.remove(Constants.DTG_FIELD_FIX);
    		if (!Utils.isEmpty(fix)) {
    			comment = Comment.valueOf(fix[0]);
    		}
    		// Translate defect fields to JIRA issue fields
            DefectFieldsTranslator dfTranslator = new DefectFieldsTranslator(defectFields,
            		this.issueFieldsMapper, this.restClientManager);
    		Map<String, String[]> issueFields = dfTranslator.translate();
            
            for (Entry<String, String[]> entry : issueFields.entrySet()) {
                if (!Utils.isEmpty(entry.getKey()) && !Utils.isEmpty(entry.getValue())) {
                	//
                	// TODO: if transition, check to make sure only allowable fields in this transition are included
                	//
                	//
                	// TODO: if normal update, check editable fields
                	//
                	if (isSelectInputField(entry.getKey())) {
                		// If custom field, use 'name' instead of 'id'
                		if (entry.getKey().startsWith(Constants.CUSTOM_FIELD_ID_PREFIX)) {
                			fieldInputs.add(new FieldInput(entry.getKey(),
                					ComplexIssueInputFieldValue.with("value", entry.getValue()[0])));
                		} else {
                			fieldInputs.add(new FieldInput(entry.getKey(),
                					ComplexIssueInputFieldValue.with("id", entry.getValue()[0])));
                		}
                	} else {
    					fieldInputs.add(new FieldInput(entry.getKey(), entry.getValue()[0]));
                	}
                }
            }
            // Create issue input with specified fields
            IssueInput issueInput = IssueInput.createWithFields(fieldInputs.toArray(
            		new FieldInput[fieldInputs.size ()]));
            try {
	        	// Perform transition on the issue
	            if (transition != null) {
	            	TransitionInput transitionInput = (resolutionFieldInput != null ?
	            			new TransitionInput(transition.getId(), Arrays.asList(resolutionFieldInput), comment) :
	            				new TransitionInput(transition.getId(), Collections.<FieldInput>emptyList(), comment));
	                restClientManager.getExtendedIssueClient().transition(issue, transitionInput).claim();
	            } else if (comment != null) {
	            	restClientManager.getExtendedIssueClient().addComment(issue.getCommentsUri(), comment).claim();
	            }
	            // Update the other fields on the issue
				restClientManager.getExtendedIssueClient().update(issue, issueInput).claim();
				// Get the updated issue
				issue = restClientManager.getExtendedIssueClient().getIssue(issue.getKey()).claim();
            } catch (RestClientException e) {
            	logger.log(Level.SEVERE, e.toString(), e);
                throw new RequestException(new ErrorResponse(
                		"Error occurred while updating defect: " + e.toString(), "0"));
            }
    	}
    	return issue;
    }

    /**
     * Transitions the issue with the target status and resolution.
     */
    private Issue updateIssueStatus(Issue issue, Map<String, String[]> defectFields) throws RequestException {
    	if (defectFields != null) {
    		Transition transition = null;
    		FieldInput resolutionFieldInput = null;
    		Comment comment = null;

    		// Get the status and resolution
            String[] status = defectFields.remove(Constants.ISSUE_FIELD_STATUS);
            if (!Utils.isEmpty(status)) {
            	transition = issueFieldsMapper.getTransitionForTargetStatus(issue, status[0]);
            	if (transition != null) {
            		String[] resolution = defectFields.remove(Constants.ISSUE_FIELD_RESOLUTION);
            		if (!Utils.isEmpty(resolution)) {
            			resolutionFieldInput = new FieldInput(Constants.ISSUE_FIELDS.get(
            					Constants.ISSUE_FIELD_RESOLUTION),
            					ComplexIssueInputFieldValue.with("name", resolution[0]));
            		}
            	}
            }
            // Get the fix field as a comment
            String[] fix = defectFields.remove(Constants.DTG_FIELD_FIX);
    		if (!Utils.isEmpty(fix)) {
    			comment = Comment.valueOf(fix[0]);
    		}
            try {
	        	// Perform transition on the issue
	            if (transition != null) {
	            	TransitionInput transitionInput = (resolutionFieldInput != null ?
	            			new TransitionInput(transition.getId(), Arrays.asList(resolutionFieldInput), comment) :
	            				new TransitionInput(transition.getId(), Collections.<FieldInput>emptyList(), comment));
	                restClientManager.getExtendedIssueClient().transition(issue, transitionInput).claim();
	            }
				// Get the updated issue
				issue = restClientManager.getExtendedIssueClient().getIssue(issue.getKey()).claim();
            } catch (RestClientException e) {
            	logger.log(Level.SEVERE, e.toString(), e);
                throw new RequestException(new ErrorResponse(
                		"Error occurred while updating defect status: " + e.toString(), "0"));
            }
    	}
    	return issue;
    }
    
    /**
     * Check if the field is a select field.
     */
    private boolean isSelectInputField(String fieldId) {
    	if (fieldId != null) {
	    	// JIRA system select fields
	    	if (fieldId == Constants.ISSUE_FIELDS.get(Constants.ISSUE_FIELD_AFFECTSVERSIONS) ||
	   			fieldId == Constants.ISSUE_FIELDS.get(Constants.ISSUE_FIELD_COMPONENTS) ||
	  			fieldId == Constants.ISSUE_FIELDS.get(Constants.ISSUE_FIELD_FIXVERSIONS) ||
	  			fieldId == Constants.ISSUE_FIELDS.get(Constants.ISSUE_FIELD_ISSUETYPE) ||
	  			fieldId == Constants.ISSUE_FIELDS.get(Constants.ISSUE_FIELD_PRIORITY) ||
	  			fieldId == Constants.ISSUE_FIELDS.get(Constants.ISSUE_FIELD_RESOLUTION) ||
	    		fieldId == Constants.ISSUE_FIELDS.get(Constants.ISSUE_FIELD_STATUS)) {
	    		
	    		return true;
	    	}
	    	// Handle custom select type fields
	    	String type = this.issueFieldsMapper.getCustomFieldTypeById(fieldId);
	    	if (type != null) {
                if (type.equalsIgnoreCase(IResponse.TYPE_SELECT)) {
                	return true;
                }
	    	}
    	}
    	return false;
    }
}
