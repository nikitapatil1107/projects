package com.cybage.boot.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.boot.dto.JobDTO;
import com.cybage.boot.models.JobDetailInfoModel;
import com.cybage.boot.repository.JobSearchRepository;

@Service
public class JobSearchService {
	@Autowired
	private JobSearchRepository jobSearchRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	public List<JobDTO> getAllByjobName(String searchText ) {
	    List<JobDetailInfoModel> jobInfos = jobSearchRepository.findByJobNameContaining(searchText );
	    return jobInfos.stream()
	                   .map(jobInfo -> modelMapper.map(jobInfo, JobDTO.class))
	                   .collect(Collectors.toList());
	}


}
