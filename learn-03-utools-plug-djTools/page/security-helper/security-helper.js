/**
 * 页面加载
 */
new page_load("security-helper.js", _this = {
        dom: {
            // input
            $input_value: $("#input-value"),
            $input_key: $("#input-key"),
            $input_iv: $("#input-iv"),
            // textarea
            $textarea_results: $("#textarea-results"),
            // btn
            $btn_encode: $("#btn-encode"),
            $btn_decode: $("#btn-decode"),
            $btn_setting: $("#btn-setting"),
            $btn_save_key: $("#btn-save—key"),
            $btn_save_cancel: $("#btn-save—cancel"),
            // form
            $form_setting_key: $("#form-setting-key"),
            // row
            $row_setting: $("#row-setting"),
        },
        data: {
            // 蛋卷加解密对象
            djTriDes: new DjTriDes(),
            // 数据库对象
            utools_db: new UtoolsDB(),
            // 密钥
            key: "",
            // 密钥向量
            iv: ""
        },
        on_ready: () => {
            _this.data.key = _this.data.utools_db.get("security-helper-key")
            _this.data.iv = _this.data.utools_db.get("security-helper-iv")

            // 隐藏表单
            _this.dom.$row_setting.hide()
        },
        func: {
            // 加密
            btn_encode_click: () => {
                if (!_this.func.checkKey()) {
                    toast("key&iv 无效，请设置密钥", "danger")
                    return false;
                }
                let str = _this.dom.$input_value.val();
                if (!_this.func.checkValue(str)) {
                    toast("请输入需要加密的内容", "danger")
                    return false;
                }
                let encodedStr = _this.data.djTriDes.encode(str, _this.data.key, _this.data.iv)
                console.log("结果：" + encodedStr)
                _this.dom.$textarea_results.val(encodedStr)
            },
            // 解密
            btn_decode_click: () => {
                console.log("解密")
                if (!_this.func.checkKey()) {
                    toast("key&iv 无效，请设置密钥", "danger")
                    return false;
                }
                let str = _this.dom.$input_value.val();
                if (!_this.func.checkValue(str)) {
                    toast("请输入需要解密的内容", "danger")
                    return false;
                }
                let decodedStr = _this.data.djTriDes.decode(str, _this.data.key, _this.data.iv)
                console.log("结果：" + decodedStr)
                _this.dom.$textarea_results.val(decodedStr)
            },
            // 保存密钥
            btn_save_key_click: () => {
                // 保存数据
                _this.data.key = _this.dom.$input_key.val();
                _this.data.iv = _this.dom.$input_iv.val();

                if (!_this.func.checkKey()) {
                    toast("key&iv 无效，请设置密钥", "danger")
                    return false;
                }

                // 隐藏设置
                _this.dom.$row_setting.hide()

                // 数据持久化
                _this.data.utools_db.put("security-helper-key", _this.data.key)
                _this.data.utools_db.put("security-helper-iv", _this.data.iv)

            },
            // 检查密钥
            checkKey: () => {
                console.log({
                    key: _this.data.key,
                    iv: _this.data.iv
                })
                if (!_this.data.key || _this.data.key === '' || _this.data.key.length !== 32) {
                    console.log("key err")
                    return false
                }
                if (!_this.data.iv || _this.data.iv === '' || _this.data.iv.length !== 12) {
                    console.log("iv err")
                    return false
                }
                return true;
            },
            // 检查 值
            checkValue: (value) => {
                if (!value || value === '' || _this.data.key.length === 0) {
                    console.log("value err")
                    return false
                }
                return true;
            }
        },
        listener: () => {
            // 加密
            _this.dom.$btn_encode.click(
                _this.func.btn_encode_click
            )
            // 解密
            _this.dom.$btn_decode.click(
                _this.func.btn_decode_click
            )
            // 点击设置密钥按钮
            _this.dom.$btn_setting.click(() => {
                // 显示设置
                _this.dom.$row_setting.show()
            })
            // 保存 key iv
            _this.dom.$btn_save_key.click(
                _this.func.btn_save_key_click
            )
            _this.dom.$btn_save_cancel.click(() => {
                // 隐藏设置
                _this.dom.$row_setting.hide()
            })
        }
    }
);