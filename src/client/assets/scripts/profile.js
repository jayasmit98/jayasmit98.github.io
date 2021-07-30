const show=document.querySelector('.fa-pencil-alt');
const show_win=document.querySelector('.change_number_container');
const can= document.querySelector('.cancelview');
const show2=document.querySelectorAll('.show-header');
const show_win_mobile=document.querySelector('.dashboard_phone');
const can2=document.querySelector('.fa-angle-double-left');
const can2t = document.querySelector('.collapse')
var container = document.querySelector('.change_number_container');
const vis=()=>{
    if(show_win.classList.contains('hide')){
        show_win.classList.replace('hide','show');
    }
}
try{
    show.addEventListener('click', vis);
}
catch(err){
    console.log(err);
}
const hideit = (element) =>{
    if(show_win.classList.contains('show')){
        show_win.classList.replace('show','hide');
    }
}
try{
    can.addEventListener('click',hideit);
}
catch(err){
    console.log(err);
}

const vis2 = (el) => {
    console.log(el.target)
    if(show_win_mobile.classList.contains('hideit')){
        show_win_mobile.classList.remove('hideit');
    }
    console.log(show_win_mobile.classList);
}
show2.forEach(element => {
    element.addEventListener('click',vis2);
});
const hideit2=() =>{    
    
    show_win_mobile.classList.add('hideit');
    console.log(show_win_mobile.classList);
    //console.log(show_win_mobile.removeAttribute('style');
    
}

can2.addEventListener('click',hideit2);
can2t.addEventListener('click',hideit2);
var otppage=`<div class="login">
                <h1>Enter Your OTP</h1>
                <form action="/otp" method="POST">
                    <div class="input1_container">
                        <input class="otp_style" id="otp1" name="otp1" type="text" onkeydown="rep(1,event)" onkeyup="shiftforward(1,event)"  maxlength="1">
                        <input class="otp_style" id="otp2" name="otp2" type="text" onkeydown="rep(2,event)" onkeyup="shiftforward(2,event)"  maxlength="1">
                        <input class="otp_style" id="otp3" name="otp3" type="text" onkeydown="rep(3,event)" onkeyup="shiftforward(3,event)"  maxlength="1">
                        <input class="otp_style" id="otp4" name="otp4" type="text" onkeydown="rep(4,event)" onkeyup="shiftforward(4,event)"  maxlength="1">                
                    </div>
                    <div class="button_container">
                        <button type="submit" class="dark-blue">SUBMIT</button>
                        <i class="fas fa-arrow-right"></i>
                    </div>            
                </form>
            </div>`
const phonenumber=document.querySelector('#newphone');
const send = async () => {
    console.log(phonenumber.value);
    const res = await fetch('/send-otp', {
        method:'POST',
        body:JSON.stringify({
            number:phonenumber.value
        }),
        headers:{
            "Content-type":"application/json"
        }
    });
    const result = await res.json();
    if(result.status==='success'){
        container.innerHTML=otppage;
    }
} 

const verify = async () => {
    const otp1=document.querySelector('#otp1');
    const otp2=document.querySelector('#otp2');
    const otp3=document.querySelector('#otp3');
    const otp4=document.querySelector('#otp4');
    const res = await fetch('/verify-otp',{
        method:'POST',
        body:JSON.stringify({
            otp_1:otp1.value,
            otp_2:otp2.value,
            otp_3:otp3.value,
            otp_4:otp4.value
        }),
        headers:{
            "Content-Type":"application/json"
        }
    });
    const result = await res.json();
    console.log(result);
}


