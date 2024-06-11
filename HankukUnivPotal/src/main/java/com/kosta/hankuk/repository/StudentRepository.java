package com.kosta.hankuk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Student;

public interface StudentRepository extends JpaRepository<Student, String> {
//	Optional<Student> findByStudent_StdNo(String majCd);
	List<Student> findByMajor_majCdAndFinSem(String majCd, Integer finSem);
}
 