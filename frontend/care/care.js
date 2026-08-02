// Load Pets into dropdown
async function loadPetsDropdown() {
    try {
        const response = await fetch(`${API_BASE_URL}/pets`);
        if (response.ok) {
            const pets = await response.json();
            const petSelect = document.getElementById("petSelect");
            if (petSelect) {
                petSelect.innerHTML = '<option value="">-- Select a Pet --</option>';
                pets.forEach(pet => {
                    petSelect.innerHTML += `<option value="${pet.id}">${pet.name} (ID: ${pet.id})</option>`;
                });
            }
        }
    } catch (error) {
        console.error("Error loading pets dropdown:", error);
    }
}

// Load Staff into dropdown
async function loadStaffDropdown() {
    try {
        // Tries /staff endpoint or falls back to /users
        let response = await fetch(`${API_BASE_URL}/staff`);
        if (!response.ok) {
            response = await fetch(`${API_BASE_URL}/users`);
        }

        if (response.ok) {
            const staffList = await response.json();
            const staffSelect = document.getElementById("staffSelect");
            if (staffSelect) {
                staffSelect.innerHTML = '<option value="">-- Select Staff / Sitter --</option>';
                staffList.forEach(s => {
                    const name = s.name || s.fullName || s.username || `Staff #${s.id}`;
                    staffSelect.innerHTML += `<option value="${s.id}">${name}</option>`;
                });
            }
        }
    } catch (error) {
        console.error("Error loading staff dropdown:", error);
    }
}

// Fetch all care schedules
async function getAllSchedules() {
    try {
        const response = await fetch(`${API_BASE_URL}/care-schedules`);
        if (response.ok) {
            const schedules = await response.json();
            displaySchedules(schedules);
        }
    } catch (error) {
        console.error("Error fetching schedules:", error);
    }
}

async function addCareSchedule() {
    const petIdVal = document.getElementById("petSelect").value;
    const staffIdVal = document.getElementById("staffSelect").value;
    const activityVal = document.getElementById("activity").value;
    let timeVal = document.getElementById("scheduleTime").value;

    if (!petIdVal || !staffIdVal || !activityVal || !timeVal) {
        alert("Please complete all required fields!");
        return;
    }

    //  (YYYY-MM-DDTHH:mm:ss)
    if (timeVal.length === 16) {
        timeVal += ":00";
    }

    const pId = parseInt(petIdVal);
    const sId = parseInt(staffIdVal);

    //  removed activityType
    const schedule = {
        petId: pId,
        staffId: sId,
        activityDescription: activityVal,
        scheduledTime: timeVal,
        status: "PENDING"
    };

    try {
        const response = await fetch(`${API_BASE_URL}/care-schedules`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(schedule)
        });

        if (response.ok) {
            alert("Care Schedule added successfully! 🎉");
            document.querySelector("form").reset();
            getAllSchedules();
        } else {
            const errText = await response.text();
            console.error("Server Response Error:", errText);
            alert("Failed to add care schedule! Check console for details.");
        }
    } catch (error) {
        console.error("Network error adding care schedule:", error);
        alert("Server connection error!");
    }
}

// Mark Done / Completed
async function markCompleted(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/care-schedules/${id}/complete`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            // Alternative status update fallback
            await fetch(`${API_BASE_URL}/care-schedules/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "COMPLETED" })
            });
        }
        getAllSchedules();
    } catch (error) {
        console.error("Error updating status:", error);
    }
}

// Delete Schedule
async function deleteSchedule(id) {
    if (!confirm("Are you sure you want to delete this schedule?")) return;
    try {
        await fetch(`${API_BASE_URL}/care-schedules/${id}`, { method: "DELETE" });
        getAllSchedules();
    } catch (error) {
        console.error("Error deleting schedule:", error);
    }
}

// Display schedule cards in #careList container
function displaySchedules(schedules) {
    const container = document.getElementById("careList");
    if (!container) return;

    container.innerHTML = "";
    if (!schedules || schedules.length === 0) {
        container.innerHTML = "<p>No care schedules found.</p>";
        return;
    }

    schedules.forEach(s => {
        const petName = s.pet ? s.pet.name : `Pet ID: ${s.petId || "N/A"}`;
        const staffName = s.staff ? (s.staff.name || s.staff.fullName) : (s.staffId ? `Staff ID: ${s.staffId}` : "Unassigned");
        const activity = s.activityDescription || s.activityType || s.description || "Care Activity";
        const status = s.status || "PENDING";

        container.innerHTML += `
            <div class="card" style="border: 1px solid #ccc; padding: 12px; margin-bottom: 10px; border-radius: 6px; background: #fff;">
                <strong>${petName}</strong> - ${activity}<br>
                <small>Assigned Staff: ${staffName} | Scheduled: ${s.scheduledTime || "N/A"}</small><br>
                <span>Status: <b>${status}</b></span>
                <div style="margin-top: 8px;">
                    ${status !== "COMPLETED" ? `<button onclick="markCompleted(${s.id})" style="margin-right: 5px; cursor: pointer;">Mark Done</button>` : ""}
                    <button onclick="deleteSchedule(${s.id})" style="color: red; cursor: pointer;">Delete</button>
                </div>
            </div>
        `;
    });
}

// Initialize options and fetch records on page load
 window.addEventListener("DOMContentLoaded", function() {
    getAllSchedules();
    loadPetsDropdown();
    loadStaffDropdown();
});