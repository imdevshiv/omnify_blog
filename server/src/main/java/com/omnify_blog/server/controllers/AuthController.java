package com.omnify_blog.server.controllers;

import com.omnify_blog.server.dto.AuthRequest;
import com.omnify_blog.server.dto.AuthResponse;
import com.omnify_blog.server.dto.RegisterRequest;
import com.omnify_blog.server.dto.UserDto;

import com.omnify_blog.server.services.UserService;

import com.omnify_blog.server.util.CookieUtil;
import com.omnify_blog.server.util.JwtTokenUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    UserService userService;
    @Autowired
    JwtTokenUtil jwtUtil;
    @Autowired
    AuthenticationManager authManager;
    @Autowired
    UserDetailsService userDetails;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Public test works");
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        userService.register(req);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req, HttpServletResponse response) {
        try {
            UserDto userDTO = userService.login(req.getEmail(), req.getPassword());
            String token = jwtUtil.generateToken(req.getEmail());

            ResponseCookie cookie = CookieUtil.createJwtCookie(token);
            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            return ResponseEntity.ok(new AuthResponse(null, userDTO));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@CookieValue(name = "jwt", required = false) String token) {
        try {
            UserDto userDTO = userService.getCurrentUserFromToken(token);
            return ResponseEntity.ok(userDTO);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }



    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", "");
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // expires immediately
        response.addCookie(cookie);

        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

}
