package com.kosta.hankuk.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.HuehakAndBokhak;

public interface HueAndBokRepository extends JpaRepository<HuehakAndBokhak, Integer> {
	Page<HuehakAndBokhak> findByStudent_StdNo(String stdNo, PageRequest pageRequest);
	Page<HuehakAndBokhak> findByStudent_StdNoAndType(String stdNo, String type, PageRequest pageRequest);
}
