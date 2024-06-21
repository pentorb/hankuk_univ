package com.kosta.hankuk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.kosta.hankuk.dto.CalendarDto;
import com.kosta.hankuk.service.CalendarService;

@RestController
public class CalendarController {

	@Autowired
	private CalendarService calService;

	@PostMapping("/calInsert")
	public ResponseEntity<String> calInsert(@ModelAttribute CalendarDto calDto){
		try {
			System.out.println(calDto);
			calService.calInsert(calDto);
			return new ResponseEntity<String>("일정 정상 등록", HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	

	@GetMapping("/calendar")
	public ResponseEntity<List<CalendarDto>> allCalList(@RequestParam("id") String id) {
		try {
//			System.out.println(id);
			List<CalendarDto> calDtoList = calService.calListByWriter(id);
			//System.out.println(calDtoList);
			return new ResponseEntity<List<CalendarDto>>(calDtoList, HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<CalendarDto>>(HttpStatus.BAD_REQUEST);
		}
	}
}
