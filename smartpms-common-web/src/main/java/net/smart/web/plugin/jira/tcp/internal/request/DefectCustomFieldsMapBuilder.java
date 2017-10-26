/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.tcp.internal.request;

import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.logging.Logger;

import net.smart.web.plugin.jira.common.Constants;
import net.smart.web.plugin.jira.common.Utils;
import net.smart.web.plugin.jira.config.Configuration;
import net.smart.web.plugin.jira.config.CustomField;
import net.smart.web.plugin.jira.tcp.response.IResponse;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import com.atlassian.jira.rest.client.api.domain.Issue;
import com.atlassian.jira.rest.client.api.domain.IssueField;

/**
 * Builder for building the defect custom fields map.
 */
public class DefectCustomFieldsMapBuilder {

    static Logger logger = Logger.getLogger(DefectCustomFieldsMapBuilder.class.getPackage().getName());

    private Configuration configuration;
    private Issue issue;
    private IssueFieldsMapper issueFieldsMapper;
    
    
    public DefectCustomFieldsMapBuilder(Issue issue, IssueFieldsMapper issueFieldsMapper, Configuration configuration) {
    	this.issue = issue;
    	this.issueFieldsMapper = issueFieldsMapper;
    	this.configuration = configuration;
    }

    /**
     * Builds the defect custom fields.
     *
     * @return the defect custom fields map
     */
    public Map<String, String[]> build() {
        Map<String, String[]> fieldValueMap = new HashMap<String, String[]>();
        if (this.issue != null &&  this.configuration != null && this.issueFieldsMapper != null) {
	        // Set the custom field empty select values
	        Map<String, String[]> customFieldSelectValues = buildEmptySelectOptions();
	        if (customFieldSelectValues != null) {
	            fieldValueMap.putAll(customFieldSelectValues);
	        }
	        Iterable<IssueField> fields = this.issue.getFields();
	        if (fields != null) {
	        	for (IssueField field : fields) {
	        		if (field != null && field.getId() != null && field.getName() != null && field.getValue() != null) {
	        			if (field.getId().startsWith(Constants.CUSTOM_FIELD_ID_PREFIX)) {
		                    String type = this.issueFieldsMapper.getCustomFieldTypeByName(field.getName());
	                        if (type != null) {
			                    String name = field.getName();
			                    String value = "";
			                    // Handle select type as JSONObject
			                    // Note: make sure the custom fields are properly defined in the config xml file.
			                    if (type.equalsIgnoreCase(IResponse.TYPE_SELECT)) {
			                    	if (field.getValue() instanceof JSONObject) {
				                    	try {
											value = ((JSONObject)field.getValue()).getString("value");
										} catch (JSONException e) {
		                                    logger.warning("Error getting the field value: " + e.getLocalizedMessage());
										}
			                    	}
			                    } else {
			                    	if (field.getValue() instanceof String) {
			                    		value = (String)field.getValue();
			                    	}
			                    }
	                            // Handle data type DATE
	                            if (type.equalsIgnoreCase(IResponse.TYPE_DATE)) {
	                                Date date = null;
	                                // Parse with date time pattern
	                                try {
	                                    date = Utils.parseDate(value,
	                                    		Constants.CUSTOM_FIELD_DATE_TIME_PATTERN);
	                                } catch (ParseException ignore) {
	                                	// ignore
	                                }
	                                if (date == null) {
	                                    // Parse with date pattern
	                                    try {
	                                        date = Utils.parseDate(value,
	                                        		Constants.CUSTOM_FIELD_DATE_PATTERN);
	                                    } catch (ParseException ignore) {
	                                    	// ignore
	                                    }
	                                }
	                                if (date != null) {
	                                    value = Utils.formatDate(date, Constants.DATE_PATTERN);
	                                } else {
	                                    logger.warning("Error parsing the date: " + value);
	                                }
	                            }
		                        fieldValueMap.put(name, new String[] {value});
	                        }
	                    }
	        		}
	        	}
	        }
        }
        return fieldValueMap;
    }

    /**
     * Builds the custom field empty select options map.
     *
     * @return the empty select options map
     */
    private Map<String, String[]> buildEmptySelectOptions() {
        Map<String, String[]> customFieldValues = new LinkedHashMap<String, String[]>();
        if (this.configuration != null) {
            if (this.configuration.getCustomFields() != null) {
                for (CustomField cf : this.configuration.getCustomFields()) {
                    if (cf != null) {
                        if (cf.getName() != null) {
                            if (cf.getType() != null) {
                                if (cf.getType().trim().equalsIgnoreCase("SELECT")) {
                                    customFieldValues.put(cf.getName(),
                                    		new String[] { Constants.EMPTY_SELECT_OPTION });
                                }
                            }
                        }
                    }
                }
            }
        }
        return customFieldValues;
    }
}
