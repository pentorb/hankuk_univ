package com.kosta.hankuk.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;

import com.kosta.hankuk.dto.AppealDto;

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
public class Appeal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer appNo;
	
	@Column
	@ColumnDefault("'NEW'")
	private String status;
	
	@Column
	private String content;
	@Column
	private String files;
	@Column
	private String answer;
	
	@Column
	@CreationTimestamp
	private Date reqDt;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="lecNo")
	private Lecture lecture;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="stdNo")
	private Student student;
	
	public AppealDto toAppealDto() {
		return AppealDto.builder()
				.appNo(appNo)
				.status(status)
				.content(content)
				.files(files)
				.answer(answer)
				.reqDt(reqDt)
				.lecNo(lecture.getLecNo())
				.stdNo(student.getStdNo())
				.stdName(student.getName())
				.build();
	}
}
