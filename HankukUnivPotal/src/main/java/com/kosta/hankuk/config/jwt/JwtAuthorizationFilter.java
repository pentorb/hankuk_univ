package com.kosta.hankuk.config.jwt;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kosta.hankuk.config.auth.PrincipalDetails;
import com.kosta.hankuk.entity.User;
import com.kosta.hankuk.repository.UserRepository;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
	private UserRepository userRepository;
	private JwtToken jwtToken = new JwtToken();
	
	public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
		super(authenticationManager);
		this.userRepository = userRepository;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		String uri = request.getRequestURI();		
		if(!uri.contains("/")) {
			chain.doFilter(request, response);
			return;
		}
		
		String authentication = request.getHeader(JwtProperties.HEADER_STRING);
		if(authentication == null) {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "로그인 필요");
			return;
		}
		
		ObjectMapper objectMapper = new ObjectMapper();
		Map<String,String> token = objectMapper.readValue(authentication, Map.class);
		System.out.println(token);
		
		String access_token = token.get("access_token");
		if(!access_token.startsWith(JwtProperties.TOKEN_PREFIX)) {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "로그인 필요");
			return;
		}
		access_token = access_token.replace(JwtProperties.TOKEN_PREFIX, "");
		
		try {
			String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET))
					.build()
					.verify(access_token)
					.getClaim("sub")
					.asString();
			System.out.println(username);
			if(username == null || username.equals("")) throw new Exception();
			
			User user = userRepository.identify(username);
			if(user == null) throw new Exception();
			PrincipalDetails principalDetails = new PrincipalDetails(user);
			UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
					principalDetails, null, principalDetails.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(auth);
			chain.doFilter(request, response);
			return;
		} catch(JWTVerificationException ve) {
			ve.printStackTrace();
			try {
				String refresh_token = token.get("refresh_token");
				if(!refresh_token.startsWith(JwtProperties.TOKEN_PREFIX)) {
					response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "로그인 필요");
					return;
				}
				
				refresh_token = refresh_token.replace(JwtProperties.TOKEN_PREFIX, "");
				
				String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET))
						.build()
						.verify(refresh_token)
						.getClaim("sub")
						.asString();
				
				User user = userRepository.identify(username);
				System.out.println(user);
				if(user == null) throw new Exception(); // 사용자가 없을 때
				
				// token 다시 보내기
				String reAccess_token = jwtToken.makeAccessToken(username);
				String reRefresh_token = jwtToken.makeRefreshToken(username);
				Map<String, String> map = new HashMap<>();
				map.put("access_token", JwtProperties.TOKEN_PREFIX + reAccess_token);
				map.put("refresh_token", JwtProperties.TOKEN_PREFIX + reRefresh_token);
				
				String reToken = objectMapper.writeValueAsString(map); // map -> jsonString
				response.addHeader(JwtProperties.HEADER_STRING, reToken);
				response.setContentType("application/json; charset=utf-8");
			} catch (Exception e2){ // refresh_token 기간 만료
				//e2.printStackTrace();
				System.out.println("ERR");
				response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "로그인 필요");
				return;
			}			
		} catch(Exception e) {
			System.out.println("AA");
//			e.printStackTrace();
//			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰 오류");
			return;
		}		
	}
}
