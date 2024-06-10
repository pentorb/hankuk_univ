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

import com.kosta.hankuk.dto.ScoreDto;

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
public class Score {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer scoreNo;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="stdNo")
	private Student student;
	
	@Column
	private Integer getCredit;
	@Column
	private Integer rank;
	@Column
	private Double score;
	@Column
	private Integer year;
	@Column
	private Integer semester;
	
	private ScoreDto toScoreDto() {
		return ScoreDto.builder()
				.scoreNo(scoreNo)
				.stdNo(student.getStdNo())
				.getCredit(getCredit)
				.rank(rank)
				.score(score)
				.build();
	}
}
