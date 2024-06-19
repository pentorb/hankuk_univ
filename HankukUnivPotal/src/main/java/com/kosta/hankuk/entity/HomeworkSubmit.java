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
import org.hibernate.annotations.UpdateTimestamp;

import com.kosta.hankuk.dto.HomeworkSubmitDto;

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
public class HomeworkSubmit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increments
	private Integer hwsNo;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="hwNo")
	private Homework homework;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="stdNo")
	private Student student;
	
	@Column
	private String files;
	@Column
	@CreationTimestamp
	private Date submitDt;
	
	@Column
	@UpdateTimestamp
	private Date modifyDt;
	
	@Column
	@ColumnDefault("0")
	private Integer score;
	
	public HomeworkSubmitDto toHomeworkSubmitDto() {
		return HomeworkSubmitDto.builder()
				.hwsNo(hwsNo)
				.hwNo(homework.getHwNo())
				.stdNo(student.getStdNo())
				.stdName(student.getName())
				.files(files)
				.submitDt(submitDt)
				.modifyDt(modifyDt)
				.score(score)
				.build();
	}
}
