package com.omnify_blog.server.services.impl;

import com.omnify_blog.server.dto.UserDto;
import com.omnify_blog.server.model.User;
import com.omnify_blog.server.services.AuthService;
import com.omnify_blog.server.services.UserService;
import com.omnify_blog.server.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private JwtTokenUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @Override
    public UserDto getCurrentUserFromToken(String token) {
        if (token == null || token.isEmpty()) {
            throw new BadCredentialsException("Unauthorized: Token missing");
        }

        String email;
        try {
            email = jwtUtil.extractUsername(token);
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid token");
        }

        if (!jwtUtil.validateToken(token, userDetailsService.loadUserByUsername(email))) {
            throw new BadCredentialsException("Unauthorized: Token validation failed");
        }

        User user = userService.getUserByEmail(email);
        return new UserDto(user.getId(), user.getName(), user.getEmail());
    }
}

