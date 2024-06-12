package com.kosta.hankuk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.LectureByStd;

public interface LectureByStdRepository extends JpaRepository<LectureByStd, Integer>{
	List<LectureByStd> findByStudent_stdNoAndLecture_yearAndLecture_semester(String stdNo, Integer year, Integer semester);
	LectureByStd findByStudent_stdNoAndLecture_lecNo(String stdNo, String lecNo);
	
	// 학생 개인의 수강 리스트 조회 (학년별, 학기별)
	List<LectureByStd> findByStudent_stdNoAndCourYearAndLecture_semester(String stdNo, Integer courYear, Integer semester);
}
