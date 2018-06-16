~function ($) {
    function tabPlugin(options) {
        // if(typeof  options == 'undefined'){
        //     options = {}
        // }
        options = options || {};
        var $box = this;
        var $ul = $box.children('ul').eq(0);//children  获取子元素节点
        var $lis = $ul.children('li');
        // var $lis = $box.find('li');
        var $contents = $box.find('.content');//find 找符合条件的指定元素
        var _default = {
            eventType:'click'
        };
        $.each(options,function (key,value) {
            // console.log(key,value)
           _default[key] = value;//修改或新增_default属性
        });
        // var $contents = $box.getElementsByTagName('div');
        function init(){
            //初始化样式
            $lis.eq(0).addClass('select');
            $contents.eq(0).addClass('select');
        }
        $lis.on(_default.eventType,function () {
            var $this = $(this);
            var $index = $this.index();
            $this.addClass('select').siblings().removeClass('select');
            $contents.eq($index).addClass('select').siblings().removeClass('select')
        });
        init();
    }
    // function qq(){
    //     console.log(456)
    // }
    // $.fn.extend()//是在JQ的原型上扩展
    // $.extend()//是在JQ的核心上扩展
    $.fn.extend({
        tabPlugin:tabPlugin,
        // qqq:qq
    })
}(jQuery);
// $("#div1").qqq();