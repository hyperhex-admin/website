import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCrw4MlYQyd2QXoDlPCgj2nt3EtuqhVrB4",
  authDomain: "herhexsolutions.firebaseapp.com",
  projectId: "herhexsolutions",
  storageBucket: "herhexsolutions.firebasestorage.app",
  messagingSenderId: "143805930092",
  appId: "1:143805930092:web:9374b14ad71afd0e795649",
  measurementId: "G-DM3Y14DXP3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

logEvent(analytics, 'page_view', { page_title: document.title, page_location: window.location.href });

// CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});
function animateRing() {
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: .12 });
reveals.forEach(el => observer.observe(el));

// FORM SUBMISSION - Firebase Firestore
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnLoading = document.getElementById('btnLoading');
const formOverlay = document.getElementById('formOverlay');
const formSuccess = document.getElementById('formSuccess');
const closeSuccess = document.getElementById('closeSuccess');

function showSuccess() {
  formOverlay.style.display = 'block';
  formSuccess.style.display = 'block';
  contactForm.reset();
}

function hideSuccess() {
  formOverlay.style.display = 'none';
  formSuccess.style.display = 'none';
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  btnText.style.display = 'none';
  btnLoading.style.display = 'inline';
  submitBtn.disabled = true;

  const formData = {
    name: document.getElementById('name').value,
    organization: document.getElementById('org').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    message: document.getElementById('message').value,
    createdAt: serverTimestamp()
  };

  try {
    await addDoc(collection(db, 'messages'), formData);
    showSuccess();
  } catch (error) {
    console.error('Firebase error:', error);
    alert('Something went wrong. Please try again or email us directly.');
  }

  btnText.style.display = 'inline';
  btnLoading.style.display = 'none';
  submitBtn.disabled = false;
});

closeSuccess.addEventListener('click', hideSuccess);
formOverlay.addEventListener('click', hideSuccess);