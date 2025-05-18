package com.omnify_blog.server.util;

import org.springframework.http.ResponseCookie;

public class CookieUtil {

    public static ResponseCookie createJwtCookie(String token) {
        return ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")   // critical for cross-origin cookie support
                .path("/")
                .maxAge(10 * 60 * 60)  // 10 hours in seconds
                .build();
    }
}
