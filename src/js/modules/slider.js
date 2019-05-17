let slideIndex = 0;
const slides = [...document.getElementsByClassName('slider_items')];
const slider = document.getElementById('slider');

export class Slider {
    showSlider () {
        const showSlides = (node, n) => {
            const go = () => {
                node.forEach((el) => el.style.display = 'none');
                n++;
                if (n > node.length) {
                    n = 1
                }
                node[n - 1].style.display = 'flex';
                setTimeout(go, 3000)
            };

            go();

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

        showSlides(slides, slideIndex);
    }
    hideSlider() {
        slider.style.display = 'none';
    }
    hideForSmallDev () {
        if (window.innerWidth < 600) {
            slider.style.display = 'none';
        } else if (window.innerWidth > 600) {
            slider.style.display = 'block';
        }
    }
}
