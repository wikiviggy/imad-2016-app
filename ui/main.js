console.log('Loaded!');
//change the text of main-text div
var element=document.getElementById('main-text'
);
element.innerHtml= 'New value';
//move the image
var img=document.getElementById('madi');
img.onclick=function(){
    img.style.marginleft= '100px';
};