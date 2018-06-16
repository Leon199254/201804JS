var $lis = $('#div1 ul li');
var $contents = $('#div1 .content');
$lis.on('click',function () {
    // console.log(this);
    //for() 先把挨个把样式清掉 然后再给当前元素加上选中样式
    // console.log($(this).addClass('select').siblings());
    var $this = $(this);
    $this.addClass('select').siblings().removeClass('select');
    var $index = $this.index();
    console.log($index)
    // console.log($($contents[$index]));
    $contents.eq($index).addClass('select').siblings().removeClass('select');
});