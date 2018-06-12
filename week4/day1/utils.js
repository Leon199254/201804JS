var utils = (function () {
    function listToAry(arg) {
        var ary = [];
        try {
            ary = [].slice.call(arg);
        } catch (e) {
            for (var i = 0; i < arg.length; i++) {
                ary[i] = arg[i];
            }
        }
        return ary;
    }

    function toJSON(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")")
    }

    function offset(ele) {
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        var p = ele.offsetParent;
        while (p && p !== document.body) {
            l += p.offsetLeft + p.clientLeft;
            t += p.offsetTop + p.clientTop;
            p = p.offsetParent
        }
        return {
            l: l,
            t: t
        }
    }

    function getCss(ele, attr) {
        var res = null;
        if (window.getComputedStyle) {
            res = window.getComputedStyle(ele, null)[attr]
        } else {
            res = ele.currentStyle[attr];
        }
        //"数值" 或者 "数值+单位" ->提取数值部分，并且转换成数类型
        var reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|pt|rem|em)?$/;
        return reg.test(res) ? parseFloat(res) : res
    }

    function setCss(ele, attr, value) {
        if(attr === "") return;
        //1.判断attr属性是否是如下这些：width|height|margin|padding|left|top|right|bottom|marginLeft|....
        var reg = /^(width|height|(margin|padding)?(left|top|right|bottom)?)$/i;
        if (reg.test(attr)) {
            if (!isNaN(value)) {
                value += "px";
            }
        }
        ele.style[attr] = value;
    }
    function setGroup(ele, obj) {
        if (!Object.prototype.toString.call(obj) === "[object Object]") return;
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) { //只有私有的属性才去操作
                setCss(ele, attr, obj[attr]);
            }
        }
    }

    //根据传参的不同，调用不同的方法
    function css() {
        var args = arguments;
        var fn = getCss;
        if (args.length === 3) fn = setCss;
        if (args.length === 2 && args[1] instanceof Object) {
            fn = setGroup;
        }
        return fn.apply(null, args);
    }
    function win(attr,value){
        //若第二个参数没传，表示获取值
        if(typeof value ==="undefined"){
         return    document.documentElement[attr] || document.body[attr]
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }
    function random(n,m){
        n = Number(n);
        m = Number(m);
        if(isNaN(n) || isNaN(m)){//只要有一个不是有效数，则返回默认的一个0~1随机数
            return Math.random();
        }
        //若n>m,则交换n和m的值
       if(n>m){
           n = n+m;
           m = n-m; //把n的值赋给m
           n = n-m;//把m的值赋给n
       }
       return Math.round(Math.random()*(m-n)+n);
    }


    return {
        listToAry: listToAry,
        toJSON: toJSON,
        offset: offset,
        getCss: getCss,
        setCss: setCss,
        setGroup: setGroup,
        css: css,
        win:win,
        random:random
    }
})();

