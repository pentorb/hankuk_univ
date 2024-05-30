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
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;

import com.kosta.hankuk.dto.LeaveDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * 휴학 구분 : 휴학(L), 복학(R)
 * 휴학 상태 : 신청(REQ), 승인(APPR), 반려(REJ)
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
public class Leave {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer leaveNo;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="stdNo")
	private Student student;
	
	@Column
	private String rejResult;
	
	@Column
	@CreatedDate
	private Date appDt;
	
	@Column
	@ColumnDefault("REQ")
	private String status;
	
	@Column // 휴학인지 복학인지
	private String div;
	
	@Column // 어떤 휴학 유형인지
	private String type;
	
	public LeaveDto toLeaveDto() {
		return LeaveDto.builder()
				.leaveNo(leaveNo)
				.stdNo(student.getStdNo())
				.rejResult(rejResult)
				.appDt(appDt)
				.status(status)
				.div(div)
				.type(type)
				.build();
	}
}
