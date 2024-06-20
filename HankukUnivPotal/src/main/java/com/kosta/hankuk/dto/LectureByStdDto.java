package com.kosta.hankuk.dto;

import com.kosta.hankuk.entity.Lecture;
import com.kosta.hankuk.entity.LectureByStd;
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
public class LectureByStdDto {
	private Integer lbsNo;
	private String lecNo;
	private String stdNo;
	private String stdName;
	private String grade;
	private Boolean isDrop;
	private String subName;
	private Integer courYear;
	private Integer credit;
	private Integer semester;
	private String profName;
	
	public LectureByStd toLectureByStd() {
		return LectureByStd.builder()
				.lbsNo(lbsNo)
				.lecture(Lecture.builder().lecNo(lecNo).build())
				.student(Student.builder().stdNo(stdNo).build())
				.grade(grade)
				.isDrop(isDrop)
				.courYear(courYear)
				.build();
	}
}
