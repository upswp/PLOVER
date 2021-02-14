package com.plover.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowCredentials(true)
                .allowedOrigins(
                        "http://localhost:3000",
                        "http://localhost:8080",
                        "https://dev.plover.co.kr",
                        "http://dev.plover.co.kr",
                        "https://plover.co.kr",
                        "http://plover.co.kr")
                .allowedMethods("*")
                .allowedHeaders("*");
    }
}