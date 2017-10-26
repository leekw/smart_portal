package net.smart.common.support.cache.bootstrap;

import java.util.List;

import net.sf.ehcache.CacheException;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import net.sf.ehcache.bootstrap.BootstrapCacheLoader;
import net.smart.common.support.cache.util.CacheFileUtil;
import net.smart.common.support.util.DateUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class IntegrationBootstrapCacheLoader implements BootstrapCacheLoader {
	
	private static Logger logger = LoggerFactory.getLogger(IntegrationBootstrapCacheLoader.class);

	protected boolean asynchronous;
	
	public IntegrationBootstrapCacheLoader(boolean asynchronous) {
		this.asynchronous = asynchronous;
	}

	@Override
	public boolean isAsynchronous() {
		return asynchronous;
	}

	@Override
	public void load(Ehcache cache) throws CacheException {
		if (asynchronous) {
            BootstrapThread bootstrapThread = new BootstrapThread(cache);
            bootstrapThread.start();
        } else {
            doLoad(cache);
        }
	}
	
	public Object clone() throws CloneNotSupportedException {
		return super.clone();
	}
	
	private final class BootstrapThread extends Thread {
        private Ehcache cache;

        public BootstrapThread(Ehcache cache) {
            super("Bootstrap Thread for cache " + cache.getName());
            this.cache = cache;
            setDaemon(true);
            setPriority(Thread.NORM_PRIORITY);
        }
        public final void run() {
            try {
                doLoad(cache);
            } catch (CacheException e) {
            	logger.warn("Error asynchronously performing bootstrap. The cause was: " + e.getMessage(), e);
            } finally {
                cache = null;
            }

        }

    }
	
	public void doLoad(Ehcache cache) throws CacheException {
		List<Element> elements = (List<Element>) CacheFileUtil.readObjectFromFile(DateUtil.getNowByFormat(DateUtil.Format.YYYYMM.getValue()), cache.getName());
		if (elements != null) {
			for (Element e : elements) {
				cache.put(e);
			}
		}
	}
}
