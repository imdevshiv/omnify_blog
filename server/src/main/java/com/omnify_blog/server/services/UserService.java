package com.omnify_blog.server.services;

import com.omnify_blog.server.dto.RegisterRequest;
import com.omnify_blog.server.dto.UserDto;
import com.omnify_blog.server.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {


    void register(RegisterRequest req);

    User getUserByEmail(String email);

    UserDto login(String email, String password);

    UserDto getCurrentUserFromToken(String token);
}
