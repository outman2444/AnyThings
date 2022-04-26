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
                1648915200000L,
                (curr, end, i) -> {
                    if ((end - curr) / DateUtils.MILLIS_PER_DAY <= 0) {
                        return null;
                    }
                    return curr + DateUtils.MILLIS_PER_DAY;
                }
        ).forEachRemaining(item ->
                System.out.println(DateFormatUtils.format(item, "yyyy-MM-dd"))
        );
    }
}
