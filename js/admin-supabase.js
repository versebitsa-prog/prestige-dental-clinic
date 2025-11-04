// admin-supabase.js

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://knilpjuwcxxihlzsyozg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuaWxwanV3Y3h4aWhsenN5b3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzOTk4NDksImV4cCI6MjA3Njk3NTg0OX0.ScVyJ-2ebzi7p1J2-JD2WR85jByq3Da1JdkksLJJhb8";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkLogin() {
  const token = localStorage.getItem("sb_token");
  if (!token) {
    window.location.href = "login.html";
    return false;
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

async function loadMessages() {
  if (!(await checkLogin())) return;

  const { data, error } = await supabase
    .from("ContactUs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const table = document.getElementById("messages-table");
  table.innerHTML = data
    .map(
      (msg) => `
      <tr>
        <td>${msg.name}</td>
        <td>${msg.email}</td>
        <td>${msg.subject}</td>
        <td>${msg.message}</td>
        <td>${new Date(msg.created_at).toLocaleString()}</td>
        <td><button class="btn btn-sm btn-danger" onclick="deleteMessage(${msg.id})">Delete</button></td>
      </tr>`
    )
    .join("");
}

window.deleteMessage = async function (id) {
  const confirmDelete = confirm("Are you sure?");
  if (!confirmDelete) return;
  await supabase.from("ContactUs").delete().eq("id", id);
  loadMessages();
};

loadMessages();
