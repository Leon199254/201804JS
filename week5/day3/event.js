function on(ele,type,fn){//添加计划
    //[] 用来添加计划
    if(!ele["a"+type]){
        ele["a"+type] =[];
    }
    var ary = ele["a"+type];
    for(var i = 0;i<ary.length;i++){
        if(ary[i]==fn){
            return;
        }
    }
    ary.push(fn)
}
function  fire(type,e) { //执行计划
    //从事件池中拿出每个方法执行
    var ary = this["a"+type];
    if(ary&&ary.length>0){
        for(var i = 0;i<ary.length;i++){
            if(typeof ary[i]==="function"){
                ary[i].call(this,e);
            }else{
                ary.splice(i,1);
                i--;
            }
        }
    }
}
function off(ele,type,fn){//取消计划
    var ary = ele["a"+type];
    if(ary&&ary.length>0){
        for(var i = 0;i<ary.length;i++){
            if(ary[i]==fn){
                ary[i] = null;
            }
        }
    }

}