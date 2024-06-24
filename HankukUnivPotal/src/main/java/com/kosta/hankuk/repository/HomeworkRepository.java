package com.kosta.hankuk.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Homework;

public interface HomeworkRepository extends JpaRepository<Homework, Integer>{

	List<Homework> findByLecture_lecNo(String lecNo);

	Integer countByLecture_lecNo(String lecNo);

	Optional<Homework> findByLesson_lessonNo(Integer lessonNo);
}
