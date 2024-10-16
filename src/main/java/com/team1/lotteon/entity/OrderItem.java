package com.team1.lotteon.entity;

import com.team1.lotteon.entity.enums.DeliveryStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int purchasePrice;  // 구매 가격
    private int point;  // 구매 적립 포인트
    private int discountRate;   // 구배 할인률
    private int deliveryFee;    // 구배 배달료
    private int quantity;   // 갯수
    @Enumerated(EnumType.STRING)
    private DeliveryStatus deliveryStatus;  // 배달상태
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "product_id")
    private Product product;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name="order_id")
    private Order order;
}
