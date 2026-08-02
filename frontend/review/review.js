let allOwners = [];
let allBookings = [];

async function getAllReviews() {
    const response = await fetch(`${API_BASE_URL}/reviews`);
    const reviews = await response.json();
    displayReviews(reviews);
}

async function loadOwnersDropdown() {
    try {
        const response = await fetch(`${API_BASE_URL}/owners`);
        if (response.ok) {
            const owners = await response.json();
            allOwners = owners;
            const ownerSelect = document.getElementById("ownerSelect");
            if (ownerSelect) {
                ownerSelect.innerHTML = '<option value="">-- Select Owner --</option>';
                owners.forEach(o => {
                    const name = o.name || o.fullName || `Owner #${o.id}`;
                    ownerSelect.innerHTML += `<option value="${o.id}">${name}</option>`;
                });
            }
        }
    } catch (error) {
        console.error("Error loading owners dropdown:", error);
    }
}

async function loadBookingsDropdown() {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings`);
        if (response.ok) {
            const bookings = await response.json();
            allBookings = bookings;
            const bookingSelect = document.getElementById("bookingSelect");
            if (bookingSelect) {
                bookingSelect.innerHTML = '<option value="">-- Select Booking --</option>';
                bookings.forEach(b => {
                    const petName = b.pet ? b.pet.name : `Pet ID: ${b.petId || "N/A"}`;
                    bookingSelect.innerHTML += `<option value="${b.id}">Booking #${b.id} - ${petName}</option>`;
                });
            }
        }
    } catch (error) {
        console.error("Error loading bookings dropdown:", error);
    }
}

async function addReview() {
    const ownerIdVal = document.getElementById("ownerSelect").value;
    const bookingIdVal = document.getElementById("bookingSelect").value;
    const ratingVal = document.getElementById("rating").value;
    const commentVal = document.getElementById("comment").value;

    if (!ownerIdVal || !bookingIdVal || !ratingVal || !commentVal) {
        alert("Please complete all fields!");
        return;
    }

    const selectedOwner = allOwners.find(o => o.id === parseInt(ownerIdVal));
    const selectedBooking = allBookings.find(b => b.id === parseInt(bookingIdVal));

    if (!selectedOwner || !selectedBooking) {
        alert("Selected owner or booking not found. Please refresh and try again.");
        return;
    }

    const review = {
        owner: selectedOwner,
        booking: selectedBooking,
        rating: parseInt(ratingVal),
        comment: commentVal
    };

    try {
        const response = await fetch(`${API_BASE_URL}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review)
        });

        if (response.ok) {
            alert("Review submitted successfully! 🎉");
            document.querySelector("form").reset();
            getAllReviews();
        } else {
            const errText = await response.text();
            console.error("Server Response Error:", errText);
            alert("Failed to submit review. Check console for details.");
        }
    } catch (error) {
        console.error("Network error adding review:", error);
        alert("Server connection error!");
    }
}

function displayReviews(reviews) {
    const container = document.getElementById("reviewList");
    container.innerHTML = "";
    reviews.forEach(r => {
        container.innerHTML += `
            <div class="card">
                Rating: ${"★".repeat(r.rating)} - "${r.comment}"
            </div>
        `;
    });
}

window.onload = function() {
    getAllReviews();
    loadOwnersDropdown();
    loadBookingsDropdown();
};