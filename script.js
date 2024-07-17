document.addEventListener('DOMContentLoaded', () => {
    const donors = JSON.parse(localStorage.getItem('donors')) || [];

    const donorForm = document.getElementById('donor-form');
    const searchButton = document.getElementById('search-btn');
    const resultsDiv = document.getElementById('results');

    donorForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const bloodGroup = document.getElementById('blood-group').value;
        const contact = document.getElementById('contact').value;
        const newDonor = { name, bloodGroup, contact };
        donors.push(newDonor);
        localStorage.setItem('donors', JSON.stringify(donors));
        alert('Donor Registered Successfully!');
        this.reset();
    });

    searchButton.addEventListener('click', function() {
        const searchBloodGroup = document.getElementById('search-blood-group').value;
        resultsDiv.innerHTML = '';
        const filteredDonors = donors.filter(donor => donor.bloodGroup === searchBloodGroup);
        if (filteredDonors.length > 0) {
            filteredDonors.forEach(donor => {
                const donorInfo = document.createElement('p');
                donorInfo.textContent = `Name: ${donor.name}, Blood Group: ${donor.bloodGroup}, Contact: ${donor.contact}`;
                resultsDiv.appendChild(donorInfo);
            });
        } else {
            resultsDiv.textContent = 'No donors found for this blood group.';
        }
    });
});
