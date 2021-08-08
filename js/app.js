'use strict';
let imgs = ['bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'water-can.jpg',
  'wine-glass.jpg'];




const mainSection = document.getElementById('mainSection');
let articleElement = document.getElementById('ulArticle'); 

let leftImg = document.getElementById('leftImg');
let centerImg = document.getElementById('centerImg');
let rightImg = document.getElementById('rightImg');

let initialValue = 0;
let lastValue = 25;

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

// console.log(randomImg(0,imgs.length));

mainSection.addEventListener('click', clickHandler);

function clickHandler(event) {

  if ((event.target.id === 'leftImg' || event.target.id === 'centerImg' || event.target.id === 'rightImg') && initialValue < lastValue) {
    render();
    initialValue++;
  }

}

let button = document.createElement('button');
button.textContent = 'View Results';
articleElement.appendChild(button);

button.addEventListener('click', buttonHandler);
function buttonHandler(event) {
  
  let ulElement = document.createElement('ul');
  articleElement.appendChild(ulElement);

  

  console.log(event);
  for (let i = 0; i < Images.array.length; i++) {
    let liElement = document.createElement('li');
    liElement.textContent = `${Images.array[i].name}   image had  votes, and was seen ${Images.array[i].shown} times. `; 
    ulElement.appendChild(liElement);
  }
}


function render() {

  let leftImgNumber = randomImg(0, imgs.length - 1);
  let centerImgNumber = randomImg(0, imgs.length - 1);
  let rightImgNumber = randomImg(0, imgs.length - 1);

  leftImg.src = './img/' + Images.array[leftImgNumber].path;
  centerImg.src = './img/' + Images.array[centerImgNumber].path;
  rightImg.src = './img/' + Images.array[rightImgNumber].path;

  Images.array[leftImgNumber].shown++;
  Images.array[centerImgNumber].shown++;
  Images.array[rightImgNumber].shown++;
}

function randomImg(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);

}

function pushProperty() {
  for (let i = 0; i < imgs.length; i++) {
    new Images(imgs[i].split('.')[0], imgs[i]);

  }
}



