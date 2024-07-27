let currentForm = 1;
const formData = {};
const form = document.getElementById("mrf__form");
const inputs = document.getElementById("mrf__form").getElementsByTagName("input");
const continueButtons = document.querySelectorAll(".mrf__form-continue");
form.addEventListener("submit", handleSubmit);
continueButtons.forEach((item) => item.addEventListener('click', handleContinue));
addClearError(inputs);

function handleSubmit(event) {
    event.preventDefault();
    const submitButton = document.getElementById("confirm-button");
    submitButton.innerHTML = '<div class="spinner"></div> Loading...';
    submitButton.disabled = true;

    setTimeout(() => {
        submitButton.innerHTML = "Success ✅";
        setTimeout(() => {
            location.reload();
        }, 5000);

    }, 2000);
}

function handleContinue(event) {
    event.preventDefault();
    const errors = validateFormInput();
    if (errors.length > 0) {
        displayErrors(errors);
    }
    else {
        displayNextForm();
    }
}

function displayNextForm() {
    if (currentForm < 3) {
        currentForm++;
    }
    if (currentForm === 3) {
        displayFormData();
    }
    const formContainers = document.querySelectorAll(".mrf__form-container");
    for (let i = 0; i < formContainers.length; i++) {
        if (i === currentForm - 1) {
            formContainers[i].classList.remove("hidden");
        }
        else {
            formContainers[i].classList.add("hidden");
        }
    }
    updateSteps();
}

function updateSteps() {
    const stepsText = document.querySelector(".mrf__form-steps-text");
    const circles = document.querySelectorAll(".mrf__form-circle");

    stepsText.innerText = `Step ${currentForm} of 3`;
    for (let i = 0; i < currentForm; i++) {
        circles[i].classList.add("active");
    }
};

function displayFormData() {
    for (const [key, value] of Object.entries(formData)) {
        const element = document.getElementById(`${key}-summary`);

        if (element) {
            if (Array.isArray(value)) {
                const newListItem = document.createElement("li");
                newListItem.innerText = value;
                element.appendChild(newListItem);
            }
            else {
                element.innerText = value;
            }
        }
    }
}

function validateFormInput() {
    let errors = [];

    if (currentForm === 1) {
        const nameElement = document.getElementById("name");
        const emailElement = document.getElementById("email");
        if (!nameElement.value) {
            errors.push(nameElement);
        }
        else {
            formData[nameElement.name] = nameElement.value;
        }
        if (!emailElement.value) {
            errors.push(emailElement);
        }
        else {
            formData[emailElement.name] = emailElement.value;
        }
    }

    if (currentForm === 2) {
        const checkBoxElement = document.getElementById("checkbox");
        const checkboxElementChecked = checkBoxElement.querySelectorAll('input[name="topics"]:checked');

        if (checkboxElementChecked.length === 0) {
            errors.push(checkBoxElement);
        }
        else {
            const checkboxName = checkboxElementChecked[0].name;
            if (!formData[checkboxName]) {
                formData[checkboxName] = [];
            }

            for (let i = 0; i < checkboxElementChecked.length; i++) {
                formData[checkboxName].push(checkboxElementChecked[i].value);
            }
        }
    }

    return errors;
}

function displayErrors(errors) {
    if (!errors.length) {
        return;
    }
    else {
        for (let i = 0; i < errors.length; i++) {
            errors[i].classList.add("error");
            const errorTextElement = document.getElementById(`${errors[i].id}-error`);
            errorTextElement.classList.add("display");
        }
    }
}

function clearError(event) {
    const inputElement = event.target.type === "checkbox" ? event.target.parentNode.parentNode : event.target;
    if (inputElement.classList.contains("error")) {
        const errorTextElement = document.getElementById(`${inputElement.id}-error`);
        inputElement.classList.remove("error");
        errorTextElement.classList.remove("display");
    }
}


function addClearError(inputs) {
    for (let i = 0; i < inputs.length++; i++) {
        if (inputs[i].type === "text" || inputs[i].type === "email") {
            document.getElementById(inputs[i].id).addEventListener("input", clearError);
        }
        else if (inputs[i].type === "checkbox") {
            document.getElementById(inputs[i].id).addEventListener("click", clearError);
        }
    }
}




