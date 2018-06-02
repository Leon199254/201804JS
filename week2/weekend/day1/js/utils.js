var utils = {
    toJson: function (jsonStr) {
        var data = null;
        try {
            data = JSON.parse(jsonStr);
        }catch (e) {
            data = eval("("+jsonStr+")")
        }
        return data;
    },
    getById:function (str) {
        return document.getElementById(str);
    }
};
// var utils = (function () {
//     var toJson = function () {
//         var data = null;
//         try {
//             data = JSON.parse(jsonStr);
//         }catch (e) {
//             data = eval("("+jsonStr+")")
//         }
//         return data;
//     };
//     // return {
//     //    toJson
//     // }
//     return {
//         toJson:toJson
//     }
// })();