package com.cybage.boot.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cybage.boot.dto.EventDTO;
import com.cybage.boot.services.EventSearchService;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:4200")
public class EventSerachController {
	@Autowired
	private EventSearchService eventSearchService;

	@GetMapping("/searchbyEventName")
	public ResponseEntity<List<EventDTO>> getAllByeventName(@RequestParam("searchText") String searchText) {
		return new ResponseEntity<>(eventSearchService.getAllByeventName(searchText), HttpStatus.OK);
	}

}
