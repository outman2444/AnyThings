package com.example.learning.starter;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * 学习起动器属性
 *
 * @author tianjie
 * @date 2022/04/25
 */
@Data
@ConfigurationProperties(prefix = "learn.starter")
public class LearnStarterProperties {

    /**
     * 名字
     */
    private String name;

    /**
     * 年龄
     */
    private Integer age;

    /**
     * 玩
     */
    private String play;


}
