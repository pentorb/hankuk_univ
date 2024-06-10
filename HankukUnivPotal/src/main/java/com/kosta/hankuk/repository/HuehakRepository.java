package com.kosta.hankuk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Huehak;

public interface HuehakRepository extends JpaRepository<Huehak, Integer> {
	List<Huehak> findByStudent_StdNo(String stdNo);
}
