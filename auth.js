// ══════════════════════════════════════
// AUTH.JS — shared authentication
// ══════════════════════════════════════

function getUsers() {
  return JSON.parse(localStorage.getItem('wreckage_users') || '{}');
}

function saveUsers(users) {
  localStorage.setItem('wreckage_users', JSON.stringify(users));
}

function getSession() {
  const s = localStorage.getItem('wreckage_session');
  return s ? JSON.parse(s) : null;
}

function setSession(user) {
  localStorage.setItem('wreckage_session', JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem('wreckage_session');
}

function requireLogin() {
  if (!getSession()) {
    window.location.href = 'login.html';
  }
}

function logout() {
  clearSession();
  window.location.href = 'login.html';
}

function getLoggedInUsername() {
  const s = getSession();
  return s ? s.username : '';
}

function updateProfile(bio) {
  const s = getSession();
  if (!s) return;
  const users = getUsers();
  const userKey = s.username.toLowerCase();
  if (users[userKey]) {
    users[userKey].bio = bio;
    saveUsers(users);
    // Update session as well if needed, but bio is usually in the users object
  }
}

function getUserProfile(username) {
  const users = getUsers();
  return users[username.toLowerCase()] || null;
}
