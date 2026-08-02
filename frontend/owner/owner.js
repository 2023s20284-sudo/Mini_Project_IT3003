async function getAllOwners() {
    try {
        const response = await fetch(`${API_BASE_URL}/owners`);
        if (response.ok) {
            const owners = await response.json();
            displayOwners(owners);
        }
    } catch (error) {
        console.error("Error fetching owners:", error);
    }
}

async function addOwner() {
    const ownerId = document.getElementById("ownerId") ? document.getElementById("ownerId").value : "";

    const owner = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value
    };

    if (ownerId) {
        // Update existing owner via PUT
        try {
            const response = await fetch(`${API_BASE_URL}/owners/${ownerId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(owner)
            });

            if (response.ok) {
                alert("Owner updated successfully!");
                resetOwnerForm();
                getAllOwners();
            } else {
                alert("Failed to update owner.");
            }
        } catch (error) {
            console.error("Error updating owner:", error);
        }
    } else {
        // Create new owner via POST
        try {
            const response = await fetch(`${API_BASE_URL}/owners`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(owner)
            });

            if (response.ok) {
                alert("Owner added successfully!");
                resetOwnerForm();
                getAllOwners();
            } else {
                alert("Failed to add owner.");
            }
        } catch (error) {
            console.error("Error adding owner:", error);
        }
    }
}

async function editOwner(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/owners/${id}`);
        if (response.ok) {
            const owner = await response.json();

            document.getElementById("fullName").value = owner.fullName || "";
            document.getElementById("email").value = owner.email || "";
            document.getElementById("phone").value = owner.phone || "";
            document.getElementById("address").value = owner.address || "";

            // Populate hidden input with Owner ID
            let idInput = document.getElementById("ownerId");
            if (!idInput) {
                idInput = document.createElement("input");
                idInput.type = "hidden";
                idInput.id = "ownerId";
                document.querySelector("form").appendChild(idInput);
            }
            idInput.value = owner.id;

            // Change submit button text
            const submitBtn = document.querySelector("form button[type='submit']") || document.querySelector("form button");
            if (submitBtn) submitBtn.textContent = "Update Owner";
        }
    } catch (error) {
        console.error("Error fetching owner details for edit:", error);
    }
}

async function deleteOwner(id) {
    if (!confirm("Are you sure you want to delete this owner?")) return;
    try {
        const response = await fetch(`${API_BASE_URL}/owners/${id}`, { method: "DELETE" });
        if (response.ok) {
            getAllOwners();
        }
    } catch (error) {
        console.error("Error deleting owner:", error);
    }
}

function resetOwnerForm() {
    const form = document.querySelector("form");
    if (form) form.reset();

    const idInput = document.getElementById("ownerId");
    if (idInput) idInput.value = "";

    const submitBtn = document.querySelector("form button[type='submit']") || document.querySelector("form button");
    if (submitBtn) submitBtn.textContent = "Add Owner";
}

function displayOwners(owners) {
    const container = document.getElementById("ownerList");
    if (!container) return;

    container.innerHTML = "";
    if (!owners || owners.length === 0) {
        container.innerHTML = "<p>No owners found.</p>";
        return;
    }

    owners.forEach(owner => {
        container.innerHTML += `
            <div class="card" style="border: 1px solid #ccc; padding: 12px; margin-bottom: 10px; border-radius: 6px; background: #fff;">
                <strong>${owner.fullName}</strong> - ${owner.email}, ${owner.phone}<br>
                <small>Address: ${owner.address || "-"}</small>
                <div style="margin-top: 8px;">
                    <button onclick="editOwner(${owner.id})" style="margin-right: 5px; cursor: pointer;">Edit</button>
                    <button onclick="deleteOwner(${owner.id})" style="color: red; cursor: pointer;">Delete</button>
                </div>
            </div>
        `;
    });
}

window.addEventListener("DOMContentLoaded", getAllOwners);