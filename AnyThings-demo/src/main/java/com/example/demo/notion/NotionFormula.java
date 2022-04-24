package com.example.demo.notion;


import com.google.common.collect.Maps;
import org.apache.commons.lang3.StringUtils;

import java.util.Map;
import java.util.TreeMap;
import java.util.function.Supplier;


/**
 * notion 公式 格式化
 * <p>
 * 进度条的公式：
 * (prop("进度") / 100 >= 1) ? "✅" : format(slice("▓▓▓▓▓▓▓▓▓▓", 0, floor(prop("进度") / 100 * 10)) + format(slice("░░░░░░░░░░", 0, ceil(10 - prop("进度") / 100 * 10)) + " " + format(round(prop("进度") / 100 * 100)) + (empty(prop("进度")) ? "0%" : "%")))
 * <p>
 * 参考公式：
 * if(prop("复习") == "1", dateAdd(prop("学习日期"), 9, "hours"), if(prop("复习") == "2", dateAdd(prop("学习日期"), 24, "hours"), if(prop("复习") == "3", dateAdd(prop("学习日期"), 48, "hours"), prop("学习日期"))))
 *
 * @author tianjie
 * @date 2022/04/07
 */
public class NotionFormula {

    public static void main(String[] args) {

        String formula = getFormulaByStatus("状态", () -> {
            TreeMap<String, String> statusMap = Maps.newTreeMap();
            statusMap.put("No 状态", "0");
            statusMap.put("需求评审中", "10");
            statusMap.put("详细设计中", "10");
            statusMap.put("开发中", "60");
            statusMap.put("测试中", "10");
            statusMap.put("灰度OrRC", "5");
            statusMap.put("等待上线", "5");
            statusMap.put("结束", "100");
            statusMap.put("放弃开发", "100");
            return statusMap;
        }, "当前进度");
        System.out.println(formula.replace("'", "\""));

        formula = getProgressBar("整体进度", null, "▓", "░");
        System.out.println(formula);

    }

    /**
     * 有进度条
     * 获取进度条
     *
     * @param progressKey    进步关键
     * @param totalKey       总钥匙
     * @param completedShow  完成显示
     * @param unfinishedShow 未完成节目
     * @return {@link String}
     */
    private static String getProgressBar(String progressKey, String totalKey, String completedShow, String unfinishedShow) {

        for (int i = 0; i < 10; i++) {
            completedShow += completedShow;
            unfinishedShow += unfinishedShow;
        }
        String total = getValue(totalKey, "100");
        String progress = getValue(progressKey);

        return "(" + progress + " / " + total + " >= 1) ?" +
                " \"✅\" : " +
                "format(slice(\"▓▓▓▓▓▓▓▓▓▓\", 0, floor(" + progress + " / " + total + " * 10)) + format(slice(\"░░░░░░░░░░\", 0, ceil(10 - " + progress + " / " + total + " * 10)) + \" \" + format(round(" + progress + " / " + total + " * 100)) + (empty(" + progress + ") ? \"0%\" : \"%\")))"
                .replace("'", "\"");
    }


    /**
     * 根据状态获取整体进度
     *
     * @param statusKey         地位key
     * @param progressKey       进步key
     * @param statusMapSupplier 地图供应商地位
     * @return {@link String}
     */
    private static String getFormulaByStatus(String statusKey, Supplier<TreeMap<String, String>> statusMapSupplier, String progressKey) {
        TreeMap<String, String> statusMap = statusMapSupplier.get();
        String status = getValue(statusKey);
        String progress = getValue(progressKey);
        progress = get("(", progress + "/100)");

        Map<String, Supplier<String>> map = Maps.newHashMap();
        String finalProgress = progress;
        map.put(get(status, "==", getFactor("No 状态")),
                () -> finalProgress);
        map.put(get(status, "==", getFactor("需求评审中")),
                () -> get(finalProgress, "*", statusMap.get("需求评审中")));
        map.put(get(status, "==", getFactor("详细设计中")),
                () -> get(statusMap.get("需求评审中"), "+", finalProgress, "*", statusMap.get("详细设计中")));
        map.put(get(status, "==", getFactor("开发中")),
                () -> get(statusMap.get("需求评审中"), "+", statusMap.get("详细设计中"), "+", finalProgress, "*", statusMap.get("开发中")));
        map.put(get(status, "==", getFactor("测试中")),
                () -> get(statusMap.get("需求评审中"), "+", statusMap.get("详细设计中"), "+", statusMap.get("开发中"), "+", finalProgress, "*", statusMap.get("测试中")));
        map.put(get(status, "==", getFactor("灰度OrRC")),
                () -> get(statusMap.get("需求评审中"), "+", statusMap.get("详细设计中"), "+", statusMap.get("开发中"), "+", statusMap.get("测试中"), "+", finalProgress, "*", statusMap.get("灰度OrRC")));
        map.put(get(status, "==", getFactor("等待上线")),
                () -> get(statusMap.get("需求评审中"), "+", statusMap.get("详细设计中"), "+", statusMap.get("开发中"), "+", statusMap.get("测试中"), "+", statusMap.get("灰度OrRC"), "+", finalProgress, "*", statusMap.get("等待上线")));
        map.put(get(status, "==", getFactor("结束")),
                () -> statusMap.get("结束"));
        map.put(get(status, "==", getFactor("放弃开发")),
                () -> statusMap.get("放弃开发"));
        return getIf(map, progress);
    }

    /**
     * 获得价值
     *
     * @param key 关键
     * @return {@link String}
     */
    private static String getValue(String key) {
        return "prop(\"" + key + "\")";
    }

    /**
     * 得到因素
     *
     * @param factor 因素
     * @return {@link String}
     */
    private static String getFactor(String factor) {
        return "\"" + factor + "\"";
    }

    /**
     * 获得价值
     *
     * @param key          关键
     * @param defaultValue 默认值
     */
    private static String getValue(String key, String defaultValue) {
        return StringUtils.isEmpty(key) ? defaultValue : getValue(key);
    }

    /**
     * 得到
     *
     * @param factor 因素
     * @return {@link String}
     */
    private static String get(String... factor) {
        return StringUtils.join(factor, " ");
    }

    /**
     * 如果
     *
     * @param condition    条件
     * @param value        价值
     * @param defaultValue 默认值
     * @return {@link String}
     */
    private static String getIf(String condition, String value, String defaultValue) {
        return get("if(", condition, ",", value, ",", defaultValue, ")");
    }

    /**
     * 如果
     *
     * @param map          地图
     * @param defaultValue 默认值
     * @return {@link String}
     */
    private static String getIf(Map<String, Supplier<String>> map, String defaultValue) {
        String preIf = "";
        String currIf = "";

        for (Map.Entry<String, Supplier<String>> entry : map.entrySet()) {
            if (StringUtils.isEmpty(preIf)) {
                preIf = defaultValue;
            }
            currIf = getIf(
                    entry.getKey(),
                    entry.getValue().get(),
                    preIf
            );
            preIf = currIf;
        }
        return currIf;
    }


}
