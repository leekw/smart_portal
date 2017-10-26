package net.smart.common.support.cache;

import java.io.Serializable;
import java.util.concurrent.atomic.AtomicInteger;

import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import net.sf.ehcache.search.Results;
import net.sf.ehcache.search.expression.Criteria;



public class IntegrationCacheManagerImpl implements IntegrationCacheManager<Object>, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3556403678865508540L;
	
	private enum Code {
        LOCALCACHE("localCache");
        private String value;
        private Code(String value) { this.value = value;}
        private String getValue () { return this.value;}
    }

	private Ehcache ehcache;

    private String cacheKey;

    private String cacheName = Code.LOCALCACHE.getValue();
    
    private AtomicInteger sync = new AtomicInteger(0);

    @Override
    public Object getEntity(Object key) {
        return isElementInMemory(key) == true ? getValue(key) : null;
    }

    @Override
    public Object getValue(Object key) {
        Object value = null;
        Element element = ehcache.get(getCacheKey() + key);
        if (element != null) {
            value = element.getValue();
        }
        return value;
    }

    @Override
    public boolean remove(Object key) {
        boolean result = ehcache.remove(getCacheKey() + key);
        return result;
    }

    @Override
    public void putEntity(Object key, Object value) {
        put(key, value);
    }

    @Override
    public void put(Object key, Object value) {
    	try {
    		ehcache.putIfAbsent(new Element(getCacheKey() + key, value));
    	} catch (Exception ex) {
    		ehcache.put(new Element(getCacheKey() + key, value));
    	}
    }

    @Override
    public void refreshEntity(Object key, Object value) {
        refresh(key, value);
    }

    @Override
    public void refresh(Object key, Object value) {
    	synchronized(sync) {
			if (ehcache.isElementInMemory(getCacheKey() + key)) ehcache.remove(getCacheKey() + key);
	    	try {
	    		ehcache.putIfAbsent(new Element(getCacheKey() + key, value));
	    	} catch (Exception ex) {
	    		ehcache.put(new Element(getCacheKey() + key, value));
	    	}
    	}
    }

    @Override
    public void setCacheKey(String cacheKey) {
        this.cacheKey = cacheKey;
    }

    @Override
    public String getCacheKey() {
        return cacheKey == null ? "" : cacheKey;
    }

    @Override
    public void setCacheName(String cacheName) {
        this.cacheName = cacheName;
        ehcache = ehcache.getCacheManager().getEhcache(cacheName);
    }

    public void setEhCache(Ehcache ehCache) {
        this.ehcache = ehCache;
    }

    @Override
    public CacheManager getCacheManager() {
        return ehcache.getCacheManager();
    }

    @Override
    public Ehcache getEhCache() {
        return ehcache;
    }

    @Override
    public boolean isElementInMemory(Object key) {
        return ehcache.isElementInMemory(getCacheKey() + key);
    }

    @Override
    public boolean isElementOnDisk(Object key) {
        return ehcache.isElementOnDisk(getCacheKey() + key);
    }

    @Override
    public Results selectQueryInCache(Criteria expression) {
        return ehcache.createQuery().includeValues().includeKeys().addCriteria(expression).execute();
    }

    @Override
    public Results selectQueryInCache(Criteria expression, String attributeName) {
        return ehcache.createQuery().includeValues().includeKeys().includeAttribute(ehcache.getSearchAttribute(attributeName)).addCriteria(expression).execute();
    }

	@Override
	public void removeAll() {
		ehcache.removeAll();
		ehcache.clearStatistics();
	}

	@Override
	public boolean isEmptyCache() {
		return this.getEhCache() == null || this.getEhCache().getSize() == 0 ? true : false;
	}

}
