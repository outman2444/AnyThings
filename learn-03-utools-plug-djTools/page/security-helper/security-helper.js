/**
 * dom 定义 start
 */
const dom = {
	// input
	$input_encode: $("#input-encode"),
	$input_decode: $("#input-decode"),
	$input_key: $("#input-key"),
	$input_iv: $("#input-iv"),
	// div
	$div_encode: $("#div-encode"),
	$div_decode: $("#div-decode"),
	// btn
	$btn_setting: $("#btn-setting"),
	$btn_save_key: $("#btn-save—key"),
	// form
	$form_setting_key: $("#form-setting-key"),
	$btn_save_cancel: $("#btn-save—cancel")
}

/**
 * 全局数据
 */
const data = {
	// 蛋卷加解密对象
	djTriDes: new DjTriDes(),
	// 密钥
	key: "",
	// 密钥向量
	iv: ""
}

/**
 * 初始化数据
 */
const init = function() {
	dom.$form_setting_key.hide()
	data.key = utools.db.get("security-helper-key")
	data.iv = utools.db.get("security-helper-iv")
	console.log({
		key: data.key,
		iv: data.iv
	})

	// 隐藏表单
	dom.$form_setting_key.hide()
	// 显示设置按钮
	dom.$btn_setting.show()

	console.log("加解密工具初始化完成")
	console.log(data)
}
init()

/**
 * 事件绑定 start
 */

// 加密输入框失焦
dom.$input_encode.blur(() => {
	if (!func.checkKey()) {
		toast("key&iv 无效")
		return false;
	}
	let str = dom.$input_encode.val();
	let encodedStr = data.djTriDes.encode(str, data.key, data.iv)
	dom.$div_encode.text(encodedStr)
})
// 解密输入框失焦
dom.$input_decode.blur(() => {
	if (!func.checkKey()) {
		toast("key&iv 无效")
		return false;
	}
	let str = dom.$input_decode.val();
	let decodedStr = data.djTriDes.decode(str, data.key, data.iv)
	dom.$div_decode.text(decodedStr)
})

// 点击设置密钥按钮
dom.$btn_setting.click(() => {
	// 显示表单
	dom.$form_setting_key.show()
	// 隐藏自己
	dom.$btn_setting.hide()
})

// 保存 key iv
dom.$btn_save_key.click(() => {
	// 保存数据
	data.key = dom.$input_key.val();
	data.iv = dom.$input_iv.val();

	if (!func.checkKey()) {
		toast("key&iv 无效")
		return false;
	}

	// 隐藏表单
	dom.$form_setting_key.hide()
	// 显示设置按钮
	dom.$btn_setting.show()

	utools.db.put({
		_id: "security-helper-key",
		data: data.key
	})

	utools.db.put({
		_id: "security-helper-iv",
		data: data.iv
	})

})

dom.$btn_save_cancel.click(() => {
	// 隐藏表单
	dom.$form_setting_key.hide()
	// 显示设置按钮
	dom.$btn_setting.show()
})
/**
 * 事件绑定 end
 */

/**
 * 业务逻辑
 */

const func = {
	checkKey: () => {
		if (!data.key) {
			return false
		} else {
			return data.key.length === 24;
		}
		if (!data.iv) {
			return false
		} else {
			return data.iv.length === 8;
		}
	}
}

