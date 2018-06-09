var utils = (function () {
    function getCss(ele,attr) {
        var val = null;
        try{
            val = window.getComputedStyle(ele)[attr];
        }catch (e) {
            if(attr == 'opacity'){
                val = ele.currentStyle.filter;
                val = /\d+/.exec(val)[0]/100;
            }else {
                val = ele.currentStyle[attr];
            }
        }
        var tempVal = parseFloat(val);
        var reg = /^[+-]?(\d+)(\.\d+)?(px|pt|rem)?$/;
        val = reg.test(val) ? parseFloat(val) : val;
        return val;
    }
    function setCss(ele,attr,value) {
        var reg = /^(width|height|fontSize|(margin|padding)?(left|right|top|bottom)?)$/i;
        if(reg.test(attr)){
            ele.style[attr] = parseFloat(value) + 'px';
        }else {
            ele.style[attr] = value;
        }
    }
    function setGroupCss(ele,obj) {
        if({}.toString.call(obj) == '[object Object]'){
            for(var k in obj){
                setCss(ele,k,obj[k])
            }
        }
    }
    function css(...arg) {
        if(arg.length == 3){
            setCss(arg[0],arg[1],arg[2])
        }else if(arg.length == 2 && arg[1] instanceof Object){
            setGroupCss(arg[0],arg[1])
        }else {
            return getCss(arg[0],arg[1]);
        }
    }
    function offset(ele) {
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        var p = ele.offsetParent;
        while (p.tagName.toLowerCase() != 'body'){
            l += p.offsetLeft+p.clientLeft;
            t += p.offsetTop + p.clientTop;
            p = p.offsetParent;
        }
        return {
            // l,t
            left:l,
            top:t
        }
    }
    function toArray(likeAry) {
        var ary = [];
        try{
            ary = [].slice.call(likeAry);
        }catch (e) {
            for(var i = 0; i< likeAry.length; i++){
                ary.push(likeAry[i]);
            }
        }
        return ary;
    }
    function toJson(jsonStr) {
        var obj = null;
        try{
            obj = JSON.parse(jsonStr)
        }catch (e) {
            obj = eval("("+jsonStr+")");
        }
        return obj;
    }
    function win(attr) {
        return document.documentElement[attr] || document.body[attr]
    }
    return{
        // getCss:getCss  === getCss
        getCss,setCss,setGroupCss,css,offset,toArray,toJson,win
    }
})();
// var utils = {
//     getCss:function (ele,attr) {
//     var val = null;
//     try{
//         val = window.getComputedStyle(ele)[attr];
//     }catch (e) {
//         if(attr == 'opacity'){
//             val = ele.currentStyle.filter;
//             val = /\d+/.exec(val)[0]/100;
//         }else {
//             val = ele.currentStyle[attr];
//         }
//     }
//     var tempVal = parseFloat(val);
//     var reg = /^[+-]?(\d+)(\.\d+)?(px|pt|rem)?$/;
//     val = reg.test(val) ? parseFloat(val) : val;
//     return val;
// },
//     setCss:function (ele,attr,value) {
//         var reg = /^(width|height|fontSize|(margin|padding)?(left|right|top|bottom)?)$/i;
//         if(reg.test(attr)){
//             ele.style[attr] = parseFloat(value) + 'px';
//         }else {
//             ele.style[attr] = value;
//         }
//     },
//     setGroupCss:function (ele,obj) {
//         if({}.toString.call(obj) == '[object Object]'){
//             for(var k in obj){
//                 setCss(ele,k,obj[k])
//             }
//         }
//     },
//     css:function (...arg) {
//         if(arg.length == 3){
//             setCss(arg[0],arg[1],arg[2])
//         }else if(arg.length == 2 && arg[1] instanceof Object){
//             setGroupCss(arg[0],arg[1])
//         }else {
//             return getCss(arg[0],arg[1]);
//         }
//     },
//     offset:function (ele) {
//         var l = ele.offsetLeft;
//         var t = ele.offsetTop;
//         var p = ele.offsetParent;
//         while (p.tagName.toLowerCase() != 'body'){
//             l += p.offsetLeft+p.clientLeft;
//             t += p.offsetTop + p.clientTop;
//             p = p.offsetParent;
//         }
//         return {
//             // l,t
//             left:l,
//             top:t
//         }
//     },
//     toArray:function (likeAry) {
//         var ary = [];
//         try{
//             ary = [].slice.call(likeAry);
//         }catch (e) {
//             for(var i = 0; i< likeAry.length; i++){
//                 ary.push(likeAry[i]);
//             }
//         }
//         return ary;
//     },
//     toJson:function (jsonStr) {
//     var obj = null;
//     try{
//         obj = JSON.parse(jsonStr)
//     }catch (e) {
//         obj = eval("("+jsonStr+")");
//     }
//     return obj;
// }
// };