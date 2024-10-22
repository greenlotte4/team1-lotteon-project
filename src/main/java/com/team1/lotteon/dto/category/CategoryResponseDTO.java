package com.team1.lotteon.dto.category;

import com.team1.lotteon.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResponseDTO {
    private Long id;
    private String name;

    public static CategoryResponseDTO fromEntity(Category category) {
        return CategoryResponseDTO
                .builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }
}