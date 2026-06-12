console.log("Club website loaded!");
function showYear(year){

    let groups =
    document.querySelectorAll('.member-group');

    groups.forEach(group=>{
        group.style.display = 'none';
    });

    document.getElementById(year)
    .style.display = 'grid';
}
const hero = document.querySelector(".hero");

const images = [

    "images/banner/banner1.webp",
    "images/banner/banner2.webp",
    "images/banner/banner3.webp",
    "images/banner/banner4.webp"

];

let current = 0;

function changeBanner(){

    hero.style.backgroundImage =
    `url('${images[current]}')`;

    current++;

    if(current >= images.length){
        current = 0;
    }
}

changeBanner();

setInterval(changeBanner,5000);
