var $box = $('#div1');
var $ul = $box.children('ul');
var $lis = $ul.find('li');

function init() {
    $lis.css({opacity:0,zIndex:0});
}
var index = 1;
var timer = null;
function autoPlay() {
    timer = window.setInterval(function () {
        change1()
    },3000);
}
autoPlay();
function change2() {
    $lis.eq(index).css({zIndex:1}).siblings().css({zIndex:-1});
    $lis.eq(index).animate({opacity:1},200,'linear',function () {
        $(this).siblings().css({opacity:0});
    });
    index == $lis.length-1 ? index=0 : index++;
}
function change1(){
    var preIndex = index-1 < 0 ? $lis.length-1 : index -1;
    $lis.eq(preIndex).css({zIndex:0}).animate({opacity:0},500,'linear');
    $lis.eq(index).css({zIndex:1}).animate({opacity:1},500,'linear');
    index == $lis.length-1 ? index=0 : index++;
}

$box.on('mouseover',function () {
    window.clearInterval(timer)
});
$box.on('mouseout',function () {
    autoPlay();
});