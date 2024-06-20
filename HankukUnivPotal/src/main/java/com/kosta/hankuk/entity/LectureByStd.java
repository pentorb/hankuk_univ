package com.kosta.hankuk.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.kosta.hankuk.dto.LectureByStdDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class LectureByStd {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer lbsNo;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="lecNo")
	private Lecture lecture;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="stdNo")
	private Student student;
	
	@Column
	private String grade;
	
	@Column(columnDefinition = "boolean default false")
	private Boolean isDrop;
	
	@Column // 수강 학년
	private Integer courYear;
	
	public LectureByStdDto toLectureByStdDto() {
		return LectureByStdDto.builder()
				.lbsNo(lbsNo)
				.lecNo(lecture.getLecNo())
				.stdNo(student.getStdNo())
				.stdName(student.getName())
				.grade(grade)
				.isDrop(isDrop)
				.subName(lecture.getSubject().getName())
				.courYear(courYear)
				.credit(lecture.getCredit())
				.semester(lecture.getSemester())
				.profName(lecture.getProfessor().getName())
				.build();
	}
}
