package net.smart.web.domain.changerequest;

import java.util.List;

import net.smart.common.domain.Common;

public class ChangeRequestVolume extends Common {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3930605565466804890L;
	private String type;
	private int count;
	private String developer;
	private String weekOfMonth;
	private List<String> jiraList;
	private int oldMonth3;
	private int oldMonth2;
	private int oldMonth1;
	private int curWeek1;
	private int curWeek2;
	private int curWeek3;
	private int curWeek4;
	private int curWeek5;
	private int curWeek6;
	private int curWeek7;
	private int curWeek8;
	private int curWeek9;
	private int curWeek10;
	private List<String> teamList;
	private List<String> moduleList;
	private String team;
	private String module;
		
	public String getTeam() {
		return team;
	}
	public void setTeam(String team) {
		this.team = team;
	}
	public String getModule() {
		return module;
	}
	public void setModule(String module) {
		this.module = module;
	}
	public List<String> getTeamList() {
		return teamList;
	}
	public void setTeamList(List<String> teamList) {
		this.teamList = teamList;
	}
	public List<String> getModuleList() {
		return moduleList;
	}
	public void setModuleList(List<String> moduleList) {
		this.moduleList = moduleList;
	}
	public int getCurWeek10() {
		return curWeek10;
	}
	public void setCurWeek10(int curWeek10) {
		this.curWeek10 = curWeek10;
	}
	public int getOldMonth3() {
		return oldMonth3;
	}
	public void setOldMonth3(int oldMonth3) {
		this.oldMonth3 = oldMonth3;
	}
	public int getOldMonth2() {
		return oldMonth2;
	}
	public void setOldMonth2(int oldMonth2) {
		this.oldMonth2 = oldMonth2;
	}
	public int getOldMonth1() {
		return oldMonth1;
	}
	public void setOldMonth1(int oldMonth1) {
		this.oldMonth1 = oldMonth1;
	}
	public int getCurWeek1() {
		return curWeek1;
	}
	public void setCurWeek1(int curWeek1) {
		this.curWeek1 = curWeek1;
	}
	public int getCurWeek2() {
		return curWeek2;
	}
	public void setCurWeek2(int curWeek2) {
		this.curWeek2 = curWeek2;
	}
	public int getCurWeek3() {
		return curWeek3;
	}
	public void setCurWeek3(int curWeek3) {
		this.curWeek3 = curWeek3;
	}
	public int getCurWeek4() {
		return curWeek4;
	}
	public void setCurWeek4(int curWeek4) {
		this.curWeek4 = curWeek4;
	}
	public int getCurWeek5() {
		return curWeek5;
	}
	public void setCurWeek5(int curWeek5) {
		this.curWeek5 = curWeek5;
	}
	public int getCurWeek6() {
		return curWeek6;
	}
	public void setCurWeek6(int curWeek6) {
		this.curWeek6 = curWeek6;
	}
	public int getCurWeek7() {
		return curWeek7;
	}
	public void setCurWeek7(int curWeek7) {
		this.curWeek7 = curWeek7;
	}
	public int getCurWeek8() {
		return curWeek8;
	}
	public void setCurWeek8(int curWeek8) {
		this.curWeek8 = curWeek8;
	}
	public int getCurWeek9() {
		return curWeek9;
	}
	public void setCurWeek9(int curWeek9) {
		this.curWeek9 = curWeek9;
	}
	public List<String> getJiraList() {
		return jiraList;
	}
	public void setJiraList(List<String> jiraList) {
		this.jiraList = jiraList;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public String getDeveloper() {
		return developer;
	}
	public void setDeveloper(String developer) {
		this.developer = developer;
	}
	public String getWeekOfMonth() {
		return weekOfMonth;
	}
	public void setWeekOfMonth(String weekOfMonth) {
		this.weekOfMonth = weekOfMonth;
	}
	
	
}
