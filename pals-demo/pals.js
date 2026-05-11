// Tailwind Configuration
window.tailwind.config = { darkMode: 'class' }

// Theme Engine
function applyTheme() {
	const useSystem = localStorage.getItem('pals-use-system') === 'true';
	const savedTheme = localStorage.getItem('pals-theme');
	let isDark = useSystem ? window.matchMedia('(prefers-color-scheme: dark)').matches : savedTheme === 'dark';
	document.documentElement.classList.toggle('dark', isDark);

	// Update dark toggle state if it exists (settings page only)
	const darkToggle = document.getElementById('darkToggle');
	if (darkToggle) darkToggle.disabled = useSystem;
}

function handleThemeToggle(checkbox) {
	localStorage.setItem('pals-theme', checkbox.checked ? 'dark' : 'light');
	applyTheme();
}

function handleSystemToggle(checkbox) {
	localStorage.setItem('pals-use-system', checkbox.checked);
	applyTheme();
}

// Menu
function toggleMenu() {
	const menu = document.getElementById('settingsMenu');
	const overlay = document.getElementById('menuOverlay');
	menu.classList.toggle('translate-x-full');
	overlay.classList.toggle('opacity-0');
	overlay.classList.toggle('pointer-events-none');
}

// Quick Button Settings (settings page only)
function checkLimit(checkbox) {
	const checkboxes = document.querySelectorAll('input[name="quickButtons"]');
	const checkedCount = Array.from(checkboxes).filter(c => c.checked).length;
	if (checkedCount > 4) {
		checkbox.checked = false;
		alert("You can only select up to 4 buttons.");
		return;
	}
	const targetButton = document.getElementById(checkbox.value + "-btn");
	if (targetButton) {
		targetButton.classList.toggle('hidden', !checkbox.checked);
	}
}

// Delete confirmation
function showConfirmation() {
	const overlay = document.getElementById('confirmationOverlay');
	overlay.classList.remove('hidden');
	// Prevents further interaction with the background
	document.body.style.overflow = 'hidden';
}

// Initialise
applyTheme();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
	if (localStorage.getItem('pals-use-system') === 'true') applyTheme();
});

// Sync settings page toggles on load
window.addEventListener('DOMContentLoaded', () => {
	const systemToggle = document.getElementById('systemToggle');
	const darkToggle = document.getElementById('darkToggle');
	if (!systemToggle || !darkToggle) return;

	const useSystem = localStorage.getItem('pals-use-system') === 'true';
	const savedTheme = localStorage.getItem('pals-theme');
	const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

	systemToggle.checked = useSystem;
	darkToggle.checked = useSystem ? systemIsDark : savedTheme === 'dark';
	darkToggle.disabled = useSystem;
});