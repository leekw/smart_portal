/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.tcp.internal.response;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import net.smart.web.plugin.jira.common.Constants;
import net.smart.web.plugin.jira.config.Configuration;
import net.smart.web.plugin.jira.config.CustomField;
import net.smart.web.plugin.jira.config.Option;
import net.smart.web.plugin.jira.tcp.response.IResponse;

/**
 * Builder for building the custom fields response list.
 */
public class CustomFieldsResponseBuilder {

    private Configuration configuration;
    private Map<String, String> customFieldsMap;
    
    public CustomFieldsResponseBuilder(Configuration configuration) {
    	this.configuration = configuration;
    }
    
    /**
     * Builds the custom fields response list.
     *
     * @param customFieldsMap
     *            the custom fields map
     * @return the custom fields response list
     */
    public List<DescriptionResponse> build() {
        if (customFieldsMap != null && configuration != null && configuration.getCustomFields() != null) {
	        List<DescriptionResponse> descs = new LinkedList<DescriptionResponse>();
	        for (Map.Entry<String, String> entry : customFieldsMap.entrySet()) {
	            String name = entry.getValue();
	            String type = IResponse.TYPE_LINE;
	            int access = IResponse.ACCESS_RO;
	            String[] values = null;
                if (name != null) {
                    for (CustomField cf : configuration.getCustomFields()) {
                        if (cf != null && cf.getName() != null) {
                        	if (cf.getName().trim().equalsIgnoreCase(name)) {
	                            if (cf.getType() != null) {
	                                if (cf.getType().trim().equalsIgnoreCase("WORD")) {
	                                    type = IResponse.TYPE_WORD;
	                                } else if (cf.getType().trim().equalsIgnoreCase("LINE")) {
	                                    type = IResponse.TYPE_LINE;
	                                } else if (cf.getType().trim().equalsIgnoreCase("TEXT")) {
	                                    type = IResponse.TYPE_TEXT;
	                                } else if (cf.getType().trim().equalsIgnoreCase("DATE")) {
	                                    type = IResponse.TYPE_DATE;
	                                } else if (cf.getType().trim().equalsIgnoreCase("SELECT")) {
	                                    type = IResponse.TYPE_SELECT;
	                                    if (cf.getOptions() != null) {
	                                        Map<String, String> opts = new LinkedHashMap<String, String>();
	                                        // DTG "Empty" select option for JIRA default "None" select option
	                                        opts.put(Constants.EMPTY_SELECT_OPTION, Constants.EMPTY_SELECT_OPTION);
	                                        for (Option option : cf.getOptions()) {
	                                            opts.put(option.getValue(), option.getValue());
	                                        }
	                                        values = opts.keySet().toArray(new String[opts.keySet().size()]);
	                                    }
	                                }
	                            }
	                            if (cf.getAccess() != null) {
	                                if (cf.getAccess().trim().equalsIgnoreCase("RW")) {
	                                    access = IResponse.ACCESS_RW;
	                                } else if (cf.getAccess().trim().equalsIgnoreCase("RO")) {
	                                    access = IResponse.ACCESS_RO;
	                                }
	                            }
	                            // Only capturing the first element with matching field name
	                            // Please make sure the custom field name is unique!
	                            break;
	                        }
                        }
                    }
	            }
	            descs.add(new DescriptionResponse(name, type, access, values));
	        }
	        return descs;
        }
        return null;
    }

	public void setCustomFieldsMap(Map<String, String> customFieldsMap) {
		this.customFieldsMap = customFieldsMap;
	}
}
