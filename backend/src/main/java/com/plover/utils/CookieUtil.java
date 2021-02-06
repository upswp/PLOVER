package com.plover.utils;

import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public class CookieUtil {
    static final int COOKIE_EXPIRED_SECOND = 1000*60*24*2;
    public Cookie createCookie(String cookieName, String value){
        Cookie token = new Cookie(cookieName,value);
        token.setHttpOnly(true);
        token.setMaxAge(COOKIE_EXPIRED_SECOND);
        token.setPath("/");
        return token;
    }
    public Cookie getCookie(HttpServletRequest request, String cookieName){
        final Cookie[] cookies = request.getCookies();
        if(cookies==null) return null;
        for(Cookie cookie : cookies){
            if(cookie.getName().equals(cookieName))
                return cookie;
        }
        return null;
    }
    public HttpServletResponse setCookieExpire(HttpServletRequest request, HttpServletResponse response){
        final Cookie[] cookies = request.getCookies();
        if(cookies==null) return null;
        for (Cookie cookie: cookies) {
         cookie.setMaxAge(0);
         response.addCookie(cookie);
        }
        System.out.println(request.getCookies());
        return response;
    }
}