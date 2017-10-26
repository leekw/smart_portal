/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.tcp.request;

import net.smart.web.plugin.jira.tcp.internal.request.RequestException;
import net.smart.web.plugin.jira.tcp.internal.response.DescriptionResponse;
import net.smart.web.plugin.jira.tcp.internal.response.FieldResponse;
import net.smart.web.plugin.jira.tcp.internal.response.StringResponse;

import org.w3c.dom.Element;

/**
 * The interface for implementing a request handler.
 */
public interface IRequestHandler {

    String DATE_PATTERN = "yyyy/MM/dd HH:mm:ss";

    String JIRA_URL = "JIRA_URL";
    String JIRA_USER = "JIRA_USER";
    String JIRA_PASSWORD = "JIRA_PASSWORD";

    String PROJECT = "PROJECT";
    String PROJID = "PROJID";
    String PROJECT_LIST = "PROJECT_LIST";

    String SEGMENT_FILTER = "SEGMENT_FILTER";

    String DEFECT = "DEFECT";
    String DEFECTID = "DEFECTID";

    String FIELD = "Field";
    String FIELD_NAME = "NAME";
    String FIELD_VALUE = "VALUE";

    /**
     * Get the response to a shutdown request.
     *
     * @param request
     *            the request
     * @return - string response
     * @throws RequestException
     *             the request exception
     */
    StringResponse shutdown(Element request) throws RequestException;

    /**
     * Get the response to a connect request.
     *
     * @param request
     *            the request
     * @return - string response
     * @throws RequestException
     *             the request exception
     */
    StringResponse connect(Element request) throws RequestException;

    /**
     * Get the response to a ping request.
     *
     * @param request
     *            the request
     * @return - ping response
     * @throws RequestException
     *             the request exception
     */
    StringResponse ping(Element request) throws RequestException;

    /**
     * Get the response to a login request.
     *
     * @param request
     *            the request
     * @return - string response
     * @throws RequestException
     *             the request exception
     */
    StringResponse login(Element request) throws RequestException;

    /**
     * Get the response to a get server version request.
     *
     * @param request
     *            the request
     * @return - string response
     * @throws RequestException
     *             the request exception
     */
    StringResponse getServerVersion(Element request) throws RequestException;

    /**
     * Get the response to a get server date request.
     *
     * @param request
     *            the request
     * @return - string response
     * @throws RequestException
     *             the request exception
     */
    StringResponse getServerDate(Element request) throws RequestException;

    /**
     * Get the response to a get project request.
     *
     * @param request
     *            the request
     * @return - string response
     * @throws RequestException
     *             the request exception
     */
    StringResponse getProject(Element request) throws RequestException;

    /**
     * Get the response to a list projects request.
     *
     * @param request
     *            the request
     * @return - string response
     * @throws RequestException
     *             the request exception
     */
    StringResponse listProjects(Element request) throws RequestException;

    /**
     * Get the response to a list fields request.
     *
     * @param request
     *            the request
     * @return - array of description responses
     * @throws RequestException
     *             the request exception
     */
    DescriptionResponse[] listFields(Element request) throws RequestException;

    /**
     * Get the response to a segment filters request.
     *
     * @param request
     *            the request
     * @return - string response
     * @throws RequestException
     *             the request exception
     */
    StringResponse getSegmentFilters(Element request) throws RequestException;

    /**
     * Get the response to a reference fields request.
     *
     * @param request
     *            the request
     * @return - string response
     * @throws RequestException
     *             the request exception
     */
    StringResponse getReferencedFields(Element request) throws RequestException;

    /**
     * Get the response to a list defects request.
     *
     * @param request
     *            the request
     * @return - string response
     * @throws RequestException
     *             the request exception
     */
    StringResponse listDefects(Element request) throws RequestException;

    /**
     * Get the response to a new defect request.
     *
     * @param request
     *            the request
     * @return - array of field responses
     * @throws RequestException
     *             the request exception
     */
    FieldResponse[] newDefect(Element request) throws RequestException;

    /**
     * Get the response to a get defect request.
     *
     * @param request
     *            the request
     * @return - array of field responses
     * @throws RequestException
     *             the request exception
     */
    FieldResponse[] getDefect(Element request) throws RequestException;

    /**
     * Get the response to a create defect request.
     *
     * @param request
     *            the request
     * @return - string response
     * @throws RequestException
     *             the request exception
     */
    StringResponse createDefect(Element request) throws RequestException;

    /**
     * Get the response to a save defect request.
     *
     * @param request
     *            the request
     * @return - string response
     * @throws RequestException
     *             the request exception
     */
    StringResponse saveDefect(Element request) throws RequestException;

    /**
     * Get id of defect tracking system.
     *
     * @return - non-null defect tracking system id
     * @throws RequestException
     *             the request exception
     */
    String getId() throws RequestException;
}
