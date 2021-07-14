let sel = document.querySelectorAll('.one');
let fol = document.querySelectorAll('.fbox');
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
const expand=(element) => {
    sel.forEach((el)=>{
        el.classList.remove('active');
    })
    let t=element.target;
    console.log(t);
    if(t.classList.contains('one')){
        t=element.target;
    }
    else{
        t=t.parentElement;
    }
    t.classList.add('active');

    fol.forEach(el => {
        el.classList.replace('show','hide');
    })
    t.nextElementSibling.classList.replace('hide','show');

}

sel.forEach(el => {
    el.addEventListener('click', expand);
})


const cards = document.querySelectorAll('.doctorgrid');
const buts = document.querySelectorAll('.doc');

cards.forEach(el=>{
    el.classList.add('hide');
})
const showtime = (element) => {
    cards.forEach(el => {
        el.classList.remove('visible')
    })
    buts.forEach(el=>{
        el.classList.remove('activated');
    })
    let tbut=element.target;
    tbut.classList.add('activated');
    cards.forEach(el=>{
        if(tbut.classList[0]==el.classList[0]){
            el.classList.add('visible');
        }
    })
}
console.log(buts.length);
for(var i=0;i<buts.length;i++){
    buts[i].addEventListener('click', showtime);
}

const medcards=document.querySelectorAll('.medical_container');
const carbut2=document.querySelectorAll('.med');
medcards.forEach(el=>{
    el.classList.add('hide');
})
const showtime2=(element)=>{
    medcards.forEach(el=>{
        el.classList.remove('visible');
    });
    let t=element.target;
    carbut2.forEach(el=>{
        el.classList.remove('active');
    })
    t.classList.add('active');
    medcards.forEach(el=>{
        if(el.classList[0]==t.classList[0]){
            el.classList.add('visible');
        }
    })
}

carbut2.forEach(el=>{
    el.addEventListener('click',showtime2);
})