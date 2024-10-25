const steps = Array.from(document.querySelectorAll('form .step'));
const nextBtn = document.querySelectorAll('form .next-btn');
const prevBtn = document.querySelectorAll('form .previous-btn');
const form = document.querySelector('form');

nextBtn.forEach(button=>{
    button.addEventListener('click', (e) => {
        changeStep('next');
    })
})
prevBtn.forEach(button =>{
    button.addEventListener('click', ()=> {
        changeStep('prev')
    })
})
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const inputs = [];
    form.querySelectorAll('input').forEach(input=>{
        const {name, value} = input;
        inputs.push({name, value})
    })
    console.log(inputs)
    form.reset();
})
function changeStep(btn){
    let index = 0;
    const active = document.querySelector('form .step.active');
    index = steps.indexOf(active);
    steps[index].classList.remove('active');
    if(btn === 'next'){
        index ++; 
    }else if(btn === 'prev'){
        index--;
    }
    steps[index].classList.add('active')
}
function verifyPassword(){
    var pw = document.getElementById("password");
    // check empty password field
    if(pw ==""){
        document.getElementById("message").innerHTML = "Please enter your password";
        return false;
    }
    // minimum password length validation 
    if(pw.length < 8){
        document.getElementById("message").innerHTML = "Password length must be at least 8 characters!";
        return false;
    }
    // maximum password length validation 
    if(pw.length > 20){
        document.getElementById("message").innerHTML = "Password length must not exceed 20 characters!";
        return false;
    }else{
        alert("Password matches!");
    }

}
function matchPassword(){
    var password = document.getElementById("password");
    var password2 = document.getElementById("confPassword");
    if (password != password2){
        alert("Passwords did not match! Please try again.");
    }else{
        alert("Password successfully created.");
    }
}