new page_load("tail-log.html", _this = {
        dom: {
            $select_env: $("#select_env"),
            $select_project: $("#select_project"),
            $select_ip: $("#select_ip")
        },
        data: {
            url_sit_rolling_project_list: "http://sce-rolling.snowballfinance.com/api/v1/projects-list.json",
            url_rolling_login: "http://rolling.snowballfinance.com/login",
            baidu: "https://baidu.com"
        },
        func: {
            // 加载项目列表
            load_project_list: () => {

                $.ajax({
                    url: "http://localhost:3210/",
                    type: "GET",
                    cache: false,
                    success: resp => {
                        console.log({resp})
                    },
                    error: err => {
                        console.log({err})
                    }
                });


                // _this.data.utools_browser.goto(
                //     _this.data.url_rolling_login,
                //     goto => {
                //         goto
                //             .value("body > div > div > div.login-box-body > form > div:nth-child(1) > input", "tianjie")
                //             .value("body > div > div > div.login-box-body > form > div:nth-child(2) > input", "tj123456?")
                //             .click("body > div > div > div.login-box-body > form > div.row > div > button")
                //             .devTools("bottom")
                //             .evaluate(() => {
                //                 let project_list = document.querySelector("body > div > aside > section > ul").childNodes;
                //                 console.log({project_list})
                //                 for (let i = 0; i < project_list.length; i++) {
                //                     let li = project_list[i]
                //                     if (li.outerText) {
                //                         console.log(li.outerText)
                //                         $select_project.append('<option>'+li.outerText+'</option>')
                //                     }
                //                 }
                //             })
                //     }
                // )

                // _this.data.dj_request.get(
                //     _this.data.baidu,
                //     resp => {
                //         console.log("加载项目列表", {resp})
                //     },
                //     err => {
                //         console.log("加载项目列表", {err})
                //     }
                // )

                // utools.ubrowser.goto('https://cn.bing.com')
                //     .value('#sb_form_q', 'uTools')
                //     .click('#sb_form_go')
                //     .run({ width: 1000, height: 600 })

                // utools.ubrowser.setCookies('token' , "123455")
                // console.log({"utools": utools.ubrowser.cookies()})
                // utools.ubrowser.setCookies('token', "123455")
                // console.log({"utools": utools.ubrowser.cookies()})
                // console.log($.cookie("token"))
                // $.cookie("token", "q2343242" , {expires:7 , path:'/'})
                // console.log($.cookie("token"))
            }

        },
        on_ready: () => {
        },
        listener: () => {
            // 选择环境 执行加载项目列表
            _this.dom.$select_env.change(
                _this.func.load_project_list
            )

        }
    }
)