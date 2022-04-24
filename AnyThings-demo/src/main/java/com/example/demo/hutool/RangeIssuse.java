package com.example.demo.hutool;


import cn.hutool.core.lang.Range;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;

/**
 * 创建时间: 2022/4/15 11:29 上午
 *
 * @Author: tianjie
 * 描述:
 **/
public class RangeIssuse {

    public static void main(String[] args) {
        new Range<Long>(
                1648915200000L,
                1650384000000L,
                (c, end, i) -> {
                    if ((end - c) / DateUtils.MILLIS_PER_DAY > 0) {
                        return c + DateUtils.MILLIS_PER_DAY;
                    }
                    return null;
                }
        ).forEachRemaining(item ->
                System.out.println(DateFormatUtils.format(item, "yyyy-MM-dd"))
        );
    }
}
