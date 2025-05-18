package com.omnify_blog.server.services;

import com.omnify_blog.server.dto.UserDto;

public interface AuthService {
    UserDto getCurrentUserFromToken(String token);
}