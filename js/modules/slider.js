export default function slider() {
	//Slider
	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		totalSlides = document.querySelector('#total'),
		currentSlide = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),
		widthInner = window.getComputedStyle(slidesWrapper).width;
	let slideIndex = 1,
		offset = 0;

	const getZero = number => {
		if (number >= 0 && number < 10) {
			return `0${number}`;
		} else {
			return number;
		}
	};

	const setCurrentSlide = () => {
		currentSlide.textContent = getZero(slideIndex);
	};

	totalSlides.textContent = getZero(slides.length);
	setCurrentSlide();

	slidesField.style.width = `${100*slides.length}%`;
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';
	slidesWrapper.style.overflow = 'hidden';
	slides.forEach(slide => slide.style.width = widthInner);
	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
		dots = [];
	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	const moveDots = () => {
		dots.forEach(dot => dot.style.opacity = 0.5);
		dots[slideIndex - 1].style.opacity = 1;
	};

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	const deleteNotDigits = (str) => +str.replace(/\D/g, '');
	next.addEventListener('click', () => {
		if (offset == deleteNotDigits(widthInner) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(widthInner);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;
		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}
		setCurrentSlide();
		moveDots();
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(widthInner) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(widthInner);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;
		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}
		setCurrentSlide();
		moveDots();
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = deleteNotDigits(widthInner) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;
			setCurrentSlide();
			moveDots();
		});
	});
}