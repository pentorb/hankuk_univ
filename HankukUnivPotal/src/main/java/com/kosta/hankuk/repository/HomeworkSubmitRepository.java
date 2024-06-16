package com.kosta.hankuk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.HomeworkSubmit;

public interface HomeworkSubmitRepository extends JpaRepository<HomeworkSubmit, Integer>{
	HomeworkSubmit findByStudent_stdNoAndHomework_hwNo(String stdNo, Integer hwNo);
	List<HomeworkSubmit> findByHomework_Lecture_lecNo(String lecNo);

}
