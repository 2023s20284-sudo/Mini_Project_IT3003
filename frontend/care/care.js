async function getAllSchedules() {
    const response = await fetch(`${API_BASE_URL}/care-schedules`);
    const schedules = await response.json();
    displaySchedules(schedules);
}

async function addSchedule() {
    const schedule = {
        activityType: document.getElementById("activityType").value,
        scheduledTime: document.getElementById("scheduledTime").value,
        notes: document.getElementById("notes").value
    };

    await fetch(`${API_BASE_URL}/care-schedules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schedule)
    });

    document.querySelector("form").reset();
    getAllSchedules();
}

async function markCompleted(id) {
    await fetch(`${API_BASE_URL}/care-schedules/${id}/complete`, { method: "PUT" });
    getAllSchedules();
}

async function deleteSchedule(id) {
    await fetch(`${API_BASE_URL}/care-schedules/${id}`, { method: "DELETE" });
    getAllSchedules();
}

function displaySchedules(schedules) {
    const container = document.getElementById("scheduleList");
    container.innerHTML = "";
    schedules.forEach(s => {
        container.innerHTML += `
            <div class="card">
                ${s.activityType} - ${s.scheduledTime} (Status: ${s.status})
                <br>Notes: ${s.notes || "-"}
                <button onclick="markCompleted(${s.id})">Mark Done</button>
                <button onclick="deleteSchedule(${s.id})">Delete</button>
            </div>
        `;
    });
}

window.onload = getAllSchedules;