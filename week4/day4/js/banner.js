var $box = $('#div1');
var $ul = $box.children('ul');
var $lis = $ul.find('li');

function init() {
    $lis.css({opacity:0,zIndex:-1});
}
var index = 1;
var timer = null;
function autoPlay() {
    timer = window.setInterval(function () {
        init();
        // $lis.eq(index).css({opacity:1,zIndex:1});
        $lis.eq(index).css({zIndex:1}).siblings().css({zIndex:-1});
        $lis.eq(index).animate({opacity:1},500,'linear',function () {
            $(this).siblings().css({zIndex:-1,opacity:0});
        });
        // $lis.eq(index).css('opacity',1);
        index == $lis.length-1 ? index=0 : index++;
    },3000);
}
autoPlay();

$box.on('mouseover',function () {
    window.clearInterval(timer)
});
$box.on('mouseout',function () {
    autoPlay();
});