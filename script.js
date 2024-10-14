const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const SlideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    //handle scrollbar thumb drag //
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const starX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;

        //update thumb position on mouse move //
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - starX;
            const newThumbPosition = thumbPosition + deltaX;
            scrollbarThumb.style.Left = `${newThumbPosition}px`;
        }

        // remove event listeners on mouse up //
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        //add event listeners for drag interaction //
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slidle images according to the slide button clicks //
    SlideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id == "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    const handleSlideButtons = () => {
        SlideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        SlideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    }

    //update scrollbar thumb position based on image scroll //
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });
}

window.addEventListener("load", initSlider);