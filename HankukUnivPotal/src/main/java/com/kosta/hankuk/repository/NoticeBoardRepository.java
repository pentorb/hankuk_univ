package com.kosta.hankuk.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import com.kosta.hankuk.entity.NoticeBoard;

public interface NoticeBoardRepository  extends JpaRepository<NoticeBoard, Integer> {
	Page<NoticeBoard> findByTitleContains(String subject, PageRequest pageRequest);
	Page<NoticeBoard> findByContentContains(String content, PageRequest pageRequest);
	Page<NoticeBoard> findByStaffStfNo(String writer, PageRequest pageRequest);
	List<NoticeBoard> findTop3ByIsRequiredOrderByWriteDtDesc(Boolean isRequired);
}
