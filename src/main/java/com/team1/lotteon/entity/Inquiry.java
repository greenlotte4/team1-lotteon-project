package com.team1.lotteon.entity;

import com.team1.lotteon.entity.enums.InquiryType1;
import com.team1.lotteon.entity.enums.InquiryType2;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Inquiry extends  Article {
    private InquiryType1 inquiryType1;
    private InquiryType2 inquiryType2;
    private String answer;
}