new page_load("login.html", _this = {
        dom: {
            $input_username: $('#input-username'),
            $input_password: $('#input-password'),
            $btn_login: $("#btn-login"),
        },
        data: {
            utools_db: new UtoolsDB(),
        },
        func: {
            login: () => {
                let username = _this.dom.$input_username.val();
                let password = _this.dom.$input_password.val();
                username = _this.data.string_util.defaultIfNull(username, "")
                password = _this.data.string_util.defaultIfNull(password, "")

                if (_this.data.string_util.isBlank(username)) {
                    toast("请输入用户名", "warning")
                    return false
                }

                if (_this.data.string_util.isBlank(password)) {
                    toast("请输入密码", "warning")
                    return false
                }
                console.log({
                    username, password
                })
                $.ajax({
                    url: "http://sep-crm.dj.snowballfinance.com/crm-api/user/login",
                    data: {
                        "username": username,
                        "password": password,
                        "crm": "dj-crms"
                    },
                    type: "POST",
                    cache: false,
                    success: res => {
                        console.log("登陆成功")
                        _this.data.utools_db.put("username", username)
                        _this.data.utools_db.put("password", password)
                        _this.dom.$index_body.load(
                            _this.data.path_main
                        )

                    },
                    error: (err) => {
                        console.log({err})
                        if (err.responseJSON) {
                            console.log("内网用户访问")
                            let data = err.responseJSON;
                            toast(data.error_description, "danger")
                            return false;
                        }
                        if (err.message == "Network Error" || !err.response || !err.response.data) {
                            console.log("外网用户访问")
                            toast("仅限公司内部使用，外网无法访问", "danger")
                            return false;
                        }
                        toast("系统错误，请稍后重试", "danger")
                    }
                });

            }
        },
        on_ready: () => {
        },
        listener: () => {
            // 点击登陆按钮
            _this.dom.$btn_login.click(
                _this.func.login
            )
        }
    }
)