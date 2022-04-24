package com.example.demo.other;

import org.apache.commons.lang3.time.DateFormatUtils;

import java.sql.Date;
import java.time.LocalDate;
import java.time.ZoneOffset;

/**
 * 创建时间: 2022/4/11 8:51 下午
 *
 * @Author: tianjie
 * 描述:
 **/
public class Demo {
    public static void main(String[] args) {
        java.util.Date from = Date.from(LocalDate.now().atStartOfDay(ZoneOffset.ofHours(8)).toInstant());
        System.out.println(DateFormatUtils.format(from , "yyyy-MM-dd HH:mm:ss"));

        System.out.println(LocalDate.now().minusDays(1).atStartOfDay().toInstant(ZoneOffset.ofHours(8)).toEpochMilli());
    }
}
