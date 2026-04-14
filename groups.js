// ══════════════════════════════════════
// GROUPS.JS — shared across all pages
// ══════════════════════════════════════

function getGroups() {
  return JSON.parse(localStorage.getItem('wreckage_groups') || '[]');
}

function saveGroups(groups) {
  localStorage.setItem('wreckage_groups', JSON.stringify(groups));
}

function getCurrentGroupId() {
  return localStorage.getItem('wreckage_current_group') || null;
}

function setCurrentGroupId(id) {
  localStorage.setItem('wreckage_current_group', id);
}

function initGroups() {
  let groups = getGroups();

  // Seed default group if none exist
  if (groups.length === 0) {
    const defaultGroup = { id: 'group_' + Date.now(), name: 'The Crew' };
    groups = [defaultGroup];
    saveGroups(groups);
    setCurrentGroupId(defaultGroup.id);
  }

  // Ensure current group is valid
  const currentId = getCurrentGroupId();
  if (!currentId || !groups.find(g => g.id === currentId)) {
    setCurrentGroupId(groups[0].id);
  }

  renderGroupSelect();
  renderGroupList();
  window.dispatchEvent(new Event('groupChanged'));
}

function renderGroupSelect() {
  const sel = document.getElementById('group-select');
  if (!sel) return;
  const groups    = getGroups();
  const currentId = getCurrentGroupId();
  sel.innerHTML   = '';
  groups.forEach(g => {
    const opt       = document.createElement('option');
    opt.value       = g.id;
    opt.textContent = g.name;
    if (g.id === currentId) opt.selected = true;
    sel.appendChild(opt);
  });
}

function renderGroupList() {
  const list = document.getElementById('group-list');
  if (!list) return;
  const groups    = getGroups();
  const currentId = getCurrentGroupId();
  list.innerHTML  = '';

  if (groups.length === 0) {
    list.innerHTML = '<div style="color:#64748b;font-size:0.82rem;text-align:center;padding:12px;">No groups yet.</div>';
    return;
  }

  groups.forEach(g => {
    const item = document.createElement('div');
    item.className = 'group-item';
    item.innerHTML = `
      <span class="group-item-name">${g.name} ${g.id === currentId ? '<span style="color:#64748b;font-size:0.65rem;">(active)</span>' : ''}</span>
      <button class="group-item-delete" onclick="deleteGroup('${g.id}')" title="Delete group">✕</button>`;
    list.appendChild(item);
  });
}

function switchGroup(id) {
  setCurrentGroupId(id);
  renderGroupSelect();
  renderGroupList();
  window.dispatchEvent(new Event('groupChanged'));
}

function addGroup() {
  const input = document.getElementById('new-group-input');
  const name  = input.value.trim();
  if (!name) return;

  const groups = getGroups();
  if (groups.find(g => g.name.toLowerCase() === name.toLowerCase())) {
    alert('A group with this name already exists.');
    return;
  }

  const newGroup = { id: 'group_' + Date.now(), name };
  groups.push(newGroup);
  saveGroups(groups);
  input.value = '';

  // Switch to new group
  setCurrentGroupId(newGroup.id);
  renderGroupSelect();
  renderGroupList();
  window.dispatchEvent(new Event('groupChanged'));
}

function deleteGroup(id) {
  const groups = getGroups();
  if (groups.length === 1) {
    alert("Can't delete the last group.");
    return;
  }
  if (!confirm('Delete this group and all its data? This cannot be undone.')) return;

  // Remove all data for this group
  localStorage.removeItem('wreckage_archive_'    + id);
  localStorage.removeItem('wreckage_evidence_'   + id);
  localStorage.removeItem('wreckage_unfinished_' + id);

  const newGroups = groups.filter(g => g.id !== id);
  saveGroups(newGroups);

  if (getCurrentGroupId() === id) setCurrentGroupId(newGroups[0].id);
  renderGroupSelect();
  renderGroupList();
  window.dispatchEvent(new Event('groupChanged'));
}

function openGroupsModal() {
  renderGroupList();
  document.getElementById('groups-modal-overlay').classList.add('open');
}

function closeGroupsModal(e) {
  if (e.target === document.getElementById('groups-modal-overlay')) closeGroupsModalDirect();
}

function closeGroupsModalDirect() {
  document.getElementById('groups-modal-overlay').classList.remove('open');
}
