
export function pixImg(goodsid,w=240,h=240){
    return `http://122.51.249.55:3000/index.php/Api/Goods/goodsThumImages?goods_id=${goodsid}&width=${w}&height=${h}`
}
export function pixHost(imgurl){
    return `http://122.51.249.55:3000${imgurl}`
}

