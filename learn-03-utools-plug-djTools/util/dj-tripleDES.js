// 加密算法对象
function DjTriDes () {

	// 加密
	this.encode = function(value, key, iv) {
		const keyHex = CryptoJS.enc.Base64.parse(key);
		const ivHex = CryptoJS.enc.Base64.parse(iv);
		value = Base64.encode(value)
		let encrypted = CryptoJS.TripleDES.encrypt(value, keyHex, {
			iv: ivHex,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return encrypted.toString();
	}

	// 解密
	this.decode = function(value, key, iv) {
		const keyHex = CryptoJS.enc.Base64.parse(key);
		const ivHex = CryptoJS.enc.Base64.parse(iv);
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