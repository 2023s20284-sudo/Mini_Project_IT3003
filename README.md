# PetCare Hub – Pet Boarding and Daycare Management System

**IT 3003 – Mini Project**
University of Colombo | Group Project
**Group Number: 07**

##  About the Project

PetCare Hub is a web-based **Pet Boarding and Daycare Management System** that allows pet owners to register, manage their pets, book boarding/daycare services, and leave reviews — while staff can manage rooms, care schedules, and bookings from the backend.

The system is built with a **Spring Boot** backend and a **static HTML/CSS/JavaScript** frontend, shared and developed collaboratively across a 7-member team.

##  Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java, Spring Boot |
| Frontend | HTML, CSS, JavaScript (static pages) |
| Database | MySQL / (update as per your config) |
| Build Tool | Maven (`pom.xml`) |
| IDE | IntelliJ IDEA |
| Version Control | Git & GitHub |

##  Project Structure

```
Mini_Project_IT3003/
├── frontend/
│   ├── booking/
│   │   ├── booking.html
│   │   └── booking.js
│   ├── care/
│   │   ├── care.html
│   │   └── care.js
│   ├── css/
│   │   └── style.css
│   ├── images/
│   │   ├── logo.png
│   │   └── pet-hero.jpg
│   ├── js/
│   ├── owner/
│   ├── pet/
│   ├── review/
│   ├── room/
│   └── staff/
├── src/
│   ├── main/
│   │   ├── java/com/example/pet_boarding_and_daycare_system/
│   │   │   ├── booking/     # Booking module
│   │   │   ├── care/        # Care/daycare scheduling module
│   │   │   ├── config/      # App configuration classes
│   │   │   ├── owner/       # Pet Owner module
│   │   │   ├── pet/         # Pet management module
│   │   │   ├── review/      # Review & rating module
│   │   │   ├── room/        # Room/kennel management module
│   │   │   ├── staff/       # Staff management module
│   │   │   └── PetBoardingAndDaycareSystemApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── index.html                # Frontend entry point
├── pom.xml                   # Maven dependencies
├── mvnw / mvnw.cmd           # Maven wrapper
└── .gitignore
```

##  Team Members & Modules

| Module | Responsible Member | Reg No. |
|---|---|---|
| Owner | L.W.Manoji | s17499 |
| Pet | R.K.A.D.T.W Rathnasekara | s17516 |
| Room | M.Sashini Nawodya | s17502 |
| Booking | D.I.Weeratunge | s17538 |
| Care Schedule | A.M.G.U.Vijayarathna | s17533 |
| Staff | G.Dilsi Rasara | s17364 |
| Review | O.V.K.Tharushika | s17526 |

## Key Features

- **Owner Management** – Register/login pet owners, manage owner profiles
-  **Pet Management** – Add and manage pet details (breed, age, medical notes, etc.)
-  **Booking System** – Book boarding/daycare slots for pets
- ️ **Room Management** – Manage available rooms/kennels and capacity
- **Staff Management** – Manage staff assigned to care duties
-  **Care Scheduling** – Track daycare/boarding care activities
- **Reviews** – Owners can leave feedback and ratings

## Getting Started

### Prerequisites
- Java 17+ (or project's JDK version)
- Maven (or use the included `mvnw` wrapper)
- MySQL / database server running (update credentials in `application.properties`)

### Steps to Run

1. Clone the repository
   ```bash
   git clone <team-repo-url>
   cd Mini_Project_IT3003
   ```

2. Configure the database connection in
   ```
   src/main/resources/application.properties
   ```

3. Run the Spring Boot application
   ```bash
   ./mvnw spring-boot:run
   ```
   or run `PetBoardingAndDaycareSystemApplication.java` directly from IntelliJ.

4. Open the frontend
   - Open `index.html` in browser, or serve it through a local server, depending on how  team set up the frontend-backend connection.

5. The backend will start on the default port (usually `http://localhost:8080`)

## Git Workflow

- `main` branch – stable, tested code only
- Each member works on their own feature branch (e.g. `owner-module`, `booking-module`)
- Create a Pull Request before merging into `main`
- Resolve conflicts carefully, especially in shared frontend files (CSS/JS)

##  License

This project is developed for academic purposes as part of the IT 3003 coursework at the University of Colombo.
