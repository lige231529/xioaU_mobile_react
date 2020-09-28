//1. 获取屏幕的尺寸
var deviceWidth = document.documentElement.clientWidth;
var designWidth = 750;//设计稿的宽度，记得随时修改
if(deviceWidth>designWidth){
deviceWidth = designWidth;
}
// 1rem = 100px; 
var fz = deviceWidth*100/designWidth;
// 2. 设置html的字体大小
document.documentElement.style.fontSize = fz+"px";