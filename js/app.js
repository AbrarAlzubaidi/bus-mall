'use strict';
let imgs = ['bag.jpg',//0
  'banana.jpg',//1
  'bathroom.jpg',//2
  'boots.jpg',//3
  'breakfast.jpg',//4
  'bubblegum.jpg',//5
  'chair.jpg',//6
  'cthulhu.jpg',//7
  'dog-duck.jpg',//8
  'dragon.jpg',//9
  'pen.jpg',//10
  'scissors.jpg',//11
  'shark.jpg',//12
  'sweep.png',//13
  'tauntaun.jpg',//14
  'unicorn.jpg',//15
  'water-can.jpg',//16
  'wine-glass.jpg'];//17




const mainSection = document.getElementById('mainSection');
let articleElement = document.getElementById('ulArticle');

let leftImg = document.getElementById('leftImg');
let centerImg = document.getElementById('centerImg');
let rightImg = document.getElementById('rightImg');
//console.log(leftImg.src);

let initialValue = 0;
let lastValue = 25;

let currentImgs = [0, 0, 0];
let nextImgs = [0, 0, 0];

let leftImgNumber = 0;
let centerImgNumber = 0;
let rightImgNumber = 0;

let nextLeftImgNumber=0;
let nextCenterImgNumber=0;
let nextRightImgNumber=0;

function Images(name, path) { //constructor
  this.name = name;
  this.path = path;
  this.shown = 0;
  this.click = 0;
  Images.array.push(this);
}

Images.array = []; // array holds the objects which are imgs

pushProperty();
render();
leftImgNumber = randomImg(0, imgs.length - 1);
do {
  centerImgNumber = randomImg(0, imgs.length - 1);
  rightImgNumber = randomImg(0, imgs.length - 1);
  
} while (leftImgNumber === centerImgNumber || leftImgNumber === rightImgNumber || centerImgNumber === rightImgNumber);
currentImgs = [leftImgNumber, centerImgNumber, rightImgNumber];
leftImg.src = './img/' + Images.array[leftImgNumber].path;
centerImg.src = './img/' + Images.array[centerImgNumber].path;
rightImg.src = './img/' + Images.array[rightImgNumber].path;

Images.array[leftImgNumber].shown++;
Images.array[centerImgNumber].shown++;
Images.array[rightImgNumber].shown++;

mainSection.addEventListener('click', clickHandler);

function clickHandler(event) {
  checkArray();
  if ((event.target.id === 'leftImg' || event.target.id === 'centerImg' || event.target.id === 'rightImg') && initialValue < lastValue) {
    if (event.target.id === 'leftImg') {
      Images.array[leftImgNumber].click++;
    }
    else if (event.target.id === 'centerImg') {
      Images.array[centerImgNumber].click++;
    }
    else {
      Images.array[rightImgNumber].click++;
    }
    render();
    initialValue++;
  }
  else{
    chart();

  }
}
//===============================================================
let button = document.createElement('button');
button.textContent = 'View Results';
articleElement.appendChild(button);

button.addEventListener('click', buttonHandler);

function buttonHandler(event) {

  let ulElement = document.createElement('ul');
  articleElement.appendChild(ulElement);


  for (let i = 0; i < Images.array.length; i++) {
    let liElement = document.createElement('li');
    liElement.textContent = `${Images.array[i].name}   image had ${Images.array[i].click} votes, and was seen ${Images.array[i].shown} times. `;
    ulElement.appendChild(liElement);
  }
}

function assignImg() {
  
  //-------------------------------
  nextLeftImgNumber = randomImg(0, imgs.length - 1);
  do {
    nextCenterImgNumber = randomImg(0, imgs.length - 1);
    nextRightImgNumber = randomImg(0, imgs.length - 1);
    nextImgs = [nextLeftImgNumber, nextCenterImgNumber, nextRightImgNumber];
  } while (nextLeftImgNumber === nextCenterImgNumber || nextLeftImgNumber === nextRightImgNumber || nextCenterImgNumber === nextRightImgNumber);
  console.log('next imgs' + nextImgs);
}

function checkArray(){
  assignImg();
  console.log('check function');
  console.log('current in check '+currentImgs+ 'next in check '+nextImgs);
  console.log(currentImgs.every((val)=> nextImgs.includes(val)));
  while (currentImgs.every((val)=> nextImgs.includes(val))) {
    console.log('while loop will print if arrays equal');
    assignImg();
  }
  //render();

}


function render() {
  assignImg();
  checkArray();

  if(currentImgs.sort().join(',') !== nextImgs.sort().join(',')){
    console.log('if statement inside check');
    leftImg.src = './img/' + Images.array[nextLeftImgNumber].path;
    centerImg.src = './img/' + Images.array[nextCenterImgNumber].path;
    rightImg.src = './img/' + Images.array[nextRightImgNumber].path;

    Images.array[nextLeftImgNumber].shown++;
    Images.array[nextCenterImgNumber].shown++;
    Images.array[nextRightImgNumber].shown++;
    currentImgs=nextImgs;
    console.log('after doing if statement current in check '+currentImgs);

  }
}

function randomImg(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);

}

function pushProperty() {
  for (let i = 0; i < imgs.length; i++) {
    new Images(imgs[i].split('.')[0], imgs[i]);

  }
}

function chart() {
  let labelArray=[];
  let shownArray=[];
  let clickArray=[];
  for(let i=0; i<imgs.length;i++)
  {
    labelArray[i]=Images.array[i].name;
    shownArray[i]=Images.array[i].shown;
    clickArray[i]=Images.array[i].click;
  }
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelArray,
      datasets: [{
        label: '# of shows',
        data: shownArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      },{
        label: '# of clicks',
        data:clickArray,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



