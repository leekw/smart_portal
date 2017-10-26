/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.tcp.response;

/**
 * The interface for implementing a response.
 */
public interface IResponse {

    String STRINGS = "STRINGS";
    String STRING = "STRING";

    String NAME = "NAME";
    String VALUE = "VALUE";

    String FIELD = "FIELD";
    String FIELDS = "FIELDS";

    String ERROR = "ERROR";
    String MESSAGE = "MESSAGE";
    String CONTINUE = "CONTINUE";

    String DESC = "DESC";
    String DESCS = "DESCS";

    String ACCESS = "ACCESS";
    int ACCESS_RW = 0;
    int ACCESS_RO = 1;
    int ACCESS_MOD_DATE = 2;
    int ACCESS_MOD_USER = 3;
    int ACCESS_DEFECT_ID = 4;

    String TYPE = "TYPE";
    String TYPE_WORD = "WORD";
    String TYPE_TEXT = "TEXT";
    String TYPE_DATE = "DATE";
    String TYPE_LINE = "LINE";
    String TYPE_FIX = "FIX";
    String TYPE_SELECT = "SELECT";

    /**
     * Returns the string representation of the response in XML form.
     *
     * @return the XML string
     * @see java.lang.Object#toString()
     */
    String toString();
}
