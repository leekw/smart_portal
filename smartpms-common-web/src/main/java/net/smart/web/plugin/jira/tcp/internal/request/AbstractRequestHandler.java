/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.tcp.internal.request;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import net.smart.web.plugin.jira.tcp.internal.response.StringResponse;
import net.smart.web.plugin.jira.tcp.request.IRequestHandler;

import org.w3c.dom.Element;

/**
 * Abstract class providing default implementations of the request handler
 * interface methods.<p>
 * 
 * Note that these methods should be overridden in the subclass.
 */
public abstract class AbstractRequestHandler implements IRequestHandler {

    /**
     * Close the connection to the defect server.
     *
     * @param request
     *            the request
     * @return the string response
     * @see net.smart.web.plugin.jira.tcp.request.IRequestHandler#ping(org.w3c.dom.Element)
     */
    public StringResponse shutdown(Element request) {
        return new StringResponse("CLOSING");
    }

    /**
     * Connect to the defect server.
     *
     * @param request
     *            the request
     * @return the string response
     * @throws RequestException
     *             the request exception
     * @see net.smart.web.plugin.jira.tcp.request.IRequestHandler#connect(org.w3c.dom.Element)
     */
    public StringResponse connect(Element request) throws RequestException {
        return new StringResponse("connected");
    }

    /**
     * Ping the defect server.
     *
     * @param request
     *            the request
     * @return the string response
     * @see net.smart.web.plugin.jira.tcp.request.IRequestHandler#ping(org.w3c.dom.Element)
     */
    public StringResponse ping(Element request) {
        return new StringResponse("PONG");
    }

    /**
     * Get the segment filters.
     *
     * @param request
     *            the request
     * @return the segment filters
     * @throws RequestException
     *             the request exception
     * @see net.smart.web.plugin.jira.tcp.request.IRequestHandler#getSegmentFilters(org.w3c.dom.Element)
     */
    public StringResponse getSegmentFilters(Element request)
            throws RequestException {
        return new StringResponse("OK");
    }

    /**
     * Get the referenced fields.
     *
     * @param request
     *            the request
     * @return the referenced fields
     * @throws RequestException
     *             the request exception
     * @see net.smart.web.plugin.jira.tcp.request.IRequestHandler#getReferencedFields(org.w3c.dom.Element)
     */
    public StringResponse getReferencedFields(Element request)
            throws RequestException {
        return new StringResponse("OK");
    }

    /**
     * Get the defect server date.
     *
     * @param request
     *            the request
     * @return the server date
     * @throws RequestException
     * @see net.smart.web.plugin.jira.tcp.request.IRequestHandler#getServerDate(org.w3c.dom.Element)
     */
    public StringResponse getServerDate(Element request)
            throws RequestException {
        DateFormat format = new SimpleDateFormat(DATE_PATTERN);
        return new StringResponse(format.format(new Date()));
    }

    /**
     * Gets the server version.
     *
     * @param request
     *            the request
     * @return the server version
     * @see net.smart.web.plugin.jira.tcp.request.IRequestHandler#getServerVersion(org.w3c.dom.Element)
     */
    public StringResponse getServerVersion(Element request) {
        return new StringResponse("1.0");
    }

    /**
     * Login to the defect server.
     *
     * @param request
     *            the request
     * @return the string response
     * @throws RequestException
     *             the request exception
     * @see net.smart.web.plugin.jira.tcp.request.IRequestHandler#login(org.w3c.dom.Element)
     */
    public StringResponse login(Element request) throws RequestException {
        return new StringResponse(getId());
    }
}
