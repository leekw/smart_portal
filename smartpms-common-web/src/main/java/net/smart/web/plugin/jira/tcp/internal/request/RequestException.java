/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.tcp.internal.request;

import net.smart.web.plugin.jira.tcp.internal.response.ErrorResponse;

/**
 * Request exception and its response error message.
 */
public class RequestException extends Exception {

    private static final long serialVersionUID = 5896177158909833058L;

    private ErrorResponse response;

    /**
     * Create a request exception with an error response.
     * 
     * @param response
     *            the response
     */
    public RequestException(ErrorResponse response) {
        this.response = response;
    }

    /**
     * Get error response to send for this request exception.
     * 
     * @return error response
     */
    public ErrorResponse getResponse() {
        return this.response;
    }
}
