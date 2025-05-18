package com.omnify_blog.server.services;

import com.omnify_blog.server.dto.BlogDto;
import com.omnify_blog.server.dto.PageDto;
import jakarta.validation.Valid;

import java.util.List;

public interface BlogService {
    BlogDto createBlog(BlogDto blogDto, String authorEmail);

    PageDto getBlogs(int page, int size,String sort);

    //    just for development
    void deleteAll();

    BlogDto getBlogById(Long id);

    BlogDto updateBlog(Long id, @Valid BlogDto blogDto, String authorEmail);

    void deleteBlog(Long id, String authorEmail);

    PageDto getBlogsByUserToken(String token, int page, int size);
}
