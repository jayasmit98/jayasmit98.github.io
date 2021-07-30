const but = document.querySelector('.trigger');
const slots = document.querySelectorAll('.slot_trigger');
const part2 = document.querySelector('.part_2');
const part3 = document.querySelector('.part_3');
const show = () =>{
    if(part2.classList.contains('hide')){
        part2.classList.remove('hide');
    }
    else{
        part2.classList.add('hide');
    }
}
but.addEventListener('click',show);
const showup = () => {
    if(part3.classList.contains('hide')){
        part3.classList.remove('hide');
    }
    else{
        part3.classList.add('hide');
    }
}

slots.forEach(el =>{
    el.addEventListener('click',showup);
})