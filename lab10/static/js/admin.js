const title = document.getElementById("name_of_post")
const description = document.getElementById("description_of_post")
const author = document.getElementById("author_name")
const date = document.getElementById("date")
const authorPhoto = document.getElementById("author_photo")
const heroImageSmall = document.getElementById("hero_image_big")
const heroImageBig = document.getElementById("hero_image_small")

let photoA
let photoSmall
let photoBig

const required_title = document.createElement('text-required-password')
const required_description = document.createElement('text-required-description')
const required_author = document.createElement('text-required-author')
const required_date = document.createElement('text-required-date')

const button = document.getElementById("publishPost")

const errorLabel = document.createElement('div')

button.addEventListener(
    "click",
    () => {
        checkFiels()
    }
)

title.addEventListener(
    "input" , 
    () => {
        let title = document.getElementById("name_of_post").value;
        let defaultTitle = 'New Post';
        requiredTitle()
        if (title !== '' && title.length < 25) {
            document.getElementById('titleVisual').innerHTML = title;
            document.getElementById('titleVisualTiny').innerHTML = title;
        }
        else {
            document.getElementById('titleVisual').innerHTML = defaultTitle;
            document.getElementById('titleVisualTiny').innerHTML = defaultTitle;
        }
    }
)

description.addEventListener(
    "input",  
    () => {
        let description = document.getElementById("description_of_post").value;
        let defaultDescription = 'Please, enter any description';
        requiredDescription()
        if (description !== '' && description.length < 60){
            document.getElementById('subtitleVisual').innerHTML = description;
            document.getElementById('subtitleVisualTiny').innerHTML = description;
        } 
        else {
            document.getElementById('subtitleVisual').innerHTML = defaultDescription;
            document.getElementById('subtitleVisualTiny').innerHTML = defaultDescription;
        }   
    }
)


author.addEventListener(
    "input",   
    () => {
        let author = document.getElementById("author_name").value;
        let defaultauthor = 'Enter author name';
        requiredAuthor()
        if (author !== '' && author.length < 25){
            document.getElementById('authorNameVisualTiny').innerHTML = author;
        }    
        else {
            document.getElementById('authorNameVisualTiny').innerHTML = defaultauthor;
        }
    }
)

date.addEventListener(
    "input", 
    () => {
        let dateOfPublic = document.getElementById("date").value;
        let defaultDate = '18.04.2024';
        requiredDate()
        if (date !== ''){
            document.getElementById('dateVisuality').innerHTML = dateOfPublic;
        }    
        else {
            document.getElementById('dateVisuality').innerHTML = defaultDate;
        }
    }
)

authorPhoto.addEventListener(
    "input",
    () => {
        const file = document.getElementById("author_photo").files[0];
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                photoA = reader.result;
            },
            false
        );
        if (file) {
            reader.readAsDataURL(file);
        }
    }
)

heroImageSmall.addEventListener(
    "input",
    () => {
        const file = document.getElementById("hero_image_small").files[0];
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                photoSmall = reader.result;
            },
            false
        );
        if (file) {
            reader.readAsDataURL(file);
        }
    }
)

heroImageBig.addEventListener(
    "input",
    () => {
        const file = document.getElementById("hero_image_big").files[0];
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                photoBig = reader.result;
            },
            false
        );
        if (file) {
            reader.readAsDataURL(file);
        }
    }
)

function requiredTitle(){
    if (title.value == "" || title.value == null)
    {   
        required_title.remove()
        required_title.className = "required-bad"
        required_title.innerHTML = "<p>Title is required.</p>"
        rtitle.append(required_title)
    }
    else (required_title.value != null)
    {   
        required_title.className = "required-good"
        rdescription.append(required_description)
    }
}

function requiredDescription(){
    if (description.value == "" || description.value == null)
    {   
        required_description.className = "required-bad"
        required_description.innerHTML = "<p>Description is required.</p>"
        rdescription.append(required_description)
    }
    if (required_description.value != null)
    {
        required_description.className = "required-good"
    }
}

function requiredAuthor(){
    if (author.value == "" || author.value == null)
    {   
        required_author.className = "required-bad"
        required_author.innerHTML = "<p>Author is required.</p>"
        rauthor.append(required_author)
    }
    if (required_author.value != null)
    {
        required_author.className = "required-good"
    }
}

function requiredDate(){
    if (date.value == "" || date.value == null)
    {   
        required_date.className = "required-bad"
        required_date.innerHTML = "<p>Date is required.</p>"
        rdate.append(required_date)
    }
    if (required_date.value != null)
    {
        required_date.className = "required-good"
    }
}


function checkFiels() {
    if ((title.value == null || title.value == "") && (description.value == null || description.value == "") && (author.value == null || author.value == ""))
    {   
        createError()
    }
    else
    {
        createComplete()
        const data = {
            title: title.value,
            subtitle: description.value,
            author: author.value, 
            authorIMG: photoA,
            previewIMG: photoSmall,
            postIMG: photoBig, 
            publishDate: date.value,
        }
    
        const json = JSON.stringify(data);
        console.log("json:", json);
    }
}

function createError()
{   

    errorLabel.className = "newpost-error"
    errorLabel.innerHTML = "<img class = 'newpost__error-svg' src = '../static/assets/alert-circle.png'><p class = 'newpost-error-text'>Whoops! Some fields need your attention :o</p>"
    error.append(errorLabel)
}  

function createComplete()
{

    errorLabel.className = "newpost-complete"
    errorLabel.innerHTML = "<img class = 'newpost__error-svg' src = '../static/assets/check-circle.png'><p class = 'newpost-error-text'>Publish Complete!</p>"
    error.append(errorLabel)
}