package com.kosta.hankuk.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import com.kosta.hankuk.dto.LectureDto;

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
public class Lecture {
	@Id
	private String lecNo;
	@Column
	private Integer credit;
	@Column
	private String sect;
	@Column
	private String time1;
	@Column
	private String time2;
	@Column
	private Integer numOfStd;
	@Column
	private String files;
	@Column
	private String lecRoom;
	@Column
	@ColumnDefault("'REQ'")
	private String status;
	@Column
	private Boolean isScoreChk;
	@Column
	private Integer year;
	@Column
	private Integer semester;

	// 과목코드
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="subCd")
	private Subject subject;
	
	// 교수번호
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="profNo")
	private Professor professor;
	
	@OneToMany(mappedBy="lecture", fetch=FetchType.LAZY)
	private List<Attendance> attendanceList = new ArrayList<>();
	// 수업리스트 
	@OneToMany(mappedBy="lecture", fetch=FetchType.LAZY)
	private List<Lesson> lessonList = new ArrayList<>();
	
	@OneToMany(mappedBy="lecture", fetch=FetchType.LAZY)
	private List<LectureByStd> lectureList = new ArrayList<>();	
	
	public LectureDto toLectureDto() {
		return LectureDto.builder()
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
				.subCd(subject.getSubCd())
				.subName(subject.getName())
				.profNo(professor.getProfNo())
				.profName(professor.getName())
				.email(professor.getEmail())
				.tel(professor.getTel())
				.build();
	}
}
