package com.omnify_blog.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto{
    private Long id;
    private String name;
    private String email;
}