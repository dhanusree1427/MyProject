let groups = [

    {
        id: 1,
        name: "Web Development",
        description: "HTML • CSS • JavaScript • React",
        members: 54,
        streak: 18,
        createdByMe: false
    },

    {
        id: 2,
        name: "Python Programming",
        description: "Python Basics & Projects",
        members: 76,
        streak: 25,
        createdByMe: false
    },

    {
        id: 3,
        name: "AI & Machine Learning",
        description: "Machine Learning Roadmap",
        members: 101,
        streak: 31,
        createdByMe: false
    },

    {
        id: 4,
        name: "Java Programming",
        description: "Core Java & OOP",
        members: 39,
        streak: 12,
        createdByMe: false
    },

    {
        id: 5,
        name: "Data Structures",
        description: "DSA Preparation",
        members: 82,
        streak: 20,
        createdByMe: false
    },

    {
        id: 6,
        name: "CAT Preparation",
        description: "Quant • LRDI • VARC",
        members: 60,
        streak: 40,
        createdByMe: false
    },

    {
        id: 7,
        name: "GATE",
        description: "QA, Reasoning",
        members: 71,
        streak: 1,
        createdByMe: false
    }

];


let joinedGroups =
    JSON.parse(localStorage.getItem("joinedGroups")) || [];

let createdGroups =
    JSON.parse(localStorage.getItem("createdGroups")) || [];

let events =
    JSON.parse(localStorage.getItem("events")) || [];


groups = groups.concat(createdGroups);


let currentGroupTab = "all";

let selectedChat = "Rahul";

let calendarDate = new Date();


const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach(link => {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        if (this.id === "logoutBtn") {
            logout();
            return;
        }

        const page =
            this.getAttribute("data-page");

        showPage(page);

    });

});


function showPage(page) {

    document
        .querySelectorAll(".page")
        .forEach(section => {
            section.classList.add("hidden");
        });


    const selectedPage =
        document.getElementById(page + "Page");


    if (selectedPage) {
        selectedPage.classList.remove("hidden");
    }


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("data-page") === page
        ) {

            link.classList.add("active");

        }

    });


    const search =
        document.getElementById("globalSearch");

    if (page === "groups") {

        search.style.display = "flex";

    } else {

        search.style.display = "none";

    }


    if (page === "calendar") {
        renderCalendar();
        renderEvents();
    }


    if (page === "groups") {
        displayGroups();
    }


    updateDashboard();

}


function displayGroups(searchText = "") {

    const container =
        document.getElementById("groupsContainer");

    container.innerHTML = "";


    let filtered = groups;




    if (currentGroupTab === "joined") {

        filtered =
            groups.filter(group =>
                joinedGroups.includes(group.id)
            );

    }


    if (currentGroupTab === "my") {

        filtered =
            groups.filter(group =>
                group.createdByMe === true
            );

    }


    /* Search */

    if (searchText !== "") {

        filtered =
            filtered.filter(group =>

                group.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())

                ||

                group.description
                    .toLowerCase()
                    .includes(searchText.toLowerCase())

            );

    }


    if (filtered.length === 0) {

        container.innerHTML = `

            <div class="empty-message">

                <i class="fa-solid fa-users"></i>

                <h2>No Groups Found</h2>

                <p>
                    Try another search or join a study group.
                </p>

            </div>

        `;

        return;

    }


    filtered.forEach(group => {

        const isJoined =
            joinedGroups.includes(group.id);


        const card =
            document.createElement("div");

        card.className = "group-card";


        card.innerHTML = `

            <h2>${group.name}</h2>

            <p class="description">
                ${group.description}
            </p>

            <div class="group-info">

                <span>
                    <i class="fa-solid fa-user-group"></i>
                    ${group.members} Members
                </span>

                <span>
                    <i class="fa-solid fa-fire fire"></i>
                    ${group.streak} Day Streak
                </span>

            </div>


            <button
                class="join-btn ${isJoined ? "joined" : ""}"
                onclick="toggleJoin(${group.id})">

                ${isJoined ? "✓ Joined" : "Join"}

            </button>

        `;


        container.appendChild(card);

    });

}


function toggleJoin(id) {

    const index =
        joinedGroups.indexOf(id);


    if (index === -1) {

        joinedGroups.push(id);

        const group =
            groups.find(g => g.id === id);

        if (group) {
            group.members++;
        }

        alert("You joined the study group! 🎉");

    } else {

        joinedGroups.splice(index, 1);

        const group =
            groups.find(g => g.id === id);

        if (group && group.members > 0) {
            group.members--;
        }

        alert("You left the study group.");

    }


    localStorage.setItem(
        "joinedGroups",
        JSON.stringify(joinedGroups)
    );


    saveCreatedGroups();

    updateJoinedCount();

    displayGroups();

    updateDashboard();

}


function changeGroupTab(tab) {

    currentGroupTab = tab;


    document
        .querySelectorAll(".tab")
        .forEach(button => {
            button.classList.remove("active-tab");
        });


    if (tab === "all") {

        document
            .getElementById("allTab")
            .classList.add("active-tab");

    }


    if (tab === "my") {

        document
            .getElementById("myTab")
            .classList.add("active-tab");

    }


    if (tab === "joined") {

        document
            .getElementById("joinedTab")
            .classList.add("active-tab");

    }


    displayGroups();

}


function updateJoinedCount() {

    document.getElementById("joinedCount")
        .textContent = joinedGroups.length;

}


function openCreateGroup() {

    document
        .getElementById("groupModal")
        .classList.add("show");

}


function closeCreateGroup() {

    document
        .getElementById("groupModal")
        .classList.remove("show");

}


function createGroup() {

    const name =
        document
            .getElementById("newGroupName")
            .value
            .trim();


    const description =
        document
            .getElementById("newGroupDescription")
            .value
            .trim();


    if (!name || !description) {

        alert("Please enter group name and description.");

        return;

    }


    const newGroup = {

        id: Date.now(),

        name: name,

        description: description,

        members: 1,

        streak: 0,

        createdByMe: true

    };


    groups.push(newGroup);

    createdGroups.push(newGroup);

    joinedGroups.push(newGroup.id);


    localStorage.setItem(
        "joinedGroups",
        JSON.stringify(joinedGroups)
    );


    saveCreatedGroups();


    document
        .getElementById("newGroupName")
        .value = "";


    document
        .getElementById("newGroupDescription")
        .value = "";


    closeCreateGroup();


    updateJoinedCount();

    changeGroupTab("my");

    updateDashboard();


    alert("Study group created successfully! 🎉");

}


function saveCreatedGroups() {

    localStorage.setItem(
        "createdGroups",
        JSON.stringify(createdGroups)
    );

}


document
    .getElementById("searchInput")
    .addEventListener("input", function() {

        displayGroups(this.value.trim());

    });


function renderCalendar() {

    const grid =
        document.getElementById("calendarGrid");


    const monthTitle =
        document.getElementById("calendarMonth");


    const year =
        calendarDate.getFullYear();


    const month =
        calendarDate.getMonth();


    const monthNames = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"

    ];


    monthTitle.textContent =
        `${monthNames[month]} ${year}`;


    grid.innerHTML = "";


    const firstDay =
        new Date(year, month, 1).getDay();


    const daysInMonth =
        new Date(year, month + 1, 0).getDate();


    for (let i = 0; i < firstDay; i++) {

        const empty =
            document.createElement("div");

        grid.appendChild(empty);

    }


    for (let day = 1; day <= daysInMonth; day++) {

        const cell =
            document.createElement("div");


        cell.className = "calendar-day";


        const dateString =
            formatDate(
                new Date(year, month, day)
            );


        cell.innerHTML =
            `<strong>${day}</strong>`;


        const hasEvent =
            events.some(event =>
                event.date === dateString
            );


        if (hasEvent) {
            cell.classList.add("has-event");
        }


        const today =
            new Date();


        if (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {

            cell.classList.add("today");

        }


        cell.onclick = function() {

            document
                .getElementById("eventDate")
                .value = dateString;

            openEventModal();

        };


        grid.appendChild(cell);

    }

}


function changeMonth(direction) {

    calendarDate.setMonth(
        calendarDate.getMonth() + direction
    );

    renderCalendar();

}

function formatDate(date) {

    const year =
        date.getFullYear();

    const month =
        String(date.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(date.getDate())
            .padStart(2, "0");


    return `${year}-${month}-${day}`;

}


function openEventModal() {

    document
        .getElementById("eventModal")
        .classList.add("show");


    const today =
        formatDate(new Date());


    if (!document.getElementById("eventDate").value) {

        document
            .getElementById("eventDate")
            .value = today;

    }

}


function closeEventModal() {

    document
        .getElementById("eventModal")
        .classList.remove("show");

}

function addEvent() {

    const title =
        document
            .getElementById("eventTitle")
            .value
            .trim();


    const date =
        document
            .getElementById("eventDate")
            .value;


    const time =
        document
            .getElementById("eventTime")
            .value;


    if (!title || !date || !time) {

        alert("Please enter event title, date and time.");

        return;

    }


    events.push({

        id: Date.now(),

        title: title,

        date: date,

        time: time

    });


    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );


    document
        .getElementById("eventTitle")
        .value = "";


    document
        .getElementById("eventDate")
        .value = "";


    document
        .getElementById("eventTime")
        .value = "";


    closeEventModal();


    renderCalendar();

    renderEvents();

    updateDashboard();


    alert("Event added successfully!");

}


function renderEvents() {

    const list =
        document.getElementById("eventsList");


    list.innerHTML = "";


    if (events.length === 0) {

        list.innerHTML = `

            <div class="empty-message">

                <i class="fa-solid fa-calendar"></i>

                <h3>No Upcoming Events</h3>

                <p>Add an event to your calendar.</p>

            </div>

        `;

        return;

    }


    const sorted =
        [...events].sort((a, b) => {

            return (
                new Date(a.date + " " + a.time)
                -
                new Date(b.date + " " + b.time)
            );

        });


    sorted.forEach(event => {

        const item =
            document.createElement("div");

        item.className = "event-item";


        item.innerHTML = `

            <button
                class="delete-event"
                onclick="deleteEvent(${event.id})">

                <i class="fa-solid fa-trash"></i>

            </button>

            <h3>${event.title}</h3>

            <p>
                <i class="fa-solid fa-calendar"></i>
                ${event.date}
            </p>

            <p>
                <i class="fa-solid fa-clock"></i>
                ${event.time}
            </p>

        `;


        list.appendChild(item);

    });

}


/* =====================================================
   DELETE EVENT
===================================================== */

function deleteEvent(id) {

    if (!confirm("Delete this event?")) {
        return;
    }


    events =
        events.filter(event =>
            event.id !== id
        );


    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );


    renderEvents();

    renderCalendar();

    updateDashboard();

}


function renderHomeEvents() {

    const container =
        document.getElementById("homeEvents");


    container.innerHTML = "";


    if (events.length === 0) {

        container.innerHTML = `

            <p style="color:#777">
                No upcoming events.
            </p>

        `;

        return;

    }


    events
        .slice(0, 3)
        .forEach(event => {

            const div =
                document.createElement("div");

            div.className = "event-item";


            div.innerHTML = `

                <h3>${event.title}</h3>

                <p>
                    ${event.date} at ${event.time}
                </p>

            `;


            container.appendChild(div);

        });

}


function updateDashboard() {

    document
        .getElementById("homeJoinedCount")
        .textContent = joinedGroups.length;


    document
        .getElementById("eventCount")
        .textContent = events.length;


    renderHomeEvents();

}


function openMessages() {

    showPage("messages");

}


function selectChat(name) {

    selectedChat = name;


    document
        .getElementById("chatName")
        .textContent = name;


    document
        .querySelectorAll(".contact")
        .forEach(contact => {

            contact.classList.remove(
                "active-contact"
            );

        });


    const contacts =
        document.querySelectorAll(".contact");


    contacts.forEach(contact => {

        if (
            contact.querySelector("h3") &&
            contact.querySelector("h3")
                .textContent === name
        ) {

            contact.classList.add(
                "active-contact"
            );

        }

    });


    document
        .getElementById("chatMessages")
        .innerHTML = `

            <div class="message received">
                Hi! How are you?
            </div>

            <div class="message received">
                Are you joining our study group?
            </div>

        `;

}


function sendMessage() {

    const input =
        document.getElementById("messageInput");


    const text =
        input.value.trim();


    if (!text) {
        return;
    }


    const message =
        document.createElement("div");


    message.className =
        "message sent";


    message.textContent = text;


    document
        .getElementById("chatMessages")
        .appendChild(message);


    input.value = "";


    const chat =
        document.getElementById("chatMessages");


    chat.scrollTop = chat.scrollHeight;


    setTimeout(() => {

        const reply =
            document.createElement("div");


        reply.className =
            "message received";


        reply.textContent =
            "Okay! 👍";


        chat.appendChild(reply);


        chat.scrollTop =
            chat.scrollHeight;

    }, 800);

}
document
    .getElementById("messageInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    });

function saveSettings() {

    const name =
        document
            .getElementById("userName")
            .value;


    const email =
        document
            .getElementById("userEmail")
            .value;


    const college =
        document
            .getElementById("userCollege")
            .value;


    localStorage.setItem(
        "userName",
        name
    );


    localStorage.setItem(
        "userEmail",
        email
    );


    localStorage.setItem(
        "userCollege",
        college
    );


    const password =
        document
            .getElementById("newPassword")
            .value;


    if (password) {

        localStorage.setItem(
            "userPassword",
            password
        );

    }


    alert("Settings saved successfully! ✅");

}


function loadSettings() {

    const name =
        localStorage.getItem("userName");


    const email =
        localStorage.getItem("userEmail");


    const college =
        localStorage.getItem("userCollege");


    if (name) {

        document
            .getElementById("userName")
            .value = name;

    }


    if (email) {

        document
            .getElementById("userEmail")
            .value = email;

    }


    if (college) {

        document
            .getElementById("userCollege")
            .value = college;

    }

}


function toggleDarkMode() {

    const checkbox =
        document.getElementById("darkMode");


    document.body.classList.toggle(
        "dark",
        checkbox.checked
    );


    localStorage.setItem(
        "darkMode",
        checkbox.checked
    );

}


function loadDarkMode() {

    const dark =
        localStorage.getItem("darkMode") === "true";


    document.body.classList.toggle(
        "dark",
        dark
    );


    document
        .getElementById("darkMode")
        .checked = dark;

}


function logout() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {
        return;
    }

    alert("You have been logged out successfully.");


    showLoginScreen();

}

function showLoginScreen() {

    document.body.innerHTML = `

        <div class="login-screen">

            <div class="login-box">

                <h1>CampusVerse</h1>

                <p>
                    Login to continue learning.
                </p>

                <input
                    type="text"
                    id="loginName"
                    placeholder="Username"
                >

                <input
                    type="password"
                    id="loginPassword"
                    placeholder="Password"
                >

                <button
                    class="primary-button"
                    onclick="loginAgain()">

                    Login

                </button>

            </div>

        </div>

    `;

}


function loginAgain() {

    const name =
        document
            .getElementById("loginName")
            .value;


    const password =
        document
            .getElementById("loginPassword")
            .value;


    if (!name || !password) {

        alert("Please enter username and password.");

        return;

    }


    location.reload();

}

function showNotification() {

    alert(
        "You have 3 new notifications! 🔔\n\n" +
        "• Python Study Group has a new message.\n" +
        "• AI & ML meeting tomorrow.\n" +
        "• Keep your 31 day learning streak!"
    );

}

updateJoinedCount();

updateDashboard();

loadSettings();

loadDarkMode();

displayGroups();

renderCalendar();

renderEvents();