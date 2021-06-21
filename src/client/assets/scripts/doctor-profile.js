const dat = document.querySelectorAll('.heading');
const expand = (element) => {
    var t=element.target;
    while(!(t.classList.contains('heading'))){
        t=t.parentElement;
    }
    var q=t.lastElementChild.lastElementChild;
    if(q.classList.contains('fa-chevron-up')){
        q.classList.replace('fa-chevron-up','fa-chevron-down');
    }
    else{
        q.classList.replace('fa-chevron-down', 'fa-chevron-up');
    }
    t=t.nextElementSibling;
    if(t.classList.contains('expand')){
        
        t.style.maxHeight=null;
        t.classList.remove('expand');
    }
    else{
        t.classList.add('expand');
        t.style.maxHeight=t.scrollHeight + 'px';
    }
}

dat.forEach(el => {
    el.addEventListener('click', expand);
})