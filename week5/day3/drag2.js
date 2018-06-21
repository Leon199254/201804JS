$(function($){
    var dragStart = function(e){
        e = e||window.event;
        this.x = $(this).offset().left;
        this.y = $(this).offset().top;
        this.mx = e.clientX;
        this.my = e.clientY;
        this.DRAG_MOVE = dragMove.bind(this);
        this.DRAG_UP = dragUp.bind(this);
       $(document).on("mousemove",this.DRAG_MOVE);
       $(document).on("mouseup",this.DRAG_UP);
       fire.call(this,"start",e)//执行与start事件标识相关的计划
    };
    var dragMove = function(e){
        var posX = this.x + e.clientX - this.mx;
        var posY = this.y + e.clientY - this.my;
        $(this).css({
            left:posX,
            top:posY
        });
        fire.call(this,"move",e)//执行与move事件标识相关的计划
    };
    var dragUp = function(e){//处理拖拽结束的逻辑
        $(document).off("mousemove",this.DRAG_MOVE);
        $(document).off("mouseup",this.DRAG_UP);
        fire.call(this,"end",e)//执行与end事件标识相关的计划
    };
    $("#div1").on("mousedown",dragStart);
});
