const tri=document.querySelector('.add-records');
const showup=document.querySelector('.add_record_container');
const can3=document.querySelector('.cancel');
const popup2 = (element) => {
    if(showup.classList.contains('hide')){
        showup.classList.remove('hide');
    }
    
}
console.log(showup);
tri.addEventListener('click',popup2);
const cloak = () => {
    showup.classList.add('hide');
}
can3.addEventListener('click',cloak);