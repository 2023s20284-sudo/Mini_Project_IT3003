let editingRoomId = null; // null = adding new, otherwise = editing existing

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
        if (editingRoomId) {
            // UPDATE existing room
            const response = await fetch(`${API_BASE_URL}/rooms/${editingRoomId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(room)
            });

            if (response.ok) {
                alert("Room updated successfully! ✅");
            } else {
                const errText = await response.text();
                console.error("Update error:", errText);
                alert("Failed to update room.");
            }

            cancelRoomEdit(); // reset form back to "add" mode
        } else {
            // CREATE new room
            const response = await fetch(`${API_BASE_URL}/rooms`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(room)
            });

            if (response.ok) {
                alert("Room added successfully!");
                document.querySelector("form").reset();
            } else {
                alert("Failed to add room!");
            }
        }

        getAllRooms();
    } catch (error) {
        console.error("Error saving room:", error);
        alert("Server error when saving room!");
    }
}

function editRoom(id, roomNumber, type, capacity, pricePerDay) {
    editingRoomId = id;

    document.getElementById("roomNumber").value = roomNumber;
    document.getElementById("roomType").value = type;
    document.getElementById("capacity").value = capacity;
    document.getElementById("pricePerDay").value = pricePerDay;

    const submitBtn = document.querySelector("form button[type='submit']");
    if (submitBtn) submitBtn.textContent = "Update Room";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function cancelRoomEdit() {
    editingRoomId = null;
    document.querySelector("form").reset();
    const submitBtn = document.querySelector("form button[type='submit']");
    if (submitBtn) submitBtn.textContent = "Add Room";
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
            <button onclick="editRoom(${room.id}, '${room.roomNumber}', '${room.type}', ${room.capacity || 1}, ${room.pricePerDay || 0})" style="margin-top: 5px; margin-right: 5px; background: #0d6efd; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Edit</button>
            <button onclick="deleteRoom(${room.id})" style="margin-top: 5px; background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Delete</button>
        </div>
        `;
    });
}

window.onload = getAllRooms;