const alert_success = '<div></div><div class="alert alert-success" style="margin: 3px 0px;padding: 5px;text-align: right;width: auto"><span></span></div></div>'
const alert_info = '<div class="alert alert-info" style="margin: 3px 0px;padding: 5px;text-align: right;width: auto"><span></span></div>'
const alert_warning = '<div class="alert alert-warning" style="margin: 3px 0px;padding: 5px;text-align: right;width: auto"><span></span></div>'
const alert_danger = '<div class="alert alert-danger" style="margin: 3px 0px;padding: 5px;text-align: right;width: auto"><span></span></div>'

/**
 * 全局页面吐司
 * @param mess
 * @param type
 */
function toast (mess, type) {
	console.log({
		toast: type,
		mess: mess
	})
	let str = getAlert(type)
	$("#div-toast").append(str);
	$(".alert").fadeIn().find("span").html(mess);
	setTimeout(function() {
		$(".alert").fadeOut();
		$(".alert").remove();
	}, 2000)
}

function getAlert (type) {
	switch (type) {
		case 'success':
			return alert_success;
		case 'info':
			return alert_info;
		case 'warning':
			return alert_warning;
		case 'danger':
			return alert_danger;
		default :
			return alert_success;

	}
}