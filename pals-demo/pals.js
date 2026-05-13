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

// Message/Moments Tab Switcher
function switchTab(tab) {
	const msgView = document.getElementById('messagesView');
	const momView = document.getElementById('momentsView');
	const msgTab = document.getElementById('msgTab');
	const momTab = document.getElementById('momTab');
		if (tab === 'messages') {
		// 1. Handle Visibility
		msgView.classList.remove('hidden');
		momView.classList.add('hidden');
		// 2. Active State: Messages (Red + Underline)
		msgTab.classList.add('text-red-500', 'border-red-500', 'font-black');
		msgTab.classList.remove('text-zinc-900', 'dark:text-zinc-100', 'border-transparent', 'font-bold');
		// 3. Inactive State: Moments (Neutral/White + No Underline)
		momTab.classList.add('text-zinc-900', 'dark:text-zinc-100', 'border-transparent', 'font-bold');
		momTab.classList.remove('text-red-500', 'border-red-500', 'font-black');
	} else {
	// 1. Handle Visibility
	msgView.classList.add('hidden');
	momView.classList.remove('hidden');
	// 2. Active State: Moments (Red + Underline)
	momTab.classList.add('text-red-500', 'border-red-500', 'font-black');
	momTab.classList.remove('text-zinc-900', 'dark:text-zinc-100', 'border-transparent', 'font-bold');
	// 3. Inactive State: Messages (Neutral/White + No Underline)
	msgTab.classList.add('text-zinc-900', 'dark:text-zinc-100', 'border-transparent', 'font-bold');
	msgTab.classList.remove('text-red-500', 'border-red-500', 'font-black');
	}
}

// Menu
function toggleMenu() {
	const menu = document.getElementById('settingsMenu');
	const overlay = document.getElementById('menuOverlay');
	menu.classList.toggle('translate-x-full');
	overlay.classList.toggle('opacity-0');
	overlay.classList.toggle('pointer-events-none');
}

// Onboarding About Panel
function toggleAbout() {
	const panel = document.getElementById('aboutPanel');
	const overlay = document.getElementById('overlay');
	panel.classList.toggle('translate-y-full');
	panel.classList.toggle('shadow-[0_-20px_50px_rgba(0,0,0,0.2)]');
	overlay.classList.toggle('opacity-0');
	overlay.classList.toggle('pointer-events-none');
}

// Onboarding 3
function showScreen(screenId) {
	document.querySelectorAll('.onboarding-screen').forEach(s => s.classList.add('hidden'));
	document.getElementById(screenId).classList.remove('hidden');

		if (screenId === 'screen4') {
			setTimeout(() => {
			window.location.href = 'index.html';
		}, 2000);
	}
}

// Sign-in page
function showConfirmation() {
	const overlay = document.getElementById('confirmationOverlay');
	overlay.classList.remove('hidden');
	document.body.style.overflow = 'hidden';
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


// Emily Moon Chat scroll to bottom on load
document.addEventListener('DOMContentLoaded', () => {
	const lastMessage = document.querySelector('#chat-container > div:last-child');
	if (lastMessage) lastMessage.scrollIntoView({ block: 'end' });
});

// Emily Moon Chat feature menu toggle
function toggleFeatureMenu() {
	const menu = document.getElementById('featureMenu');
	menu.classList.toggle('hidden');
}
window.addEventListener('click', function(e) {
	const menu = document.getElementById('featureMenu');
	const plusButton = document.getElementById('plusButton');
	if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !plusButton.contains(e.target)) {
		menu.classList.add('hidden');
	}
});

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

// Invite or Add a Pal Confetti
		function showSuccess() {
			document.getElementById('screen-main').classList.add('hidden');
			document.getElementById('screen-success').classList.remove('hidden');
			launchConfetti();
		}

		function showMain() {
			document.getElementById('screen-success').classList.add('hidden');
			document.getElementById('screen-main').classList.remove('hidden');
			document.getElementById('confetti-container').innerHTML = '';
		}

		function launchConfetti() {
			const container = document.getElementById('confetti-container');
			container.innerHTML = '';
			const colors = [
			'#FFADAD', // Bright Pastel Red (Coral)
			'#FFD6A5', // Bright Pastel Orange (Apricot)
			'#FDFFB6', // Bright Pastel Yellow (Lemon)
			'#CAFFBF', // Bright Pastel Green (Mint)
			'#9BF6FF', // Bright Pastel Blue (Sky)
			'#BDB2FF'  // Bright Pastel Purple (Lavender)
			];
			const shapes = ['rounded-sm', 'rounded-full', ''];
			for (let i = 0; i < 60; i++) {
				const piece = document.createElement('div');
				const color = colors[Math.floor(Math.random() * colors.length)];
				const shape = shapes[Math.floor(Math.random() * shapes.length)];
				const size = Math.random() * 8 + 4;
				const left = Math.random() * 100;
				const delay = Math.random() * 2;
				const duration = Math.random() * 2 + 2;
				piece.className = `confetti-piece ${shape}`;
				piece.style.cssText = `
					left: ${left}%;
					top: -10px;
					width: ${size}px;
					height: ${size}px;
					background-color: ${color};
					animation-duration: ${duration}s;
					animation-delay: ${delay}s;
				`;
				container.appendChild(piece);
			}
		}

//