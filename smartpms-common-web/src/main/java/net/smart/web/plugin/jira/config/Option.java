/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.config;

/**
 * Representing an option in a select field.
 */
public class Option extends Base {

    private String value;

    /**
     * Instantiates a new option.
     *
     * @param name
     *            the name
     * @param value
     *            the value
     * @throws Exception
     *             the exception
     */
    public Option(String name, String value) throws Exception {
        super(name);
        this.value = value;
    }

    /**
     * Gets the value.
     *
     * @return the value
     */
    public String getValue() {
        return value;
    }

    /**
     * Sets the value.
     *
     * @param value
     *            the new value
     */
    public void setValue(String value) {
        this.value = value;
    }

    /**
     * @see java.lang.Object#toString()
     */
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("value: ").append(value == null ? "" : value).append(LINE_SEPARATOR);
        return sb.toString();
    }

}
