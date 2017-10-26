/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.config;

import java.util.List;

/**
 * Representing a custom field in a user defined workflow.
 */
public class CustomField extends Base {

    private String type;
    private String access;
    private List<Option> options;

    /**
     * Instantiates a new custom field.
     *
     * @param name
     *            the name
     * @param access
     *            the access
     * @param type
     *            the type
     * @param options
     *            the options
     * @throws Exception
     */
    public CustomField(String name, String access, String type, List<Option> options) throws Exception {
        super(name);
        this.access = access;
        this.type = type;
        this.options = options;
    }

    /**
     * Gets the type.
     *
     * @return the type
     */
    public String getType() {
        return type;
    }

    /**
     * Sets the type.
     *
     * @param type
     *            the new type
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * Gets the access.
     *
     * @return the access
     */
    public String getAccess() {
        return access;
    }

    /**
     * Sets the access.
     *
     * @param access
     *            the new access
     */
    public void setAccess(String access) {
        this.access = access;
    }

    /**
     * Gets the options.
     *
     * @return the options
     */
    public List<Option> getOptions() {
        return options;
    }

    /**
     * Sets the options.
     *
     * @param options
     *            the new options
     */
    public void setOptions(List<Option> options) {
        this.options = options;
    }

    /**
     * @see java.lang.Object#toString()
     */
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("name: ").append(name == null ? "" : name).append(LINE_SEPARATOR);
        sb.append("type: ").append(type == null ? "" : type).append(LINE_SEPARATOR);
        sb.append("access: ").append(access == null ? "" : access).append(LINE_SEPARATOR);
        if (options != null) {
            for (Option option : options) {
                if (option != null) {
                    sb.append("--- option: ---").append(LINE_SEPARATOR);
                    sb.append(option.toString());
                    sb.append("---------------").append(LINE_SEPARATOR);
                }
            }
        }
        return sb.toString();
    }
}
