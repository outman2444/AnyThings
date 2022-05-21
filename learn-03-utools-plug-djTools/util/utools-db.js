/**
 * utools db 操作封装
 */
function UtoolsDB() {
    /**
     * insert or update
     * @param k
     * @param v
     */
    this.put = function (k, v) {
        let db_obj = utools.db.get(k);
        // 更新逻辑
        if (db_obj) {
            utools.db.put({
                _id: k,
                data: v,
                _rev: db_obj._rev
            })
        } else {
            // 新增逻辑
            utools.db.put({
                _id: k,
                data: v
            })
        }
    }

    /**
     * 获取数据
     * @param k
     * @returns {*}
     */
    this.get = function (k) {
        // 获取内容
        let db_obj = utools.db.get(k);
        if (db_obj) {
            return db_obj.data
        } else {
            return null;
        }
    }


}