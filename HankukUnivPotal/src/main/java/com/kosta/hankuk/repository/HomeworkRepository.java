package com.kosta.hankuk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Homework;

public interface HomeworkRepository extends JpaRepository<Homework, Integer>{

	List<Homework> findByLesson_Lecture_lecNo(String lecNo);

}
