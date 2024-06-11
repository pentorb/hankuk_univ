package com.kosta.hankuk.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosta.hankuk.dto.CalendarDto;
import com.kosta.hankuk.entity.Calendar;
import com.kosta.hankuk.repository.CalendarRepository;

@Service
public class CalendarServiceImpl implements CalendarService {
	
	@Autowired
	private CalendarRepository calRes;
	
	@Override
	public void calInsert(CalendarDto calDto) throws Exception {
		Calendar calendar =calDto.toCalendar();
		System.out.println(calendar);
		// TODO Auto-generated method stub
		calRes.save(calendar);
	}
	
	@Override
	public List<CalendarDto> calListByWriter(String id) throws Exception {
		List<CalendarDto> list = new ArrayList<>();
		for (Calendar cal : calRes.findByWriter(id)) {
			list.add(cal.toCalendarDto());
		}
		return list;
	}

}
