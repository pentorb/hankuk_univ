package com.kosta.hankuk.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.dto.MajorDto;
import com.kosta.hankuk.entity.Major;

public interface MajorRepository extends JpaRepository<Major, String> {
    List<Major> findByColleageColCd(String colCd);
    Optional<Major> findByName(String name);
}
