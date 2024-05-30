package com.kosta.hankuk.dto;

import com.kosta.hankuk.entity.Lecture;
import com.kosta.hankuk.entity.LectureBasket;
import com.kosta.hankuk.entity.Student;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class LectureBasketDto {
	private Integer lbNo;
	private String lecNo;
	private String stdNo;
	
	public LectureBasket toLectureBasket() {
		return LectureBasket.builder()
				.lbNo(lbNo)
				.lecture(Lecture.builder().lecNo(lecNo).build())
				.student(Student.builder().stdNo(stdNo).build())
				.build();
	}
}
