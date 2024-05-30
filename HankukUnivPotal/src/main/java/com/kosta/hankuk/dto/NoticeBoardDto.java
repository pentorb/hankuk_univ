package com.kosta.hankuk.dto;

import java.sql.Date;

import com.kosta.hankuk.entity.NoticeBoard;
import com.kosta.hankuk.entity.Staff;

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
public class NoticeBoardDto {
	private Integer nbNo;
	private String title;
	private String content;
	private String fileNo;
	private Integer viewCount;
	private Boolean isRequired;
	private Date writeDt;
	private String writer;
	
	public NoticeBoard toNoticeBoard() {
		return NoticeBoard.builder()
				.nbNo(nbNo)
				.title(title)
				.content(content)
				.fileNo(fileNo)
				.viewCount(viewCount)
				.isRequired(isRequired)
				.writeDt(writeDt)
				.staff(Staff.builder().stfNo(writer).build())
				.build();
	}
}
