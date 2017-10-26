package net.smart.common.domain;

public class Tree extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1325207786724098176L;
	private String id;
	private String text;
	private boolean leaf;
	private String parentId;
	
	
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
}
