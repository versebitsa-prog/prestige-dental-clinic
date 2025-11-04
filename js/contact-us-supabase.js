import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://knilpjuwcxxihlzsyozg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuaWxwanV3Y3h4aWhsenN5b3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTk4NDksImV4cCI6MjA3Njk3NTg0OX0.ScVyJ-2ebzi7p1J2-JD2WR85jByq3Da1JdkksLJJhb8";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("contact-form");
const successDiv = document.getElementById("form-success");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !subject || !message) {
    successDiv.textContent = "Please fill all fields.";
    successDiv.classList.add("text-danger");
    return;
  }

  const { error } = await supabase
    .from("ContactUs") // emri i tabelës në Supabase
    .insert([{ name, email, subject, message }]);

  if (error) {
    console.error(error);
    successDiv.textContent = "❌ Something went wrong. Try again.";
    successDiv.classList.add("text-danger");
  } else {
    successDiv.textContent = "✅ Message sent successfully!";
    successDiv.classList.remove("text-danger");
    successDiv.classList.add("text-success");
    form.reset();
  }
});
