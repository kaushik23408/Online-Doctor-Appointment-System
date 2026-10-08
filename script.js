const doctors = [
    {
        id: 1,
        name: "Dr. Ananya Sharma",
        specialization: "Cardiology",
        experience: "12 Years Experience",
        qualification: "MBBS, MD Cardiology",
        fee: 800
    },

    {
        id: 2,
        name: "Dr. Rahul Verma",
        specialization: "Neurology",
        experience: "10 Years Experience",
        qualification: "MBBS, DM Neurology",
        fee: 900
    },

    {
        id: 3,
        name: "Dr. Priya Reddy",
        specialization: "Dentistry",
        experience: "8 Years Experience",
        qualification: "BDS, MDS",
        fee: 600
    },

    {
        id: 4,
        name: "Dr. Arjun Kumar",
        specialization: "Pediatrics",
        experience: "9 Years Experience",
        qualification: "MBBS, MD Pediatrics",
        fee: 700
    },

    {
        id: 5,
        name: "Dr. Sneha Rao",
        specialization: "General Medicine",
        experience: "11 Years Experience",
        qualification: "MBBS, MD",
        fee: 500
    },

    {
        id: 6,
        name: "Dr. Vikram Singh",
        specialization: "Ophthalmology",
        experience: "15 Years Experience",
        qualification: "MBBS, MS Ophthalmology",
        fee: 750
    }
];


/* Load Doctors */

document.addEventListener("DOMContentLoaded", function () {

    const container =
        document.getElementById("doctorContainer");

    if (container) {
        displayDoctors(doctors);
    }

});


/* Display Doctors */

function displayDoctors(doctorList) {

    const container =
        document.getElementById("doctorContainer");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (doctorList.length === 0) {

        container.innerHTML = `
            <div class="no-results">
                <h2>No Doctors Found</h2>
                <p>
                    Try searching for another doctor
                    or specialization.
                </p>
            </div>
        `;

        return;
    }

    doctorList.forEach(function (doctor) {

        const card =
            document.createElement("div");

        card.className = "doctor-card";

        card.innerHTML = `
            <h2>${doctor.name}</h2>

            <p class="specialization">
                ${doctor.specialization}
            </p>

            <p class="experience">
                ${doctor.experience}
            </p>

            <p>
                ${doctor.qualification}
            </p>

            <p>
                Consultation Fee:
                <strong>₹${doctor.fee}</strong>
            </p>

            <button
                class="btn"
                onclick="bookAppointment(${doctor.id})">
                Book Appointment
            </button>
        `;

        container.appendChild(card);

    });

}


/* Search Doctors */

function searchDoctors() {

    const searchInput =
        document.getElementById("searchInput");

    const specializationFilter =
        document.getElementById("specializationFilter");

    if (!searchInput || !specializationFilter) {
        return;
    }

    const searchText =
        searchInput.value.toLowerCase().trim();

    const specialization =
        specializationFilter.value;

    const filteredDoctors =
        doctors.filter(function (doctor) {

            const matchesSearch =
                doctor.name
                    .toLowerCase()
                    .includes(searchText) ||

                doctor.specialization
                    .toLowerCase()
                    .includes(searchText);

            const matchesSpecialization =
                specialization === "all" ||
                doctor.specialization === specialization;

            return (
                matchesSearch &&
                matchesSpecialization
            );

        });

    displayDoctors(filteredDoctors);

}


/* Book Appointment */

function bookAppointment(doctorId) {

    const doctor =
        doctors.find(function (item) {
            return item.id === doctorId;
        });

    if (!doctor) {
        return;
    }

    const date =
        prompt("Enter appointment date (YYYY-MM-DD):");

    if (!date) {
        return;
    }

    const time =
        prompt("Enter appointment time:");

    if (!time) {
        return;
    }

    const patient =
        prompt("Enter patient's name:");

    if (!patient) {
        return;
    }

    const appointment = {

        doctor: doctor.name,

        specialization:
            doctor.specialization,

        patient: patient,

        date: date,

        time: time,

        fee: doctor.fee

    };

    localStorage.setItem(
        "appointment",
        JSON.stringify(appointment)
    );

    alert(
        "Appointment booked successfully!\n\n" +

        "Doctor: " +
        doctor.name +

        "\nSpecialization: " +
        doctor.specialization +

        "\nPatient: " +
        patient +

        "\nDate: " +
        date +

        "\nTime: " +
        time +

        "\nFee: ₹" +
        doctor.fee
    );

}


/* Registration */

function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const dob =
        document.getElementById("dob").value;

    const gender =
        document.getElementById("gender").value;

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    const user = {

        name: name,

        email: email,

        phone: phone,

        dob: dob,

        gender: gender,

        password: password

    };


    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );


    alert(
        "Registration successful!"
    );


    window.location.href =
        "login.html";

}


/* Login */

function loginUser(event) {

    event.preventDefault();

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();

    const password =
        document
            .getElementById("loginPassword")
            .value;


    const storedUser =
        localStorage.getItem("user");


    if (!storedUser) {

        alert(
            "No registered user found. " +
            "Please register first."
        );

        return;
    }


    const user =
        JSON.parse(storedUser);


    if (
        email === user.email &&
        password === user.password
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        alert(
            "Login successful!"
        );

        window.location.href =
            "catalog.html";

    } else {

        alert(
            "Invalid email or password."
        );

    }

}
