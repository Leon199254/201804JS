~function ($) {
    function bannerPlugin(options) {
        var $box = this;
        var $ul = $box.children('ul');
        var $lis = $ul.find('li');
        var $arrowL = $box.find('.arrowL');
        var $arrowR = $box.find('.arrowR');
        var $tips = $box.find('.tip');
        var _default = {
            tipEvent:'click',
            tipIndex: 0
        };
        options = options || {};
        $.each(options,function (key,value) {
            _default[key] = value
        });
        function init() {
            //初始化tip
            $tips.eq(index).addClass('select');
            $lis.eq(index).css({opacity:1,zIndex:1})
                .siblings().css({opacity:0,zIndex:-1})
        }
        var index = _default.tipIndex;
        var timer = null;
        function autoPlay() {
            timer = window.setInterval(function () {
                index == $lis.length-1 ? index=0 : index++;
                change();
            },3000);
        }
        autoPlay();
        init();
        function change(){
            //该函数之操作元素的opacity显示
            //进来先 改变zIndex层级  然后再去操作opacity
            $lis.eq(index).css({zIndex:1}).siblings().css({zIndex:-1});
            $lis.eq(index).animate({opacity:1},500,'linear',function () {
                $(this).siblings().css({opacity:0});
            });
            $tips.eq(index).addClass('select').siblings().removeClass('select')
        }
        $box.on('mouseover',function () {
            window.clearInterval(timer);
            $arrowL.css({display:'block'});
            $arrowR.css({display:'block'})
        });
        $box.on('mouseout',function () {
            autoPlay();
            $arrowL.css({display:'none'});
            $arrowR.css({display:'none'})
        });
        $arrowL.on('click',function () {
            index = index == 0 ? $lis.length-1 : index - 1;
            change();
        });
        $arrowR.on('click',function () {
            index = index == $lis.length-1 ? 0 : index + 1;
            change();
        });
        $tips.on(_default.tipEvent,function () {
            var $this = $(this);
            index = $this.index();
            change();
        });
    }
    $.fn.extend({
        bannerPlugin:bannerPlugin
    })
}(jQuery)