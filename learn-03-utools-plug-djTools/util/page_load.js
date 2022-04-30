let global_this = {
    // 页面dom
    dom: {},
    // 页面数据
    data: {},
    // 页面函数
    func: {}
}

/**
 * 页面加载
 * @param page_name
 * @param page
 */
function page_load(page_name,
                   _this = {
                       // 页面dom
                       dom: {},
                       // 页面数据
                       data: {},
                       // 页面函数
                       func: {},
                       // 生命周期函数 页面渲染完成 调用
                       on_ready: null,
                       // 页面监听器  建议只做绑定 把真实逻辑放在func
                       listener: () => {
                           console.log(page + "无监听加载")
                       }
                   }
) {

    global_this = {
        dom: {...global_this.dom, ..._this.dom},
        data: {...global_this.data, ..._this.data},
        func: {...global_this.func, ..._this.func}
    }
    _this.dom = global_this.dom
    _this.data = global_this.data
    _this.func = global_this.func

    // 加载监听器
    console.log(page_name + "监听绑定开始")
    if (typeof _this.listener === "function") {
        _this.listener();
    }
    console.log(page_name + "监听绑定结束")

    // 执行初始化
    console.log(page_name + "初始化开始")
    if (typeof _this.on_ready === "function") {
        _this.on_ready();
    }
    console.log(page_name + "初始化结束")
}