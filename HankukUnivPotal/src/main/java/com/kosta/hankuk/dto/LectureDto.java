package com.kosta.hankuk.dto;

import com.kosta.hankuk.entity.Lecture;
import com.kosta.hankuk.entity.Professor;
import com.kosta.hankuk.entity.Subject;

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
public class LectureDto {
	private String lecNo;
	private Integer credit;
	private String sect;
	private String time1;
	private String time2;
	private Integer numOfStd;
	private String files;
	private String lecRoom;
	private String status;
	private Boolean isScoreChk;
	private Integer year;
	private Integer semester;
	private String subCd;
	private String profNo;
	private String profName;
	private String email;
	private String tel;
	private String subName;
	
	
	public Lecture toLecture() {
		return Lecture.builder()
				.lecNo(lecNo)
				.credit(credit)
				.sect(sect)
				.time1(time1)
				.time2(time2)
				.numOfStd(numOfStd)
				.files(files)
				.lecRoom(lecRoom)
				.status(status)
				.isScoreChk(isScoreChk)	
				.year(year)
				.semester(semester)
				.subject(Subject.builder().subCd(subCd).build())
				.professor(Professor.builder().profNo(profNo).build())
				.build();
	}
}
