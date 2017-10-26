package net.smart.common.support.security;

import java.security.MessageDigest;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import net.smart.common.exception.IntegrationException;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
/**
 * 
 * net.smart.common.support.security.StringEncrypter.java
 * <pre>
 *  String 데이터를 암호화 및 복호화 하는 클래스
 * </pre>
 * @Company : smart
 * @author  : ags0688
 * @Date    : 2014. 6. 9.
 * @Version : 1.0
 *
 */
@Component("stringEncrypter")
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public class StringEncrypter {
	
    private Cipher rijndael;
	private SecretKeySpec key;
	private IvParameterSpec initalVector;
	private final static boolean IS_COMPRESSION = true;
	
	private enum Format {
		yyyyMMdd("yyyyMMdd"),
		SECURITY_KEY("integration_common_key"),
		SECURITY_IV("integration_common_iv"),
		UTF8("UTF8"),
		MD5("MD5"),
		SHA256("SHA-256"),
		AES("AES");
		private String value;
		private Format(String value) {
			this.value = value;
		}
		public String getValue() {
			return value;
		}

	}

	private boolean isChangeKey = false;
	private String securityDay = null;
	
	public StringEncrypter() {
		this.init(Format.SECURITY_KEY.getValue(), Format.SECURITY_IV.getValue(), true);
	}
	public static boolean isCompression() {
		return IS_COMPRESSION;
	}
	
	public static String getSecurityIv() {
		return Format.SECURITY_IV.getValue();
	}

	/**
	 * Creates a StringEncrypter instance.
	 * 
	 * @param key A key string which is converted into UTF-8 and hashed by MD5.
	 *            Null or an empty string is not allowed.
	 * @param initialVector An initial vector string which is converted into UTF-8
	 *                      and hashed by MD5. Null or an empty string is not allowed.
	 * @throws Exception
	 */
	public StringEncrypter(String key, String iv, boolean isChangeKey) {
		this.init(key, iv, isChangeKey);
	}
	
	public StringEncrypter(boolean isChangeKey) {
		this.init(Format.SECURITY_KEY.getValue(), Format.SECURITY_IV.getValue(), isChangeKey);
	}
	
	private String getNow() {
	    return new SimpleDateFormat(Format.yyyyMMdd.getValue()).format(new Date());
	}
	
	private void init(String paramKey, String iv, boolean isChangeKey) {
		String key = paramKey;
		this.isChangeKey = isChangeKey;
		try {
			if (isChangeKey) {
				this.securityDay = getNow();
				key = key + "_" + getNow();
			}
			// Create a AES algorithm.
			this.rijndael = Cipher.getInstance("AES/CBC/PKCS5Padding");
	
			// Initialize an encryption key and an initial vector.
			MessageDigest md5 = MessageDigest.getInstance(Format.MD5.getValue());
			MessageDigest sha256 = MessageDigest.getInstance(Format.SHA256.getValue());
			this.key = new SecretKeySpec(sha256.digest(key.getBytes(Format.UTF8.getValue())), Format.AES.getValue());
			this.initalVector = new IvParameterSpec(md5.digest(iv.getBytes(Format.UTF8.getValue())));
		} catch (Exception ex) {
			throw new IntegrationException(ex);
		}
	}
	
	public String encrypt(String value) throws Exception {
		if (this.isChangeKey && !this.securityDay.equals(getNow())) {
			this.init(Format.SECURITY_KEY.getValue(), Format.SECURITY_IV.getValue(), true);
		}
		return encrypt(value, true);
	}
	
	/**
	 * Encrypts a string.
	 * 
	 * @param value A string to encrypt. It is converted into UTF-8 before being encrypted.
	 *              Null is regarded as an empty string.
	 * @return An encrypted string.
	 * @throws Exception
	 */
	public String encrypt(String paramValue, boolean isSecurity) throws Exception {
		String value = paramValue;
		if (isSecurity) {
			if (value == null) {
				value = "";
			}
			
			if (this.isChangeKey && !this.securityDay.equals(getNow())) {
				this.init(Format.SECURITY_KEY.getValue(), Format.SECURITY_IV.getValue(), true);
			}
			
			if (IS_COMPRESSION) {
				value = Base64.encode(Compression.zipStringToBytes(value));
			}		
	
			// Initialize the cryptography algorithm.
			this.rijndael.init(Cipher.ENCRYPT_MODE, this.key, this.initalVector);
	
			// Get a UTF-8 byte array from a unicode string.
			byte[] utf8Value = value.getBytes(Format.UTF8.getValue());
	
			// Encrypt the UTF-8 byte array.
			byte[] encryptedValue = this.rijndael.doFinal(utf8Value);
	
			// Return a base64 encoded string of the encrypted byte array.
			value = Base64.encode(encryptedValue); 
		}
		return value;
	}
	
	public String decrypt(String value) throws Exception {
		if (this.isChangeKey && !this.securityDay.equals(getNow())) {
			this.init(Format.SECURITY_KEY.getValue(), Format.SECURITY_IV.getValue(), true);
		}
		return decrypt(value, true);
	}

	/**
	 * Decrypts a string which is encrypted with the same key and initial vector. 
	 * 
	 * @param value A string to decrypt. It must be a string encrypted with the same key and initial vector.
	 *              Null or an empty string is not allowed.
	 * @return A decrypted string
	 * @throws Exception
	 */
	public String decrypt(String value, boolean isSecurity) throws Exception {
		String result = value;
		if (isSecurity) {
			if (value == null || value.equals("")) {
				throw new Exception("The cipher string can not be null or an empty string.");
			}
			
			if (this.isChangeKey && !this.securityDay.equals(getNow())) {
				this.init(Format.SECURITY_KEY.getValue(), Format.SECURITY_IV.getValue(), true);
			}
	
			// Initialize the cryptography algorithm.
			this.rijndael.init(Cipher.DECRYPT_MODE, this.key, this.initalVector);
	
			// Get an encrypted byte array from a base64 encoded string.
			byte[] encryptedValue = Base64.decode(value);
	
			// Decrypt the byte array.
			byte[] decryptedValue = this.rijndael.doFinal(encryptedValue);
	
			// Return a string converted from the UTF-8 byte array.
			if (!IS_COMPRESSION) {
				result = new String(decryptedValue, Format.UTF8.getValue()); 
			} else {
				result = Compression.unzipStringFromBytes(Base64.decode(new String(decryptedValue, Format.UTF8.getValue())));
			}
		}
		return result;
	}
}
