package com.example.web.controller;

import com.example.learn.starter.LearnStarterService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * 测试启动控制器
 *
 * @author tianjie
 * @date 2022/04/24
 */
@RestController
public class TestStartController {

    @Resource
    private LearnStarterService learnStarterService;

    /**
     * 说
     *
     * @return {@link String}
     */
    @GetMapping
    public String say() {
        return learnStarterService.say();
    }
}
