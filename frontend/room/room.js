async function getAllRooms() {
    const response = await fetch(`${API_BASE_URL}/rooms`);
    const rooms = await response.json();
    displayRooms(rooms);
}

async function addRoom() {
    const room = {
        roomNumber: document.getElementById("roomNumber").value,
        type: document.getElementById("type").value.toUpperCase(),
        capacity: parseInt(document.getElementById("capacity").value),
        pricePerDay: parseFloat(document.getElementById("pricePerDay").value),
        isAvailable: true
    };

    await fetch(`${API_BASE_URL}/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room)
    });

    document.querySelector("form").reset();
    getAllRooms();
}

async function deleteRoom(id) {
    await fetch(`${API_BASE_URL}/rooms/${id}`, { method: "DELETE" });
    getAllRooms();
}

function displayRooms(rooms) {
    const container = document.getElementById("roomList");
    container.innerHTML = "";
    rooms.forEach(room => {
        container.innerHTML += `
        <div class="card">
            <strong>Room ${room.roomNumber}</strong> ${room.type}, Rs.${room.pricePerDay} (${room.isAvailable ? "Available" : "Booked"})
            <button onclick="deleteRoom(${room.id})">Delete</button>
        </div>
        `;
    });
}

window.onload = getAllRooms;