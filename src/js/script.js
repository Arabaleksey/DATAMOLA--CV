const burger = document.querySelector('.header__burger')
const menu = document.querySelector('.header__navigation-bar')
const body = document.getElementById('body')

burger.addEventListener('click', ()=>{
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('lock');
})
document.querySelectorAll('.header__navigation-links')
    .forEach(el => el.addEventListener('click',()=>{
        burger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('lock');
    }))





const anchors = document.querySelectorAll('a[href*="#"]')

for (let el of anchors){
    el.addEventListener('click', function(event){
        event.preventDefault();
        const href = el.getAttribute('href')
        document.querySelector('' + href).scrollIntoView({
            behavior: 'smooth', 
            block: 'start',
        })
    })
}





const textName = [
    "Arabchik Aleksey"
];

function writeText(){
    let line = 0;
    let count = 0;
    let conclusion = '';
    let htmlText = document.querySelector('.main__name')

    function writeLine(){
        let interval = setTimeout(function(){
            conclusion += textName[line][count];
            htmlText.innerHTML = conclusion;
            count++;
            if(count >=textName[line].length){
                count = 0;
                line++;
                if(line == textName.length){
                    clearTimeout(interval);
                    return true
                }
            }
            writeLine()

        },150)
    }
    writeLine()

}



const links = document.querySelectorAll('.about__link');
const contents = document.querySelectorAll('.about__content');

links.forEach((link,i)=>{
    link.addEventListener('click',(el)=>{
        links.forEach(link=>{
            link.classList.remove('active')
        })
        link.classList.add('active')

        contents.forEach(content=>{
            content.classList.remove('active')
        })
        contents[i].classList.add('active')
    })
})


const images = document.querySelectorAll('.hobby__slider .hobby__slider-line img')
const sliderLine = document.querySelector('.hobby__slider-line');
let count = 0;
let width;

function init(){
    width = document.querySelector('.hobby__slider').offsetWidth;
    sliderLine.getElementsByClassName.width = width*images.length +'px';
    images.forEach(el=>{
        el.style.width = width + 'px';
        el.style.height = 'auto';
    });
    rollSlider()
}

window.addEventListener('resize', init)
init()

document.querySelector('.hobby__btn-prev').addEventListener('click', function(){
    count--;
    if(count <0 ){
        count = images.length - 1;
    }
    rollSlider();
})

document.querySelector('.hobby__btn-next').addEventListener('click', function(){
    count++;
    if(count >= images.length){
        count=0;
    }
    rollSlider();
})

function rollSlider(){
    sliderLine.style.transform = 'translate(-'+count*width+ 'px)';
}





const pictures = document.getElementById('hobby__wrapper')
const modalPicture = document.getElementById("modal__picture")
const modalPictureCloseBtn = document.getElementsByClassName("modal__picture-close")[0];
const modalPictureContent = document.getElementById("modal__picture-inner")

async function getPictures() {
    let responce = await fetch('https://63cba5ac5c6f2e1d84b93cfa.mockapi.io/cv')
    return  await responce.json()
        .then(function(el){
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
            writeText()
            makeGrid(el)
            localStorage.setItem('img',JSON.stringify(el))
        })
}
getPictures()

function makeGrid (data){
    data.forEach(function(item){
        displayPictures =`
        <div class="hobby__picture" id="${item.id}">
            <img src="${item.url}" class="hobby__img" id="hobby__img" alt="">
            <div class="hobby__open-img" id="hobby__open-img"></div>
        </div>
        `;

        pictures.insertAdjacentHTML("afterbegin", displayPictures);
        const openImg = document.getElementById('hobby__open-img')
        pictures
            .querySelector(`img[id="hobby__img"]`)
            .addEventListener('click', ()=>{
            modalPicture.style.display = "block";
            body.classList.toggle('lock');
            modalPictureContent.innerHTML=`
            <img src="${item.url}" alt="" class="modal__picture-open">
            `
            modalPictureCloseBtn.onclick = function(){
                modalPicture.style.display = "none";
                body.classList.remove('lock');
            }
            window.onclick = function(event){
                if(event.target == modalPicture){
                    modalPicture.style.display = "none"
                    body.classList.remove('lock');
                }

            }
            })

        openImg.addEventListener('click',(el) => {
            el.preventDefault;
            modalPicture.style.display = "block";
            body.classList.toggle('lock');
            modalPictureContent.innerHTML=`
            <img src="${item.url}" alt="" class="modal__picture-open">
            `
            modalPictureCloseBtn.onclick = function(){
                modalPicture.style.display = "none";
                body.classList.remove('lock');
            }
            window.onclick = function(event){
                if(event.target == modalPicture){
                    modalPicture.style.display = "none"
                    body.classList.remove('lock');
                }

            }
  
        })
    })

}

