/**
 * 页面加载
 */
new page_load("main.html", _this = {
        dom: {
            $myTab_a: $('#myTab a'),
            $myTab_first: $('#myTab li:eq(0) a'),
            $tab_content: $(".tab-content"),
        },
        data: {
            utools_db: new UtoolsDB(),
        },
        func: {},
        on_ready: () => {
            // 默认选中第一个
            _this.dom.$myTab_first.click()
        },

        listener: () => {
            //  主内容加载
            _this.dom.$myTab_a.click(function () {
                _this.dom.$tab_content.load(
                    $(this).attr("data-src")
                )
            })
        }
    }
)