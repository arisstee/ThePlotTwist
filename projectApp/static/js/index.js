AOS.init();
// Add this to your existing JavaScript file
document.addEventListener('DOMContentLoaded', function () {
	const header = document.querySelector('.classics-header');

	// Add subtle parallax effect on scroll
	window.addEventListener('scroll', function () {
		const scrolled = window.pageYOffset;
		header.style.backgroundPositionY = scrolled * 0.5 + 'px';
	});

	// Add animation class when header comes into view
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	});

	observer.observe(header);
});

var Books = (function () {

	var transEndEventNames = {
		'WebkitTransition': 'webkitTransitionEnd',
		'MozTransition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'msTransition': 'MSTransitionEnd',
		'transition': 'transitionend'
	},
		transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		$books = $('#bk-list > li > div.bk-book'), booksCount = $books.length, currentbook = -1;

	function init() {

		$books.each(function (i) {

			var $book = $(this),
				$other = $books.not($book),
				$parent = $book.parent(),
				$page = $book.children('div.bk-page'),
				$content = $page.children('div.bk-content'), current = 0;

			if (i < booksCount / 2) {
				$parent.css('z-index', i).data('stackval', i);
			}
			else {
				$parent.css('z-index', booksCount - 1 - i).data('stackval', booksCount - 1 - i);
			}

			$book.on('click', function () {

				if (currentbook !== -1 && currentbook !== $parent.index()) {
					closeCurrent();
				}

				if ($book.data('opened')) {
					$book.data('opened', false).removeClass('bk-viewinside').on(transEndEventName, function () {
						$(this).off(transEndEventName).removeClass('bk-outside');
						$parent.css('z-index', $parent.data('stackval'));
						currentbook = -1;
					});
				}
				else {
					$book.data('opened', true).addClass('bk-outside').on(transEndEventName, function () {
						$(this).off(transEndEventName).addClass('bk-viewinside');
						$parent.css('z-index', booksCount);
						currentbook = $parent.index();
					});
					current = 0;
					$content.removeClass('bk-content-current').eq(current).addClass('bk-content-current');
				}

			});

			if ($content.length > 1) {

				var $navPrev = $('<span class="bk-page-prev">&lt;</span>'),
					$navNext = $('<span class="bk-page-next">&gt;</span>');

				$page.append($('<nav></nav>').append($navPrev, $navNext));

				$navPrev.on('click', function () {
					if (current > 0) {
						--current;
						$content.removeClass('bk-content-current').eq(current).addClass('bk-content-current');
					}
					return false;
				});

				$navNext.on('click', function () {
					if (current < $content.length - 1) {
						++current;
						$content.removeClass('bk-content-current').eq(current).addClass('bk-content-current');
					}
					return false;
				});

			}

		});

	}

	function closeCurrent() {

		var $book = $books.eq(currentbook),
			$parent = $book.parent();

		$book.data('opened', false).removeClass('bk-viewinside').on(transEndEventName, function (e) {
			$(this).off(transEndEventName).removeClass('bk-outside');
			$parent.css('z-index', $parent.data('stackval'));
		});

	}

	return { init: init };

})();
document.addEventListener('DOMContentLoaded', () => {
	// Mobile menu functionality
	const menuIcon = document.querySelector('.menu-icon');
	const navLinks = document.querySelector('.nav-links');
	const searchAuth = document.querySelector('.search-auth');

	menuIcon.addEventListener('click', () => {
		navLinks.classList.toggle('active');
		searchAuth.classList.toggle('active');

		// Animate menu icon
		menuIcon.classList.toggle('active');
	});



	// Smooth scroll for navigation links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				target.scrollIntoView({
					behavior: 'smooth'
				});
			}
		});
	});

	// Authentication buttons
	const loginBtn = document.querySelector('.login-btn');
	const registerBtn = document.querySelector('.register-btn');

	loginBtn.addEventListener('click', () => {
		// Implement login functionality here
		console.log('Login clicked');
	});

	registerBtn.addEventListener('click', () => {
		// Implement register functionality here
		console.log('Register clicked');
	});
});

document.addEventListener('uikit:init', () => {
	// do something
})


// Mobile menu functionality
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

// Toggle menu on click
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    const isClickInside = navLinks.contains(event.target) || menuIcon.contains(event.target);
    
    if (!isClickInside && navLinks.classList.contains('active')) {
        menuIcon.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Close menu when window is resized above mobile breakpoint
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menuIcon.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            menuIcon.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});