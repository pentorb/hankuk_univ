package com.kosta.hankuk.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Student;

public interface StudentRepository extends JpaRepository<Student, String> {
//	Optional<Student> findByStudent_StdNo(String majCd);
	List<Student> findByMajor_majCdAndFinSem(String majCd, Integer finSem);
	List<Student> findByNameContaining(String name);
	List<Student> findByMajor_Colleage_ColCd(String colCd);
	List<Student> findByMajor(String major);
	List<Student> findByMajor_Colleage_name(String colleage);
	List<Student> findByMajor_majCd(String majCd);
	List<Student> findByProfessor_profNoAndStdNoStartsWith(String profNo, String strYear);
	List<Student> findByProfessor_profNoAndStdNoStartsWithAndNameContaining(String profNo, String strYear,
			String stdName);
}
 