package com.omnify_blog.server.services.impl;


import com.omnify_blog.server.dto.RegisterRequest;
import com.omnify_blog.server.dto.UserDto;
import com.omnify_blog.server.model.User;
import com.omnify_blog.server.repository.UserRepository;
import com.omnify_blog.server.services.UserService;
import com.omnify_blog.server.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;


    @Override
    public void register(RegisterRequest req) {
        Optional<User> existing = userRepository.findByEmail(req.getEmail());
        if (existing.isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        userRepository.save(user);
    }



    // Optional: fetch full User entity by email (e.g., for BlogController)
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public UserDto login(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }

        return toDTO(user);
    }

    @Override
    public UserDto getCurrentUserFromToken(String token) {
        if (token == null) {
            throw new BadCredentialsException("Unauthorized");
        }

        String email;
        try {
            email = jwtUtil.extractUsername(token);
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid token");
        }

        if (!jwtUtil.validateToken(token, userDetailsService.loadUserByUsername(email))) {
            throw new BadCredentialsException("Unauthorized");
        }

        User user = getUserByEmail(email);
        return toDTO(user);
    }

    private UserDto toDTO(User user) {
        return new UserDto(user.getId(), user.getName(), user.getEmail());
    }
}
