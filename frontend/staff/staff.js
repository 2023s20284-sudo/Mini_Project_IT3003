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

    await fetch(`${API_BASE_URL}/staff`,{
        method: "POST",
        headers: {"Content-Type":"application/json" },
        body: JSON.stringify(staff)
    });

    document.querySelector("form").reset();
    getAllStaff();
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
                    <button onclick="deleteStaff(${s.id})" style="color: red; cursor: pointer;">Delete</button>
                </div>
            </div>
        `;
    });
}

window.onload = getAllStaff;