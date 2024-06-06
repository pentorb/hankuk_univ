package com.kosta.hankuk.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.Staff;

public interface StaffRepository extends JpaRepository<Staff, String> {

}
