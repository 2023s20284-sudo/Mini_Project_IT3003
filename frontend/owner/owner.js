async function getAllOwners() {
    const response = await fetch(`${API_BASE_URL}/owners`);
    const owners = await response.json();
    displayOwners(owners);
}

async function addOwner() {
    const owner = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value
    };
    await fetch(`${API_BASE_URL}/owners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(owner)
    });
    document.querySelector("form").reset();
    getAllOwners();
}

async function deleteOwner(id) {
    await fetch(`${API_BASE_URL}/owners/${id}`, { method: "DELETE" });
    getAllOwners();
}

function displayOwners(owners) {
    const container = document.getElementById("ownerList");
    container.innerHTML = "";
    owners.forEach(owner => {
        container.innerHTML += `
        <div class="card">
        <strong>${owner.fullName}</strong> - ${owner.email}, ${owner.phone}
        <button onclick="deleteOwner(${owner.id})">Delete</button>
        </div>
        `;
    });
}

window.onload = getAllOwners;