/**
 * 页面加载
 */
page_load("security-helper.js", {
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
		on_ready: (page) => {
			page.data.key = page.data.utools_db.get("security-helper-key")
			page.data.iv = page.data.utools_db.get("security-helper-iv")

			// 隐藏表单
			page.dom.$row_setting.hide()
		},
		func: {

			// 加密
			btn_encode_click: () => {
				console.log("加密")
				console.log(this)
				if (!checkKey()) {
					toast("key&iv 无效，请设置密钥", "danger")
					return false;
				}
				let str = this.dom.$input_value.val();
				if (!this.func.checkValue(str)) {
					toast("请输入需要加密的内容", "danger")
					return false;
				}
				let encodedStr = this.data.djTriDes.encode(str, this.data.key, this.data.iv)
				console.log("结果：" + encodedStr)
				this.dom.$textarea_results.val(encodedStr)
			},

			// 检查密钥
			checkKey: () => {
				console.log({
					key: this.data.key,
					iv: this.data.iv
				})
				if (!this.data.key || this.data.key === '' || this.data.key.length !== 32) {
					console.log("key err")
					return false
				}
				if (!this.data.iv || data.iv === '' || this.data.iv.length !== 12) {
					console.log("iv err")
					return false
				}
				return true;
			},
			// 检查 值
			checkValue: (value) => {
				if (!value || value === '' || this.data.key.length === 0) {
					console.log("value err")
					return false
				}
				return true;
			}
		},
		listener: (page) => {
			// 加密
			page.dom.$btn_encode.click(page.func.btn_encode_click())
			// 解密
			page.dom.$btn_decode.click(() => {
				console.log("解密")
				if (!this.func.checkKey()) {
					toast("key&iv 无效，请设置密钥", "danger")
					return false;
				}
				let str = this.dom.$input_value.val();
				if (!this.func.checkValue(str)) {
					toast("请输入需要解密的内容", "danger")
					return false;
				}
				let decodedStr = this.data.djTriDes.decode(str, this.data.key, this.data.iv)
				console.log("结果：" + decodedStr)
				this.dom.$textarea_results.val(decodedStr)
			})

			// 点击设置密钥按钮
			page.dom.$btn_setting.click(() => {
				// 显示设置
				this.dom.$row_setting.show()
			})

			// 保存 key iv
			page.dom.$btn_save_key.click(() => {
				// 保存数据
				this.data.key = this.dom.$input_key.val();
				this.data.iv = this.dom.$input_iv.val();

				if (!this.func.checkKey()) {
					toast("key&iv 无效，请设置密钥", "danger")
					return false;
				}

				// 隐藏设置
				this.dom.$row_setting.hide()

				// 数据持久化
				this.data.utools_db.put("security-helper-key", this.data.key)
				this.data.utools_db.put("security-helper-iv", this.data.iv)

			})

			page.dom.$btn_save_cancel.click(() => {
				// 隐藏设置
				this.dom.$row_setting.hide()
			})
		}
	}
)

// /**
//  * dom 定义 start
//  */
// const dom = {
// 	// input
// 	$input_value: $("#input-value"),
// 	$input_key: $("#input-key"),
// 	$input_iv: $("#input-iv"),
// 	// textarea
// 	$textarea_results: $("#textarea-results"),
// 	// btn
// 	$btn_encode: $("#btn-encode"),
// 	$btn_decode: $("#btn-decode"),
// 	$btn_setting: $("#btn-setting"),
// 	$btn_save_key: $("#btn-save—key"),
// 	$btn_save_cancel: $("#btn-save—cancel"),
// 	// form
// 	$form_setting_key: $("#form-setting-key"),
// 	// row
// 	$row_setting: $("#row-setting"),
// }
//
// /**
//  * 全局数据
//  */
// const data = {
// 	// 蛋卷加解密对象
// 	djTriDes: new DjTriDes(),
// 	// 数据库对象
// 	utools_db: new UtoolsDB(),
// 	// 密钥
// 	key: "",
// 	// 密钥向量
// 	iv: ""
// }
//
// /**
//  * 初始化数据
//  */
// const init = function() {
// 	data.key = data.utools_db.get("security-helper-key")
// 	data.iv = data.utools_db.get("security-helper-iv")
//
// 	// 隐藏表单
// 	dom.$row_setting.hide()
// }
// init()
//
// /**
//  * 事件绑定 start
//  */
//
// // 加密
// dom.$btn_encode.click(() => {
// 	console.log("加密")
// 	if (!func.checkKey()) {
// 		toast("key&iv 无效，请设置密钥", "danger")
// 		return false;
// 	}
// 	let str = dom.$input_value.val();
// 	if (!func.checkValue(str)) {
// 		toast("请输入需要加密的内容", "danger")
// 		return false;
// 	}
// 	let encodedStr = data.djTriDes.encode(str, data.key, data.iv)
// 	console.log("结果：" + encodedStr)
// 	dom.$textarea_results.val(encodedStr)
// })
// // 解密
// dom.$btn_decode.click(() => {
// 	console.log("解密")
// 	if (!func.checkKey()) {
// 		toast("key&iv 无效，请设置密钥", "danger")
// 		return false;
// 	}
// 	let str = dom.$input_value.val();
// 	if (!func.checkValue(str)) {
// 		toast("请输入需要解密的内容", "danger")
// 		return false;
// 	}
// 	let decodedStr = data.djTriDes.decode(str, data.key, data.iv)
// 	console.log("结果：" + decodedStr)
// 	dom.$textarea_results.val(decodedStr)
// })
//
// // 点击设置密钥按钮
// dom.$btn_setting.click(() => {
// 	// 显示设置
// 	dom.$row_setting.show()
// })
//
// // 保存 key iv
// dom.$btn_save_key.click(() => {
// 	// 保存数据
// 	data.key = dom.$input_key.val();
// 	data.iv = dom.$input_iv.val();
//
// 	if (!func.checkKey()) {
// 		toast("key&iv 无效，请设置密钥", "danger")
// 		return false;
// 	}
//
// 	// 隐藏设置
// 	dom.$row_setting.hide()
//
// 	// 数据持久化
// 	data.utools_db.put("security-helper-key", data.key)
// 	data.utools_db.put("security-helper-iv", data.iv)
//
// })
//
// dom.$btn_save_cancel.click(() => {
// 	// 隐藏设置
// 	dom.$row_setting.hide()
// })
// /**
//  * 事件绑定 end
//  */
//
// /**
//  * 业务逻辑
//  */
// const func = {
// 	// 检查密钥
// 	checkKey: () => {
// 		console.log({
// 			key: data.key,
// 			iv: data.iv
// 		})
// 		if (!data.key || data.key === '' || data.key.length !== 32) {
// 			console.log("key err")
// 			return false
// 		}
// 		if (!data.iv || data.iv === '' || data.iv.length !== 12) {
// 			console.log("iv err")
// 			return false
// 		}
// 		return true;
// 	},
// 	// 检查 值
// 	checkValue: (value) => {
// 		if (!value || value === '' || data.key.length === 0) {
// 			console.log("value err")
// 			return false
// 		}
// 		return true;
// 	}
//
// }
//
