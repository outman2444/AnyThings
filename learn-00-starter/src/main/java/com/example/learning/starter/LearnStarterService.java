package com.example.learning.starter;


import javax.annotation.Resource;
import java.util.StringJoiner;

/**
 * 学习启动服务
 *
 * @author tianjie
 * @date 2022/04/25
 */
public class LearnStarterService {

    @Resource
    private LearnStarterProperties learnStarterProperties;

    public String say() {
        return new StringJoiner("\n\t")
                .add("姓名：" + learnStarterProperties.getName())
                .add("年龄：" + learnStarterProperties.getAge())
                .add("爱好：" + learnStarterProperties.getPlay())
                .toString();
    }
}
