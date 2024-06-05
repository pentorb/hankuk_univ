package com.kosta.hankuk.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Exam;

public interface ExamRepository extends JpaRepository<Exam, Integer>{

	Optional<Exam> findByLecture_lecNoAndSect(String lecNo, String sect);

}
