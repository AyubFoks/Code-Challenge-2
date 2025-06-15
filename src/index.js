const registrationForm = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const rsvpInput = document.getElementById('rsvp');
const categoryInput = document.getElementById('category');


const timestampInput = document.getElementById('timestamp');
const editButton = document.getElementById('edit-button');
const deleteButton = document.getElementById('delete-button');

const guestTableList = document.getElementById('guestsTableBody');

let guestArray = [];

let guestId = 1;

formEntry.addEventListener('submit'), function(e){
    e.preventDefault();

const name = nameInput.value;
const rsvp = rsvpInput.value;
const category = categoryInput.value;
    const timestamp = new Date().toLocaleString();

    if (name && rsvp && category) {
        const guest = {
            id: guestId++,
            name: name,
            rsvp: rsvp,
            category: category,
            timestamp: timestamp
        };

        guestArray.push(guest);
        displayGuests();
        registrationForm.reset();
    } else {
        alert('Please fill in all fields.');
    }

}

function displayGuests() {
    guestTableList.innerHTML = '';
    guestArray.forEach(guest => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${guest.name}</td>
            <td>${guest.rsvp}</td>
            <td>${guest.category}</td>
            <td>${guest.timestamp}</td>
            <td>
                <button class="edit-button" data-id="${guest.id}">Edit</button>
                <button class="delete-button" data-id="${guest.id}">Delete</button>
            </td>
        `;
        guestTableList.appendChild(row);
    });
}

guestTableList.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-button')) {
        const id = e.target.getAttribute('data-id');
        const guest = guestArray.find(g => g.id == id);
        if (guest) {
            nameInput.value = guest.name;
            rsvpInput.value = guest.rsvp;
            categoryInput.value = guest.category;
            timestampInput.value = guest.timestamp;
            editButton.setAttribute('data-id', id);
        }
    } else if (e.target.classList.contains('delete-button')) {
        const id = e.target.getAttribute('data-id');
        guestArray = guestArray.filter(g => g.id != id);
        displayGuests();
    }
}
); 

console.log('Guest management system initialized.');
