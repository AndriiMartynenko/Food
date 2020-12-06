/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ calc
/* harmony export */ });
 function calc() {
 	// Calculator
 	const result = document.querySelector('.calculating__result span');
 	let sex, height, weight, age, ratio;
 	if (localStorage.getItem('sex')) {
 		sex = localStorage.getItem('sex');
 	} else {
 		sex = 'female';
 		localStorage.setItem('sex', 'female');
 	}
 	if (localStorage.getItem('ratio')) {
 		ratio = localStorage.getItem('ratio');
 	} else {
 		ratio = 1.375;
 		localStorage.setItem('ratio', 1.375);
 	}

 	const initLocalSettings = (selector, activeClass) => {
 		const elements = document.querySelectorAll(selector);
 		elements.forEach(elem => {
 			elem.classList.remove(activeClass);
 			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
 				elem.classList.add(activeClass);
 			}
 			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
 				elem.classList.add(activeClass);
 			}
 		});
 	};

 	initLocalSettings('#gender div', 'calculating__choose-item_active');
 	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

 	const calcTotal = () => {
 		if (!sex || !height || !weight || !age || !ratio) {
 			result.textContent = `_____`;
 			return;
 		}
 		if (sex === 'female') {
 			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
 		} else {
 			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
 		}
 	};

 	const getStaticInformation = (selector, activeClass) => {
 		const elements = document.querySelectorAll(selector);

 		elements.forEach(element => {
 			element.addEventListener('click', (e) => {
 				if (e.target.getAttribute('data-ratio')) {
 					ratio = +e.target.getAttribute('data-ratio');
 					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
 				} else {
 					sex = e.target.getAttribute('id');
 					localStorage.setItem('sex', e.target.getAttribute('id'));
 				}
 				elements.forEach(element => {
 					element.classList.remove(activeClass);
 				});
 				e.target.classList.add(activeClass);
 				calcTotal();
 			});
 		});
 	};

 	getStaticInformation('#gender div', 'calculating__choose-item_active');
 	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

 	const getInputInformation = (selector) => {
 		const input = document.querySelector(selector);

 		input.addEventListener('input', () => {

 			if (input.value.match(/\D/g)) {
 				input.style.border = "1px solid red";
 			} else {
 				input.style.border = 'none';
 			}
 			switch (input.getAttribute('id')) {
 				case 'height':
 					height = +input.value;
 					break;
 				case 'weight':
 					weight = +input.value;
 					break;
 				case 'age':
 					age = +input.value;
 					break;
 			}
 			calcTotal();
 		});
 	};
 	getInputInformation('#height');
 	getInputInformation('#weight');
 	getInputInformation('#age');
 }

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ cards
/* harmony export */ });
function cards() {
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

	// axios.get('http://localhost:3000/menu').
	// then(data => {
	// 	data.data.forEach(({
	// 		img,
	// 		altimg,
	// 		title,
	// 		descr,
	// 		price
	// 	}) => {
	// 		new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
	// 	});
	// });
	new MenuCard('img/tabs/vegy.jpg',
		'vegy',
		"Меню 'Фитнес'",
		"Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
		9,
		'.menu .container').render();

	new MenuCard('img/tabs/post.jpg',
		'post',
		"Меню 'Постное'",
		"Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
		14,
		'.menu .container').render();

	new MenuCard('img/tabs/elite.jpg',
		'elite',
		"Меню 'Премиум'",
		"В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
		21,
		'.menu .container').render();
}

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ forms
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");

function forms(formsSelector, modalTimerId) {
	// Forms
	const forms = document.querySelectorAll(formsSelector);

	const message = {
		loading: './img/form/spinner.svg',
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

	const showThanksModal = (message) => {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

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
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
		}, 4000);
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

			const formData = new FormData(form),
				json = JSON.stringify(Object.fromEntries(formData.entries()));

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
}

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ modal,
/* harmony export */   "closeModal": () => /* binding */ closeModal,
/* harmony export */   "openModal": () => /* binding */ openModal
/* harmony export */ });
const openModal = (modalSelector, modalTimerId) => {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
};

const closeModal = (modalSelector) => {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
};

function modal(triggerSelector, modalSelector, modalTimerId) {
	const modalTrigger = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});

	const showModalByScroll = () => {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		}
	};

	window.addEventListener('scroll', showModalByScroll);
}


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ slider
/* harmony export */ });
function slider() {
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

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ tabs
/* harmony export */ });
function tabs() {
	// Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	const hideTabContent = () => {
		tabsContent.forEach(tab => {
			tab.classList.add('hide');
			tab.classList.remove('show', 'fade');
		});

		tabs.forEach(tab => {
			tab.classList.remove('tabheader__item_active');
		});

	};

	const showTabContent = (index = 0) => {
		tabsContent[index].classList.add('show', 'fade');
		tabsContent[index].classList.remove('hide');
		tabs[index].classList.add('tabheader__item_active');
	};

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
}

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ timer
/* harmony export */ });
function timer() {
	// Timer 
	const deadline = '2020-12-16';

	const getTimeRemaining = endtime => {
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
	};

	const getZero = number => {
		if (number >= 0 && number < 10) {
			return `0${number}`;
		} else {
			return number;
		}
	};

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
}

/***/ }),

/***/ "./js/script.js":
/*!**********************!*
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener('DOMContentLoaded', () => {
	const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 30000);
	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)();
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', '.modal', modalTimerId);
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)();
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__.default)();
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.default)('form', modalTimerId);
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)();
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map