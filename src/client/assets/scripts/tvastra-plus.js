const car2=document.querySelectorAll('.blocks_container');
const carb=document.querySelectorAll('.carousel_button');
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