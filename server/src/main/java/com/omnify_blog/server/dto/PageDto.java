package com.omnify_blog.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageDto {

    private List<BlogDto> content;
    private int pageNumber;
    private int totalPages;
    private long totalElements;
    private boolean lastPage;
}
