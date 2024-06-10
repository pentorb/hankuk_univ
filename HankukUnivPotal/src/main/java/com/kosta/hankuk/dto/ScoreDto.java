package com.kosta.hankuk.dto;

import com.kosta.hankuk.entity.Score;
import com.kosta.hankuk.entity.Student;

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
public class ScoreDto {
	private Integer scoreNo;
	private String stdNo;
	private Integer getCredit;
	private Integer rank;
	private Double score;
	
	public Score score() {
		return Score.builder()
				.scoreNo(scoreNo)
				.student(Student.builder().stdNo(stdNo).build())
				.getCredit(getCredit)
				.rank(rank)
				.score(score)
				.build();
	}
}
