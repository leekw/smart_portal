/**
 * Copyright (c) 2013 Perforce Software. All rights reserved.
 */
package net.smart.web.plugin.jira.config;

/**
 * Represents a transition in a workflow step.
 */
public class Transition extends Base {

    private String destinationStep;

    /**
     * Instantiates a new transition.
     *
     * @param name
     *            the name
     * @param destinationStep
     *            the destinationStep
     * @throws Exception
     */
    public Transition(String name, String destinationStep) throws Exception {
        super(name);
        this.destinationStep = destinationStep;
    }

    /**
     * Gets the destination step.
     *
     * @return the destination step
     */
    public String getDestinationStep() {
        return destinationStep;
    }

    /**
     * Sets the destination step.
     *
     * @param destinationStep
     *            the new destination step
     */
    public void setDestinationStep(String destinationStep) {
        this.destinationStep = destinationStep;
    }

    /**
     * @see java.lang.Object#toString()
     */
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("destinationStep: ").append(destinationStep == null ? "" : destinationStep).append(LINE_SEPARATOR);
        return sb.toString();
    }
}
