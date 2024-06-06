package com.kosta.hankuk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Student;

public interface StudentRepository extends JpaRepository<Student, String> {

}
