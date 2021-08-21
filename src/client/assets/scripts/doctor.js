const but = document.querySelector('.trigger');
const slots = document.querySelectorAll('.slot_trigger');
const part2 = document.querySelector('.part_2');
const part3 = document.querySelector('.part_3');


const showslots = async (id,docid) => {
    if(document.getElementById(id).classList.contains('hide')){
        document.getElementById(id).classList.remove('hide');
    }
    else{
        document.getElementById(id).classList.add('hide');
    }
    const abc = await fetch("/getschedule/" + docid, {method:"GET"});
    const schedule = await abc.json();
    console.log(schedule);
    console.log("running");

    var finalarray = [];
    finalarray.push("Today", "Tomorrow");
    var currdate = new Date();
    var darr = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    var marr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for(var k=2;k<=6;k++){
        var day = currdate.getDay() + k;
        var date = currdate.getDate() + k;
        var month = currdate.getMonth();
        var year = currdate.getFullYear();
        var str = darr[day] + " " + marr[month] + " " + date + ", " + year;
        console.log(day);
        if(day>=7){
            var str = darr[day - 7] + " " + marr[month] + " " + date + ", " + year;
        }
        finalarray.push(str);
        
    }
   
    for(var s=0;s<7;s++){
        
        document.getElementById('slot'+s+docid).innerHTML='<h5>'+finalarray[s]+'</h5><span class="slot_trigger">'+schedule[s] + ' Slots Available</span>';
    }
}

const showsubslots = async (id, did, index) => {
    if(document.getElementById(id).classList.contains('hide')){
        document.getElementById(id).classList.remove('hide');
    }
    else{
        document.getElementById(id).classList.add('hide');
    }
    const cde = await fetch("/getslots/" + did + "/" + index, {method:'GET'});
    const subslots = await cde.json();
    console.log(subslots);
    var morningslots=subslots[0];
    var afternoonslots=subslots[1];
    var eveningslots=subslots[2];
    var schedule_id=subslots[3];
    if(morningslots.length==0){
        document.getElementById('morning'+did).innerHTML="No Slots Available";
    }
    if(afternoonslots.length==0){
        document.getElementById('afternoon'+did).innerHTML="No Slots Available";
    }
    if(eveningslots.length==0){
        document.getElementById('evening'+ did).innerHTML="No Slots Available";
    }
    if(morningslots.length>0){
        var a = '';
        for(var k=0;k<morningslots.length;k++){
            a=a+'<form method="POST" action="/bookslot/' + schedule_id + '/' + did + '/' + morningslots[k]._id + '/' + morningslots[k].time + ' " onclick="this.submit()"><li style="width:5rem;">' + morningslots[k].time + '</li></form>';
        }
        document.getElementById('morning'+did).innerHTML=a;
    }
    if(afternoonslots.length>0){
        var s='';
        for(var k=0;k<afternoonslots.length;k++){
            s=s+'<form method="POST" action="/bookslot/' + schedule_id + '/' + did + '/' + afternoonslots[k]._id + '/' + afternoonslots[k].time +' " onclick="this.submit()"><li style = "width:5rem;">' + afternoonslots[k].time + '</li></form>';
        }
        document.getElementById('afternoon'+did).innerHTML=s;
    }
    if(eveningslots.length>0){
        var b = '';
        for(var k=0;k<eveningslots.length;k++){
            b=b+'<form method="POST" action="/bookslot/' + schedule_id + '/' + did + '/' + eveningslots[k]._id + '/' + eveningslots[k].time +' " onclick="this.submit()"><li style= "width:5rem;">' + eveningslots[k].time + '</li></form>';
        }
        document.getElementById('evening'+did).innerHTML=b;
    }
}

const movecar = (dir, slotid)  => {
    var carit = document.getElementById(slotid).children;
    console.log(carit);
    if(dir=="left"){
        for(var i=0;i<carit.length;i++){
            if(carit[i].style.display!='none'){
                break;
            }
        }
        if(i!=0){
            for(var j=0;j<carit.length;j++){
                if(j==i-1 || j==i || j==i+1){
                    carit[j].style.display='grid';
                }
                else{
                    carit[j].style.display='none';
                }
            }
        }
    }
    if(dir=="right"){
        for(var i=0;i<carit.length;i++){
            if(carit[i].style.display!='none'){
                break;
            }
        }
        if((i+3)<carit.length){
            for(var j=0;j<carit.length;j++){
                if(j==i+1 || j==i+2 || j==i+3){
                    carit[j].style.display='grid';
                }
                else{
                    carit[j].style.display='none';
                }
            }
        }

    }
}