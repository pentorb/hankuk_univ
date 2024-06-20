package com.kosta.hankuk.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.LectureBasket;

public interface LectureBasketRepository extends JpaRepository<LectureBasket, Integer>{
	List<LectureBasket> findByStudent_stdNo(String stdNo);
}
