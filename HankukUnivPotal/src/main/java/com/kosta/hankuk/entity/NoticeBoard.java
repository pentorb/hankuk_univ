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

import com.kosta.hankuk.dto.NoticeBoardDto;

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
public class NoticeBoard {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer nbNo;
	@Column
	private String title;
	@Column
	private String content;
	@Column
	private String fileNo;
	@Column
	@ColumnDefault("0")
	private Integer viewCount;
	@Column
	@ColumnDefault("false")
	private Boolean isRequired;
	@Column
	@CreationTimestamp
	private Date writeDt;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="writer")
	private Staff staff;
	
	public NoticeBoardDto toNoticeBoardDto() {
		return NoticeBoardDto.builder()
				.nbNo(nbNo)
				.title(title)
				.content(content)
				.fileNo(fileNo)
				.viewCount(viewCount)
				.isRequired(isRequired)
				.writeDt(writeDt)
				.writer(staff.getName())
				.build();
	}
}
