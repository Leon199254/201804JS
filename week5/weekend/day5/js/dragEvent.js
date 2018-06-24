class Event {
    constructor(){

    }
    on(ele,type,fn){
        if(/^my/.test(type)){
            //证明是自己定义的事件
            ele[type] = ele[type] || [];
            let ary =  ele[type];
            ary.push(fn)
        }else {
            //系统事件
            ele.addEventListener(type,fn,false);
        }
        return this;
    }
    fire(ele,type,options){
        if(/^my/.test(type)){
            let ary = ele[type]||[];
            ary.forEach((item)=>{
                item&&item.call(ele,options);
            })
        }
    }
    off(ele,type,fn) {
        if(/^my/.test(type)){
            let n = ele[type].indexOf(fn);
            ele[type][n]=null;
        }else {
            ele.removeEventListener(type,fn,false)
        }
    }
};
class Drag extends Event{
    constructor(ele){
        super();
        this.ele = ele;
        this.on(ele,'mousedown',this.dragStart.bind(this))
    }
    dragStart(e) {
        console.log(this)
        this.ele.DragMove = this.dragMove.bind(this);
        this.ele.DragUp = this.dragUp.bind(this);
        this.ele.mx = e.clientX;
        this.ele.my = e.clientY;
        this.ele.sx = this.ele.offsetLeft;
        this.ele.sy = this.ele.offsetTop;
        this.on(document,'mousemove',this.ele.DragMove);
        this.on(document,'mouseup',this.ele.DragUp);
        this.fire(this.ele,'myZindex',{ele:this.ele})
    }
    dragMove(e) {
        //这个函数时控制着 拖动时 目标元素跟着移动
        console.log('move',this)
        e.preventDefault();//move时会触发原生拖拽
        let changeX = e.clientX - this.ele.mx;
        let changeY = e.clientY - this.ele.my;
        this.ele.style.left = changeX + this.ele.sx + 'px';
        this.ele.style.top = changeY + this.ele.sy + 'px';


        //x轴
        this.ele.prevX = this.ele.prevX || 0;
        this.ele.speed = e.clientX - this.ele.prevX;
        this.ele.prevX = e.clientX;

        this.fire(this.ele,'myIsHit',{e})
    }
    dragUp() {
        this.off(document,'mousemove',this.ele.DragMove);
        this.off(document,'mouseup',this.ele.DragUp);
        // fly(this,this.speedX);
        // drop(this,this.speedY);
        this.fire(this.ele,'myMove',{speed:this.ele.speed,ele:this.ele});
        this.fire(this.ele,'myMove',{ele:this.ele});
        this.fire(this.ele,'myChangePosi');
    }
}