const timer = document.querySelector('.timer');
const resendbut=document.querySelector('.timer');
let countdown=parseInt(timer.innerHTML.split(' ')[2]);
const cntdown =setInterval(()=>{
    if(countdown===0){
        timer.innerHTML='Resend';
        resendbut.addEventListener('click', (el)=>{
            fetch('/resend-otp',{
                method:'put'
            });
        });
        clearInterval(cntdown);
    }
    else{
        countdown--;
        timer.innerHTML=`Resend in ${countdown}`;
    }
},1000);

console.log(timer);
const getcode=(index)=>{
    return document.getElementById('otp'+index);
};

const shiftforward=(index,event)=>{
    const eventcode=event.which || event.keyCode;
    if(getcode(index).value.length===1){
        if(index!==4){
            getcode(index+1).focus();
        }
        else{
            getcode(index).blur();
        }
    }
    if(eventcode==8 && index!==1){
        getcode(index-1).focus();
    }
}
const rep=(index,event)=>{
    getcode(index).value=null;
    
}
/*const focusfunc=(index)=>{
    for(let i=1;i<=index;i++){
        const cur=getcode('otp'+i);
        if(!cur.value){
            cur.focus();
            break;
        }
    }
}*/