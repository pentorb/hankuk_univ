package com.kosta.hankuk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.LectureByStd;

public interface LectureByStdRepository extends JpaRepository<LectureByStd, Integer>{
	List<LectureByStd> findByStudent_stdNoAndLecture_yearAndLecture_semester(String stdNo, Integer year, Integer semester);
}
