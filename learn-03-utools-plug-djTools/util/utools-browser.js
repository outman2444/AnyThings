/**
 * utools 浏览器操作对象
 */
function UtoolsBrowser() {

    /**
     * 跳转
     * @param url
     * @param headers
     * @param timeout
     */
    this.goto = (url, headers, timeout) => {
        utools.ubrowser.goto(url, headers, timeout);
    }
}