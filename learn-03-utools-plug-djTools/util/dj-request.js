/**
 *  蛋卷-请求工具
 *  小工具登陆时的 账户密码为了后续其他功能做免密支持
 *  在请求其他接口时会自动携带token
 */
function DjRequest() {
    this.url_get_token = "http://sce-rolling.snowballfinance.com/login.json";

    this.get = (url, success, error) => {
        console.log("get", {
            url
        })
        this.getToken((token) => {
                $.ajax({
                    url: url,
                    type: "GET",
                    cache: false,
                    xhrFields: {
                        withCredentials: true
                    },
                    headers: {
                        "Cookie":"token="+token
                    },
                    success: success,
                    error: error
                });
            },
            error => {
                toast("获取token失败")
            }
        )
    }

    this.post = (url, data, success, error) => {
        console.log("post", {
            url, data
        })
        this.getToken(() => {
                $.ajax({
                    url: url,
                    type: "POST",
                    data: data,
                    cache: false,
                    xhrFields: {
                        withCredentials: true
                    },
                    success: success,
                    error: error
                });
            },
            error => {
                toast("获取token失败")
            }
        )
    }

    this.post_json = (url, data, success, error) => {
        console.log("post", {
            url, data
        })
        this.getToken(() => {
                $.ajax({
                    url: url,
                    type: "POST",
                    dataType: 'json',
                    data: JSON.stringify(data),
                    xhrFields: {
                        withCredentials: true
                    },
                    contentType: "application/json;charset=utf-8",
                    cache: false,
                    success: success,
                    error: error
                });
            },
            error => {
                toast("获取token失败")
            }
        )


    }

    /**
     * 获取token
     * @param request
     */
    this.getToken = (success, error) => {
        let username = _this.data.utools_db.get("username");
        let password = _this.data.utools_db.get("password");
        username = _this.data.string_util.defaultIfNull(username, "")
        password = _this.data.string_util.defaultIfNull(password, "")

        $.ajax({
            url: this.url_get_token,
            type: "POST",
            dataType: 'json',
            data: JSON.stringify({
                username, password
            }),
            contentType: "application/json;charset=utf-8",
            cache: false,
            success: resp => {
                console.log("获取token", {resp})
                // request.setRequestHeader("Cookie", "token=" + resp.token);
                $.cookie = "token=" + resp.token
                success(resp.token)
            },
            error: err => {
                console.log("获取token", {err})
                error(err)
            }
        });
    }

}