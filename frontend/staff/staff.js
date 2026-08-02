let editingStaffId = null; // null = adding new, otherwise = editing existing

async function getAllStaff(){
    const response=await fetch(`${API_BASE_URL}/staff`);
    const staffList = await response.json();
    displayStaff(staffList);
}

async function addStaff(){
    const staff={
        fullName: document.getElementById("fullName").value,
        role: document.getElementById("role").value,
        contact: document.getElementById("contact").value,
        shiftStart: document.getElementById("shiftStart").value,
        shiftEnd: document.getElementById("shiftEnd").value
    };

    try {
        if (editingStaffId) {
            // UPDATE existing staff
            const response = await fetch(`${API_BASE_URL}/staff/${editingStaffId}`, {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(staff)
            });

            if (response.ok) {
                alert("Staff updated successfully! ✅");
            } else {
                const errText = await response.text();
                console.error("Update error:", errText);
                alert("Failed to update staff.");
            }

            cancelEdit(); // reset form back to "add" mode
        } else {
            // CREATE new staff
            await fetch(`${API_BASE_URL}/staff`,{
                method: "POST",
                headers: {"Content-Type":"application/json" },
                body: JSON.stringify(staff)
            });
            document.querySelector("form").reset();
        }

        getAllStaff();
    } catch (error) {
        console.error("Error saving staff:", error);
        alert("Server connection error!");
    }
}

function editStaff(id, fullName, role, contact, shiftStart, shiftEnd) {
    editingStaffId = id;

    document.getElementById("fullName").value = fullName;
    document.getElementById("role").value = role;
    document.getElementById("contact").value = contact;
    document.getElementById("shiftStart").value = shiftStart;
    document.getElementById("shiftEnd").value = shiftEnd;

    const submitBtn = document.querySelector("form button[type='submit']");
    if (submitBtn) submitBtn.textContent = "Update Staff";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function cancelEdit() {
    editingStaffId = null;
    document.querySelector("form").reset();
    const submitBtn = document.querySelector("form button[type='submit']");
    if (submitBtn) submitBtn.textContent = "Add Staff";
}

async function deleteStaff(id){
    if (!confirm("Are you sure you want to delete this staff member?")) return;
    try {
        const response = await fetch(`${API_BASE_URL}/staff/${id}`, { method: "DELETE" });
        if (response.ok) {
            getAllStaff();
        } else {
            alert("Failed to delete staff.");
        }
    } catch (error) {
        console.error("Error deleting staff:", error);
    }
}

function displayStaff(staffList){
    const container=document.getElementById("staffList");
    container.innerHTML = "";
    staffList.forEach(s => {
        container.innerHTML += `
            <div class="card">
                <strong>${s.fullName}</strong> - ${s.role}<br>
                Contact: ${s.contact}<br>
                Shift: ${s.shiftStart} - ${s.shiftEnd}
                <div style="margin-top: 8px;">
                    <button onclick="editStaff(${s.id}, '${s.fullName}', '${s.role}', '${s.contact}', '${s.shiftStart}', '${s.shiftEnd}')" style="margin-right: 5px; cursor: pointer;">Edit</button>
                    <button onclick="deleteStaff(${s.id})" style="color: red; cursor: pointer;">Delete</button>
                </div>
            </div>
        `;
    });
}

window.onload = getAllStaff;