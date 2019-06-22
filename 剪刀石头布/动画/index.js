window.addEventListener('load', function() {
    // 获取元素
    var box = document.querySelector('.box');
    var second = document.querySelector('.second');

    // 获取 body 元素 
    var body = document.querySelector('body');
    // 创建一个空数组
    var array = [];
    // 封装一个随机数的函数
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var sum = getRandom(15, 30);
    body.addEventListener('click', () => {


    });

    function establish(e) {
        var gaine1 = document.createElement('div');
        let sum = getRandom(0, 8);
        console.log(sum);
        // console.log(gaine1);
        gaine1.classList.add('large');

        var w = body.innerWidth;
        var h = body.innerHeight;
        body.insertBefore(gaine1, body.children[0]);
        array.push({
            el: gaine1,
            // 鼠标点击的坐标
            top: e.clientY,
            left: e.clientX,
            // 生成随机坐标
            // top: Math.random() * w,
            // left: Math.random() * h,
            // top: e.pageY,
            // left: e.pageX,
            opacity: 1,
            scale: 1,
            color: `rgb(${255*Math.random()},${255*Math.random()},${255*Math.random()})`

        });
        // if()
        remove();
    }















    // var a = `rgba(${255*Math.random()},${255*Math.random()},${255*Math.random()},${0.8})`;
    // console.log(a);
    // second.style.backgroundColor = `rgba(${255*Math.random()},${255*Math.random()},${255*Math.random()},${0.3})`;
    // second.style.boxShadow = '0 0 30px ' + a;
    //  div1.addEventListener('clik',function(e){
    //     arr.push({
    //         el: tDiv,
    //         top: e.clientY,
    //         left: e.clientX,
    //         opacity: 1,
    //         scale: 1,
    //         color: `rgb(${255*Math.random()},${255*Math.random()},${255*Math.random()})`
    //     });
    //  });

});
















// function color(num) {
//     this.r = Math.floor(Math.random() * 255);
//     this.g = Math.floor(Math.random() * 255);
//     this.b = Math.floor(Math.random() * 255);
//     // this.t =
//     this.backgroundColor = `rgba(${255*Math.random()},${255*Math.random()},${255*Math.random()},${num})`;
// }