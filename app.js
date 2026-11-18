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
