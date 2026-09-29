// ===============================
// LOAD STUDENT DATA
// ===============================

window.onload = function () {

    document.getElementById("studentName").innerText =
        localStorage.getItem("studentName");

    document.getElementById("studentBranch").innerText =
        localStorage.getItem("studentBranch");

    document.getElementById("studentCollege").innerText =
        localStorage.getItem("studentCollege");

    document.getElementById("studentFollowers").innerText =
        localStorage.getItem("studentFollowers");

    document.getElementById("studentFollowing").innerText =
        localStorage.getItem("studentFollowing");

    document.getElementById("studentBio").innerText =
        localStorage.getItem("studentBio");

    document.getElementById("studentImage").src =
        localStorage.getItem("studentImage");

};

// ===============================
// FOLLOW / UNFOLLOW
// ===============================

const followBtn = document.getElementById("followBtn");

followBtn.onclick = function () {

    if (followBtn.innerText == "Follow") {

        followBtn.innerText = "Following";

        followBtn.style.background = "green";

    }

    else {

        followBtn.innerText = "Follow";

        followBtn.style.background = "#2563eb";

    }

};