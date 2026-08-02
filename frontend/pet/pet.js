async function getAllPets() {
    try {
        const response = await fetch(`${API_BASE_URL}/pets`);
        if (response.ok) {
            const pets = await response.json();
            displayPets(pets);
        }
    } catch (error) {
        console.error("Error fetching pets:", error);
    }
}

// Load owners and populate the dropdown menu
async function loadOwnersDropdown() {
    try {
        const response = await fetch(`${API_BASE_URL}/owners`);
        if (response.ok) {
            const owners = await response.json();
            const ownerSelect = document.getElementById("ownerId");

            if (ownerSelect) {
                ownerSelect.innerHTML = '<option value="">-- Select an Owner --</option>';

                owners.forEach(owner => {
                    const option = document.createElement("option");
                    option.value = owner.id;
                    const ownerName = owner.name || owner.fullName || "Owner";
                    option.textContent = `${ownerName} (ID: ${owner.id})`;
                    ownerSelect.appendChild(option);
                });
            }
        }
    } catch (error) {
        console.error("Error loading owners dropdown:", error);
    }
}

async function addPet() {
    const petNameEl = document.getElementById("petName");
    const speciesEl = document.getElementById("species");
    const breedEl = document.getElementById("breed");
    const ageEl = document.getElementById("age");
    const genderEl = document.getElementById("gender");
    const ownerIdEl = document.getElementById("ownerId");

    if (!ownerIdEl || !ownerIdEl.value) {
        alert("Please select an owner!");
        return;
    }

    const pet = {
        name: petNameEl ? petNameEl.value : "",
        species: speciesEl ? speciesEl.value : "",
        breed: breedEl ? breedEl.value : "",
        age: ageEl ? parseInt(ageEl.value) : 0,
        gender: genderEl ? genderEl.value : "",
        ownerId: parseInt(ownerIdEl.value)
    };

    try {
        const response = await fetch(`${API_BASE_URL}/pets`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pet)
        });

        if (response.ok) {
            alert("Pet added successfully!");
            document.querySelector("form").reset();
            getAllPets();
        } else {
            alert("Failed to add pet!");
        }
    } catch (error) {
        console.error("Error adding pet:", error);
        alert("Server error when adding pet!");
    }
}

async function deletePet(id) {
    if (confirm("Are you sure you want to delete this pet?")) {
        await fetch(`${API_BASE_URL}/pets/${id}`, { method: "DELETE" });
        getAllPets();
    }
}

function displayPets(pets) {
    const container = document.getElementById("petList");
    if (!container) return;

    container.innerHTML = "";
    pets.forEach(p => {
        container.innerHTML += `
            <div class="card" style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
                <strong>${p.name || "Unnamed"}</strong> (${p.species || ""}, ${p.breed || "N/A"}, Age: ${p.age || 0}, ${p.gender || ""})<br>
                Owner ID: ${p.ownerId || "N/A"}<br>
                <button onclick="deletePet(${p.id})" style="margin-top: 5px; background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Delete</button>
            </div>
        `;
    });
}

// Load Pets list and Owners Dropdown on page load
window.onload = function() {
    getAllPets();
    loadOwnersDropdown();
};