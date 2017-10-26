/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.tcp.internal.response;

import java.util.LinkedHashMap;
import java.util.Map;

import net.smart.web.plugin.jira.common.Constants;
import net.smart.web.plugin.jira.config.Configuration;
import net.smart.web.plugin.jira.tcp.response.IResponse;

/**
 * Builder for building the status resolution fields response.
 */
public class StatusResolutionFieldsResponseBuilder {

    private Configuration configuration;
    private Map<String, String> statusesMap;
    private Map<String, String> resolutionsMap;
    
    public StatusResolutionFieldsResponseBuilder(Configuration configuration) {
    	this.configuration = configuration;
    }
    
    /**
     * Builds the status resolution fields response.
     *
     * @return the status resolution fields response
     */
    public DescriptionResponse build() {
        if (this.statusesMap != null) {
	        DescriptionResponse desc = null;
	        Map<String, String> statusResolutionMap = new LinkedHashMap<String, String>();
            for (Map.Entry<String, String> stutusEntry : this.statusesMap.entrySet()) {
                String statusName = stutusEntry.getKey();
                if (statusName != null) {
                    statusResolutionMap.put(statusName, statusName);
                }
            }
            if (this.resolutionsMap != null) {
	            for (Map.Entry<String, String> statusEntry : this.statusesMap.entrySet()) {
	                String statusName = statusEntry.getKey();
	                if (statusName != null) {
	                    if (exists(statusName)) {
                            for (Map.Entry<String, String> resolutionEntry : this.resolutionsMap.entrySet()) {
                                if (resolutionEntry != null && resolutionEntry.getKey() != null) {
                                    String statusResolution = statusName + "/" + resolutionEntry.getKey();
                                    if (statusResolutionMap.containsKey(statusName)) {
                                        statusResolutionMap.remove(statusName);
                                    }
                                    statusResolutionMap.put(statusResolution, statusResolution);
                                }
                            }
                        }
                    }
                }
            }
	        if (statusResolutionMap != null && !statusResolutionMap.isEmpty()) {
	            desc = new DescriptionResponse(Constants.DTG_FIELD_STATUS_RESOLUTION,
	                    IResponse.TYPE_SELECT, IResponse.ACCESS_RW,
	                    statusResolutionMap.keySet().toArray(
	                            new String[statusResolutionMap.keySet().size()]));
	        }
	        return desc;
        }
        return null;
    }

    /**
     * Checks if the status exists in the resolution status map.
     *
     * @param status
     *            the status
     * @return true, if it exists in the resolution status map
     */
    private boolean exists(String status) {
        if (status != null && configuration != null) {
            Map<String, Map<String, String>> workflowMap = configuration.getWorkflowMap();
            if (workflowMap != null) {
                Map<String, String> resolutionStatusMap = workflowMap.get("resolutionStatus");
                if (resolutionStatusMap != null) {
                    if (resolutionStatusMap.containsValue(status)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

	public void setStatusesMap(Map<String, String> statusesMap) {
		this.statusesMap = statusesMap;
	}

	public void setResolutionsMap(Map<String, String> resolutionsMap) {
		this.resolutionsMap = resolutionsMap;
	}
}
