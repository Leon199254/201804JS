var utils = (function(){
    function getCss(ele,attr){
        var val = null;
        try{
            val = window.getComputedStyle(ele,null)[attr]
        }catch(e){
            if(attr=='opacity'){
                var fil = ele.currentStyle.filter;
                //alpha(opacity=90)
                var reg = /alpha\(opacity=(\d+)\)/;
                val = reg.exec(fil)[0]/100;
            }else{
                val = ele.currentStyle[attr];
            }

        }
        if(!isNaN(parseFloat(val))){
            val = parseFloat(val)
        }
        return val;
    }
    function setCss(ele,attr,val){
        if(attr == 'opacity'){
            ele.style.opacity = val;
            ele.style.filter = `alpha(opacity=${val*100})`;
            return;
        }
        var reg = /^(width|height|(margin|padding)?(left|right|top|bottom)?)$/i;
        if(reg.test(attr)){
            val = val+'px';
        }
        ele.style[attr] = val;
    }
    function setGroupCss(ele,options){
        for(var key in options){
            setCss(ele,key,options[key])
        }
    }
    function css(...arg){
        if(arg.length == 3){
            setCss(arg[0],arg[1],arg[2]);
            return;
        }
        if(arg.length == 2 && typeof arg[1] == 'object'){
            setGroupCss(arg[0],arg[1]);
            return
        }
        return getCss(arg[0],arg[1])
    }
    function offset(ele){
        var l = ele.offsetLeft,
            t = ele.offsetTop,
            p = ele.offsetParent;
        //offsetTop 是当前盒子的外边框到上一级参照物的外边框的距离
        while(p.tagName.toLowerCase() !== 'body'){
            l += p.clientLeft+p.offsetLeft;
            t += p.clientTop + p.offsetTop;
            p = p.offsetParent;
        }
        return{
            left:l,
            top: t
        }
    }
    function toArray(likeAry){
        var ary = [];
        try{
            ary = [].slice.call(likeAry)
        }catch(e){
            for(var i = 0;i<likeAry.length;i++){
                ary[ary.length] = likeAry[i]
            }
        }
        return ary;
    }
    function toJSON(str){
        var json = null;
        try{
            json = JSON.parse(str)
        }catch(e){
            json = eval("("+str+")")
        }
        return json;
    }
    function win(attr,value) {
        if(typeof value =='undefined'){
            return document.documentElement[attr]||document.body[attr]
        }
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }
    return{
        offset,
        toJSON,css,
        win
    }
})()