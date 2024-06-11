package com.kosta.hankuk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Score;

public interface ScoreRepository extends JpaRepository<Score, Integer>{
	Score findByStudent_stdNoAndYearAndSemester(String stdNo, Integer year, Integer semester);
}
