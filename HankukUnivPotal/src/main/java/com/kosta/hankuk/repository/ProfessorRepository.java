package com.kosta.hankuk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Professor;

public interface ProfessorRepository extends JpaRepository<Professor, String> {
    List<Professor> findByNameContaining(String name);
    List<Professor> findByMajor(String major);
    List<Professor> findByColleageAndMajor(String colleage,String major);
}
