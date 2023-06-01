const email = document.getElementById("email-input")
const password = document.getElementById("password-input")
const button = document.getElementById("button")

const visible = document.getElementById("visible")

const required_email = document.createElement('text-required-email')

const required_password = document.createElement('text-required-password')

const errorLabel = document.createElement('div')

button.addEventListener(
    "click",
    () => {
        correctInput()
    }
)

email.addEventListener(
    "input",
    () => {
        isCorrectEmail(email.value)
        requiredEmail()
    }
)

visible.addEventListener(
    "click",
    () => {
        if (visible.classList.contains('toggle-visible')) {
            visible.classList.remove('toggle-visible')
            visible.classList.add('toggle-unvisible')
            password.type = "password"
        }
        else {
            visible.classList.remove('toggle-unvisible')
            visible.classList.add('toggle-visible')
            password.type = "text"
        }
    }
)

password.addEventListener(
    "input",   
    () => {
        isCorrectPassword()
        requiredPassword()
    }
)

function requiredEmail()
{
    if (!(isCorrectEmail(email.value) && required_email.innerHTML == null))
    {
        required_email.className = "authorization__required-bad"
        required_email.innerHTML = "<p>Email is required.</p>"
        emaildiv.append(required_email)
    }

    if ((isCorrectEmail(email.value) && required_email.innerHTML != null))
    {
        required_email.className = "authorization__required-good"
    }
}

function requiredPassword()
{
    if (!(isCorrectPassword()))
    {   
        required_password.remove()
        required_password.className = "authorization__required-bad"
        required_password.innerHTML = "<p>Password is required.</p>"
        passworddiv.append(required_password)
    }
    if ((isCorrectPassword()) && required_password.innerHTML != null)
    {
        required_password.className = "authorization__required-good"
    }
}

function isCorrectEmail(email_value)
{   
    if (!(isEmptyEmail(email_value)) && (isValidEmail(email_value))){
        return true
    }
    else 
    {
        return false
    } 
}

function isEmptyEmail(email_value)
{
    if (email_value = "") {
        return true
    }
    else
    {
        return false
    }
}

function isValidEmail(email_value)
{
    let dog = email_value.indexOf("@")
    let point = email_value.indexOf(".")

    if (point == -1) 
    {   
        return false
    }
    if (dog == -1) 
    {   
        return false
    }
    if (email_value.indexOf(",")>=0 || email_value.indexOf(";")>=0 || email_value.indexOf(" ")>=0)
    {   
        return false
    }
    if (dog > point)
    {   
        return false
    }
    if ((point - dog) == 1 )  
    {   
        return false
    }
    if ((dog < 1)) 
    {   
        return false
    }
    return true
}

function isCorrectPassword()
{   
    let password_value = password.value

    if (password_value == "")
    {
        return false
    }
    else
    {
        return true
    }
}

function createError(type_of_error)
{   
    
    if (errorLabel.classList.contains('authorization__error'))
    {   
        errorLabel.classList.remove('authorization__error')
    }

    if (type_of_error == 'emailandpassword'){
        errorLabel.className = "authorization__error"
        errorLabel.innerHTML = "<img class = 'authorization__error-svg' src = '../static/assets/alert-circle.png'><p class = 'authorization__error-text'>Email or password is incorrect</p>"
        title.append(errorLabel)
    } 
    else if (type_of_error == 'email-or-password')
    {
        errorLabel.className = "authorization__error"
        errorLabel.innerHTML = "<img class = 'authorization__error-svg' src = '../static/assets/alert-circle.png'><p class = 'authorization__error-text'>A-Ah! Check all fields</p>"
        title.append(errorLabel)
    }
}

function correctInput()
{   
    if ((!isCorrectEmail(email.value)) && (!isCorrectPassword()))
    {   
        createError('emailandpassword')
    }   
    else if (!isCorrectEmail(email.value) || !isCorrectPassword()) 
    {
        createError('email-or-password')
    }
    else
    {
        window.location.href = "http://127.0.0.1:5500/pages/admin.html";
    }
}      