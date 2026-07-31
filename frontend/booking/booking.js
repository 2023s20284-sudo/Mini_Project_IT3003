async function getAllBookings() {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    const bookings = await response.json();
    displayBookings(bookings);
}

async function addBooking() {
    const booking = {
        pet: { id: parseInt(document.getElementById("petId").value) },
        room: { id: parseInt(document.getElementById("roomId").value) },
        checkInDate: document.getElementById("checkInDate").value,
        checkOutDate: document.getElementById("checkOutDate").value
    };

    const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking)
    });

    if (!response.ok) {
        alert("Booking failed - room may not be available!");
        return;
    }

    document.querySelector("form").reset();
    getAllBookings();
}

function displayBookings(bookings) {
    const container = document.getElementById("bookingList");
    container.innerHTML = "";
    bookings.forEach(b => {
        container.innerHTML += `
            <div class="card">
                Booking #${b.id} - ${b.checkInDate} to ${b.checkOutDate}
                (Status: ${b.status}, Cost: Rs.${b.totalCost})
            </div>
        `;
    });
}

window.onload = getAllBookings;