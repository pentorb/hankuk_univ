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

import com.kosta.hankuk.dto.ExamDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/*
 * 시험 구분 (div) : M(중간), F(기말)
 * 시험 유형 (type) : C(객관식), W(주관식) 
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
public class Exam {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer examNo;
	//중간기말
	@Column
	private String sect;
	@Column
	private String startDt;
	@Column
	private String EndDt;
	@Column
	private Integer Qnum;
	@Column
	private String type;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="lecNo")
	private Lecture lecture;
	
	// 해당 시험의 문제 리스트 
	@OneToMany(mappedBy="exam", fetch=FetchType.LAZY)
	private List<ExamQues> eqList = new ArrayList<>();
	
	// 해당 시험의 응시결과..? 
	@OneToMany(mappedBy="exam", fetch=FetchType.LAZY)
	private List<ExamResult> erList = new ArrayList<>();
	
	public ExamDto toExamDto() {
		return ExamDto.builder()
				.examNo(examNo)
				.sect(sect)
				.startDt(startDt)
				.endDt(EndDt)
				.qnum(Qnum)
				.type(type)
				.lecNo(lecture.getLecNo())
				.build();
	}
}
