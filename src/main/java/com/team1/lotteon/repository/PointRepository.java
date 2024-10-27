package com.team1.lotteon.repository;

import com.team1.lotteon.entity.Point;
import com.team1.lotteon.repository.custom.PointRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
/*
    날짜 : 2024/10/23
    이름 : 최준혁
    내용 : 포인트 레파지토리 생성
*/
@Repository
public interface PointRepository extends JpaRepository<Point, Long>, PointRepositoryCustom {

}
