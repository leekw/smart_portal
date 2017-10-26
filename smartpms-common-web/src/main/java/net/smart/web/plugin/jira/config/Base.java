/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.config;

/**
 * Base class for the configuration information.
 */
public abstract class Base {

    protected static final String LINE_SEPARATOR = System.getProperty("line.separator", "\n");

    protected String name;

    /**
     * Instantiates a new base.
     */
    protected Base() {
    }

    /**
     * Instantiates a new base.
     *
     * @param name
     *            the name
     * @throws Exception
     *             the exception
     */
    protected Base(String name) throws Exception {
        this.name = name;
    }

    /**
     * Gets the name.
     *
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name.
     *
     * @param name
     *            the new name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @see java.lang.Object#toString()
     */
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("name: ").append(name == null ? "" : name).append(LINE_SEPARATOR);
        return sb.toString();
    }

    /**
     * Checks if the string is empty.
     *
     * @param value
     *            the value
     * @return true, if is empty
     */
    protected static boolean isEmpty(String value) {
        if (value == null || value.trim().length() == 0) {
            return true;
        }
        return false;
    }
}
