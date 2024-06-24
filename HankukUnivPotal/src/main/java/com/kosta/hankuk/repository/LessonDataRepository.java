package com.kosta.hankuk.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.LessonData;

public interface LessonDataRepository extends JpaRepository<LessonData, Integer>{
	List<LessonData> findByLesson_Lecture_lecNo(String lecNo);
	Optional<LessonData> findByLesson_lessonNo(Integer lessonNo);
}
