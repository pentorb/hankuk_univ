package com.kosta.hankuk.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Lesson;

public interface LessonRepository extends JpaRepository<Lesson, Integer>{
	Optional<Lesson> findByLecture_lecNoAndWeekAndLessonCnt(String lecNo, Integer week, Integer lessonCnt);
}
