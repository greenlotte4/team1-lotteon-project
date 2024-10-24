package com.team1.lotteon.dto.product;

import com.team1.lotteon.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSummaryResponseDTO {
    private Long id;
    private String name;
    private String description;
    private int price;
    private int discountRate;
    private int deliveryFee;
    private int point;
    private int stock;
    private String sellerName;
    private String sellerReputation;
    private String productRating;
    private String imageUrl;
    private int views;
    private int discountedPrice;

    public static ProductSummaryResponseDTO fromEntity(Product product) {
        return ProductSummaryResponseDTO.builder()
                .id(product.getId())
                .name(product.getProductName())
                .description(product.getDescription())
                .price(product.getPrice())
                .discountRate(product.getDiscountRate())
                .discountedPrice(calculateDiscountedPrice(product.getPrice(), product.getDiscountRate()))
                .deliveryFee(product.getDeliveryFee())
                .point(product.getPoint())
                .stock(product.getStock())
                .sellerName(product.getMember() != null ?  product.getMember().getShop() != null ? product.getMember().getShop().getShopName() : null : null)
                .imageUrl(product.getProductImg1())
                .views(product.getViews())
                .build();
    }

    private static int calculateDiscountedPrice(int originalPrice, int discountRate) {
        // 할인률을 퍼센트로 변환하여 적용
        double discountAmount = originalPrice * (discountRate / 100.0);
        int discountedPrice = (int) (originalPrice - discountAmount);

        return discountedPrice;
    }
}
