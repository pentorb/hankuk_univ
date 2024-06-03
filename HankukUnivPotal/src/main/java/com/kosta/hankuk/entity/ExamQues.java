package com.kosta.hankuk.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.DynamicInsert;

import com.kosta.hankuk.dto.ExamQuesDto;

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
public class ExamQues {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer eqNo;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="examNo")
	private Exam exam;
	
	@Column
	private Integer quesNo;
	@Column
	private String question;
	@Column
	private String answer;
	@Column
	private Integer point;
	@Column
	private String choice1;
	@Column
	private String choice2;
	@Column
	private String choice3;
	@Column
	private String choice4;
	
	// 학생들이 제출한 답안지 리스트
	@OneToMany(mappedBy="examQues", fetch=FetchType.EAGER)
	private List<ExamQuesSub> eqsList = new ArrayList<>(); 
	
	public ExamQuesDto toExamQuesDto() {
		return ExamQuesDto.builder()
				.eqNo(eqNo)
				.examNo(exam.getExamNo())
				.quesNo(quesNo)
				.question(question)
				.answer(answer)
				.point(point)
				.choice1(choice1)
				.choice2(choice2)
				.choice3(choice3)
				.choice4(choice4)
				.build();
	}
}
