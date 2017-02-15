/**
 * Created by magwanghwi on 2017. 2. 14..
 */
var hw = document.getElementById('hw');

function movepage(name) {
    location.href = name;
}

function movepagewithnumber(name){
    var number = 0;

    for(i = 1; i < arguments.length; i++)
        number += arguments[i];

    var result = name + number.toString();
    location.href = result;
}

function alertmessage(message){
    alert(message);
}

hw.addEventListener('click', movepage);
hw.addEventListener('click', movepagewithnumber);
hw.addEventListener('click', alertmessage);