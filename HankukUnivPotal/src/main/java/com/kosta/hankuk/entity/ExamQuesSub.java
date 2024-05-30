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

import com.kosta.hankuk.dto.ExamQuesSubDto;

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
public class ExamQuesSub {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer eqsNo;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="stdNo")
	private Student student;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="eqNo")
	private ExamQues examQues;
	
	@Column
	private String answer;
	
	public ExamQuesSubDto toExamQuesSubDto() {
		return ExamQuesSubDto.builder()
				.eqsNo(eqsNo)
				.stdNo(student.getStdNo())
				.eqNo(examQues.getEqNo())
				.answer(answer)
				.build();
	}
}
