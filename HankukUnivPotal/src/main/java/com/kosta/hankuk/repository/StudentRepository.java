package com.kosta.hankuk.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Student;

public interface StudentRepository extends JpaRepository<Student, String> {
//	Optional<Student> findByStudent_StdNo(String majCd);
}
 