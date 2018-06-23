function dragStart(e) {
    this.startL = utils.css(this,'left');
    this.startT = utils.css(this,'top');
    this.DragMove = dragMove.bind(this);
    // document.onmousemove = this.DragMove;
    on(document,'mousemove',this.DragMove);
    this.DragEnd = dragEnd.bind(this);
    // document.onmouseup = this.DragEnd
    on(document,'mouseup',this.DragEnd)
}
function dragMove(e) {
    var l = e.clientX,t = e.clientY;
    this.style.left = l - this.clientWidth/2+ 'px';
    this.style.top = t - this.clientHeight/2 + 'px';
    this.prevX = this.prevX || 0;
    this.speed = e.clientX - this.prevX//伪速度
    this.prevX = e.clientX;
}
function dragEnd(e) {
    // document.onmousemove = null;
    off(document,'mousemove',this.DragMove);
    off(document,'mouseup',this.DragEnd);
    fire(this,'myfly',{ele:this,speed:this.speed});
    fire(this,'mydrop',{ele:this,speed:this.speed});
}