package com.kosta.hankuk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Subject;

public interface SubjectRepository extends JpaRepository<Subject, String> {
    boolean existsBySubCd(String subCd);
    List<Subject> findByMajorMajCd(String majCd);

	List<Subject> findByMajor_majCd(String majCd);
    List<Subject> findByNameContaining(String name);
}
