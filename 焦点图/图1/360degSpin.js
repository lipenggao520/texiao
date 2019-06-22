window.addEventListener('load', function() {
    let content = document.querySelector('.content');
    let content_ul = document.querySelector('.content-ul');
    let content_li = content_ul.querySelectorAll('.content-li');
    let content_ol = document.querySelector('.content-ol');
    let content_you = document.querySelector('.content-you');
    let content_zuo = document.querySelector('.content-zuo');
    let content_li_img = content_ul.querySelectorAll('img');
    var timer = null;
    var num = 0;
    for (var i = 0; i < content_ul.children.length; i++) {
        var li = document.createElement('li');
        // li1.innerHTML = i + 1;
        content_ol.appendChild(li);
    }
    content_ul.children[0].style.opacity = '1';
    content_ul.children[0].style.transform = 'rotate(720deg) scale(1)';
    content_ol.children[0].className = 'colocr-ol-li';
    for (var i = 0; i < content_ol.children.length; i++) {
        content_ol.children[i].index = i;
        content_ol.children[i].onmouseenter = function() {
            clearInterval(timer);
            paita(this, this.index);
            num = this.index;
        }
    }
    content.onmouseenter = function() {
        clearInterval(timer);
        content_you.style.opacity = '1';
        content_zuo.style.opacity = '1';
    }
    content.onmouseleave = function() {
        content_you.style.opacity = '0';
        content_zuo.style.opacity = '0';
        // timer = setInterval(content_you.click, 2000);
        timer = setInterval(function() {
            //手动调用点击事件
            content_you.click();
        }, 2000);
    }
    content_you.addEventListener('click', function() {
        num++;
        if (num > content_ul.children.length - 1) {
            num = 0;
        }
        paita(content_ol.children[num], num);
    });
    content_zuo.addEventListener('click', function() {
        num--;
        if (num < 0) {
            num = content_ul.children.length - 1;
        }
        paita(content_ol.children[num], num);
    });
    // timer = setInterval(content_you.click, 1000);
    timer = setInterval(function() {
        //手动调用点击事件
        content_you.click();
    }, 2000);

    function paita(obj, arg) {
        for (var i = 0; i < content_ol.children.length; i++) {
            content_ul.children[i].style.opacity = '0';
            content_ul.children[i].style.transform = 'rotate(0deg) scale(0)';
            // animate(content_ul.children[i], {
            //     "opacity": "0"
            // });

            content_ol.children[i].removeAttribute("class");
        }
        obj.className = "colocr-ol-li";
        // animate(content_ul.children[arg], {
        //     "opacity": "1"
        // });
        content_ul.children[arg].style.opacity = '1';
        content_ul.children[arg].style.transform = "rotate(720deg) scale(1)";
    }
})