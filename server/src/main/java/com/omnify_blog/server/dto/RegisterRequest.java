package com.omnify_blog.server.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    public String name;
    public String email;
    public String password;
}
