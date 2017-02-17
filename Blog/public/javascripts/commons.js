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

function popupWindow(page, title, rect) {
    // 팝업을 띄우기, width, height, 스크롤바, 툴바, 메뉴바를 모두 숨기는 경우
    return window.open(page, title, 'width=' + rect[0] + ', ' + 'height=' + rect[1] + ',' + 'scrollbars= 0, toolbar=0, menubar=no');
}

hw.addEventListener('click', movepage);
hw.addEventListener('click', movepagewithnumber);
hw.addEventListener('click', alertmessage);
hw.addEventListener('click', popupWindow);