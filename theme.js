// ══════════════════════════════════════
// THEME.JS — Dark/Light Mode Toggle
// ══════════════════════════════════════

(function() {
  const savedTheme = localStorage.getItem('wreckage_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  window.toggleTheme = function() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('wreckage_theme', next);
    updateThemeButton();
  };

  function updateThemeButton() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    const current = document.documentElement.getAttribute('data-theme');
    btn.textContent = current === 'dark' ? '☀️ Light' : '🌙 Dark';
  }

  // Initialize button text on load
  window.addEventListener('DOMContentLoaded', updateThemeButton);
})();
