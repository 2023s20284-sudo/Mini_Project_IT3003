async function getAllPets() {
    const response = await fetch(`${API_BASE_URL}/pets`);
    const pets = await response.json();
    displayPets(pets);
}

async function addPet() {
    const pet = {
        name: document.getElementById("name").value,
        breed: document.getElementById("breed").value,
        age: parseInt(document.getElementById("age").value),
        gender: document.getElementById("gender").value,
        medicalNotes: document.getElementById("medicalNotes").value,
        ownerId: parseInt(document.getElementById("ownerId").value)
    };

    await fetch(`${API_BASE_URL}/pets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pet)
    });

    document.querySelector("form").reset();
    getAllPets();
}

async function deletePet(id) {
    await fetch(`${API_BASE_URL}/pets/${id}`, { method: "DELETE" });
    getAllPets();
}

function displayPets(pets) {
    const container = document.getElementById("petList");
    container.innerHTML = "";
    pets.forEach(p => {
        container.innerHTML += `
            <div class="card">
                <strong>${p.name}</strong> (${p.breed}, ${p.age} yrs, ${p.gender})<br>
                Medical Notes: ${p.medicalNotes || "None"}<br>
                Owner ID: ${p.ownerId}<br>
                <button onclick="deletePet(${p.id})">Delete</button>
            </div>
        `;
    });
}

window.onload = getAllPets;