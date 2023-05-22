
let cl = console.log;

const showModalbtn = document.getElementById("showModalbtn")


const moviebody = document.getElementById("moviebody")
const movieForm = document.getElementById("movieForm")
const BackDrop = document.getElementById("BackDrop")
const movieClose = [...document.querySelectorAll(".movieClose")]

const titleControl =document.getElementById("title")
const urlControl =document.getElementById("url")
const ratingControl =document.getElementById("rating")



const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};



let movieArray = [
    {
        // title : 'Jhon Wick',
        // url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbxmrrE7Ka8ivD2yccAnYSBKGKh0yCw2wG3A&usqp=CAU',
        // rating : 5/5
    }
];

movieArray= JSON.parse(localStorage.getItem('movieForm')) ?? [];

const templating = (arr) =>{
    let result='';
    movieArray.forEach(e=>{
        result += `
                <div class=" col-md-3 col-sm-6">
                    <div class="card text-center text-white text-bold text-uppercase mb-4" id="${e.id}">
                    <div class="card-header bg-primary">
                        ${e.title}
                    </div>
                    <div class="card-body">
                        <img src=" ${e.url}" class="image-fluid movieImg" title="${e.title}" >
                    </div>
                    <div class="card-footer bg-primary">
                        <i class="fa-solid fa-star text-warning float-left" ></i>
                        <p class="float-left">${e.rating}/5</p>
                     
                     <button type="button" class="btn btn-danger float-right p-1.1" onclick ="onDeleteBtn(this)">Delete</button>
                    </div>
                </div>
                </div>
                    `;
    })
    moviebody.innerHTML=result;

}
templating(movieArray)

const onAddMovie = (eve) =>{
    cl('form show')
    movieForm.classList.remove('d-none')
    BackDrop.classList.remove('d-none')
}

const onMovieSubmit = (eve) =>{
    eve.preventDefault();
    cl('added movie');
    let movieObj ={
        title : titleControl.value,
        url : urlControl.value,
        rating : ratingControl.value,
        id : generateUuid()
    }

    movieArray.unshift(movieObj);
    
    movieForm.classList.add('d-none')
    BackDrop.classList.add('d-none')
    eve.target.reset();
    templating(movieArray);
    localStorage.setItem('movieForm',JSON.stringify(movieArray))
    cl(movieArray)
    alert("New Movie Added...!")
}




const onmovieCloseBtn = (eve) =>{
    cl('closed')
   
    movieForm.classList.add('d-none')
    BackDrop.classList.add('d-none')
}

const onDeleteBtn = (eve) =>{
    cl('deleted')
    let deleId = eve.closest('.card').id;
    cl(deleId)
    let deleteIndx=movieArray.findIndex(obj=>obj.id === deleId)
    movieArray.splice(deleteIndx,1);
    localStorage.setItem('movieForm',JSON.stringify(movieArray))
    templating(movieArray)
    alert("Movie Deleted successfully...!!!")
}




showModalbtn.addEventListener("click",onAddMovie)
movieForm.addEventListener("submit",onMovieSubmit)
movieClose.forEach(ele=>ele.addEventListener("click",onmovieCloseBtn))
