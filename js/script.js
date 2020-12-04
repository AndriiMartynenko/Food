window.addEventListener('DOMContentLoaded', () => {
	// Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {

		tabsContent.forEach(tab => {
			tab.classList.add('hide');
			tab.classList.remove('show', 'fade');
		});

		tabs.forEach(tab => {
			tab.classList.remove('tabheader__item_active');
		});

	}

	function showTabContent(index = 0) {
		tabsContent[index].classList.add('show', 'fade');
		tabsContent[index].classList.remove('hide');
		tabs[index].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (e) => {
		const target = e.target;

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((tab, index) => {
				if (target == tab) {
					hideTabContent();
					showTabContent(index);
				}
			});
		}
	});

	// Timer 
	const deadline = '2020-12-16';

	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

		return {
			'total': t,
			days,
			hours,
			minutes,
			seconds
		};
	}

	function getZero(number) {
		if (number >= 0 && number < 10) {
			return `0${number}`;
		} else {
			return number;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);


			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock('.timer', deadline);


	// Modal
	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}


	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 30000);

	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

	// используем классы для карточек
	class MenuCard {
		constructor(src, alt, title, description, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.description = description;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
			this.classes = classes;
			this.currency = 27;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.currency;
		}

		render() {
			const element = document.createElement('div');

			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => {
					element.classList.add(className);
				});
			}

			element.innerHTML = `
						<img src=${this.src} alt=${this.alt}>
						<h3 class="menu__item-subtitle">${this.title}</h3>
						<div class="menu__item-descr">${this.description}</div>
						<div class="menu__item-divider"></div>
						<div class="menu__item-price">
							<div class="menu__item-cost">Цена:</div>
							<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
						</div>
						`;
			this.parent.append(element);
		}
	}

	const getResource = async (url) => {
		let res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status:${res.status}`);
		}
		return await res.json();
	};

	// getResource('http://localhost:3000/menu')
	// 	.then(data => {
	// data.forEach(({
	// 	img,
	// 	altimg,
	// 	title,
	// 	descr,
	// 	price
	// }) => {
	// 	new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
	// });
	// 	})
	axios.get('http://localhost:3000/menu').
	then(data => {
		data.data.forEach(({
			img,
			altimg,
			title,
			descr,
			price
		}) => {
			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
		});
	});

	// Forms

	const forms = document.querySelectorAll('form');

	const message = {
		loading: '/img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	forms.forEach(form => {
		bindPostData(form);
	});

	const postData = async (url, data) => {
		let res = await fetch(url, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: data
		});

		return await res.json();
	};



	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
						display: block;
						margin: 0 auto;
				`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
				<div class="modal__content">
						<div class="modal__close" data-close>×</div>
						<div class="modal__title">${message}</div>
				</div>
		`;
		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

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

	function setCurrentSlide() {
		currentSlide.textContent = getZero(slideIndex);
	}

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

	function moveDots() {
		dots.forEach(dot => dot.style.opacity = 0.5);
		dots[slideIndex - 1].style.opacity = 1;
	}

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
	next.addEventListener('click', () => {
		if (offset == +widthInner.slice(0, widthInner.length - 2) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += +widthInner.slice(0, widthInner.length - 2);
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
			offset = +widthInner.slice(0, widthInner.length - 2) * (slides.length - 1);
		} else {
			offset -= +widthInner.slice(0, widthInner.length - 2);
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
			offset = +widthInner.slice(0, widthInner.length - 2) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;
			setCurrentSlide();
			moveDots();
		});
	});
});