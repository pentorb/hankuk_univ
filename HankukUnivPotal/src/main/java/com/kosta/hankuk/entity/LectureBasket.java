package com.kosta.hankuk.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.kosta.hankuk.dto.LectureBasketDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LectureBasket {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer lbNo;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="lecNo")
	private Lecture lecture;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="stdNo")
	private Student student;
	
	public LectureBasketDto toLectureBasketDto() {
		return LectureBasketDto.builder()
				.lbNo(lbNo)
				.lecNo(lecture.getLecNo())
				.stdNo(student.getStdNo())
				.build();
	}
}
