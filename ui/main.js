console.log('Loaded!');
//change the text of main-text div
var element=document.getElementById('main-text'
);
element.innerHtml= 'New value';
//move the image
var img=document.getElementById('wiki');
var marginleft=0;
function moveright()
{
    marginleft=marginleft+1;
    img.style.marginleft=marginleft+'px';
}
img.onclick=function(){
    var interval=setInterval(moveright,50);
};