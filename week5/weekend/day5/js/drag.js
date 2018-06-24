function dragStart(e) {
    this.startL = utils.css(this,'left');
    this.startT = utils.css(this,'top');
    this.mx = e.pageX;//这是鼠标按下时 鼠标的位置
    this.my = e.pageY;//这是鼠标按下时 鼠标的位置
    this.DragMove = dragMove.bind(this);
    // document.onmousemove = this.DragMove;
    on(document,'mousemove',this.DragMove);
    this.DragEnd = dragEnd.bind(this);//this -- > li 把dragEnd 中的this 改成 li
    // document.onmouseup = this.DragEnd
    on(document,'mouseup',this.DragEnd); //dragEnd 中的this是document
    //this  就是当前操作的元素
    // fire(this,'myUpZ',{ele:this})
    fire(this,'myAddZ');
    fire(this,'myIsHit2');
    // fire(this,'myqqq');
}
function dragMove(e) {
    e.preventDefault();
    var l = e.pageX,t = e.pageY;
    //咱们要把鼠标移动的距离保留 让元素移动的距离等于鼠标移动的距离
    var changeL = l - this.mx;//这个是鼠标横向移动的距离
    var changeT = t - this.my;//这个是鼠标纵向移动的距离
    //接下来 我们设置元素当前的位置； 就是元素开始的位置加上 鼠标移动的距离即可
    this.style.left = this.startL + changeL + 'px';
    this.style.top = this.startT + changeT  + 'px';
    // fire(this,'myIsHit',{ele:this})
    fire(this,'myIsHit2');
}
function dragEnd(e) {
    // document.onmousemove = null;
    //this -- > li
    off(document,'mousemove',this.DragMove);
    off(document,'mouseup',this.DragEnd);
    // fire(this,'myGoback');
    fire(this,'myChange');
    // fire(this,'myDownZ')
    // off(this,'myqqq',f3)
}