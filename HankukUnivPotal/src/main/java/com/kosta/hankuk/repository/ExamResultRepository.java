package com.kosta.hankuk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.ExamResult;

public interface ExamResultRepository extends JpaRepository<ExamResult, Integer>{

	List<ExamResult> findByExam_Lecture_lecNo(String lecNo);

}
