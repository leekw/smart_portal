/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.tcp.internal.request;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.smart.web.plugin.jira.common.Constants;
import net.smart.web.plugin.jira.common.Utils;

/**
 * Builder for composing the JQL for querying issues from the JIRA server.
 */
public class JqlSearchBuilder {

    static Logger logger = Logger.getLogger(JqlSearchBuilder.class.getPackage().getName());
    
	private String projId = null;
	private String issueIdLow = null;
	private String issueIdHigh = null;
	private String date = null;
	private String modBy = null;
	private String modDate = null;
	private String userName = null;
	private String segmentFilter = null;
	private String orderBy = null;
    
    /**
     * Builds the JQL.
     * 
     * @return the JQL string
     */
    public String build() {    	
    	DateFormat formatter = new SimpleDateFormat(Constants.JQL_DATE_PATTERN);
        StringBuilder sb = new StringBuilder();
        sb.append("project = \"" + projId + "\"");
        if (!Utils.isEmpty(issueIdLow)) {
            sb.append(" and id >= \"" + issueIdLow + "\"");
        }
        if (!Utils.isEmpty(issueIdHigh)) {
            sb.append(" and id <= \"" + issueIdHigh + "\"");
        }
        if (modDate != null && date != null) {
            try {
                Date d = formatter.parse(date);
                sb.append(" and " + modDate.toLowerCase() + " > \""
                        + formatter.format(d) + "\"");
            } catch (ParseException e) {
                logger.log(Level.SEVERE, "Exception parsing date.", e);
            }
        }
        if (modBy != null && userName != null) {
            // Filter out specified user from search
            if (modBy.equalsIgnoreCase(Constants.ISSUE_FIELD_ASSIGNEE)) {
                // Please make sure the user exists before appending the JQL clause.
            	// Otherwise, the query will cause an error.
                if (userName != null) {
                    sb.append(" and " + modBy.toLowerCase() + " != \""
                            + userName + "\"");
                }
            }
        }
        if (!Utils.isEmpty(segmentFilter)) {
            sb.append(" " + segmentFilter);
        }
        if (!Utils.isEmpty(orderBy)) {
            sb.append(" " + orderBy);
        }
        return sb.toString();
    }

	public void setProjId(String projId) {
		this.projId = projId;
	}

	public void setIssueIdLow(String issueIdLow) {
		this.issueIdLow = issueIdLow;
	}

	public void setIssueIdHigh(String issueIdHigh) {
		this.issueIdHigh = issueIdHigh;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public void setModBy(String modBy) {
		this.modBy = modBy;
	}

	public void setModDate(String modDate) {
		this.modDate = modDate;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public void setSegmentFilter(String segmentFilter) {
		this.segmentFilter = segmentFilter;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}
}
