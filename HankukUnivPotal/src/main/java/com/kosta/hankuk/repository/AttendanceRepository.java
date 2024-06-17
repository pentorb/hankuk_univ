package com.kosta.hankuk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer>{
	List<Attendance> findByLecture_lecNo(String lecNo);
	Attendance findByLecture_lecNoAndStudent_stdNo(String lecNo, String stdNo);
}
