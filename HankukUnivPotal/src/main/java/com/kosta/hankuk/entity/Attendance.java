package com.kosta.hankuk.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import com.kosta.hankuk.dto.AttendanceDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/*
 *  출결 상태
	출석 : AT01
	지각 : AT02
	결석 : AT03
	공결 : AT04
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
public class Attendance {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer attNo;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="stdNo")
	private Student student;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="lecNo")
	private Lecture lecture;
	
	@Column
	@ColumnDefault("'111111111111111111111111111111'")
	private String status;
	
	public AttendanceDto toAttendanceDto() {
		return AttendanceDto.builder()
				.attNo(attNo)
				.stdNo(student.getStdNo())
				.stdName(student.getName())
				.lecNo(lecture.getLecNo())
				.status(status)
				.build();
	}
}
