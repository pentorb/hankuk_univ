package com.kosta.hankuk.service;

import java.util.List;

import com.kosta.hankuk.dto.CalendarDto;

public interface CalendarService {
	List<CalendarDto> calList() throws Exception;
	void calInsert(CalendarDto calDto) throws Exception;
}
