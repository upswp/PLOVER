package com.plover.config;

import com.plover.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity //스프링시큐리티 사용을 위한 어노테이션선언
//WebSecurityConfigurerAdapter를 상속받은 config 클래스에
//@EnableWebSecurity 어노테이션을 달면SpringSecurityFilterChain이 자동으로 포함됩니다.
//WebSecurityConfigurerAdapter 상속
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Autowired
    private CustomAccessDeniedHandler customAccessDeniedHandler;

    /**
     * 스프링 시큐리티 규칙
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        /**
         * [antMatchers() ]
         * hasRole() or hasAnyRole()
         * 특정 권한을 가지는 사용자만 접근할 수 있습니다.
         * hasAuthority() or hasAnyAuthority()
         * 특정 권한을 가지는 사용자만 접근할 수 있습니다.
         * hasIpAddress()
         * 특정 아이피 주소를 가지는 사용자만 접근할 수 있습니다.
         * permitAll() or denyAll()
         * 접근을 전부 허용하거나 제한합니다.
         * rememberMe()
         * 리멤버 기능을 통해 로그인한 사용자만 접근할 수 있습니다.
         * anonymous()
         * 인증되지 않은 사용자가 접근할 수 있습니다.
         * authenticated()
         * 인증된 사용자만 접근할 수 있습니다.
         */
        http.csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .httpBasic()
                .authenticationEntryPoint(customAuthenticationEntryPoint)
                .and()
                .exceptionHandling().accessDeniedHandler(customAccessDeniedHandler)
                .and()
                .authorizeRequests()
                //하단의 경로 부분만 접근을 허용한다.
                .antMatchers("/account/signup").permitAll()
                .antMatchers("/account/checkDupEmail").permitAll()
                .antMatchers("/account/checkDupNickName").permitAll()
                .antMatchers("/account/login").permitAll()
                .antMatchers("/account/verify/**").permitAll()
                .antMatchers("/study/**").permitAll()
                .antMatchers("/follow/**").permitAll()
                .antMatchers("/file/**").permitAll()
                .antMatchers("/user/**").permitAll()
                .antMatchers("/mentoring/**").permitAll()
                //.antMatchers("/study/**").hasAnyRole("USER", "MANAGER", "ADMIN") //study 파트 접근 제한
                .anyRequest().authenticated();

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    /**
     * 스프링 시큐리티 룰을 무시하게 하는 Url 규칙(여기 등록하면 규칙 적용하지 않음)
     */
    @Override // ignore check swagger resource
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/v2/api-docs", "/swagger-resources/**",
                "/swagger-ui.html", "/webjars/**", "/swagger/**");
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    
}