package com.kosta.hankuk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Professor;

public interface ProfessorRepository extends JpaRepository<Professor, String> {

}
