// Pizza Emoji Javascript - /blog/javascript.js

// Get references to the main menu elements
const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('overlay');

// Variables to track menu state
let animationShown = false; // Prevents animation from running multiple times

 // Toggles the side menu open/closed state
 // Handles all visual states
function toggleMenu() {
	// Check if menu is currently open by looking for 'open' class
	const isOpen = sideMenu.classList.contains('open');
	
	if (isOpen) {
		// Close the menu
		sideMenu.classList.remove('open');
		overlay.classList.remove('show');
		menuToggle.classList.remove('active');
		document.body.style.overflow = ''; // Restore page scrolling
	} else {
		// Open the menu
		sideMenu.classList.add('open');
		overlay.classList.add('show');
		menuToggle.classList.add('active');
		document.body.style.overflow = 'hidden'; // Prevent page scrolling
	}
}


 // Adds a cartoon bounce animation to the menu toggle button
 // Animation lasts for 3 seconds
function triggerCartoonBounce() {
    menuToggle.classList.add('cartoonBounce');
    
    // Remove the animation class after 3 seconds
    setTimeout(() => {
        menuToggle.classList.remove('cartoonBounce');
    }, 5500);
}

// Initialize menu behavior when page loads
document.addEventListener('DOMContentLoaded', () => {
	// Only show bounce animation once and only on larger screens (≥800px)
	if (!animationShown && window.innerWidth >= 800) {
		animationShown = true;
		
		// Trigger bounce animation 1 second after page load
		setTimeout(() => {
			triggerCartoonBounce();
		}, 1000);
	}
});

// Event listeners for menu interactions

// Toggle menu when menu button is clicked
menuToggle.addEventListener('click', toggleMenu);

// Close menu when overlay (background) is clicked
overlay.addEventListener('click', toggleMenu);

// Close menu when any menu item is clicked (with small delay)
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
	item.addEventListener('click', () => {
		// Small delay allows the click to register before closing menu
		setTimeout(toggleMenu, 100);
	});
});

// Close menu when Escape key is pressed
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && sideMenu.classList.contains('open')) {
		toggleMenu();
	}
});

// Close menu automatically when screen becomes wide enough (responsive behavior)
window.addEventListener('resize', () => {
	// Close menu if screen becomes wider than 800 (tablet/desktop view)
	if (window.innerWidth > 800 && sideMenu.classList.contains('open')) {
		toggleMenu();
	}
});