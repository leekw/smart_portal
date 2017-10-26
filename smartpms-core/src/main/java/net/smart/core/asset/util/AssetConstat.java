package net.smart.core.asset.util;

public class AssetConstat {
	
	public enum ConstructorType {
		JAVA("JAVA");
		private String value;
		private ConstructorType(String value) {
			this.value = value;
		}
		public String getValue() {
			return value;
		}
		public boolean isMatch(String compare) {
			return value.equals(compare);
		}
	}
	
	public enum ParserType {
		JAVA("JAVA");
		private String value;
		private ParserType(String value) {
			this.value = value;
		}
		public String getValue() {
			return value;
		}
		public boolean isMatch(String compare) {
			return value.equals(compare);
		}
	}

}
