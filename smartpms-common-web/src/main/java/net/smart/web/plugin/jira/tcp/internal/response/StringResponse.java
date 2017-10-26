/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.tcp.internal.response;

import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.Set;

import net.smart.web.plugin.jira.tcp.response.IResponse;

/**
 * Default implementation of the string response.
 */
public class StringResponse implements IResponse {

    private Set<String> values;

    /**
     * Instantiates a new string response.
     */
    public StringResponse() {
        this.values = new LinkedHashSet<String>();
    }

    /**
     * Instantiates a new string response.
     *
     * @param value
     *            the value
     */
    public StringResponse(String value) {
        this();
        if (value != null) {
            this.values.add(value);
        }
    }

    /**
     * Create a string response with the specified values.
     *
     * @param values
     *            the values
     */
    public StringResponse(String[] values) {
        this();
        if (values != null) {
            for (String value : values) {
                add(value);
            }
        }
    }

    /**
     * Create a string response with the specified values.
     *
     * @param values
     *            the values
     */
    public StringResponse(Collection<String> values) {
        this();
        if (values != null) {
            for (String value : values) {
                add(value);
            }
        }
    }

    /**
     * Add a value to this string response. Will have no effect if this string
     * response already contains the specified value.
     *
     * @param value
     *            the value
     */
    public void add(String value) {
        if (value != null) {
            this.values.add(value);
        }
    }

    /**
     * Remove a value from this string response.
     *
     * @param value
     *            the value
     */
    public void remove(String value) {
        if (value != null) {
            this.values.remove(value);
        }
    }

    /**
     * Clear the values in this string response.
     */
    public void clear() {
        this.values.clear();
    }

    /**
     * Is this string response empty?.
     *
     * @return - true if empty, false otherwise
     */
    public boolean isEmpty() {
        return this.values.isEmpty();
    }

    /**
     * Returns the string representation of the string response in XML form.
     *
     * @return the XML string
     * @see java.lang.Object#toString()
     */
    public String toString() {
        StringBuilder xml = new StringBuilder();
        xml.append('<');
        xml.append(STRINGS);
        xml.append('>');
        for (String value : values) {
            xml.append('<');
            xml.append(STRING);
            xml.append(' ');
            xml.append(VALUE);
            xml.append('=');
            xml.append('"');
            xml.append(ResponseHelper.escapeXML(value));
            xml.append('"');
            xml.append(" />");
        }
        xml.append("</");
        xml.append(STRINGS);
        xml.append('>');
        return xml.toString();
    }
}
