package net.smart.web.resource.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import javax.annotation.PostConstruct;

import net.smart.web.domain.Org;
import net.smart.web.resource.dao.OrgDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("orgService")
public class OrgServiceImpl implements OrgService {
	
	private Map<String, Org> orgs;
	
	private AtomicInteger sync = new AtomicInteger(0);
	
	@Autowired
	private OrgDao orgDao;
	
//	@PostConstruct
	public void init() {
		orgs = new HashMap<String, Org>();
		this.setAllOrg();
	}
	
	public void setAllOrg() {
		List<Org> result = orgDao.getOrgList(new Org());
		for (Org org : result) {
			orgs.put(org.getOrgId(), org);
		}
	}

	@Override
	public List<Org> getOrgList(Org param) {
		return orgDao.getOrgList(param);
	}

	@Override
	public String getOrgName(String orgId) {
		String result = null;
		if (orgs != null && orgs.containsKey(orgId)) {
			result = orgs.get(orgId).getOriginalOrgName();
		} else {
			Org param = new Org();
			param.setOrgId(orgId);
			List<Org> temps = this.getOrgList(param);
			if (temps != null && !temps.isEmpty())
				result = temps.get(0).getOriginalOrgName();
		}
		return result;
	}
	
	
//	@Scheduled(cron="0 0/30 * * * ? ")
	public void addCodeByJiraOption() {
		synchronized(sync) {
			orgs.clear();
			this.setAllOrg();
		}
	}

}
