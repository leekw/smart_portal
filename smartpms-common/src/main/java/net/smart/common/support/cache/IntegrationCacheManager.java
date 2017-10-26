package net.smart.common.support.cache;

import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.search.Results;
import net.sf.ehcache.search.expression.Criteria;




public interface IntegrationCacheManager<T> {
	
	/**
	 * key 로 캐싱된 내용을 가져온다.
	 * @param key
	 * @return
	 */
    public T getEntity(Object key);

    /**
     * key 로 캐싱된 값을 가져온다.
     * @param key
     * @return
     */
    public Object getValue(Object key);

    /**
     * key 로 캐싱된 내용을 삭제한다.
     * @param key
     * @return
     */
    public boolean remove(Object key);

    /**
     * key 로 주어진 value 를 저장한다.
     * @param key
     * @param value
     */
    public void putEntity(Object key, T value);

    /**
     * key 로 주어진 value 를 저장한다.
     * @param key
     * @param value
     */
    public void put(Object key, Object value);

    /**
     * key 의 값을 value 로 refresh 한다.
     * @param key
     * @param value
     */
    public void refreshEntity(Object key, T value);

    /**
     * key 의 값을 value 로 refresh 한다.
     * @param key
     * @param value
     */
    public void refresh(Object key, Object value);

    /**
     * chche name 을 설정한다.
     * @param cacheName
     */
    public void setCacheName(String cacheName);

    /**
     * CacheManager 를 되돌린다.
     * @return
     */
    public CacheManager getCacheManager();

    /**
     * EhCache 를 되돌린다.
     * @return
     */
    public Ehcache getEhCache();

    /**
     * key 가 캐싱되어 있는지 확인한다.
     * @param key
     * @return
     */
    public boolean isElementInMemory(Object key);

    /**
     * key 가 캐싱되어 있는지 확인한다.
     * @param key
     * @return
     */
    public boolean isElementOnDisk(Object key);

    /**
     * 주어진 expression 으로 캐쉬를 검색한다.
     * @param expression
     * @return
     */
    public Results selectQueryInCache(Criteria expression);

    /**
     * 주어진 expression 으로 캐싱된 내용의 attribute 를 검색한다.
     * @param expression
     * @param attributeName
     * @return
     */
    public Results selectQueryInCache(Criteria expression, String attributeName);

    /**
     * cachekey 를 설정한다.
     * @param cacheKey
     */
    void setCacheKey(String cacheKey);

    /**
     * cachekey 를 반환한다.
     * @return
     */
    String getCacheKey();
        
    /**
     * 캐시의 모든 내용을 삭제한다.
     */
    public void removeAll();

    /**
     * 캐식가 비워있는지 확인해서 true 또는 false 를 리턴한다.
     * @return
     */
    public boolean isEmptyCache();

}
