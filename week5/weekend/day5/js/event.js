function on(ele,type,fn) {//在ele这个元素的 type 事件池中 放入 fn 这个事件
    if(/^my/.test(type)){
        ele[type] = ele[type] || [];
        ele[type].push(fn);
    }else {
        ele.addEventListener(type,fn,false)
    }

}

// fire(this,'myfly',{ele:this,speed:this.speed});
function fire(ele,type,options) {//执行 ele 这个元素上 type 这个类型事件池中的事件 执行掉 并把options 这个参数挨个传给事件池中的事件
    ele[type] = ele[type] || [];
    ele[type].forEach((item)=>{
        // item && item(options);
        item && item.call(ele,options);
    })
 }

function off(ele,type,fn) {// 移除 ele 这个元素中 type 这个类型的事件池中 的  fn事件
    if(/^my/.test(type)){
        let n = ele[type].indexOf(fn);
        ele[type][n] = null;
    }else {
        ele.removeEventListener(type,fn)
    }

}