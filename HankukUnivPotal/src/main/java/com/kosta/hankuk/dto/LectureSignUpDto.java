package com.kosta.hankuk.dto;

import java.sql.Date;

import com.kosta.hankuk.entity.LectureSignUp;

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
public class LectureSignUpDto {
	private Integer lsuNo;
	private Integer year;
	private Integer semester;
	private Date startDt;
	private Date endDt;
	private Date basStartDt;
	private Date basEndDt;
	
	public LectureSignUp toLectureSignUp() {
		return LectureSignUp.builder()
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
