import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

function initSlider(selector: string) {
	if (document.querySelector(selector)) {
		new Swiper(selector, {
			modules: [Pagination, Navigation],
			slidesPerView: 1,
			slidesPerGroup: 1,
			speed: 700,
			spaceBetween: 12,
			pagination: {
				el: '.main-slider__pagination',
				clickable: true,
				type: 'bullets',
				bulletElement: 'div',
				bulletClass: 'main-slider__bullet',
				bulletActiveClass: 'main-slider__bullet--active'
			},
			navigation: {
				nextEl: '.main-slider__btn--next',
				prevEl: '.main-slider__btn--prev'
			}
		});
	}
}

export { initSlider };
