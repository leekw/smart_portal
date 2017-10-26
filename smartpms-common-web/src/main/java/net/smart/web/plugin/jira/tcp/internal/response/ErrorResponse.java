/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.tcp.internal.response;

import net.smart.web.plugin.jira.tcp.response.IResponse;

/**
 * Default implementation of the error response.
 */
public class ErrorResponse implements IResponse {

    String shouldContinue;
    String message;

    /**
     * Instantiates a new error response.
     */
    public ErrorResponse() {
        this(null, null);
    }

    /**
     * Instantiates a new error response.
     *
     * @param message
     *            the message
     * @param shouldContinue
     *            the should continue
     */
    public ErrorResponse(String message, String shouldContinue) {
        this.message = message;
        this.shouldContinue = shouldContinue;
    }

    /**
     * Gets the should continue.
     *
     * @return the shouldContinue
     */
    public String getShouldContinue() {
        return this.shouldContinue;
    }

    /**
     * Sets the should continue.
     *
     * @param shouldContinue
     *            the shouldContinue to set
     */
    public void setShouldContinue(String shouldContinue) {
        this.shouldContinue = shouldContinue;
    }

    /**
     * Gets the message.
     *
     * @return the message
     */
    public String getMessage() {
        return this.message;
    }

    /**
     * Sets the message.
     *
     * @param message
     *            the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * Returns the string representation of the error response in XML form.
     *
     * @return the XML string
     * @see java.lang.Object#toString()
     */
    public String toString() {
        StringBuilder xml = new StringBuilder();
        xml.append('<');
        xml.append(ERROR);

        if (this.shouldContinue != null) {
            xml.append(' ');
            xml.append(CONTINUE);
            xml.append('=');
            xml.append('"');
            xml.append(this.shouldContinue);
            xml.append('"');
        }

        if (this.message != null) {
            xml.append(' ');
            xml.append(MESSAGE);
            xml.append('=');
            xml.append('"');
            xml.append(ResponseHelper.escapeXML(this.message));
            xml.append('"');
        }

        xml.append(" />");
        return xml.toString();
    }
}
