const canc=document.querySelector('.cancel');
const add=document.querySelector('.add-sch');
const win=document.querySelector('.schedule_container');
const slotsdisp=document.querySelectorAll('.view')
const showwin = () => {
    win.classList.remove('hide');
}
add.addEventListener('click',showwin);
const rem = () => {
    win.classList.add('hide');
}
canc.addEventListener('click',rem);
function showslots(order){
    var id=order;
    
    const slotscont = document.getElementById(id);
    if(slotscont.classList.contains('hide')){
        slotscont.classList.remove('hide');
        
    }
    else{
        slotscont.classList.add('hide');
        
    }
    
}
const change = (changeit) => {
    
    if(changeit.target.innerHTML=='View Slots'){
        changeit.target.innerHTML='Hide Slots';
      
    }
    else{
        changeit.target.innerHTML='View Slots';
    }
}
slotsdisp.forEach((but) =>{
    but.addEventListener('click', change);
})

