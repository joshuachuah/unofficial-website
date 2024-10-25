// javascript for login form 

function setFormMessage(formElement, type, message){
	const messageElement = formElement.querySelector(".form_message_error");

	messageElement.textContent = message;
	messageElement.classList.remove("form_message_success", "form_message_error");
	messageElement.classList.add('form_message_${type}');
}

function setInputError(inputElement, message){
	inputElement.classList.add("form_input_error");
	inputElement.parentElement.querySelector(".form_input_error_message").textContent = message;
}

function clearInputError(inputElement){
	inputElement.classList.remove("form_input_error");
	inputElement.parentElement.querySelector(".form_input_error_message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
	const loginForm = document.querySelector("#login");
	const createAccountForm = document.querySelector("#createAccount");

	document.querySelector("#linkCreateAccount").addEventListener("click", e =>{
		e.preventDefault();
		loginForm.classList.add("login_form_hidden");
		createAccountForm.classList.remove("login_form_hidden");
	});

	document.querySelector("#linkLogin").addEventListener("click", e =>{
		e.preventDefault();
		loginForm.classList.remove("login_form_hidden");
		createAccountForm.classList.add("login_form_hidden");
	});

	loginForm.addEventListener("submit", e => {
		e.preventDefault();

		// perform AJAX / Fetch login
		setFormMessage(loginForm, "error", "Invalid username/password combination");
	});

	document.querySelectorAll(".login_form_input").forEach(inputElement => {
		inputElement.addEventListener("blur", e => {
			if(e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10){
				setInputError(inputElement, "Username must be at least 10 characters in length" );
			}
		});

		inputElement.addEventListener("input", e => {
			clearInputError(inputElement);
		});
	});
});
