/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.tcp.internal.response;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.smart.web.plugin.jira.common.Constants;
import net.smart.web.plugin.jira.common.Utils;

/**
 * Builder for building the field response array.
 */
public class DefectFieldsResponseBuilder {

	private Map<String, String[]> fieldValueMap;
    
    /**
     * Builds the field response array.
     *
     * @return the field response array
     */
    public FieldResponse[] build() {
        List<FieldResponse> fields = new ArrayList<FieldResponse>(fieldValueMap.size());
        if (fieldValueMap != null) {
	        for (String key : fieldValueMap.keySet()) {
	            String[] values = fieldValueMap.get(key);
	            StringBuilder sb = new StringBuilder();
	            if (!Utils.isEmpty(values)) {
	                for (int i = 0; i < values.length; i++) {
	                    if (i > 0) {
	                        if (key.equalsIgnoreCase(Constants.ISSUE_FIELD_AFFECTSVERSIONS) ||
	                        		key.equalsIgnoreCase(Constants.ISSUE_FIELD_FIXVERSIONS) ||
	                        		key.equalsIgnoreCase(Constants.ISSUE_FIELD_COMPONENTS)) {
	                            sb.append(Constants.MULTI_SELECT_SEPARATOR);
	                        }
	                    }
	                    sb.append(values[i]);
	                }
	            }
	            fields.add(new FieldResponse(key, sb.toString()));
	        }
        }
        return fields.toArray(new FieldResponse[fields.size()]);
    }

    public void setFieldValueMap(Map<String, String[]> fieldValueMap) {
		this.fieldValueMap = fieldValueMap;
	}
}
