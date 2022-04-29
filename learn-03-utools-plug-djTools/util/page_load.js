/**
 * 页面加载
 * @param page_name
 * @param page
 */
const page_load = function(page_name,
                           page = {
	                           // 页面dom
	                           dom: {},
	                           // 页面数据
	                           data: {},
	                           // 生命周期函数 页面渲染完成 调用
	                           on_ready: null,
	                           // 页面函数
	                           func: {},
	                           // 页面监听器  建议只做绑定 把真实逻辑放在func
	                           listener: () => {
		                           console.log(page + "无监听加载")
	                           }
                           }
) {
	// 执行初始化
	console.log(page_name + "初始化开始")
	if (typeof page.on_ready === "function") {
		page.on_ready(page);
	}
	console.log(page_name + "初始化结束")
	// 加载监听器
	console.log(page_name + "监听绑定开始")
	if (typeof page.listener === "function") {
		page.listener(page);
	}
	console.log(page_name + "监听绑定结束")
}