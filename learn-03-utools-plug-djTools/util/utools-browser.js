/**
 * utools 浏览器操作对象
 */
function UtoolsBrowser() {

    /**
     * 打开浏览器
     * @param url
     * @param op
     */
    this.goto = (url, op = (goto) => {
    }) => {
        let goto = utools.ubrowser.goto(url);
        op(goto)
        goto.run({width: 1000, height: 600})
    }
}