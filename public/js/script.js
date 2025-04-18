// Alumni Data
const alumni = [
  {
    name: "Zoheen Shahzad",
    graduationYear: "2023",
    company: "Google",
    jobTitle: "Software Engineer",
    branch: "Computer Science",
    location: "California, USA",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    linkedin: "https://linkedin.com/in/zoheen",
    github: ""
  },
  {
    name: "Rajneet Kaur Hanspal",
    graduationYear: "2026",
    company: "RetailEZ",
    jobTitle: "Retail Analyst",
    branch: "Food Technology",
    location: "India",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    linkedin: "https://linkedin.com/in/rajneet",
    github: ""
  },
  {
    name: "Ayesha Khan",
    graduationYear: "2022",
    company: "Flipkart",
    jobTitle: "Software Developer",
    branch: "Information Technology",
    location: "Bangalore, India",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    linkedin: "https://linkedin.com/in/ayesha",
    github: "https://github.com/ayesha"
  },
  {
    name: "Safura Reshad",
    graduationYear: "2025",
    company: "Jamia Millia Islamia",
    jobTitle: "Student",
    branch: "Electronics",
    location: "Delhi, India",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    linkedin: "",
    github: ""
  },
  {
    name: "Nazrana",
    graduationYear: "2024",
    company: "Jamia Millia Islamia",
    jobTitle: "Student",
    branch: "Computer Engineering",
    location: "Delhi, India",
    image: "https://randomuser.me/api/portraits/women/43.jpg",
    linkedin: "https://linkedin.com/in/nazrana",
    github: ""
  }
];

function renderAlumni(alumniList) {
  const container = document.getElementById('alumniContainer');
  container.innerHTML = '';

  alumniList.forEach(alum => {
    const card = `
    <div class="card">
      <img src="${alum.image}" alt="${alum.name}" class="profile-pic">
      <h3 class="name">${alum.name}</h3>
      <p class="details"><strong>Batch:</strong> ${alum.graduationYear}</p>
      <p class="details"><strong>Branch:</strong> ${alum.branch}</p>
      <p class="details"><strong>Company:</strong> ${alum.company}</p>
      <p class="details"><strong>Job Title:</strong> ${alum.jobTitle}</p>
      <p class="details"><strong>Location:</strong> ${alum.location}</p>
      <div class="links">
        ${alum.linkedin ? `<a href="${alum.linkedin}" target="_blank" class="connect-btn">LinkedIn</a>` : ''}
        ${alum.github ? `<a href="${alum.github}" target="_blank" class="connect-btn github">GitHub</a>` : ''}
      </div>
      <a href="alumniProfile.html?id=${encodeURIComponent(alum.name)}" class="view-profile-btn" target="_blank">View Full Profile</a>
 </div>
  `;

    container.insertAdjacentHTML('beforeend', card);
  });
}

// Initial render
renderAlumni(alumni);

// Search Inputs
const searchName = document.getElementById('searchName');
const searchBatch = document.getElementById('searchBatch');
const searchCompany = document.getElementById('searchCompany');
const searchLocation = document.getElementById('searchLocation');
const searchBranch = document.getElementById('searchBranch');
const searchJob = document.getElementById('searchJob');

// Filter function
function filterAlumni() {
  const nameVal = searchName.value.trim().toLowerCase();
  const batchVal = searchBatch.value.trim();
  const companyVal = searchCompany.value.trim().toLowerCase();
  const locationVal = searchLocation.value.trim().toLowerCase();
  const branchVal = searchBranch.value.trim().toLowerCase();
  const jobVal = searchJob.value.trim().toLowerCase();

  const filtered = alumni.filter(alum => {
    return (
      alum.name.toLowerCase().includes(nameVal) &&
      alum.graduationYear.includes(batchVal) &&
      alum.company.toLowerCase().includes(companyVal) &&
      alum.location.toLowerCase().includes(locationVal) &&
      alum.branch.toLowerCase().includes(branchVal) &&
      alum.jobTitle.toLowerCase().includes(jobVal)
    );
  });

  renderAlumni(filtered);
}

// Add Event Listeners
searchName.addEventListener('input', filterAlumni);
searchBatch.addEventListener('input', filterAlumni);
searchCompany.addEventListener('input', filterAlumni);
searchLocation.addEventListener('input', filterAlumni);
searchBranch.addEventListener('input', filterAlumni);
searchJob.addEventListener('input', filterAlumni);


