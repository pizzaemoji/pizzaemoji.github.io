	</main>	
	<footer>
	<div>
		<p class="darkmode">Dark Mode &nbsp; <label class="switch"><input type="checkbox" checked onclick="toggleDarkMode()"><span class="slider-orange"></span></label>
		</p>
<!-- <p><button class="btn" onclick="alert('hello')"></button> -->
		<p class="copy">&copy; <?php echo date("Y"); ?> Brandon Butler</p>
	</div>
	</footer>
	<script>
//const button = document.querySelector(".btn");
// MediaQueryList object
const useDark = window.matchMedia("(prefers-color-scheme: light)");

// Toggles light/dark class
function toggleDarkMode(state) {
	document.documentElement.classList.toggle("light", state);
	darkModeState = state;
}

// Sets localStorage state
function setDarkModeLocalStorage(state) {
	localStorage.setItem("light", state);
}

// Initial setting
toggleDarkMode(localStorage.getItem("light") == "true");

// Listen for OS settings
useDark.addListener((evt) => toggleDarkMode(evt.matches));

// Toggles dark class on click and sets localStorage state
button.addEventListener("click", () => {
	darkModeState = !darkModeState;

	toggleDarkMode(darkModeState);
	setDarkModeLocalStorage(darkModeState);
});
	</script>
</body>
</html>