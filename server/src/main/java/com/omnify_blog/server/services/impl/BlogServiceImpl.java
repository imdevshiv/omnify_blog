package com.omnify_blog.server.services.impl;

import com.omnify_blog.server.dto.BlogDto;
import com.omnify_blog.server.dto.PageDto;
import com.omnify_blog.server.dto.UserDto;
import com.omnify_blog.server.model.Blog;
import com.omnify_blog.server.model.User;
import com.omnify_blog.server.repository.BlogRepository;
import com.omnify_blog.server.repository.UserRepository;
import com.omnify_blog.server.services.AuthService;
import com.omnify_blog.server.services.BlogService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @Override
    public BlogDto createBlog(BlogDto blogDto, String authorEmail) {
        User author = userRepository.findByEmail(authorEmail)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + authorEmail));
        Blog blog = new Blog();
        blog.setTitle(blogDto.getTitle());
        blog.setContent(blogDto.getContent());
        blog.setCreatedDate(LocalDateTime.now());
        blog.setAuthor(author);
        Blog saved = blogRepository.save(blog);
        return mapToBlogDto(saved);
    }

    @Override
    public PageDto getBlogs(int page, int size, String sort) {
        String[] sortParams = sort.split(",");
        Sort sortObj = Sort.by(sortParams[0]);
        if (sortParams.length > 1 && sortParams[1].equalsIgnoreCase("desc")) {
            sortObj = sortObj.descending();
        } else {
            sortObj = sortObj.ascending();
        }

        Pageable pageable = PageRequest.of(page, size, sortObj);

        Page<Blog> blogPage = blogRepository.findAll(pageable);

        List<BlogDto> blogDtos = blogPage.getContent()
                .stream()
                .map(this::mapToBlogDto)
                .collect(Collectors.toList());

        return new PageDto(
                blogDtos,
                blogPage.getNumber(),
                blogPage.getTotalPages(),
                blogPage.getTotalElements(),
                blogPage.isLast()
        );
    }


    @Override
    public BlogDto getBlogById(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Blog not found with id: " + id));
        return mapToBlogDto(blog);
    }

    @Override
    public BlogDto updateBlog(Long id, BlogDto blogDto, String authorEmail) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Blog not found with id: " + id));
        if (!blog.getAuthor().getEmail().equals(authorEmail)) {
            throw new SecurityException("You are not authorized to update this blog");
        }
        blog.setTitle(blogDto.getTitle());
        blog.setContent(blogDto.getContent());
        blog.setUpdatedAt(LocalDateTime.now());
        Blog updated = blogRepository.save(blog);
        return mapToBlogDto(updated);
    }

    @Override
    public void deleteBlog(Long id, String authorEmail) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Blog not found with id: " + id));
        if (!blog.getAuthor().getEmail().equals(authorEmail)) {
            throw new SecurityException("You are not authorized to delete this blog");
        }
        blogRepository.delete(blog);
    }

    @Override
    public PageDto getBlogsByUserToken(String token, int page, int size) {
        UserDto userDTO = authService.getCurrentUserFromToken(token);

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Blog> blogPage = blogRepository.findByAuthorEmail(userDTO.getEmail(), pageable);

        List<BlogDto> blogDtos = blogPage.getContent()
                .stream()
                .map(this::mapToBlogDto)
                .toList();

        return new PageDto(
                blogDtos,
                blogPage.getNumber(),
                blogPage.getTotalPages(),
                blogPage.getTotalElements(),
                blogPage.isLast()
        );
    }



    @Override
    public void deleteAll() {
        blogRepository.deleteAll();
    }

    private BlogDto mapToBlogDto(Blog blog) {
        BlogDto dto = new BlogDto();
        dto.setId(blog.getId());
        dto.setTitle(blog.getTitle());
        dto.setContent(blog.getContent());
        dto.setCreatedDate(blog.getCreatedDate());
//         Optionally add author info if your DTO supports it
         dto.setAuthorName(blog.getAuthor().getName());
        return dto;
    }
}