package com.team1.lotteon.controller.admin.config;

import com.team1.lotteon.dto.ConfigDTO;
import com.team1.lotteon.dto.VersionDTO;
import com.team1.lotteon.dto.category.CategoryWithChildrenResponseDTO;
import com.team1.lotteon.service.CategoryService;
import com.team1.lotteon.service.admin.InfoService;
import com.team1.lotteon.service.admin.VersionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Log4j2
@RequiredArgsConstructor
@Controller
public class ConfigPageController {
    private final CategoryService categoryService;
    private final InfoService infoService;
    private final VersionService versionService;

    // info 페이지 이동시 config 정보 담기
    @GetMapping("/admin/config/info")
    public String info(Model model){

        ConfigDTO config = infoService.getCompanyInfo();
        model.addAttribute("config", config);

        return "admin/config/info";
    }

//    @GetMapping("/admin/config/policy")
//    public String policy(){
//
//        return "admin/config/policy";
//    }

    @GetMapping("/admin/config/version")
    public String version(@RequestParam(defaultValue = "0") int page, Model model) {
        Page<VersionDTO> versionPage = versionService.getAllVersions(page, 10); // 현재 페이지와 10개 가져오기
        model.addAttribute("versions", versionPage.getContent()); // 현재 페이지의 버전 데이터
        model.addAttribute("currentPage", page); // 현재 페이지 번호
        model.addAttribute("totalPages", versionPage.getTotalPages()); // 총 페이지 수
        return "admin/config/version"; // 뷰 이름
    }


    @GetMapping("/admin/config/banner")
    public String banner(){

        return "admin/config/banner";
    }

    @GetMapping("/admin/config/category")
    public String category(Model model){
        List<CategoryWithChildrenResponseDTO> allRootCategories = categoryService.getAllRootCategories();
        model.addAttribute("categories", allRootCategories);
        System.out.println("allRootCategories = " + allRootCategories);
        return "admin/config/category";
    }
}
