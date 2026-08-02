let editingPetId = null; // null = adding new, otherwise = editing existing

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
        if (editingPetId) {
            // UPDATE existing pet
            const response = await fetch(`${API_BASE_URL}/pets/${editingPetId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pet)
            });

            if (response.ok) {
                alert("Pet updated successfully! ✅");
            } else {
                const errText = await response.text();
                console.error("Update error:", errText);
                alert("Failed to update pet.");
            }

            cancelPetEdit(); // reset form back to "add" mode
        } else {
            // CREATE new pet
            const response = await fetch(`${API_BASE_URL}/pets`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pet)
            });

            if (response.ok) {
                alert("Pet added successfully!");
                document.querySelector("form").reset();
            } else {
                alert("Failed to add pet!");
            }
        }

        getAllPets();
    } catch (error) {
        console.error("Error saving pet:", error);
        alert("Server error when saving pet!");
    }
}

function editPet(id, name, species, breed, age, gender, ownerId) {
    editingPetId = id;

    document.getElementById("petName").value = name;
    if (document.getElementById("species")) document.getElementById("species").value = species;
    document.getElementById("breed").value = breed;
    document.getElementById("age").value = age;
    document.getElementById("gender").value = gender;
    document.getElementById("ownerId").value = ownerId;

    const submitBtn = document.querySelector("form button[type='submit']");
    if (submitBtn) submitBtn.textContent = "Update Pet";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function cancelPetEdit() {
    editingPetId = null;
    document.querySelector("form").reset();
    const submitBtn = document.querySelector("form button[type='submit']");
    if (submitBtn) submitBtn.textContent = "Add Pet";
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
                <button onclick="editPet(${p.id}, '${p.name || ""}', '${p.species || ""}', '${p.breed || ""}', ${p.age || 0}, '${p.gender || ""}', ${p.ownerId || "null"})" style="margin-top: 5px; margin-right: 5px; background: #0d6efd; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Edit</button>
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