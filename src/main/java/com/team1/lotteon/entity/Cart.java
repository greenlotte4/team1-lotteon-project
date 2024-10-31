package com.team1.lotteon.entity;

import com.team1.lotteon.entity.productOption.ProductOptionCombination;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

/*
    날짜 : 2024/10/25
    이름 : 이상훈
    내용 : 장바구니 엔티티 생성
*/
@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "product_id")
    private Product product;


    // 수정: ProductOptionCombination 객체를 직접 참조
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "combination_id")
    private ProductOptionCombination productOptionCombination;

    private int totalPrice;
    private int quantity;
}
