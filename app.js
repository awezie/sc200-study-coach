import { initializeApp }
from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
}
from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDtYjI8AkOnyiGnSy7hpLLaZFYzDVXVddk",
  authDomain: "sc200studycoach.firebaseapp.com",
  projectId: "sc200studycoach",
  storageBucket: "sc200studycoach.firebasestorage.app",
  messagingSenderId: "1028689517803",
  appId: "1:1028689517803:web:5583caa37acf1aac6272ae"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const notes = document.getElementById("notes");
const status = document.getElementById("status");

async function loadNotes() {
  try {
    const snap = await getDoc(
      doc(db, "users", "awele")
    );

    if (snap.exists()) {
      notes.value = snap.data().notes || "";
    }
  } catch (error) {
    console.error(error);
    status.textContent = "Error loading notes";
  }
}

async function saveNotes() {
  try {
    await setDoc(
      doc(db, "users", "awele"),
      {
        notes: notes.value
      },
      { merge: true }
    );

    status.textContent = "Saved to cloud ✅";
  }
  catch(error){
    console.error(error);
    status.textContent = "Save failed";
  }
}

document
.getElementById("saveBtn")
.addEventListener("click", saveNotes);

loadNotes();

const examDate = new Date("2027-01-15");

const daysLeft = Math.ceil(
  (examDate - new Date()) / 86400000
);

document.getElementById(
  "countdown"
).textContent =
`${daysLeft} days until SC-200`;
const studyPlan = [

{
date:"2026-11-18",
tier:"🔴 Tier 1 (Critical)",
topic:"SC-200 Skills Measured",
link:"https://learn.microsoft.com/credentials/certifications/resources/study-guides/sc-200"
},

{
date:"2026-11-19",
tier:"🔴 Tier 1 (Critical)",
topic:"Security Operations Concepts",
link:"https://learn.microsoft.com/training/modules/describe-concepts-of-security-operations/"
},

{
date:"2026-11-20",
tier:"🔴 Tier 1 (Critical)",
topic:"Microsoft Defender XDR Overview",
link:"https://learn.microsoft.com/defender-xdr/"
},

{
date:"2026-11-21",
tier:"🔴 Tier 1 (Critical)",
topic:"Microsoft Sentinel Overview",
link:"https://learn.microsoft.com/azure/sentinel/overview"
},

{
date:"2026-11-22",
tier:"🔴 Tier 1 (Critical)",
topic:"Incidents and Alerts",
link:"https://learn.microsoft.com/azure/sentinel/incidents"
}

];

const studyDay =
document.getElementById("studyDay");

const studyDetails =
document.getElementById("studyDetails");

studyPlan.forEach((item,index)=>{

const option =
document.createElement("option");

option.value=index;

option.textContent=
`${item.date} - ${item.topic}`;

studyDay.appendChild(option);

});

function loadStudyDay(){

const item=
studyPlan[studyDay.value];

studyDetails.innerHTML=`

<p><strong>${item.tier}</strong></p>

<p>${item.topic}</p>

<p>

<a href="${item.link}"
target="_blank">

Open Learning Material

</a>

</p>

`;

}

studyDay.addEventListener(
"change",
loadStudyDay
);

loadStudyDay();
