/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.tcp.internal.response;

import java.text.CharacterIterator;
import java.text.StringCharacterIterator;

/**
 * Helper class providing methods for handling the XML response.
 */
public class ResponseHelper {

    /**
     * Escape special characters for XML data.
     * <p>
     * 
     * <table border='1' cellpadding='0' cellspacing='0'>
     * <tr>
     * <th>Character</th>
     * <th>Encoding</th>
     * </tr>
     * <tr>
     * <td><</td>
     * <td>&lt;</td>
     * </tr>
     * <tr>
     * <td>></td>
     * <td>&gt;</td>
     * </tr>
     * <tr>
     * <td>&</td>
     * <td>&amp;</td>
     * </tr>
     * <tr>
     * <td>"</td>
     * <td>&quot;</td>
     * </tr>
     * <tr>
     * <td>'</td>
     * <td>&#039;</td>
     * </tr>
     * </table>
     */
    public static String escapeXML(String text) {
        if (text == null) {
            return null;
        }
        StringBuilder result = new StringBuilder();
        StringCharacterIterator iterator = new StringCharacterIterator(text);
        char character = iterator.current();
        while (character != CharacterIterator.DONE) {
            if (character == '<') {
                result.append("&lt;");
            } else if (character == '>') {
                result.append("&gt;");
            } else if (character == '\"') {
                result.append("&quot;");
            } else if (character == '\'') {
                result.append("&#039;");
            } else if (character == '&') {
                result.append("&amp;");
            } else {
                // Add it as is
                result.append(character);
            }
            character = iterator.next();
        }
        return result.toString();
    }
}
