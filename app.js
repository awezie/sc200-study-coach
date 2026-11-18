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
},

{
date:"2026-11-23",
tier:"🔴 Tier 1 (Critical)",
topic:"Defender XDR Incidents",
link:"https://learn.microsoft.com/defender-xdr/incidents-overview"
},

{
date:"2026-11-24",
tier:"🔴 Tier 1 (Critical)",
topic:"Advanced Hunting",
link:"https://learn.microsoft.com/defender-xdr/advanced-hunting-overview"
},

{
date:"2026-11-25",
tier:"🔴 Tier 1 (Critical)",
topic:"Device Investigation",
link:"https://learn.microsoft.com/defender-endpoint/investigate-machines"
},

{
date:"2026-11-26",
tier:"🔴 Tier 1 (Critical)",
topic:"Automatic Attack Disruption",
link:"https://learn.microsoft.com/defender-xdr/automatic-attack-disruption"
},

{
date:"2026-11-27",
tier:"🔴 Tier 1 (Critical)",
topic:"KQL Fundamentals",
link:"https://learn.microsoft.com/azure/data-explorer/kusto/query/tutorials/learn-common-operators"
},

{
date:"2026-11-28",
tier:"🟠 Tier 2 (Important)",
topic:"Microsoft Security Copilot Fundamentals",
link:"https://learn.microsoft.com/security-copilot/get-started-security-copilot"
},

{
date:"2026-11-29",
tier:"🟠 Tier 2 (Important)",
topic:"Microsoft Security Copilot Workflows",
link:"https://learn.microsoft.com/security-copilot/"
},

{
date:"2026-11-30",
tier:"🔴 Tier 1 (Critical)",
topic:"KQL Where Operator",
link:"https://learn.microsoft.com/azure/data-explorer/kusto/query/"
},

{
date:"2026-12-01",
tier:"🔴 Tier 1 (Critical)",
topic:"KQL Summarize Operator",
link:"https://learn.microsoft.com/azure/data-explorer/kusto/query/"
},

{
date:"2026-12-02",
tier:"🔴 Tier 1 (Critical)",
topic:"KQL Project Operator",
link:"https://learn.microsoft.com/azure/data-explorer/kusto/query/"
},

{
date:"2026-12-03",
tier:"🔴 Tier 1 (Critical)",
topic:"KQL Extend Operator",
link:"https://learn.microsoft.com/azure/data-explorer/kusto/query/"
},

{
date:"2026-12-04",
tier:"🔴 Tier 1 (Critical)",
topic:"KQL Join Operator",
link:"https://learn.microsoft.com/azure/data-explorer/kusto/query/"
},

{
date:"2026-12-05",
tier:"🔴 Tier 1 (Critical)",
topic:"KQL Parse Operator",
link:"https://learn.microsoft.com/azure/data-explorer/kusto/query/"
},

{
date:"2026-12-06",
tier:"🔴 Tier 1 (Critical)",
topic:"KQL Review Lab",
link:"https://learn.microsoft.com/azure/data-explorer/kusto/query/"
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
async () => {

    loadStudyDay();

    await checkCompletion();

}
);

loadStudyDay();
// ======================================
// DASHBOARD DATA
// ======================================

const completedDaysElement =
document.getElementById("completedDays");

const overallProgress =
document.getElementById("overallProgress");

const progressPercent =
document.getElementById("progressPercent");

const readinessElement =
document.getElementById("readiness");

const streakElement =
document.getElementById("streak");

const todaysMissionElement =
document.getElementById("todaysMission");

const coachElement =
document.getElementById("coachMessage");

const completeMissionButton =
document.getElementById("completeMission");

const TOTAL_DAYS = 58;

// ======================================
// LOAD DASHBOARD
// ======================================

async function loadDashboard(){

    try{

        const snap = await getDoc(
            doc(db,"users","awele")
        );

        if(!snap.exists()){
            return;
        }

        const data = snap.data();

        const completed =
        data.completedDays || 0;

        const streak =
        data.streak || 0;

        const readiness =
        Math.round(
            (completed / TOTAL_DAYS)
            * 100
        );

        completedDaysElement.textContent =
        completed;

        overallProgress.value =
        completed;

        progressPercent.textContent =
        readiness + "%";

        readinessElement.textContent =
        readiness + "%";

        streakElement.textContent =
        streak + " Days";

        updateCoach(
            readiness
        );

    }

    catch(error){

        console.error(error);

    }

}

// ======================================
// TODAY'S MISSION
// ======================================

function loadTodaysMission(){

    const todayIndex = Math.min(
        studyPlan.length - 1,
        new Date().getDate() %
        studyPlan.length
    );

    const mission =
    studyPlan[todayIndex];

    todaysMissionElement.innerHTML = `

    <strong>

    ${mission.tier}

    </strong>

    <br><br>

    ${mission.topic}

    <br><br>

    <a href="${mission.link}"
    target="_blank">

    Open Learning Material

    </a>

    `;

}

loadTodaysMission();

// ======================================
// COMPLETE MISSION
// ======================================

async function completeMission(){

    try{

        const snap =
        await getDoc(
        doc(db,"users","awele")
        );

        let completed = 0;
        let streak = 0;

        if(snap.exists()){

            completed =
            snap.data()
            .completedDays || 0;

            streak =
            snap.data()
            .streak || 0;

        }

        await setDoc(

            doc(db,"users","awele"),

            {

                completedDays:
                completed + 1,

                streak:
                streak + 1,

                lastStudy:
                new Date()
                .toISOString()

            },

            {merge:true}

        );

        loadDashboard();

    }

    catch(error){

        console.error(error);

    }

}

completeMissionButton
.addEventListener(
"click",
completeMission
);

// ======================================
// BABY ME COACH
// ======================================

function updateCoach(
    readiness
){

    if(readiness < 20){

        coachElement.innerHTML =

        `Awele,

        Focus on 🔴 Tier 1 (Critical)
        topics.

        Complete your study mission
        today.

        Do at least
        10 MeasureUp questions.`;

    }

    else if(
        readiness < 50
    ){

        coachElement.innerHTML =

        `Awele,

        Good work.

        Continue focusing on
        Sentinel,
        Defender XDR,
        and KQL.

        Do not skip labs.`;

    }

    else if(
        readiness < 80
    ){

        coachElement.innerHTML =

        `Awele,

        You're progressing well.

        Increase MeasureUp
        practice and review
        weak areas in Sentinel.`;

    }

    else{

        coachElement.innerHTML =

        `Awele,

        Excellent progress.

        Focus on Practice Exams,
        KQL,
        Analytics Rules,
        and Incident Investigation.`;

    }

}

// ======================================
// FLASHCARDS
// ======================================

const flashcards = [

{
question:
"What is Microsoft Sentinel?",

answer:
"Microsoft Sentinel is Microsoft's cloud-native SIEM and SOAR platform."
},

{
question:
"What is Defender XDR?",

answer:
"A unified security operations platform that correlates alerts and incidents."
},

{
question:
"What does Security Copilot do?",

answer:
"It assists analysts with investigations, summaries, hunting, and KQL generation."
},

{
question:
"What is KQL?",

answer:
"Kusto Query Language used to query security and operational data."
},

{
question:
"Alert vs Incident?",

answer:
"An Incident groups related alerts together."
}

];

let currentCard = 0;

const flashcardElement =
document.getElementById(
"flashcard"
);

const nextCardButton =
document.getElementById(
"nextCard"
);

function renderCard(){

    flashcardElement.innerHTML = `

    <strong>

    ${flashcards[currentCard]
    .question}

    </strong>

    <br><br>

    ${flashcards[currentCard]
    .answer}

    `;

}

nextCardButton
.addEventListener(
"click",
()=>{

    currentCard++;

    if(
        currentCard >=
        flashcards.length
    ){

        currentCard = 0;

    }

    renderCard();

}
);

renderCard();

// ======================================
// SAVE MEASUREUP SCORE
// ======================================

const saveScoreButton =
document.getElementById(
"saveScore"
);

const scoreInput =
document.getElementById(
"score"
);

saveScoreButton
.addEventListener(
"click",
async()=>{

    const score =
    parseInt(
        scoreInput.value || 0
    );

    await setDoc(

        doc(
            db,
            "users",
            "awele"
        ),

        {

            measureUpScore:
            score

        },

        {

            merge:true

        }

    );

    alert(
        "MeasureUp score saved ✅"
    );

}
);
// ======================================
// CALENDAR COMPLETION
// ======================================

const markStudyDayButton =
document.getElementById("markComplete");

const calendarStatus =
document.getElementById("calendarStatus");

async function markStudyDayComplete(){

    const selectedItem =
    studyPlan[
        studyDay.value
    ];

    try{

        const snap =
        await getDoc(
            doc(
                db,
                "users",
                "awele"
            )
        );

        let completedTopics =
        {};

        if(
            snap.exists()
        ){

            completedTopics =
            snap.data()
            .completedTopics ||
            {};

        }

        completedTopics[
            selectedItem.date
        ] = true;

        await setDoc(

            doc(
                db,
                "users",
                "awele"
            ),

            {

                completedTopics:
                completedTopics

            },

            {

                merge:true

            }

        );

        calendarStatus.textContent =
        "✅ Completed";

    }

    catch(error){

        console.error(error);

    }

}

async function checkCompletion(){

    try{

        const selectedItem =
        studyPlan[
            studyDay.value
        ];

        const snap =
        await getDoc(
            doc(
                db,
                "users",
                "awele"
            )
        );

        if(
            snap.exists()
            &&
            snap.data()
            .completedTopics
            &&
            snap.data()
            .completedTopics[
                selectedItem.date
            ]
        ){

            calendarStatus.textContent =
            "✅ Completed";

        }

        else{

            calendarStatus.textContent =
            "Not completed";

        }

    }

    catch(error){

        console.error(error);

    }

}

markStudyDayButton
.addEventListener(
"click",
markStudyDayComplete
);

// ======================================
// STARTUP
// ======================================

loadDashboard();
