let form = document.querySelector('.validator');
let validator = {
    handleSubmite: (e)=>{
        e.preventDefault();
        let send = true;
        validator.clearError();

        let inputs = form.querySelectorAll('input');

        for(let i=0; i<inputs.length; i++) {
            let input = inputs[i];
            let check = validator.checkInput(input);

            if(check !== true){
                send = false;
                validator.showError(check,input);
            }
            
        }

        if(send){
            form.submit();
        } else {
            let aviso = 'Verifique se TODAS as informações estão preenchidas e tente novamente!';
            alert(aviso);
        }
    },

    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null) {
            rules = rules.split('|');

            for(let k in rules) {
                let rDatails = rules[k].split('=');

                switch(rDatails[0]) {
                    case 'required':
                        if(input.value == ''){
                            return "O CAMPO DEVE SER PREENCHIDO"
                        }
                    break;
                    case 'min':
                            if(input.value.length < rDatails[1]) {
                                return `O campo precisa ter pelo menos ${rDatails[1]} caracteres`;
                            }

                    break;
                    case 'email':
                        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if(regex.test(input.value.toLowerCase())){
                            return true;
                        } else {
                            return 'Adicione um endereço de email valido!'
                        }
                            
                    break;
                    case 'pass':
                        let pass1 = document.querySelector('#pass1').value;
                        let pass2 = document.querySelector('#pass2').value;
                        if(pass1 === pass2){
                            return true;
                        } else {
                            return 'As senhas não são as mesmas'
                        }
                    break;
                }
            }
        }

        return true;
    },

    showError: (err,input)=> {
    input.style.borderColor = '#ff0000';
    let error = document.createElement('div');
    error.classList.add('error');
    error.innerHTML= err;
    input.parentElement.insertBefore(error, input.elementSibling);
    },

    clearError: ()=>{
        let inputs = form.querySelectorAll('input');

        for(let i=0;i<inputs.length;i++) {
            inputs[i].style = '';
        }

        let errorElements = form.querySelectorAll('.error');
        for(let i=0;i<errorElements.length; i++) {
            errorElements[i].remove();
        }

    }

    
}

let tel = document.querySelector('#tel');
tel.addEventListener('keypress',updateData);

function updateData () {
    
    if(tel.value.length == 0) {
        tel.value += '('
    } else if(tel.value.length == 3) {
        tel.value += ') '
    } else if(tel.value.length == 10) {
        tel.value += '-'
    }
    
    
}

form.addEventListener('submit',validator.handleSubmite);


// because of the margin on the transition my form is breaking up when tab key is pressed, so i'm blocking the tab key/
document.querySelector('body').addEventListener('keydown',((objEvent)=> {
    if (objEvent.keyCode == 9) {  
        objEvent.preventDefault(); 
    }
}));