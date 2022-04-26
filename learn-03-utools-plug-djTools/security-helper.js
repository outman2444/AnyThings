function TriDes () {

	const keyHex = CryptoJS.enc.Base64.parse(key);
	const ivHex = CryptoJS.enc.Base64.parse(iv);

	// 加密
	this.encode = function(value) {
		value = Base64.encode(value)
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
		return Base64.decode(value);
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


