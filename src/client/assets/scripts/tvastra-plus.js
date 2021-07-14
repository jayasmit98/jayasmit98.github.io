const car2=document.querySelectorAll('.blocks_container');
const carb=document.querySelectorAll('.carousel_button');
let  toaster = document.querySelector('.fa-bars');
let pro = document.querySelector('.profile_section');
let namecon = document.querySelector('.name_container');
let pro2 = document.querySelector('.profile_section_2');
const pop2 = (element) => {
    console.log(element);
    if(pro2.style.display=="grid"){
        pro2.style.display="none";
    }
    else{
        pro2.style.display="grid";
    }
}
namecon.addEventListener('click', pop2);
const popup = (element) =>{
    if(pro.style.display=="grid"){
        pro.style.display="none";
    }
    else{
        pro.style.display="grid";
    }
};
toaster.addEventListener('click', popup);
const carousel = (element) => {
    car2.forEach(l => {
        if(l.classList.add('hide'));
    });
    carb.forEach(l => {
        l.classList.remove('active');
    })
    let tar = element.target;
    tar.classList.add('active');
    console.log(tar);
    car2.forEach(carl =>{
        if(tar.classList[0]==carl.classList[0]){
            carl.classList.remove('hide');
        }
    })

}



carb.forEach(el=>{
    el.addEventListener('click',carousel);
})