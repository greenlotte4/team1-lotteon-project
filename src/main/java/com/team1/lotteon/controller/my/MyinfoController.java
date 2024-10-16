package com.team1.lotteon.controller.my;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Log4j2
@Controller
public class MyinfoController {
    @GetMapping("/myPage/home")
    public String home() {
        return "myPage/home";
    }

    @GetMapping("/myPage/{cate}")
    public String myinfoindex(@PathVariable String cate, Model model){

        log.info("컨트롤러 들어오니?");
        log.info(cate);
        model.addAttribute("cate", cate);


        return "myPage/layout/mypage_layout";
    }
}
