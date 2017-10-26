package net.smart.common.domain;

public class ExceptionAuthority extends Common {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3603998911949969787L;
	
	
	private String rowId;

    private String id;

    private String name;

    private String type;

    private String description;

	public String getRowId() {
		return rowId;
	}

	public void setRowId(String rowId) {
		this.rowId = rowId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
    
    

}
