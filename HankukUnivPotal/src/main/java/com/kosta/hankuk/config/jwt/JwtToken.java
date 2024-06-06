package com.kosta.hankuk.config.jwt;

import java.sql.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

public class JwtToken {
	public String makeAccessToken(String username) {
		System.out.println(username);
		return JWT.create()
				.withSubject(username)
				.withIssuedAt(new Date(System.currentTimeMillis()))
				.withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.ACCESS_EXPIARATION_TIME))
				.sign(Algorithm.HMAC512(JwtProperties.SECRET));
	}
	
	public String makeRefreshToken(String username) {
		return JWT.create()
				.withSubject(username)
				.withIssuedAt(new Date(System.currentTimeMillis()))
				.withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.REFRESH_EXPIARATION_TIME))
				.sign(Algorithm.HMAC512(JwtProperties.SECRET));
	}
}
