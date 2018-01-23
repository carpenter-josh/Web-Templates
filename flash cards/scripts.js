
var imgSrc = []

var div = document.getElementById('mainImg');

newImg.onload = function() {
  div.innerHTML += '<img src="'+img.src+'" alt=""/>'; 
};

img.src = 'path/to/image.jpg';