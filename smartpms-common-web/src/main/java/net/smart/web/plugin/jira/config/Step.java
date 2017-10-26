/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.config;

import java.util.List;

/**
 * Represents a step in a user defined workflow.
 */
public class Step extends Base {

    private String linkedStatus;
    private List<Transition> transitions;

    /**
     * Instantiates a new step.
     *
     * @param name
     *            the name
     * @param access
     *            the access
     * @param type
     *            the type
     * @param transitions
     *            the transitions
     * @throws Exception
     */
    public Step(String name, String linkedStatus, List<Transition> transitions)
            throws Exception {
        super(name);
        this.linkedStatus = linkedStatus;
        this.transitions = transitions;
    }

    /**
     * Gets the linked status.
     *
     * @return the linked status
     */
    public String getLinkedStatus() {
        return linkedStatus;
    }

    /**
     * Sets the linked status.
     *
     * @param linked
     *            status the new linked status
     */
    public void setLinkedStatus(String linkedStatus) {
        this.linkedStatus = linkedStatus;
    }

    /**
     * Gets the transitions.
     *
     * @return the transitions
     */
    public List<Transition> getTransitions() {
        return transitions;
    }

    /**
     * Sets the transitions.
     *
     * @param transitions
     *            the new transitions
     */
    public void setTransitions(List<Transition> transitions) {
        this.transitions = transitions;
    }

    /**
     * @see java.lang.Object#toString()
     */
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("linkedStatus: ").append(linkedStatus == null ? "" : linkedStatus).append(LINE_SEPARATOR);
        if (transitions != null) {
            for (Transition transition : transitions) {
                if (transition != null) {
                    sb.append("--- transition: ---").append(LINE_SEPARATOR);
                    sb.append(transition.toString());
                    sb.append("-------------------").append(LINE_SEPARATOR);
                }
            }
        }
        return sb.toString();
    }
}
