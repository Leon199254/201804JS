/*1.获取数据*/
~(function(){
    //1.创建一个ajax对象
    let xhr = new XMLHttpRequest();

    //2.打开一个链接地址
    //第一个参数表示请求的方式 （get,post,put,delete...）
    //  第二个参数请求的地址 绝对的路径或者相对路径
    // 第三个参数同步（false）还是异步(true 默认值)
    xhr.open("get","json/data.json",false);

    //3.监听请求的数据
    //请求状态码(xhr.readyState == 4)和网络状态码(2开头的三位数)
    let data = null;//保存json格式的对象
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
            data  = JSON.parse(xhr.responseText) //json格式的字符串

        }
    };
    //4.发送请求的数据
    xhr.send(null);


    //动态数据绑定
    //1.遍历数组拿到数组中每个对象
    //2.创建li标签的字符串，对象中每个属性值绑定li在相应的标签上
    //3.最后把累加好的li，作为ul标签的内容
    let oUl = document.getElementById("ul");
    let str = ``;//用来累加li标签
    data.forEach((item,index,ary)=>{
        str += `
            <li data-price="${item.price}" data-hot="${item.hot}" data-time = "${item.time}">
                <img src="${item.picImg}">
                <h3>${item.title}</h3>
                <span>价格：¥${item.price}</span>
                <span>评价数：${item.hot}</span>
                <span>时间：${item.time}</span>
            </li>
        `
    });
    oUl.innerHTML = str;
})();

~(function(){
    //1.获取menu下的a标签，遍历a标签绑定点击事件
    //2.排序 （3步骤）
    //3.升降序切换
    let menu = document.getElementById("menu");
    let oAs = menu.getElementsByTagName("a");
    let aAs = [].slice.call(oAs);
    let oUl = document.getElementById("ul");
    let oLis = oUl.getElementsByTagName("li");
    let aLis = [].slice.call(oLis);

    aAs.forEach((item,index,ary)=>{
        //假设默认是降序 ，第一次点击就是升序
        //借用自定义属性把现在的状态保存下来
        item.flag = -1;
        item.onclick = ()=>{
            //把当前点击a标签的索引传给sortFn方法，来知道按哪个排序
            //item.flag = 1; // 1->-1 -1->1
            //item.flag = -1*-1*-1*-1
            item.flag *=-1;//->item.flag = item.flag*-1
            //若不是当前点击的元素，要把a标签上保存的item.flag的状态，恢复到默认状态也就是-1
            aAs.forEach((item,n)=>{
                if(n !== index){//不是当前点击元素，状态设成降序
                    item.flag = -1;//恢复到默认状态
                }
            });
            sortFn(index,item.flag);
        }
    });
    //第一点击后 item.flag = 1 升序
    //再次点击后 item.flag = -1 降序
    //第三次点击后 item.flag = 1 升序

//升序 从小到大  降序 从大到小
    function sortFn(index,flag){
        let ary = ["data-price","data-hot","data-time"];
        let key = ary[index];
        aLis.sort((a,b)=>{ //a和b分别代表前一个和后一个li标签
            //排序是按照li标签的自定义属性值排序
            //0 ->data-price
            //1 ->data-hot
            //2 ->data-time
            let prev = a.getAttribute(key);
            let next = b.getAttribute(key);
            prev = prev.replace(/-/g,"");
            next = next.replace(/-/g,"");
            //(prev-next)*1 ->升序  (prev-next)*-1 ->降序
            return (prev - next)*flag;
        });
        aLis.forEach((item,index)=>{
            oUl.appendChild(item);
        })
    }
})();

//prev-next ->next-prev
//prev-next ->(prev-next)*1
