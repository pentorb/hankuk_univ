package com.kosta.hankuk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Lecture;

public interface LectureRepository extends JpaRepository<Lecture, String>{
	List<Lecture> findByProfessor_profNoAndYearAndStatus(String profNo, Integer year, String status);

	List<Lecture> findByProfessor_profNoAndYear(String profNo, Integer year);
}
