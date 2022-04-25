package com.example.learning.starter;


import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 学习起动器配置
 *
 * @author tianjie
 * @date 2022/04/25
 */
@Configuration
@EnableConfigurationProperties(LearnStarterProperties.class)
public class LearnStarterConfig {

    @Bean
    public LearnStarterService learnStarterService() {
        return new LearnStarterService();
    }

}
