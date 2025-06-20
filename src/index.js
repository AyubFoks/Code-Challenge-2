    // Importing form entries and exporting guest list back to the HTML
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const guestsTableBody = document.getElementById('guestsTableBody');
    
    // Category colors for the guests
    const categoryColors = {
        'Cousins': '#ff5833a9',
        'Family': '#33ff58af',
        'Friend': '#3358ffaf', 
        'Colleague': '#f133ffaf'
    };
    
    // Creating an array to hold guest data
    let guestsData = [];

    // add a variable to track currently editing guest
    let currentlyEditing = null;
    
    // Initialize the guests table. Prevent execution until submission
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Form values
        const name = document.getElementById('name').value;
        const category = document.getElementById('category').value;
        const rsvp = document.getElementById('rsvp').checked;
        const timeAdded = new Date().toLocaleTimeString();
        
        if (currentlyEditing !== null) {

            // Update existing entry
            guestsData[currentlyEditing] = { name, category, rsvp, timeAdded };
            currentlyEditing = null;
            document.querySelector('button[type="submit"]').textContent = 'Submit';
        } else {

            // Add new entry
            guestsData.push({ name, category, rsvp, timeAdded });
        }
        
        // Render the updated guests table
        renderGuestsTable();

        // Reset the registration form
        registrationForm.reset();
    });
    
    // Function to render the guests table
    function renderGuestsTable() {
        guestsTableBody.innerHTML = '';
        
        guestsData.forEach((guest, index) => {
            const newRow = document.createElement('tr');
            newRow.style.backgroundColor = categoryColors[guest.category];
            newRow.style.color = '#ffffff';
            
            newRow.innerHTML = `
                <td>${guest.name}</td>
                <td>${guest.rsvp ? '✓' : '✗'}</td>
                <td>${guest.timeAdded}</td>
                <td>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </td>
            `;
            
            guestsTableBody.appendChild(newRow);
        });
        
        // Add event listeners to all delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                guestsData.splice(index, 1);
                renderGuestsTable();
            });
        });
        
        // Add event listeners to all edit buttons
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                const guest = guestsData[index];
                
                // Fill the form with the guest's data
                document.getElementById('name').value = guest.name;
                document.getElementById('category').value = guest.category;
                document.getElementById('rsvp').checked = guest.rsvp;
                
                // Scroll to the form
                document.getElementById('register').scrollIntoView();
                
                // Change submit button text
                document.querySelector('button[type="submit"]').textContent = 'Update';
                
                // Set currently editing index
                currentlyEditing = index;
            });
        });
    }
    
    // Toggle between sections
    document.getElementById('registerBtn').addEventListener('click', function() {
        document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('guestsListBtn').addEventListener('click', function() {
        document.getElementById('guestsList').scrollIntoView({ behavior: 'smooth' });
    });
});