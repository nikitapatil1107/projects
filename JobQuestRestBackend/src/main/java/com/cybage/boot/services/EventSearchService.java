package com.cybage.boot.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cybage.boot.dto.EventDTO;
import com.cybage.boot.models.EventInfoModel;
import com.cybage.boot.repository.EventSearchRepository;

@Service
public class EventSearchService {
	@Autowired
	private EventSearchRepository eventSearchRepository;
	@Autowired
	private ModelMapper modelMapper;
	public List<EventDTO> getAllByeventName(String searchText  )
	{
		List<EventInfoModel> evenInfos = eventSearchRepository.findByeventNameContaining(searchText );
	    return evenInfos.stream()
	                   .map(eventInfo -> modelMapper.map(eventInfo, EventDTO.class))
	                   .collect(Collectors.toList());
	}
	

}
