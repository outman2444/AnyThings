
console.log("21")
// dom 定义
var $input_encode = $("#input-encode")
var $div_encode = $("#div-encode")
var $input_decode = $("#input-decode")
var $div_decode = $("#div-decode")
var $div_setting_key = $("#div-setting-key")


// 事件绑定
$input_encode.blur(() => {
	console.log("2")
	let str = $input_encode.val();
	let encodedStr = encode(str)
	$div_encode.text(encodedStr)
})

$input_decode.blur(() => {
	let str = $input_decode.val();
	let decodedStr = decode(str)
	$div_decode.text(decodedStr)
})

// 加密算法对象
function TriDes () {

	const keyHex = CryptoJS.enc.Base64.parse(key);
	const ivHex = CryptoJS.enc.Base64.parse(iv);

	// 加密
	this.encode = function(value) {
		value = CryptoJS.enc.Base64.parse(value);
		let encrypted = CryptoJS.TripleDES.encrypt(value, keyHex, {
			iv: ivHex,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return encrypted.toString();
	}

	// 解密
	this.decode = function(value) {
		let decrypted = CryptoJS.TripleDES.decrypt({
			ciphertext: CryptoJS.enc.Base64.parse(value)
		}, keyHex, {
			iv: ivHex,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		value = decrypted.toString(CryptoJS.enc.Utf8);
		value = CryptoJS.enc.Base64.stringify(value);
		return value;
	}
}

var triDes = new TriDes();

// 加密
function encode (str) {
	return triDes.encode(str);
}

// 解密
function decode (str) {
	return triDes.decode(str);
}


