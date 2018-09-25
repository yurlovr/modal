"use strict"
function getSendServer(event) {

    event.preventDefault();

   let body = new FormData(form.querySelector('.modal-form'));

   let xhr = new XMLHttpRequest();
    xhr.open('POST', '../file.php', true);
    xhr.send(body);
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        if (xhr.status !== 200) {
            alert('Данные не отправленны');
        } else {
         alert('Данные успешно отправленны');
         form.style.display = 'none';
         openForm.style.display = 'none';
         overlay.style.display = 'none';
         formUserData.style.display = 'block';

         getShowMessage(body);
            }
        }
    }

function getSuccessForm() {
    let flagName = false;
    let flagTel = false;
    let flagMail = false;

    userName.onfocus = function () {
        userName.classList.remove('error-anime');
    };
    userName.onchange = function () {
        let reg = /^[а-яёa-z]+$/iu;

        if (reg.test(userName.value) === false) {
            userName.classList.add('error-anime');
            getShowAlert();
            return;
        } else {
            userName.classList.remove('error-anime');

            flagName = true;

            if (flagName && flagTel && flagMail) {
                getShowButton();
            }

            return;
        }
    };
    userMail.onfocus = function () {
        userMail.classList.remove('error-anime');
    };

    userMail.onchange = function () {

        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        if (reg.test(userMail.value) === false) {
            userMail.classList.add('error-anime');
            getShowAlert();
            return;
        } else {
            userMail.classList.remove('error-anime');
            flagMail = true;

            if (flagName && flagTel && flagMail) {
                getShowButton();
            }

            return;
        }
    };

    userTel.onfocus = function () {
        userTel.classList.remove('error-anime');
    };
    userTel.onchange = function () {
        let reg = /^((\+?7|8)[ \-] ?)?((\(\d{3}\))|(\d{3}))?([ \-])?((\d{3}[\- ]?\d{2}[\- ]?\d{2})|(\d{2}[\- ]?\d{2}[\- ]?\d{3}))$/; // проверить

        if (reg.test(userTel.value) === false) {
            userTel.classList.add('error-anime');
            getShowAlert();
            return;
        } else {
            userTel.classList.remove('error-anime');
            flagTel = true;

            if (flagName && flagTel && flagMail) {
                getShowButton();
            }

            return;
        }
    };
}

function getShowButton () {
    let buttonSend = form.querySelector('.button-form-modal');
    buttonSend.style.display = 'block';
}

function getShowMessage (data) {
    let insertUserData = formUserData.querySelectorAll('.header-answer');
    let i = 0;

    for(let key of data.keys()) {
        let userData = document.createElement('p');
        userData.textContent = data.get(key);
        insertUserData[i].insertAdjacentElement('afterend', userData);
        i++;
    }
}

function closeFeedBackEsc(event) { // close form esc
    if (event.keyCode === 27) {
        event.preventDefault();
        if (form.style.display === "block") {
            form.style.display = "none";
            overlay.style.display = "none";
            form.classList.remove('error-anime');
            clearForm();
        }
    }
}

const form = document.querySelector('.modal-form-feedback');
const overlay = document.querySelector(".modal-overlay");
const userName = form.querySelector('.modal-name-user');
const userTel = form.querySelector('.modal-tel-user');
const userMail = form.querySelector('.modal-mail-user');
const formUserData = document.querySelector('.modal-user-answer');
const modalFinish = document.querySelector('.modal-user-finish');
let openForm = document.querySelector('.button-start');

openForm.addEventListener('click',() => {
    clearForm();
    setTimeout ( () => {
        form.style.display = 'block';
        overlay.style.display = "block";
        userName.focus();
        getSuccessForm();
    }, 5000);

});

let closeForm = document.querySelector('.modal-form-feedback-close');

closeForm.addEventListener('click',() => { // close form click on X
    form.style.display = 'none';
    overlay.style.display = "none";
    clearForm();
});

form.addEventListener('submit', getSendServer); // send form
window.addEventListener("keydown", closeFeedBackEsc); // close form on keydown Ecs

let buttonOk = document.querySelector('.ok');
buttonOk.addEventListener('click', function () {
    formUserData.style.display = 'none';
    modalFinish.style.display = 'block';
    clearForm();
    setTimeout(() => {
        modalFinish.style.display = 'none';
        openForm.style.display = 'block';
    },5000);
});

let buttonNoOk = document.querySelector('.no-ok');
buttonNoOk.addEventListener('click', function () {
    clearForm();
    formUserData.style.display = 'none';
    openForm.style.display = 'block';
});

function clearForm() {
    let insertUserData = formUserData.querySelectorAll('.header-answer');
    let buttonSend = form.querySelector('.button-form-modal');
    userName.value = '';
    userTel.value = '';
    userMail.value = '';
    buttonSend.style.display = 'none';
    if (userName.classList.contains('error-anime')) {userName.classList.remove('error-anime')}
    if (userTel.classList.contains('error-anime')) {userTel.classList.remove('error-anime')}
    if (userMail.classList.contains('error-anime')){userMail.classList.remove('error-anime')}

    for (let i = 0; i < insertUserData.length; i++) {
        if(insertUserData[i].nextElementSibling) {
            insertUserData[i].nextElementSibling.remove();
        }
    }
}

function getShowAlert()  {
    let alert = document.querySelector('.alert');
    let overlayAlert = document.querySelector('.overlay-alert');
    alert.style.display = 'block';
    overlayAlert.style.display = 'block';
    setTimeout(() => {
        alert.style.display = 'none';
        overlayAlert.style.display = 'none';
    },1000)
}



