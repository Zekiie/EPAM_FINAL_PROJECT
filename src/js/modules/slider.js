let slideIndex = 0;
const slides = [...document.getElementsByClassName('slider_items')];

const showSlides = () => {
    slides.forEach((el) => el.style.display = 'none');
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = 'flex';
    setTimeout(showSlides, 3000)

};


function arrowChange(arr, n) {
    arr = slides;
    n = slideIndex;
    if (n > arr.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = arr.length
    }
    slides.forEach((el) => el.style.display = 'none');
    arr[slideIndex - 1].style.display = "flex";
}


document.getElementById("left-sl").addEventListener("click", () => arrowChange(slideIndex += 1));
document.getElementById("right-sl").addEventListener("click", () => arrowChange(slideIndex -= 1));

showSlides();