package net.smart.common.support.cache;

import java.util.Properties;

import net.sf.ehcache.bootstrap.BootstrapCacheLoader;
import net.sf.ehcache.bootstrap.BootstrapCacheLoaderFactory;
import net.smart.common.support.cache.bootstrap.IntegrationBootstrapCacheLoader;

public class IntegrationBootstrapCacheLoaderFactory extends BootstrapCacheLoaderFactory {

	@Override
	public BootstrapCacheLoader createBootstrapCacheLoader(Properties properties) {
		IntegrationBootstrapCacheLoader loader = new IntegrationBootstrapCacheLoader(this.getAsyncFromProperty(properties));
		return loader;
	}
	
	public boolean getAsyncFromProperty(Properties properties) {
		String result = properties.getProperty("async");
		return result != null && result.equals("true") ? true : false;
	}

}
