package net.smart.common.support.security;

import net.smart.common.exception.IntegrationException;
/**
 * 
 * net.smart.common.support.security.Base64.java
 * <pre>
 *  데이터 암호화 시 byte code를 base64 code로 변환처리 하기 위한 클래스
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
public class Base64 {
	private static final char BASE64_PADDING = '=';
	private static final String BASE64_CHARS= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

	/**
	 * Converts a binary data into a Base64 encoded string.
	 * If the binary data is null or a zero-length array, an empty string is returned. 
	 * 
	 * @param value A byte array to encode. 
	 *              If it is null or a zero-length array, an empty string is returned. 
	 * @return A converted Base64 string.
	 */
	public static String encode(Object value) {
		String result = null;
		byte[] values = (byte[]) value;
		if (values == null || values.length == 0) {
			result = "";
		} else {

			// Get a required number of characters.
			int requiredSize = (values.length / 3) * 4;
			if (values.length % 3 > 0)
				requiredSize += 4;
	
			// Allocate memory
			char[] output = new char[requiredSize];
	
			// Converts the byte array into a Base64 string. (3 bytes to 4 characters)
			int outputIndex = 0;
			int bufferIndex = 0;
			int[] buffer = new int[3];
			int base64CharIndex;
	
			for (int i = 0; i < values.length; i++) {
				// Accumulate bytes in buffer.
				buffer[bufferIndex++] = 0xFF & values[i];
	
				// If 3 bytes are collected or the last byte is collected
				if (bufferIndex == 3 || i == (values.length - 1)) {
					// Make a first character
					base64CharIndex = buffer[0] >>> 2;
					output[outputIndex++] = BASE64_CHARS.charAt(base64CharIndex);
	
					// Make a second character
					base64CharIndex = ((buffer[0] & 0x03) << 4) | (buffer[1] >>> 4);
					output[outputIndex++] = BASE64_CHARS.charAt(base64CharIndex);
	
					// Make a third character
					base64CharIndex = ((buffer[1] & 0x0F) << 2) | (buffer[2] >>> 6);
					output[outputIndex++] = bufferIndex > 1 ? BASE64_CHARS
							.charAt(base64CharIndex) : BASE64_PADDING;
	
					// Make a fourth character
					base64CharIndex = buffer[2] & 0x3F;
					output[outputIndex++] = bufferIndex > 2 ? BASE64_CHARS
							.charAt(base64CharIndex) : BASE64_PADDING;
	
					// Reset variables related to the buffer
					bufferIndex = 0;
					for (int j = 0; j < buffer.length; j++)
						buffer[j] = 0;
				}
			}
	
			// Return as a string
			result = new String(output);
		}
		return result;
	}

	/**
	 * Converts a Base64 encoded string into a binary data.
	 * If the string is null or an empty string, a zero-length array is returned.
	 * 
	 * @param value A Base64 encoded string to decode.
	 *              The length of the string must be a multiple of 4.
	 *              If it is null or an empty string, a zero-length array is returned.
	 * @return A converted byte array.
	 * @throws Exception
	 */
	public static byte[] decode(String value) throws Exception {
		byte[] result = null;
		if (value == null || value.length() == 0) {
			result = new byte[0];
		} else {

			// The length of the string must be a multiple of 4.
			if ((value.length() % 4) != 0)
				throw new IntegrationException("The length of a Base64 string must be a multiple of 4.");
	
			// Check the Base64 string
			int valueSize = value.length();
			for (int i = 0; i < valueSize; i++) {
				char chr = value.charAt(i);
	
				// If the last character is a padding
				if ((i == value.length() - 1) && (chr == BASE64_PADDING))
					break;
	
				// If the last two characters are padding
				if ((i == value.length() - 2) && (chr == BASE64_PADDING))
					if (value.charAt(i + 1) == BASE64_PADDING)
						break;
	
				// If it is a Base64 character
				if (BASE64_CHARS.indexOf(chr) != -1)
					continue;
	
				throw new IntegrationException("An invalid character is found in the Base64 string.");
			}
	
			// Get a required number of bytes.
			int requiredSize = (value.length() / 4) * 3;
			if (value.charAt(value.length() - 1) == BASE64_PADDING)
				requiredSize--;
	
			if (value.charAt(value.length() - 2) == BASE64_PADDING)
				requiredSize--;
	
			// Allocate memory
			byte[] output = new byte[requiredSize];
	
			// Converts the Base64 encoded string into a binary data. (4 characters to 3 bytes)
			int outputIndex = 0;
			int bufferIndex = 0;
			char[] buffer = new char[4];
			int base64CharIndex;
			
			int afterValueSize = value.length();
			for (int i = 0; i < afterValueSize; i++) {
				// Accumulate characters in buffer.
				buffer[bufferIndex++] = value.charAt(i);
	
				// If 4 characters are collected
				if (bufferIndex == 4) {
					// Make a first byte
					base64CharIndex = BASE64_CHARS.indexOf(buffer[0]);
					output[outputIndex] = (byte) (base64CharIndex << 2);
	
					base64CharIndex = BASE64_CHARS.indexOf(buffer[1]);
					output[outputIndex++] |= base64CharIndex >>> 4;
	
					// Make a second byte
					if (buffer[2] == BASE64_PADDING)
						break;
	
					output[outputIndex] = (byte) ((base64CharIndex & 0x0F) << 4);
	
					base64CharIndex = BASE64_CHARS.indexOf(buffer[2]);
					output[outputIndex++] |= base64CharIndex >>> 2;
	
					// Make a third byte
					if (buffer[3] == BASE64_PADDING)
						break;
	
					output[outputIndex] = (byte) ((base64CharIndex & 0x03) << 6);
	
					base64CharIndex = BASE64_CHARS.indexOf(buffer[3]);
					output[outputIndex++] |= base64CharIndex;
	
					// Reset variables related to the buffer
					bufferIndex = 0;
				}
			}
	
			// Return the converted byte array
			result = output;
		}
		return result;
	}
}
