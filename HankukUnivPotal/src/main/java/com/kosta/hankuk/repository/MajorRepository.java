package com.kosta.hankuk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Major;

public interface MajorRepository extends JpaRepository<Major, String> {
//    List<Major> findByColleageId(String colCd);

}
