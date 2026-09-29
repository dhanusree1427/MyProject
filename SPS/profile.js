// ===================================
// GET HTML ELEMENTS
// ===================================

const profileImage = document.getElementById("profileImage");
const profileInput = document.getElementById("profileInput");

const coverImage = document.getElementById("coverImage");
const coverInput = document.getElementById("coverInput");

const editBtn = document.getElementById("editBtn");
const shareBtn = document.getElementById("shareBtn");

const editPopup = document.getElementById("editPopup");
const sharePopup = document.getElementById("sharePopup");

const name = document.getElementById("name");
const branch = document.getElementById("branch");
const college = document.getElementById("college");
const bio = document.getElementById("bio");

const aboutName = document.getElementById("aboutName");
const aboutText = document.getElementById("aboutText");

// ===================================
// LOAD SAVED DATA
// ===================================

window.onload = function () {

    // Load Text

    if(localStorage.getItem("name")){
        name.innerText = localStorage.getItem("name");
        aboutName.innerText = localStorage.getItem("name");
    }

    if(localStorage.getItem("branch")){
        branch.innerText = localStorage.getItem("branch");
    }

    if(localStorage.getItem("college")){
        college.innerText = localStorage.getItem("college");
    }

    if(localStorage.getItem("bio")){
        bio.innerText = localStorage.getItem("bio");

        aboutText.innerHTML =
        "Hello! I am <span id='aboutName'>" +
        localStorage.getItem("name") +
        "</span>.<br><br>" +
        localStorage.getItem("bio");
    }

    // Load Profile Image

    const savedProfile = localStorage.getItem("profileImage");

    if(savedProfile){

        profileImage.src = savedProfile;

    }

    // Load Cover Image

    const savedCover = localStorage.getItem("coverImage");

    if(savedCover){

        coverImage.src = savedCover;

    }

};
// ===================================
// CHANGE PROFILE PICTURE
// ===================================

profileInput.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function (e) {

            profileImage.src = e.target.result;

            localStorage.setItem("profileImage", e.target.result);

        };

        reader.readAsDataURL(file);

    }

});

// ===================================
// CHANGE COVER PHOTO
// ===================================

coverInput.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function (e) {

            coverImage.src = e.target.result;

            localStorage.setItem("coverImage", e.target.result);

        };

        reader.readAsDataURL(file);

    }

});

// ===================================
// OPEN EDIT PROFILE POPUP
// ===================================

editBtn.addEventListener("click", function () {

    document.getElementById("editName").value = name.innerText;

    document.getElementById("editBranch").value = branch.innerText;

    document.getElementById("editCollege").value = college.innerText;

    document.getElementById("editBio").value = bio.innerText;

    editPopup.style.display = "flex";

});

// ===================================
// OPEN SHARE PROFILE POPUP
// ===================================

shareBtn.addEventListener("click", function () {

    document.getElementById("profileLink").value =
        window.location.href;

    sharePopup.style.display = "flex";

});
// ===================================
// CLOSE POPUPS
// ===================================

function closeEdit() {

    editPopup.style.display = "none";

}

function closeShare() {

    sharePopup.style.display = "none";

}

// ===================================
// SAVE PROFILE
// ===================================

function saveProfile() {

    const newName = document.getElementById("editName").value.trim();

    const newBranch = document.getElementById("editBranch").value.trim();

    const newCollege = document.getElementById("editCollege").value.trim();

    const newBio = document.getElementById("editBio").value.trim();

    // Update Profile

    name.innerText = newName;

    branch.innerText = newBranch;

    college.innerText = newCollege;

    bio.innerText = newBio;

    // Update About Section

    aboutName.innerText = newName;

    aboutText.innerHTML =
        "Hello! I am <span id='aboutName'>" +
        newName +
        "</span>.<br><br>" +
        newBio;

    // Save to Local Storage

    localStorage.setItem("name", newName);

    localStorage.setItem("branch", newBranch);

    localStorage.setItem("college", newCollege);

    localStorage.setItem("bio", newBio);

    alert("Profile Updated Successfully!");

    closeEdit();

}
// ===================================
// COPY PROFILE LINK
// ===================================

function copyProfile() {

    const shareData = {

        title: "CampusVerse",

        text: "Check out my CampusVerse Profile!",

        url: window.location.href

    };

    if (navigator.share) {

        navigator.share(shareData)
        .then(() => {

            console.log("Shared Successfully");

        })
        .catch((err) => {

            console.log(err);

        });

    } else {

        navigator.clipboard.writeText(window.location.href);

        alert("Profile Link Copied!");

    }

}

// ===================================
// CLOSE POPUPS WHEN CLICKING OUTSIDE
// ===================================

window.addEventListener("click", function(event){

    if(event.target === editPopup){

        closeEdit();

    }

    if(event.target === sharePopup){

        closeShare();

    }

});

// ===================================
// ESC KEY CLOSES POPUPS
// ===================================

document.addEventListener("keydown", function(event){

    if(event.key === "Escape"){

        closeEdit();

        closeShare();

    }

});

// ===================================
// END OF FILE
// ===================================
// ======================
// STUDENT SEARCH
// ======================

const students = [

{
name:"Dhanu Sree",
followers:520,
following:190,
image:"images/profile.jpg"
},

{
name:"Madhavi",
followers:350,
following:145,
image:"images/profile.jpg"
},

{
name:"Himasree",
followers:450,
following:228,
image:"images/profile.jpg"
},

{
name:"Dimpul",
followers:180,
following:100,
image:"images/profile.jpg"
},

{
name:"SakthiPriya",
followers:640,
following:310,
image:"images/profile.jpg"
}

];

const searchInput=document.getElementById("searchStudent");

const searchResults=document.getElementById("searchResults");

searchInput.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

searchResults.innerHTML="";

if(value==="") return;

const result=students.filter(student=>student.name.toLowerCase().includes(value));

if(result.length===0){

searchResults.innerHTML="<h3>No Student Found</h3>";

return;

}

result.forEach(student=>{

searchResults.innerHTML+=`

<div class="student-card">

<div class="student-left">

<img src="${student.image}">

<div class="student-info">

<h3>${student.name}</h3>

<p>Followers : ${student.followers}</p>

<p>Following : ${student.following}</p>

</div>

</div>

<div class="student-buttons">

<button onclick="alert('Viewing ${student.name} Profile')">View Profile</button>

<button onclick="toggleFollow(this)">
Follow
</button>
</div>

</div>

`;

});

});
// =======================
// FOLLOW / UNFOLLOW
// =======================

function toggleFollow(button){

    const followingCount = document.getElementById("following");

    let count = parseInt(followingCount.innerText);

    if(button.innerText === "Follow"){

        button.innerText = "Following";

        button.style.background = "green";

        followingCount.innerText = count + 1;

    }
    else{

        button.innerText = "Follow";

        button.style.background = "#2563eb";

        followingCount.innerText = count - 1;

    }

}

function openProfile(name){

    const student = students.find(s => s.name === name);

    localStorage.setItem("student", JSON.stringify(student));

    window.location.href = "student-profile.html";

}