/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.tcp.internal.request;

import java.util.HashMap;
import java.util.Map;

import net.smart.web.plugin.jira.common.Constants;
import net.smart.web.plugin.jira.rest.client.RestClientManager;

import com.atlassian.jira.rest.client.api.domain.Field;

/**
 * Builder for building the default defect fields map.
 */
public class DefaultDefectFieldsMapBuilder {

    private RestClientManager restClientManager;

    /**
     * Constructor to create a new default fields map builder.
     *
     * @param restClientManger
     *            the rest client manager
     */
    protected DefaultDefectFieldsMapBuilder(RestClientManager restClientManger) {
        this.restClientManager = restClientManger;
    }
    
    /**
     * Builds the default defect fields map.
     *
     * @return the fields map
     */
    /**
     * Builds the default defect fields.
     *
     * @return the map
     */
    public Map<String, String[]> build() {
        Map<String, String[]> fieldValueMap = new HashMap<String, String[]>();
        if (this.restClientManager != null) {
	        Iterable<Field> fields = this.restClientManager.getExtendedMetadataClient().getFields().claim();
	        if (fields != null) {
	        	for (Field field : fields) {
	        		if (Constants.ISSUE_FIELDS.containsValue(field.getId())) {
	                    fieldValueMap.put(field.getName(), new String[] {});
	        		} else if (field.getId().startsWith(Constants.CUSTOM_FIELD_ID_PREFIX)) {
	        			fieldValueMap.put(field.getName(), new String[] {});
	        		}
	        	}
	        }
        }
        return fieldValueMap;
    }
}
