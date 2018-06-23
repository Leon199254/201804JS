function on(ele,type,fn) {
    if(/^my/.test(type)){
        ele[type] = ele[type] || [];
        ele[type].push(fn);
    }else {
        ele.addEventListener(type,fn,false)
        // oDiv.addEventListener('mousedown',dragStart,false)
    }

}
// fire(this,'myfly',{ele:this,speed:this.speed});
function fire(ele,type,options) {
    ele[type] = ele[type] || [];
    ele[type].forEach((item)=>{
        // item && item(options);
        item && item.call(ele,options);
    })
}

function off(ele,type,fn) {
    if(/^my/.test(type)){
        let n = ele[type].indexOf(fn);
        ele[type][n] = null;
    }else {
        ele.removeEventListener(type,fn)
    }

}