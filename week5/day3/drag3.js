class Drag {
    constructor(ele) {
        this.ele = ele;
        $(this.ele).on("mousedown", this.dragStart.bind(this));
        this.$dragStart = $.Callbacks();
        this.$dragMove = $.Callbacks();
        this.$dragEnd = $.Callbacks();

    }

    dragStart(e) {
        this.x = $(this.ele).offset().left;
        this.y = $(this.ele).offset().top;
        this.mx = e.clientX;
        this.my = e.clientY;
        this.DRAG_MOVE = this.dragMove.bind(this);
        this.DRAG_UP = this.dragUp.bind(this);
        $(document).on("mousemove", this.DRAG_MOVE);
        $(document).on("mouseup", this.DRAG_UP);
        this.$dragStart.fire();
    }

    dragMove(e) {
        var posX = this.x + e.clientX - this.mx;
        var posY = this.y + e.clientY - this.my;
        $(this.ele).css({
            left: posX,
            top: posY
        })
        this.$dragMove.fire();
    }

    dragUp() {
        $(document).off("mousemove", this.DRAG_MOVE);
        $(document).off("mouseup", this.DRAG_UP);
        this.$dragEnd.fire()
    }
}