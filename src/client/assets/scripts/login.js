const visi=document.querySelector('.far');
const show = (element) => {
    
    if(visi.classList.contains('fa-eye-slash')){
        visi.classList.replace('fa-eye-slash','fa-eye');
        element.target.previousElementSibling.setAttribute("type","text");
    }
    else{
        visi.classList.replace('fa-eye','fa-eye-slash');
        element.target.previousElementSibling.setAttribute("type","password");
    }
}

visi.addEventListener('click', show);