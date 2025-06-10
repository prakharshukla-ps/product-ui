// Cache DOM Elements
const unitRadios = document.querySelectorAll('input[name="unit"]');
const totalPriceElement = document.getElementById("totalPrice");
const addToCartButton = document.getElementById("addToCartButton");
const cartConfirmation = document.getElementById("cartConfirmation");
const errorMessage = document.getElementById("errorMessage");

// Get all the options containers (dropdowns for size/color)
const optionsContainers = {
	1: document.getElementById("options1"),
	2: document.getElementById("options2"),
	3: document.getElementById("options3"),
};

// Function to update the total price and visibility of options based on selected unit
function updateUI() {
	let selectedPrice = 0;
	let selectedUnit = null;

	// Iterate over each radio button to find the checked one
	unitRadios.forEach((radio) => {
		const parentLabel = radio.closest(".unit-option"); // Get the parent label
		if (radio.checked) {
			selectedPrice = parseFloat(radio.dataset.price);
			selectedUnit = radio.value;
			parentLabel.classList.add("selected-unit-option");
		} else {
			parentLabel.classList.remove("selected-unit-option");
		}
	});

	// Update the text content of the total price element
	totalPriceElement.textContent = `$${selectedPrice.toFixed(2)} USD`;

	// Show/hide options containers with animation based on selected unit
	for (const unit in optionsContainers) {
		if (optionsContainers[unit]) {
			// Ensure the container exists
			if (unit === selectedUnit) {
				optionsContainers[unit].classList.remove("hidden-options");
				optionsContainers[unit].style.display = "grid"; // Ensure grid display when visible
			} else {
				optionsContainers[unit].classList.add("hidden-options");
				setTimeout(() => {
					if (optionsContainers[unit].classList.contains("hidden-options")) {
						optionsContainers[unit].style.display = "none";
					}
				}, 500); // Match this duration with max-height transition duration
			}
		}
	}
	// Hide error message on unit change
	errorMessage.classList.remove("show");
}

// Function to validate dropdowns for the selected unit
function validateDropdowns() {
	let isValid = true;
	let selectedUnitValue = null;

	// Find the currently selected unit
	unitRadios.forEach((radio) => {
		if (radio.checked) {
			selectedUnitValue = radio.value;
		}
	});

	if (selectedUnitValue) {
		// Get all select elements specific to the selected unit
		const relevantSelects = document.querySelectorAll(
			`#options${selectedUnitValue} select`
		);
		relevantSelects.forEach((select) => {
			if (select.value === "") {
				// Check if the placeholder option is selected
				isValid = false;
			}
		});
	}
	return isValid;
}

// Add event listener to each radio button to update UI on change
unitRadios.forEach((radio) => {
	radio.addEventListener("change", updateUI);
});

// Add event listener for the "Add to Cart" button
addToCartButton.addEventListener("click", () => {
	if (validateDropdowns()) {
		errorMessage.classList.remove("show");

		cartConfirmation.classList.add("show");

		// Hide confirmation message after a few seconds
		setTimeout(() => {
			cartConfirmation.classList.remove("show");
		}, 3000);

		console.log("Item(s) added to cart!");
	} else {
		errorMessage.classList.add("show");
		console.log("Validation failed: Please select all required options.");
	}
});

// Initial update of the UI when the page loads
document.addEventListener("DOMContentLoaded", updateUI);
