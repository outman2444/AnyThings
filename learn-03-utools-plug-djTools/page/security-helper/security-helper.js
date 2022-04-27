/**
 * dom 定义 start
 */
const dom = {
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
	data.key = utools.db.get("security-helper-key")
	data.iv = utools.db.get("security-helper-iv")
	console.log({
		key: data.key,
		iv: data.iv
	})

	// 隐藏表单
	dom.$row_setting.hide()
}
init()

/**
 * 事件绑定 start
 */

// 加密
dom.$btn_encode.click(() => {
	if (!func.checkKey()) {
		toast("key&iv 无效，请设置密钥", "danger")
		return false;
	}
	let str = dom.$input_value.val();
	if (!func.checkValue(str)) {
		toast("请输入需要加密的内容", "danger")
		return false;
	}
	let encodedStr = data.djTriDes.encode(str, data.key, data.iv)
	dom.$textarea_results.text(encodedStr)
})
// 解密
dom.$btn_decode.click(() => {
	if (!func.checkKey()) {
		toast("key&iv 无效，请设置密钥", "danger")
		return false;
	}
	let str = dom.$input_value.val();
	if (!func.checkValue(str)) {
		toast("请输入需要解密的内容", "danger")
		return false;
	}
	let decodedStr = data.djTriDes.decode(str, data.key, data.iv)
	dom.$textarea_results.text(decodedStr)
})

// 点击设置密钥按钮
dom.$btn_setting.click(() => {
	// 显示设置
	dom.$row_setting.show()
})

// 保存 key iv
dom.$btn_save_key.click(() => {
	// 保存数据
	data.key = dom.$input_key.val();
	data.iv = dom.$input_iv.val();

	if (!func.checkKey()) {
		toast("key&iv 无效，请设置密钥", "danger")
		return false;
	}

	// 隐藏设置
	dom.$row_setting.hide()

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
	// 隐藏设置
	dom.$row_setting.hide()
})
/**
 * 事件绑定 end
 */

/**
 * 业务逻辑
 */
const func = {
	// 检查密钥
	checkKey: () => {
		if (!data.key || data.key === '' || data.key.length !== 32) {
			console.log("key err")
			return false
		}
		if (!data.iv || data.iv === '' || data.iv.length !== 12) {
			console.log("iv err")
			return false
		}
		return true;
	},
	// 检查 值
	checkValue: (value) => {
		if (!value || value === '' || data.key.length === 0) {
			console.log("value err")
			return false
		}
		return true;
	}

}

