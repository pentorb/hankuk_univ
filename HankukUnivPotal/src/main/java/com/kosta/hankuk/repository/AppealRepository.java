package com.kosta.hankuk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Appeal;

public interface AppealRepository extends JpaRepository<Appeal, Integer> {
	List<Appeal> findByStudent_stdNoAndLecture_lecNo(String stdNo, String lecNo);
	
	List<Appeal> findByLecture_lecNo(String lecNo);
}
