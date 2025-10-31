"use strict";


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointment-form');
  const feedback = document.getElementById('appointment-feedback');

  if (!form) return;

  // Vendos minimum date në sot
  const dateInput = form.querySelector('.appointment_date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    feedback.textContent = '';
    feedback.className = "mt-2";

    // Validim bazik
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const date = form.date.value;
    const time = form.time.value;
    const department = form.department.value;

    if (!name || !email || !phone || !date || !time || !department) {
      feedback.textContent = "❌ Please fill all required fields.";
      feedback.classList.add("text-danger");
      return;
    }

    // Kontrollo orën
    if (time < "09:00" || time > "18:00") {
      feedback.textContent = "❌ Appointment time must be between 09:00 and 18:00.";
      feedback.classList.add("text-danger");
      return;
    }

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        feedback.textContent = "✅ Your appointment has been booked!";
        feedback.classList.add("text-success");
        form.reset();
      } else {
        feedback.textContent = "❌ There was an error. Please try again later.";
        feedback.classList.add("text-danger");
      }
    } catch (err) {
      feedback.textContent = "❌ Network error. Please try again later.";
      feedback.classList.add("text-danger");
      console.error(err);
    }
  });
});
// Inicializo datepicker
$('.appointment_date').datepicker({
    format: 'yyyy-mm-dd',
    startDate: 'today'
});

// Inicializo timepicker
$('.appointment_time').timepicker({
    minTime: '09:00',
    maxTime: '18:00',
    step: 15
});
$('.appointment_time').timepicker({
  timeFormat: 'H:i',
  minTime: '09:00',
  maxTime: '18:00',
  step: 15,
  scrollDefault: 'now'
});

// FIX për Bootstrap Modal që fshin orën
$('#modalRequest').on('shown.bs.modal', function () {
  $('.appointment_time').timepicker('setTime', null);
});

$('.appointment_time').on('changeTime', function() {
  $(this).attr('value', $(this).val());
});

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('appointment-form');
  const feedback = document.getElementById('appointment-feedback');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    feedback.textContent = '';
    feedback.className = "mt-2";

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const date = form.date.value;
    const time = form.time.value;
    const department = form.department.value;

    if (!name || !email || !phone || !date || !time || !department) {
      feedback.textContent = "❌ Please fill all required fields.";
      feedback.classList.add("text-danger");
      return;
    }

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        feedback.textContent = "✅ Your appointment has been booked!";
        feedback.classList.add("text-success");
        form.reset();
      } else {
        feedback.textContent = "❌ There was an error. Please try again later.";
        feedback.classList.add("text-danger");
      }
    } catch (err) {
      feedback.textContent = "❌ Network error. Please try again later.";
      feedback.classList.add("text-danger");
      console.error(err);
    }
  });
});
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#appointment-form");
    const dateInput = form.querySelector('input[name="date"]');
    const timeInput = form.querySelector('input[name="time"]');
    
    // Vendos sot si datë minimale
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);

    // Ruaj vlerat kur përdoruesi i ndryshon
    dateInput.addEventListener("change", () => {
      localStorage.setItem("apptDate", dateInput.value);
    });
    timeInput.addEventListener("change", () => {
      localStorage.setItem("apptTime", timeInput.value);
    });

    // Riktheji nëse modal hapet sërish
    if (localStorage.getItem("apptDate")) {
      dateInput.value = localStorage.getItem("apptDate");
    }
    if (localStorage.getItem("apptTime")) {
      timeInput.value = localStorage.getItem("apptTime");
    }
  });

  
document.getElementById("appointment-form").addEventListener("submit", async function(event) {
  event.preventDefault(); // ndalon refresh-in automatik
  const form = event.target;
  const feedback = document.getElementById("appointment-feedback");

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      feedback.textContent = "✅ Appointment request sent successfully! We'll contact you soon.";
      feedback.style.color = "green";
      form.reset();
    } else {
      feedback.textContent = "⚠️ There was an issue sending your request. Please try again.";
      feedback.style.color = "red";
    }
  } catch (error) {
    feedback.textContent = "🚫 Network error. Please check your connection and try again.";
    feedback.style.color = "red";
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.querySelector(".appointment_date");
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
});
