// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const makeSelect = document.getElementById('vehicle-make');
    const modelSelect = document.getElementById('vehicle-model');
    
    const vehicleModels = {
        Toyota: ['Camry', 'Corolla', 'Prius', 'RAV4'],
        Honda: ['Civic', 'Accord', 'CR-V', 'Pilot'],
        Ford: ['Focus', 'Fusion', 'Mustang', 'Escape'],
        Chevrolet: ['Malibu', 'Impala', 'Equinox', 'Tahoe'],
        Nissan: ['Altima', 'Sentra', 'Rogue', 'Murano'],
        // Add more makes and models as needed
    };
    
    makeSelect.addEventListener('change', () => {
        const selectedMake = makeSelect.value;
        modelSelect.innerHTML = '<option value="" disabled selected>Select Model</option>';
        if (vehicleModels[selectedMake]) {
            vehicleModels[selectedMake].forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });
        }
    });
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const vehicleYear = document.getElementById('vehicle-year').value;
        const vehicleMake = document.getElementById('vehicle-make').value;
        const vehicleModel = document.getElementById('vehicle-model').value;
        const packageType = document.getElementById('package').value;
        const contactMethod = document.getElementById('contact-method').value;
        const date = document.getElementById('date').value;
        
        if (!name || !email || !phone || !vehicleYear || !vehicleMake || !vehicleModel || !packageType || !contactMethod || !date) {
            alert('Please fill out all fields.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        alert('Thank you for requesting a quote! We will get back to you shortly.');
        form.reset();
    });

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }
});
