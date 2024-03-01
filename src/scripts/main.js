$.stellar({
	responsive: true,
	horizontalScrolling: false
});

// PRELOADER HANDLE
// ==================================
$(window).on('load', function() {
	$('.preloader').fadeOut();
	var gridFAQ = $('.lists--grid');

	gridFAQ.show().masonry({
		itemSelector: '.lists__item',
		columnWidth: '.lists__sizer',
		percentPosition: true
	});
});

$(function() {
	// Global Variables
	// ===================================
	// ===================================
	var navbarLink = $('.navbar__link');
	var scrollButton = $('.js-button-scroll');
	var navbar = $('.navbar');
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = navbar.outerHeight();
	var header = $('.header');
	var selectbox = $('.js-selectbox');

	// FUNCTIONS
	// ===================================
	// ===================================
	var scrollTo = function(el) {
		$('html, body').animate({scrollTop: $(el).offset().top}, 1000);
	};

	var hasScrolled = function() {
		var st = $(this).scrollTop();

		// Make sure scroll more than delta
		if (Math.abs(lastScrollTop - st) <= delta) {
			return;
		}

		if (st > lastScrollTop && st > navbarHeight) {
			// Scroll Down
			$('.navbar')
				.removeClass('nav-down nav-top')
				.addClass('nav-up');
		} else {
			// Scroll Up
			if (st < navbarHeight) {
				$('.navbar')
					.removeClass('nav-up')
					.addClass('nav-down nav-top');
			} else if (st + $(window).height() < $(document).height()) {
				$('.navbar')
					.removeClass('nav-up nav-top')
					.addClass('nav-down');
			}
		}

		lastScrollTop = st;
	};

	// Count The Date
	var countDownDate = new Date('Jan 19, 2019 12:00:00').getTime();

	var x = setInterval(function() {
		// Get todat Date and Time
		var now = new Date().getTime();

		// Distance between now and the countDownDate
		var distance = countDownDate - now;

		// Time Calculations for days, hours, minutes, and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		);
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var detik = Math.floor((distance % (1000 * 60)) / 1000);

		// Display the Results
		// $('#countDate').html(days + 'd ' + hours + 'h ' + minutes + 'm ' + detik);

		$('.days').html(days);
		$('.hours').html(hours);
		$('.minutes').html(minutes);
		$('.seconds').html(detik);

		if (distance < 0) {
			clearInterval(x);
			$('#countDate').html(
				'<h2 class="section_jumboline text-center">We\'ve already Married. Yeay!!</div>'
			);
		}
	}, 1000);

	// Navbar reveal on Scroll-up
	// ===================================
	$(window).on('scroll', function(e) {
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	// Initialize scrollTo
	// ===================================
	navbarLink.on('click', function(e) {
		e.preventDefault();
		var targetLink = $(this).attr('href');

		scrollTo(targetLink);

		// Trigger Click close Button
		$('.navbar__close-button').trigger('click');
	});

	scrollButton.on('click', function(e) {
		e.preventDefault();
		var targetLink = $(this).attr('href');

		scrollTo(targetLink);
	});

	// Initialize OwlCarousel
	// ===================================

	var carouselHack = $('.carousel--hackaton');
	if (carouselHack.length > 0) {
		carouselHack.owlCarousel({
			nav: true,
			navText: [
				'<i class="owl-carousel__icon owl-carousel__icon-prev"></i>',
				'<i class="owl-carousel__icon owl-carousel__icon-next"></i>'
			],
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				},
				1140: {
					items: 3
				}
			},
			autoplay: false,
			loop: false,
			dots: true
		});
	}

	// EVENT HANDLERS
	// =====================================
	// =====================================

	// Navigation Menu Button handler
	// =====================================
	$('[data-toggle="navigation"]').on('click', function(e) {
		e.preventDefault();
		var elementTarget = $(this).attr('data-target');

		if (!$(elementTarget).hasClass('is-active')) {
			$(elementTarget).css('display', 'flex');

			setTimeout(function() {
				$(elementTarget).addClass('is-active');
			}, 20);
		}
	});

	// Dismiss Menu Button handler
	// =====================================
	$('[data-dismiss="navigation"]').on('click', function(e) {
		$(this)
			.parent()
			.removeClass('is-active')
			.attr('style', '');
	});

	// Selectbox Click handler
	// ===================================
	selectbox.on('click', '.selectbox__header', function() {
		var _elTarget = $(this);
		if (!_elTarget.closest('.selectbox').hasClass('selectbox--is-open')) {
			_elTarget.siblings('.selectbox__body').css('display', 'block');

			setTimeout(function() {
				_elTarget.closest('.selectbox').addClass('selectbox--is-open');
				selectLists.getNiceScroll().resize();
			}, 20);
		} else {
			_elTarget
				.closest('.selectbox')
				.removeClass('selectbox--is-open')
				.one('transitionend', function() {
					$(this)
						.find('.selectbox__body')
						.attr('style', '');
				});
		}
	});

	selectbox.on('click', '.selectbox__body span', function(e) {
		var queryName = e.target.getAttribute('data-value');
		var selectedName = e.target.innerText;

		// Change name of Selectbox Header into selected span text
		$(this)
			.closest('.selectbox')
			.find('.selectbox__name')
			.html(selectedName);

		// Filling value into hidden input with selected data-value span
		$(this)
			.closest('.form-group')
			.find('#industri')
			.val(queryName);

		// Hide Selectbox Body
		$('.selectbox.selectbox--is-open')
			.removeClass('selectbox--is-open')
			.one('transitionend', function() {
				$('.selectbox__body').attr('style', '');
			});

		// Add Active state on selected span in selectbox Body
		$('.selectbox__body li').removeClass('active');
		$(this)
			.parent()
			.addClass('active');
	});

	// Cancel Document click
	// =======================================
	$(document).on('click', function(e) {
		// Cancel selectbox
		if (!$(e.target).closest('.selectbox').length) {
			$('.selectbox.selectbox--is-open')
				.removeClass('selectbox--is-open')
				.one('transitionend', function() {
					$(this)
						.find('.selectbox__body')
						.attr('style', '');
				});
		}
	});
});
