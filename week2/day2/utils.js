var utils = (function(){
    /**
     *
     * @param args   类数组
     * @returns {Array}  转化的数组
     */
    function listToAry(args){
        var ary = [];
        try{
            ary = [].slice.call(args,0);
        }catch(e){
            for(var i = 0;i<args.length;i++){
                ary[i] = args[i];
            }
        }
        return ary;
    }

    /**
     * JSON格式的字符串转换成JSON格式的对象
     * @param jsonStr
     */
    function toJSON(jsonStr){
      return  "JSON" in window ? JSON.parse(jsonStr): eval("("+jsonStr+")");
    }

    return {
        listToAry:listToAry,
        toJSON:toJSON
    }
})();