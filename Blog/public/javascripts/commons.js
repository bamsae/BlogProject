/**
 * Created by magwanghwi on 2017. 2. 14..
 */
var hw = document.getElementById('hw');

function movepage(name) {
    location.href = name;
}
hw.addEventListener('click', movepage);
