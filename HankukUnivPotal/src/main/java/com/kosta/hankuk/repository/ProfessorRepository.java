package com.kosta.hankuk.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Major;
import com.kosta.hankuk.entity.Professor;

public interface ProfessorRepository extends JpaRepository<Professor, String> {
    List<Professor> findByNameContaining(String name);
    List<Professor> findByMajor(String major);
    List<Professor> findByMajor_Colleage_name(String colleage);
	List<Professor> findByMajor_majCd(String majCd);

    Optional<Professor> findByName(String name);
    Optional<Professor> findByMajorAndName(Major major,String name);

    List<Professor> findByMajor(Major major);
    List<Professor> findByMajor_majCdAndPosition(String majCd, String position);
    
    List<Professor> findByMajor_MajCd(String majCd);


}
