$(function($){
   //鼠标按下时表示拖拽开始 mousedown
   //鼠标按下后移动表示拖拽中 mousemove
   //松开鼠标时，表示拖拽结束 mouseup
    var dragStart = function(e){//处理鼠标按下时的逻辑
        //记录下盒子现在位置和鼠标的坐标
        e = e||window.event;
        this.x = $(this).offset().left;
        this.y = $(this).offset().top;
        this.mx = e.clientX;
        this.my = e.clientY;
        this.DRAG_MOVE = dragMove.bind(this);
        this.DRAG_UP = dragUp.bind(this)
       $(document).on("mousemove",this.DRAG_MOVE);
       $(document).on("mouseup",this.DRAG_UP);
    };
    var dragMove = function(e){//处理拖拽中的逻辑
        //盒子现在的位置 = 盒子之前的位置+鼠标移动的距离
        var posX = this.x + e.clientX - this.mx;
        var posY = this.y + e.clientY - this.my;
        $(this).css({
            left:posX,
            top:posY
        });
        if(!this.prevX){
            this.prevX = this.mx;
        };
        this.speed = e.clientX - this.prevX;
        this.prevX = e.clientX;

    };
    var dragUp = function(){//处理拖拽结束的逻辑
        $(document).off("mousemove",this.DRAG_MOVE);
        $(document).off("mouseup",this.DRAG_UP);
        fly.call(this);
        drop.call(this);
    };
    $("#div1").on("mousedown",dragStart);
    clearTimeout(this.flyTimer);
    clearTimeout(this.dropTimer);

    function fly(){
        clearTimeout(this.flyTimer);//防止定时器积累
        this.speed*=0.98;
        var x = this.offsetLeft+this.speed; //盒子现在的位置
        var maxLeft = $(document).innerWidth()-$(this).innerWidth();
        if(x>maxLeft){
            x = maxLeft;
            this.speed*=-1;//反向运动
        }
        if(x<0){
            x = 0;
            this.speed*=-1;
        }
        $(this).css("left",x);
        if(Math.abs(this.speed)>=0.5){
            this.flyTimer =  window.setTimeout(fly.bind(this),30);
        }
    }
    var g = 9.8;
    var flag = 0;
    function drop(){
        clearTimeout(this.dropTimer);
        if(!this.dropSpeed){
            this.dropSpeed = g;
        }else{
            this.dropSpeed +=g;
        }
        this.dropSpeed*=0.98;
        var y = this.offsetTop + this.dropSpeed;
        var maxTop = $(document).innerHeight() - $(this).innerHeight();
        if(y>maxTop){ //如果连续执行了两次，说明小球已经停下来
            y = maxTop;
            this.dropSpeed*=-1;
            flag++;
        }else{
            flag = 0;
        }
        $(this).css("top",y);
        if(flag<2){
            this.dropTimer = window.setTimeout(drop.bind(this),30);
        }

    }
});
//定时器知识 防止定时器积累
//盒子边界处理
//动画停止的条件
//一些小技巧