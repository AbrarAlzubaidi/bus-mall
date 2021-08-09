let array1=[8,5,10];
let array2=[5,8,10];

if(array1.sort().join(',')=== array2.sort().join(',')){
    console.log('yes')
}
else{
    console.log('no')

}


leftImgNumber = randomImg(0, imgs.length - 1);
  do {
    centerImgNumber = randomImg(0, imgs.length - 1);
    rightImgNumber = randomImg(0, imgs.length - 1);
    nextImgs = [leftImgNumber, centerImgNumber, rightImgNumber];
  } while ((leftImgNumber === centerImgNumber || leftImgNumber === rightImgNumber || centerImgNumber === rightImgNumber) );
  console.log('next imgs' + nextImgs);
  
  while (currentImgs.sort().join(',') === nextImgs.sort().join(',')) {
    leftImg = randomImg(0, imgs.length - 1);
    centerImg = randomImg(0, imgs.length - 1);
    rightImg = randomImg(0, imgs.length - 1);
    nextImgs = [leftImg, centerImg, rightImg];
    
  }console.log('next imgs' + nextImgs + 'the length' + nextImgs.length);