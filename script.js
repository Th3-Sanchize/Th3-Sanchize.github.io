// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quote-form');
    const makeSelect = document.getElementById('vehicle-make');
    const modelSelect = document.getElementById('vehicle-model');
    const result = document.getElementById('quote-result');
    let vehicleData;
    let vehicleTypes;

    // Function to load JSON data
    async function loadVehicleData() {
        try {
            const response = await fetch('data/vehicleData.json');
            vehicleData = await response.json();
            populateMakes(vehicleData);
        } catch (error) {
            console.error('Error loading vehicle data:', error);
        }
    }

    async function loadVehicleTypes() {
        try {
            const response = await fetch('data/vehicleTypes.json');
            vehicleTypes = await response.json();
        } catch (error) {
            console.error('Error loading vehicle types:', error);
        }
    }

    // Function to populate makes dropdown
    function populateMakes(data) {
        Object.keys(data).forEach(make => {
            const option = document.createElement('option');
            option.value = make;
            option.textContent = make;
            makeSelect.appendChild(option);
        });

        // Add event listener to make dropdown
        makeSelect.addEventListener('change', () => {
            populateModels(data);
        });
    }

    // Function to populate models dropdown based on selected make
    function populateModels(data) {
        const selectedMake = makeSelect.value;
        modelSelect.innerHTML = '<option value="" disabled selected>Select Model</option>';
        if (data[selectedMake]) {
            data[selectedMake].forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });
        }
    }

    // Load vehicle data and types on page load
    loadVehicleData();
    loadVehicleTypes();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const selectedMake = document.getElementById('vehicle-make').value;
        const selectedModel = document.getElementById('vehicle-model').value;
        let vehicleType = '';

        // Determine the vehicle type
        for (const type in vehicleTypes) {
            if (vehicleTypes[type].includes(selectedModel)) {
                vehicleType = type;
                break;
            }
        }

        const packageType = document.getElementById('package').value;
        const tintPackage = document.getElementById('tint-package').value;
        const addOns = Array.from(document.querySelectorAll('input[name="add-ons"]:checked')).map(input => input.value);
        
        const packagePrices = {
            'front-windows': { bronze: 124.99, silver: 174.99, gold: 224.99 },
            coupe: {
                'all-windows': { bronze: 174.99, silver: 249.99, gold: 349.99 }
            },
            'sedan-suv': {
                'all-windows': { bronze: 224.99, silver: 299.99, gold: 399.99 }
            },
            'mid-large-suv': {
                'all-windows': { bronze: 274.99, silver: 349.99, gold: 449.99 }
            }
        };

        const addOnPrices = {
            sunroof: 50,
            windshield: 199.99,
            eyebrow: 59.99,
            tintRemoval: 50,
            tintRemovalRear: 100
        };

        let totalPrice = packagePrices[packageType][tintPackage];
        if (packageType === 'all-windows') {
            totalPrice = packagePrices[vehicleType][packageType][tintPackage];
        }
        
        addOns.forEach(addOn => {
            if (addOn === 'tintRemoval') {
                totalPrice += addOnPrices.tintRemoval;
            } else if (addOn === 'tintRemovalRear') {
                totalPrice += addOnPrices.tintRemovalRear;
            } else {
                totalPrice += addOnPrices[addOn];
            }
        });

        // Ensure all form fields are filled before showing the quote
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const vehicleYear = document.getElementById('vehicle-year').value;
        const vehicleMake = document.getElementById('vehicle-make').value;
        const vehicleModel = document.getElementById('vehicle-model').value;
        const contactMethod = document.getElementById('contact-method').value;
        const date = document.getElementById('date').value;
        
        if (!name || !email || !phone || !vehicleYear || !vehicleMake || !vehicleModel || !packageType || !tintPackage || !contactMethod || !date) {
            alert('Please fill out all fields.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Display the estimated price and capture their contact information
        result.textContent = `Estimated Price: $${totalPrice.toFixed(2)}. Please proceed by filling out the form to finalize your quote.`;
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }
});
