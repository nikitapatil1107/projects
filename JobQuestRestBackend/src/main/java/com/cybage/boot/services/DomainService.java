package com.cybage.boot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.boot.models.DomainModel;
import com.cybage.boot.repository.DomainRepository;
import com.cybage.boot.repository.UserRepository;

@Service
public class DomainService {
	@Autowired
	private DomainRepository domainRepository;
	
	public boolean isDomainPresent(String domainName) {
        // Check if the domain exists in the database
        DomainModel domain = domainRepository.findByDomainName(domainName);
        return domain != null;
    }
	
	public DomainModel saveDomain(DomainModel domainData) {
		return domainRepository.save(domainData);
	}
}
