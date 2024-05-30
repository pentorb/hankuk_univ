package com.kosta.hankuk.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.kosta.hankuk.dto.LectureSignUpDto;

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
public class LectureSignUp {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer lsuNo;
	@Column
	private Integer year;
	@Column
	private Integer semester;
	@Column
	private Date startDt;
	@Column
	private Date endDt;
	@Column
	private Date basStartDt;
	@Column
	private Date basEndDt;
	
	public LectureSignUpDto toLectureSignUpDto() {
		return LectureSignUpDto.builder()
				.lsuNo(lsuNo)
				.year(year)
				.semester(semester)
				.startDt(startDt)
				.endDt(endDt)
				.basStartDt(basStartDt)
				.basEndDt(basEndDt)
				.build();
	}
}
