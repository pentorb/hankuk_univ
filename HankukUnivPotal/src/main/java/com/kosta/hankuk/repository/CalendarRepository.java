package com.kosta.hankuk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Calendar;

public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
	
}
