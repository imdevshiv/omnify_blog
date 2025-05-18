package com.omnify_blog.server.controllers;

import com.omnify_blog.server.dto.BlogDto;
import com.omnify_blog.server.dto.PageDto;
import com.omnify_blog.server.services.BlogService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/blog")
public class BlogController {

    private final BlogService blogService;

    @Autowired
    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    // Create a blog (auth required)
    @PostMapping
    public ResponseEntity<BlogDto> addBlog(
            @Valid @RequestBody BlogDto blogDto,
            @AuthenticationPrincipal UserDetails userDetails) {
        String authorEmail = userDetails.getUsername();
        BlogDto savedBlog = blogService.createBlog(blogDto, authorEmail);
        return new ResponseEntity<>(savedBlog, HttpStatus.CREATED);
    }

    // List blogs paginated (public)
    @GetMapping
    public ResponseEntity<PageDto> getBlogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
    @RequestParam(defaultValue = "createdDate,desc") String sort) {
        PageDto pageDto = blogService.getBlogs(page, size,sort);
        return new ResponseEntity<>(pageDto, HttpStatus.OK);
    }

    // Get a single blog by id (public)
    @GetMapping("/{id}")
    public ResponseEntity<BlogDto> getBlogById(@PathVariable Long id) {
        BlogDto blogDto = blogService.getBlogById(id);
        return new ResponseEntity<>(blogDto, HttpStatus.OK);
    }

    // Update blog (auth required)
    @PutMapping("/{id}")
    public ResponseEntity<BlogDto> updateBlog(
            @PathVariable Long id,
            @Valid @RequestBody BlogDto blogDto,
            @AuthenticationPrincipal UserDetails userDetails) {
        String authorEmail = userDetails.getUsername();
        BlogDto updatedBlog = blogService.updateBlog(id, blogDto, authorEmail);
        return new ResponseEntity<>(updatedBlog, HttpStatus.OK);
    }

    // Delete blog by id (auth required)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlog(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        String authorEmail = userDetails.getUsername();
        blogService.deleteBlog(id, authorEmail);
        return new ResponseEntity<>("Blog deleted successfully", HttpStatus.NO_CONTENT);
    }

    @GetMapping("/my-blogs")
    public ResponseEntity<?> getMyBlogs(
            @CookieValue(name = "jwt", required = false) String token,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        if (token == null || token.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
        }

        try {
            PageDto pageDto = blogService.getBlogsByUserToken(token, page, size);
            return ResponseEntity.ok(pageDto);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
    }



    // Delete all blogs - maybe admin only, keep if needed
    @DeleteMapping("/admin/deleteAll")
    public ResponseEntity<String> deleteAllBlogs() {
        blogService.deleteAll();
        return ResponseEntity.ok("All blogs deleted by admin");
    }
}