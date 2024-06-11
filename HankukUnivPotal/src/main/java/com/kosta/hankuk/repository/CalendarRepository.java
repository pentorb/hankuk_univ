package com.kosta.hankuk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Calendar;

public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
	List<Calendar> findByWriter(String id);
}
