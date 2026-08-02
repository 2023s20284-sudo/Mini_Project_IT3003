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
            // ID එක ownerId හෝ owner දෙකෙන් මොකක් තිබ්බත් අල්ලගනී
            const ownerSelect = document.getElementById("ownerId") || document.getElementById("owner");

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
    const ageVal = parseInt(document.getElementById("age").value);
    const ageUnit = document.getElementById("ageUnit").value;
    const ownerIdVal = document.getElementById("ownerId").value;

    if (!ownerIdVal) {
        alert("Please select an owner!");
        return;
    }

    // Convert age to months if unit is selected as Years
    let finalAgeInMonths = ageVal;
    if (ageUnit === "Years") {
        finalAgeInMonths = ageVal * 12;
    }

    const pet = {
        name: document.getElementById("name").value,
        breed: document.getElementById("breed").value,
        age: finalAgeInMonths,
        gender: document.getElementById("gender").value,
        medicalNotes: document.getElementById("medicalNotes").value,
        ownerId: parseInt(ownerIdVal)
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
    container.innerHTML = "";
    pets.forEach(p => {
        // Display age in Years & Months format
        let ageDisplay = "";
        if (p.age >= 12) {
            const yrs = Math.floor(p.age / 12);
            const mths = p.age % 12;
            ageDisplay = mths > 0 ? `${yrs} yrs ${mths} mos` : `${yrs} yrs`;
        } else {
            ageDisplay = `${p.age} mos`;
        }

        container.innerHTML += `
            <div class="card">
                <strong>${p.name}</strong> (${p.breed}, ${ageDisplay}, ${p.gender})<br>
                Medical Notes: ${p.medicalNotes || "None"}<br>
                Owner ID: ${p.ownerId}<br>
                <button onclick="deletePet(${p.id})">Delete</button>
            </div>
        `;
    });
}

// Load Pets list and Owners Dropdown on page load
window.onload = function() {
    getAllPets();
    loadOwnersDropdown();
};