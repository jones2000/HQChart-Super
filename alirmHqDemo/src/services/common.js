exports.install = function(Vue,options){
// 参数：method（API名），data（请求参数对象）
    Vue.prototype.jsp = function(method,data){
        // baseUrl就是服务器地址
        const baseUrl = 'http://192.168.191.1:8000/';
        let url = `${baseUrl}${method}?`;
        // jsonp请求参数和get方法类似，都是params的方式拼接
        for(let item in data){
            url += `&${item}=${data[item]}`;
        }
        return this.$jsonp(url);
    };
}