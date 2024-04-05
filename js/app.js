
const wrapper=document.querySelector('.wrapper');
const loginLink=document.querySelector('.login-link');
const registerLink=document.querySelector('.register-link');
const btnPopup=document.querySelector('.btnLogin-popup');
//
const btnIconClose=document.querySelector('.icon-close');

// Register
registerLink.addEventListener("click",e=>{
    wrapper.classList.add('active');
});

// Login
loginLink.addEventListener("click",e=>{
    wrapper.classList.remove('active');
});

// Btn Login POPUP
btnPopup.addEventListener("click",e=>{
    e.preventDefault();
    wrapper.classList.add('active-popup');
});

// Btn Icon close 
btnIconClose.addEventListener("click",e=>{
    e.preventDefault();
    wrapper.classList.remove('active-popup');
});