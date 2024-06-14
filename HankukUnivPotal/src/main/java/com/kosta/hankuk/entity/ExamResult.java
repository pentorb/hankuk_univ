package com.kosta.hankuk.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.DynamicInsert;

import com.kosta.hankuk.dto.ExamResultDto;

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
@DynamicInsert
public class ExamResult {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer erNo;
	
	@Column
	private Integer totalScore;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="examNo")
	private Exam exam;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="stdNo")
	private Student student;
	
	public ExamResultDto toExamResultDto() {
		return ExamResultDto.builder()
				.erNo(erNo)
				.totalScore(totalScore)
				.examNo(exam.getExamNo())
				.sect(exam.getSect())
				.stdNo(student.getStdNo())
				.build();
	}
}
