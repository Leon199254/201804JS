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
    function win(){

    }


    return {
        listToAry: listToAry,
        toJSON: toJSON,
        offset: offset,
        getCss: getCss,
        setCss: setCss,
        setGroup: setGroup,
        css: css,
        win:win
    }
})();

