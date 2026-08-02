async function getAllRooms() {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms`);
        if (response.ok) {
            const rooms = await response.json();
            displayRooms(rooms);
        }
    } catch (error) {
        console.error("Error fetching rooms:", error);
    }
}

async function addRoom() {
    const room = {
        roomNumber: document.getElementById("roomNumber").value,
        type: document.getElementById("roomType").value.toUpperCase(),
        capacity: parseInt(document.getElementById("capacity").value),
        pricePerDay: parseFloat(document.getElementById("pricePerDay").value),
        isAvailable: true
    };

    try {
        const response = await fetch(`${API_BASE_URL}/rooms`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(room)
        });

        if (response.ok) {
            alert("Room added successfully!");
            document.querySelector("form").reset();
            getAllRooms();
        } else {
            alert("Failed to add room!");
        }
    } catch (error) {
        console.error("Error adding room:", error);
        alert("Server error when adding room!");
    }
}

async function deleteRoom(id) {
    if (confirm("Are you sure you want to delete this room?")) {
        try {
            await fetch(`${API_BASE_URL}/rooms/${id}`, { method: "DELETE" });
            getAllRooms();
        } catch (error) {
            console.error("Error deleting room:", error);
        }
    }
}

function displayRooms(rooms) {
    const container = document.getElementById("roomList");
    if (!container) return;

    container.innerHTML = "";
    rooms.forEach(room => {
        container.innerHTML += `
        <div class="card" style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 5px;">
            <strong>Room ${room.roomNumber}</strong> (${room.type})<br>
            Capacity: ${room.capacity || 1}<br>
            Price Per Day: Rs.${room.pricePerDay || 0}<br>
            Status: ${room.isAvailable ? "Available" : "Booked"}<br>
            <button onclick="deleteRoom(${room.id})" style="margin-top: 5px; background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Delete</button>
        </div>
        `;
    });
}

window.onload = getAllRooms;