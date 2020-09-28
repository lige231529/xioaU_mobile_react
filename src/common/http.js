class Request {
    constructor(baseURL){
         // 基准地址！
        this.baseURL = baseURL
    }
    /**
     * 封装的请求方法！
     * @param {string} url  请求地址
     * @param {string} type  请求类型，默认get
     * @param {object} data  提交的参数
     * @param {object} headers  请求头配置
     */
    ajax(url, type = "get", data = {}, headers = {}) {
        if (!url) {
            throw new Error('请求地址没有传入')
        }
        type = type.toUpperCase();
        if (!['GET', 'POST'].includes(type)) {
            throw new Error('只支持get和post方式')
        }
        if (type == "GET") {
            // 如果对象是空就不需要处理
            let keyarr = Object.keys(data);
            if (keyarr.length) {
                // 将对象进行序列化，变成字符串
                let datastr = "";
                for (let k in data) {
                    datastr += k + "=" + data[k] + "&"
                }
                datastr = datastr.substring(0, datastr.length - 1)
                // 拼接到url地址上面
                url += "?" + datastr
            }
        }
        return new Promise( (resolve, reject)=>{
            let conifg = {
                method: type,
                headers
            }
            if (type == "POST") {
                conifg.body = data;
            }
            fetch(this.baseURL + url, conifg).then(function (response) {
                return response.json();
            }).then(function (res) {
                resolve(res)
            }).catch(function (err) {
                reject(err)
            })
        })
    }
    /**
     * get请求
     * @param {*} url 
     * @param {*} data 
     * @param {*} header 
     */
    get(url, data, header){
        return this.ajax(url, "get", data, header)
    }
    /**
     * post请求
     * @param {*} url 
     * @param {*} data 
     * @param {*} header 
     */
    post(url, data, header){
        return this.ajax(url, "post", data, header)
    }
    /**
     * all 请求 同时发送多个请求
     * @param {*} reqArr 
     */
    all(reqArr = []){
        if (Array.isArray(reqArr)) {
            // todo 检查每个值是不是Promise
            return Promise.all(reqArr)
        } else {
            throw new Error('请传入数组')
        }
    }
}

// 封装的请求库！
export default new Request('http://122.51.249.55:3000/index.php/Api');