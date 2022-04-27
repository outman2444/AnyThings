const alert_success = '<div class="alert alert-success" style="width:50%;margin: 5px; float:right"><span></span></div>'
const alert_info = '<div class="alert alert-info" style="width:50%;margin: 5px; float:right"><span></span></div>'
const alert_warning = '<div class="alert alert-warning" style="width:50%;margin: 5px; float:right"><span></span></div>'
const alert_danger = '<div class="alert alert-danger" style="width:50%; margin: 5px;float:right"><span></span></div>'

// 吐司
function toast (mess, type) {
	console.log({
		toast: type,
		mess: mess
	})
	let str = getAlert(type)
	$("body").append(str);
	$(".alert").fadeIn().find("span").html(mess);
	setTimeout(function() {
		$(".alert").fadeOut();
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