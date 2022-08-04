let currentStage = 1;
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const progressBar = document.querySelector('.progress-bar');
const stages = document.querySelectorAll('.stages').length;

update();

// events

prev.addEventListener('click',()=>{
    if(currentStage <= 1) {
        currentStage = 1;
    } else {
        currentStage--;
    }
    update();
});
next.addEventListener('click',(e)=>{
    if(currentStage == stages) {
        currentStage = stages;
    } else {
        currentStage++;
    }
    update();
    
});


function update () {
    //setting the buttons
    if(currentStage > 1){
        prev.disabled = false;
    } else {
        prev.disabled = true;
    }
    if(currentStage < stages) {
        next.disabled = false;
    } else {
        next.disabled = true;
    }

    //setting de stages

    let stageWidth = document.querySelector('.step-one').clientWidth;
    let stageMargin = document.querySelector('.form-area');

    stageMargin.style.marginLeft = `-${stageWidth * (currentStage - 1)}px`;


    //setting the bar 

    progressBar.style.width = `${(currentStage-1) / (stages-1) * 100}%`;

    //setting the stages circles

    let cirles = document.querySelectorAll('.stages');

    cirles.forEach((item,idx)=>{

        if(idx < currentStage){
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
});

if(currentStage == stages) {
    document.querySelector('.finish').disabled = false;
}
}