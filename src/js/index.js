$(function () {
    var liNum = 5*5*5;
    //拖拽 滚轮
    $(function () {
        var nowX , lastX , minusX =0 , nowY , lastY , minusY = 0;
        var roX=0 , roY=0 ,tZ = -2000;
        var timer1 , timer2;
        $(document).mousedown(function (ev) {
            ev = ev || window.event;
            lastX = ev.clientX;
            lastY = ev.clientY;
            clearInterval(timer1);
            $(this).on('mousemove',function (ev) {
                ev = ev || window.event;
                nowX = ev.clientX;
                nowY =ev.clientY;

                minusX = nowX - lastX;
                minusY = nowY -lastY;

                roY += minusX*0.2;
                roX += minusY*0.2;

                $("#main").css({
                    'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
                });

                lastX = nowX;
                lastY = nowY;
            });
            return false;
        }).mouseup(function () {
            $(this).off('mousemove');
            timer1 = setInterval(function () {
                minusX *=0.9;
                minusY *=0.9;
                console.log(minusX);
                if (Math.abs(minusX) < 0.5 && Math.abs(minusY) < 0.5){
                    clearInterval(timer1);
                }
                roY += minusX*0.2;
                roX += minusY*0.2;

                $("#main").css({
                    'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
                });
            },13);
        }).mousewheel(function (e,d) {
            clearInterval(timer2);
            tZ += d*80;
            tZ = Math.min(0,tZ);
            tZ = Math.max(-5000,tZ);
            $("#main").css({
                'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
            });
            timer2 = setInterval(function () {
                d *=0.85;
                if (Math.abs(d) < 0.01) {
                    clearInterval(timer2);
                }
                tZ += d*80;
                tZ = Math.min(0,tZ);
                tZ = Math.max(-5000,tZ);
                $("#main").css({
                    'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
                });

            },13);
        });
    });
    init();
    function init() {
        for (i=0;i<liNum;i++){
            var $li = $("<li><img src = './images/3.png'></li>");
            var x = (Math.random()-0.5)*3000;
            var y = (Math.random()-0.5)*3000;
            var z = (Math.random()-0.5)*3000;
            $li.css({
                'transform' : 'translate3d('+x+'px,'+y+'px,'+z+'px)'
            });
            $("#main").append($li);
        };
        setTimeout(function () {
            Grid();
        },300);
        $("#styleButton li").click(function () {
            var index = $(this).index();
             switch (index) {
                 case 0:
                     Table();
                     break;
                 case 1:
                     Sphere();
                     break;
                 case 2:
                     Helix();
                     break;
                 case 3:
                     Grid();
                     break;
             }
        });
    };
    function Grid() {
        var tX = 300 , tY = 300 , tZ = 500;
        var firstX = -2*tX;
        var firstY = -2*tY;
        var firstZ = -2*tZ;
        $("#main li").each(function (i) {
            var iX = (i % 25) % 5;
            var iY = parseInt((i % 25) / 5);
            var iZ = parseInt(i / 25);
            $(this).css({
                'transform' : 'translate3d('+(firstX + iX*tX)+'px,'+(firstY + iY*tY)+'px,'+(firstZ + iZ*tZ)+'px)',
                'transition' : '4s ease-in-out'
            });
        });
    };
    function Helix(){
       var roY = 10, tY = 10;
       var mIndex = Math.floor($("#main li").length / 2);
       var firsttY = -10*mIndex;
       $("#main li").each(function (i) {
           $(this).css({
               'transform' : 'rotateY('+ roY*i +'deg) translateY('+ (firsttY+tY*i) +'px) translateZ(1000px)'
           });
       });
    };
    function Sphere(){

    };
    function Table(){

    };
});
