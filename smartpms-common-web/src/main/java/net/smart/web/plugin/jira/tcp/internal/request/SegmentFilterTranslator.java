/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.tcp.internal.request;

import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

import net.smart.web.plugin.jira.common.Constants;

/**
 * Translator for translating the project segment filter to valid JQL syntax.
 */
public class SegmentFilterTranslator {

    static Logger logger = Logger.getLogger(SegmentFilterTranslator.class.getPackage().getName());
	
    private String segmentFilter = null;
    private Map<String, String> customFieldsMap = null;
    private Map<String, String> issueTypesMap = null;
    private Map<String, String> statusesMap = null;
    private Map<String, String> resolutionsMap = null;
    private Map<String, String> prioritiesMap = null;
    
    /**
     * Translates the segment filter to valid JQL syntax.
     * 
     * @return the translated segment filter string
     */
    public String translate() {
    	if (this.segmentFilter != null) {
	        String target = "";
	        String replace = "";
	        try {
	            // Replace the JIRA field names with ids
	            for (Map.Entry<String, String> entry : Constants.ISSUE_FIELDS.entrySet()) {
	                String name = entry.getKey();
	                String id = entry.getValue();
	                target = name + Constants.EQUAL;
	                replace = id + Constants.EQUAL;
	                this.segmentFilter = this.segmentFilter.replaceAll(Pattern.quote(target), Matcher.quoteReplacement(replace));
	            }
	            // Put quotes around custom field names
	            if (this.customFieldsMap != null) {
		            for (Map.Entry<String, String> entry : this.customFieldsMap.entrySet()) {
		                //String id = entry.getKey();
		                String name = entry.getValue();
		                target = name + Constants.EQUAL;
		                replace = Constants.DOUBLE_QUOTE
		                		+ escapeFieldName(name)
		                		+ Constants.LEFT_DOUBLE_QUOTE_EQUAL;
		                this.segmentFilter = this.segmentFilter.replaceAll(Pattern.quote(target), Matcher.quoteReplacement(replace));
		
		            }
	            }
	            // Replace JIRA issue type names with ids
	            if (this.issueTypesMap != null) {
		            for (Map.Entry<String, String> entry : this.issueTypesMap.entrySet()) {
		                String name = entry.getKey();
		                String id = entry.getValue();
		                target = Constants.ISSUE_FIELDS.get(Constants.ISSUE_FIELD_ISSUETYPE)
		                        + Constants.RIGHT_EQUAL_SINGLE_QUOTE
		                        + name
		                        + Constants.SINGLE_QUOTE;
		                replace = Constants.ISSUE_FIELDS.get(Constants.ISSUE_FIELD_ISSUETYPE)
		                        + Constants.RIGHT_EQUAL_DOUBLE_QUOTE
		                        + id
		                        + Constants.DOUBLE_QUOTE;
		                this.segmentFilter = this.segmentFilter.replaceAll(Pattern.quote(target), Matcher.quoteReplacement(replace));
		            }
	            }
	            // Replace JIRA status names with ids
	            if (this.statusesMap != null) {
		            for (Map.Entry<String, String> entry : this.statusesMap.entrySet()) {
		                String name = entry.getKey();
		                String id = entry.getValue();
		                target = Constants.ISSUE_FIELDS.get(Constants.ISSUE_FIELD_STATUS)
		                        + Constants.RIGHT_EQUAL_SINGLE_QUOTE
		                        + name
		                        + Constants.SINGLE_QUOTE;
		                replace = Constants.ISSUE_FIELDS.get(Constants.ISSUE_FIELD_STATUS)
		                        + Constants.RIGHT_EQUAL_DOUBLE_QUOTE
		                        + id
		                        + Constants.DOUBLE_QUOTE;
		                this.segmentFilter = this.segmentFilter.replaceAll(Pattern.quote(target), Matcher.quoteReplacement(replace));
		            }
	            }
	            // Replace JIRA resolution names with ids
	            if (this.resolutionsMap != null) {
		            for (Map.Entry<String, String> entry : this.resolutionsMap.entrySet()) {
		                String name = entry.getKey();
		                String id = entry.getValue();
		                target = Constants.ISSUE_FIELDS.get(Constants.ISSUE_FIELD_RESOLUTION)
		                        + Constants.RIGHT_EQUAL_SINGLE_QUOTE
		                        + name
		                        + Constants.SINGLE_QUOTE;
		                replace = Constants.ISSUE_FIELDS.get(Constants.ISSUE_FIELD_RESOLUTION)
		                        + Constants.RIGHT_EQUAL_DOUBLE_QUOTE
		                        + id
		                        + Constants.DOUBLE_QUOTE;
		                this.segmentFilter = this.segmentFilter.replaceAll(Pattern.quote(target), Matcher.quoteReplacement(replace));
		            }
	            }
	            // Replace JIRA priority names with ids
	            if (this.prioritiesMap != null) {
		            for (Map.Entry<String, String> entry : this.prioritiesMap.entrySet()) {
		                String name = entry.getKey();
		                String id = entry.getValue();
		                target = Constants.ISSUE_FIELDS.get(Constants.ISSUE_FIELD_PRIORITY)
		                        + Constants.RIGHT_EQUAL_SINGLE_QUOTE
		                        + name
		                        + Constants.SINGLE_QUOTE;
		                replace = Constants.ISSUE_FIELDS.get(Constants.ISSUE_FIELD_PRIORITY)
		                        + Constants.RIGHT_EQUAL_DOUBLE_QUOTE
		                        + id
		                        + Constants.DOUBLE_QUOTE;
		                this.segmentFilter = this.segmentFilter.replaceAll(Pattern.quote(target), Matcher.quoteReplacement(replace));
		            }
	            }
	            // Replace "='<Empty>'" with proper JQL "is EMPTY"
	            target = "='<Empty>'";
	            replace = " is EMPTY";
	            this.segmentFilter = this.segmentFilter.replaceAll(Pattern.quote(target), Matcher.quoteReplacement(replace));
	        } catch (PatternSyntaxException e) {
	            logger.log(Level.SEVERE, e.getMessage(), e);
	        }
    	}
    	return (this.segmentFilter == null ? null : this.segmentFilter.trim());
    }
	
	/**
     * Escape jira query field name.
     */
    private String escapeFieldName(String fieldName) {
        if (fieldName != null) {
	        // Valid escape sequences are \', \", \t, \n, \r, \\, '\ ' and unicode.
	        // replace backslash with \\
	        // replace an single quote with \'
	        // replace a double quote with \"
	        // replace a space with '\ '"
	        // replace TAB with \t
	        // replace CR with \r
	        // replace LF with \n
	        return fieldName.replaceAll(Pattern.quote("\\"), Matcher.quoteReplacement("\\\\"))
	        		.replaceAll(Pattern.quote("\""), Matcher.quoteReplacement("\\\""));
        }
        return fieldName;
    }

	public void setSegmentFilter(String segmentFilter) {
		this.segmentFilter = segmentFilter;
	}

	public void setCustomFieldsMap(Map<String, String> customFieldsMap) {
		this.customFieldsMap = customFieldsMap;
	}

	public void setIssueTypesMap(Map<String, String> issueTypesMap) {
		this.issueTypesMap = issueTypesMap;
	}

	public void setStatusesMap(Map<String, String> statusesMap) {
		this.statusesMap = statusesMap;
	}

	public void setResolutionsMap(Map<String, String> resolutionsMap) {
		this.resolutionsMap = resolutionsMap;
	}

	public void setPrioritiesMap(Map<String, String> prioritiesMap) {
		this.prioritiesMap = prioritiesMap;
	}
}
