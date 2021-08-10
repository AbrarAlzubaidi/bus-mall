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

let leftImgNumber = 0;
let centerImgNumber = 0;
let rightImgNumber = 0;

let currentImg=[];

function Images(name, path, shown=0,click=0) { //constructor
  this.name = name;
  this.path = path;
  this.shown = shown;
  this.click = click;
  Images.array.push(this);
}
Images.array = []; // array holds the objects which are imgs

getDataToLocalStorage();// if we invoke it after pushProperty it will contains the refreshed result
render();

mainSection.addEventListener('click', clickHandler);

function clickHandler(event) {
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

function render() {
  do {
    leftImgNumber = randomImg(0, imgs.length - 1);
    centerImgNumber = randomImg(0, imgs.length - 1);
    rightImgNumber = randomImg(0, imgs.length - 1);

  } while (leftImgNumber === centerImgNumber || leftImgNumber === rightImgNumber || centerImgNumber === rightImgNumber ||
     currentImg.includes(leftImgNumber) || currentImg.includes(centerImgNumber) || currentImg.includes(rightImgNumber));

  currentImg = [leftImgNumber, centerImgNumber, rightImgNumber];
  leftImg.src = './img/' + Images.array[leftImgNumber].path;
  centerImg.src = './img/' + Images.array[centerImgNumber].path;
  rightImg.src = './img/' + Images.array[rightImgNumber].path;

  Images.array[leftImgNumber].shown++;
  Images.array[centerImgNumber].shown++;
  Images.array[rightImgNumber].shown++;

  localStorage.data=JSON.stringify(Images.array);

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
          '#464660',
        ],
        borderColor: [
          'gray',
        ],
        borderWidth: 1
      },{
        label: '# of clicks',
        data:clickArray,
        backgroundColor: [
          'gray',
        ],
        borderColor: [
          '#464660',
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
function getDataToLocalStorage(){
  if(localStorage.data){ //if there is a data then do if statement 
    let returnedData=JSON.parse(localStorage.data);// this returned obj is a literal obj so we need a way to change it to constructor.
    console.log(returnedData);
    for (let i = 0; i < returnedData.length; i++)// cause the returned data is an literal obj holds data
    {
      new Images(returnedData[i].name,returnedData[i].path, returnedData[i].shown, returnedData[i].click);

    }
  }else{ // if there is no data then create the objects (images).
    pushProperty();

  }

}
//localStorage.data='jhgfd';
