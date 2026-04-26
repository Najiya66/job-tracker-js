let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

// Show/hide interview date
function toggleInterviewDate() {
    let status = document.getElementById("status").value;
    let div = document.getElementById("interviewDiv");

    div.style.display = (status === "Interview") ? "block" : "none";
}

// Status color
function getStatusClass(status) {
    if (status === "Applied") return "applied";
    if (status === "Interview") return "interview";
    if (status === "Rejected") return "rejected";
    if (status === "Offer") return "offer";
}

// 🔥 Display with SORT + SEARCH
function displayJobs() {
    let jobList = document.getElementById("jobList");
    let search = document.getElementById("search").value.toLowerCase();

    jobList.innerHTML = "";

    // 📅 SORT by Applied Date (latest first)
    let sortedJobs = [...jobs].sort((a, b) => {
        return new Date(b.appliedDate) - new Date(a.appliedDate);
    });

    sortedJobs.forEach((job, index) => {

        // 🔍 SEARCH FILTER
        let text = Object.values(job).join(" ").toLowerCase();
        if (!text.includes(search)) return;

        jobList.innerHTML += `
            <tr>
                <td>${job.company}</td>
                <td>${job.role}</td>
                <td>${job.type}</td>
                <td>${job.experience || "-"}</td>
                <td>${job.skills || "-"}</td>
                <td>${job.location || "-"}</td>
                <td>
                    <span class="status ${getStatusClass(job.status)}">
                        ${job.status}
                    </span>
                </td>
                <td>${job.appliedDate || "-"}</td>
                <td>${job.interviewDate || "-"}</td>
                <td>
                    <button onclick="editJob(${jobs.indexOf(job)})">Edit</button>
                    <button onclick="deleteJob(${jobs.indexOf(job)})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Add job
function addJob() {
    let company = document.getElementById("company").value;
    let role = document.getElementById("role").value;
    let type = document.getElementById("type").value;
    let experience = document.getElementById("experience").value;
    let skills = document.getElementById("skills").value;
    let location = document.getElementById("location").value;
    let status = document.getElementById("status").value;
    let appliedDate = document.getElementById("appliedDate").value;
    let interviewDate = document.getElementById("interviewDate").value;

    if (!company || !role || !appliedDate) {
        alert("Please fill required fields");
        return;
    }

    let job = {
        company,
        role,
        type,
        experience,
        skills,
        location,
        status,
        appliedDate,
        interviewDate: status === "Interview" ? interviewDate : ""
    };

    jobs.push(job);
    localStorage.setItem("jobs", JSON.stringify(jobs));

    clearForm();
    displayJobs();
}

// Delete
function deleteJob(index) {
    jobs.splice(index, 1);
    localStorage.setItem("jobs", JSON.stringify(jobs));
    displayJobs();
}

// Edit
function editJob(index) {
    let job = jobs[index];

    document.getElementById("company").value = job.company;
    document.getElementById("role").value = job.role;
    document.getElementById("type").value = job.type;
    document.getElementById("experience").value = job.experience;
    document.getElementById("skills").value = job.skills;
    document.getElementById("location").value = job.location;
    document.getElementById("status").value = job.status;
    document.getElementById("appliedDate").value = job.appliedDate;
    document.getElementById("interviewDate").value = job.interviewDate;

    toggleInterviewDate();
    deleteJob(index);
}

// Clear form
function clearForm() {
    document.getElementById("company").value = "";
    document.getElementById("role").value = "";
    document.getElementById("experience").value = "";
    document.getElementById("skills").value = "";
    document.getElementById("location").value = "";
    document.getElementById("appliedDate").value = "";
    document.getElementById("interviewDate").value = "";
}

// Load
displayJobs();