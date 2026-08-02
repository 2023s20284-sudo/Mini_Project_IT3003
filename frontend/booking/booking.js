// Global cache — dropdown load - to keep full objects
let allPets = [];
let allRooms = [];

async function getAllBookings() {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings`);
        if (response.ok) {
            const bookings = await response.json();
            displayBookings(bookings);
        }
    } catch (error) {
        console.error("Error fetching bookings:", error);
    }
}

// Load Pets Dropdown
async function loadPetsDropdown() {
    try {
        const response = await fetch(`${API_BASE_URL}/pets`);
        if (response.ok) {
            const pets = await response.json();
            allPets = pets; // full objects cache කරනවා
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

// Load Rooms Dropdown
async function loadRoomsDropdown() {
    try {
        const response = await fetch(`${API_BASE_URL}/rooms`);
        if (response.ok) {
            const rooms = await response.json();
            allRooms = rooms; // full objects cache
            const roomSelect = document.getElementById("roomSelect");
            if (roomSelect) {
                roomSelect.innerHTML = '<option value="">-- Select a Room --</option>';
                rooms.forEach(room => {
                    roomSelect.innerHTML += `<option value="${room.id}">Room ${room.roomNumber} (${room.type})</option>`;
                });
            }
        }
    } catch (error) {
        console.error("Error loading rooms dropdown:", error);
    }
}

async function addBooking() {
    const petIdVal = document.getElementById("petSelect").value;
    const roomIdVal = document.getElementById("roomSelect").value;
    const startDateVal = document.getElementById("startDate").value;
    const endDateVal = document.getElementById("endDate").value;

    if (!petIdVal || !roomIdVal || !startDateVal || !endDateVal) {
        alert("Please complete all form fields!");
        return;
    }

    // From Cache get Pet/Room object
    const selectedPet = allPets.find(p => p.id === parseInt(petIdVal));
    const selectedRoom = allRooms.find(r => r.id === parseInt(roomIdVal));

    if (!selectedPet || !selectedRoom) {
        alert("Selected pet or room not found. Please refresh and try again.");
        return;
    }

    // Backend puch complete objects- na any fields missing
    const booking = {
        pet: selectedPet,
        room: selectedRoom,
        checkInDate: startDateVal,
        checkOutDate: endDateVal,
        status: "PENDING",
        totalCost: 0.0
    };

    try {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(booking)
        });

        if (response.ok) {
            alert("Booking created successfully! 🎉");
            document.querySelector("form").reset();
            getAllBookings();
        } else {
            const errorMsg = await response.text();
            console.error("Error!:", errorMsg);
            alert("Failed to create booking. Check console for details.");
        }
    } catch (error) {
        console.error("Network error adding booking:", error);
        alert("Error!");
    }
}

async function cancelBooking(id) {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${id}`, { method: "DELETE" });
        if (response.ok) {
            getAllBookings();
        } else {
            alert("Failed to cancel booking.");
        }
    } catch (error) {
        console.error("Error cancelling booking:", error);
    }
}

function displayBookings(bookings) {
    const container = document.getElementById("bookingList");
    if (!container) return;

    container.innerHTML = "";
    bookings.forEach(b => {
        const checkIn = b.checkInDate || "N/A";
        const checkOut = b.checkOutDate || "N/A";
        const petName = b.pet ? b.pet.name : `Pet ID: ${b.petId || "N/A"}`;
        const roomNum = b.room ? b.room.roomNumber : `Room ID: ${b.roomId || "N/A"}`;
        const status = b.status || "PENDING";

        container.innerHTML += `
            <div class="card" style="border: 1px solid #ccc; padding: 12px; margin-bottom: 10px; border-radius: 6px;">
                <strong>Booking #${b.id}</strong> - ${petName} (${roomNum})<br>
                <span>Dates: ${checkIn} to ${checkOut}</span><br>
                <span>Status: <b>${status}</b></span>
                <div style="margin-top: 8px;">
                    ${status !== "CANCELLED" ? `<button onclick="cancelBooking(${b.id})" style="color: red; cursor: pointer;">Cancel Booking</button>` : ""}
                </div>
            </div>
        `;
    });
}

window.onload = function() {
    getAllBookings();
    loadPetsDropdown();
    loadRoomsDropdown();
};