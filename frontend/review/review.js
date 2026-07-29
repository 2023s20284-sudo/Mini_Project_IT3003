async function getAllReviews() {
    const response = await fetch(`${API_BASE_URL}/reviews`);
    const reviews = await response.json();
    displayReviews(reviews);
}

async function addReview() {
    const review = {
        owner: { id: parseInt(document.getElementById("ownerId").value) },
        booking: { id: parseInt(document.getElementById("bookingId").value) },
        rating: parseInt(document.getElementById("rating").value),
        comment: document.getElementById("comment").value
    };

    await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review)
    });

    document.querySelector("form").reset();
    getAllReviews();
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

window.onload = getAllReviews;