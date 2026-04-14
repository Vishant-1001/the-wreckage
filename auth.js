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
