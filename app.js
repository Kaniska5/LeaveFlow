const USERS = {
  employee: { name: 'Arjun Kumar', initials: 'AK', dept: 'Engineering' },
  manager:  { name: 'Priya Nair', initials: 'PN', dept: 'Engineering' },
  hr:       { name: 'Sneha Rao', initials: 'SR', dept: 'Human Resources' }
};
 
const LEAVE_TYPES = ['Casual Leave', 'Sick Leave', 'Earned Leave', 'Emergency Leave'];
 
let currentRole = 'employee';
 
let leaves = [
  { id: 1, emp: 'Arjun Kumar', dept: 'Engineering', type: 'Casual Leave', from: '2025-04-10', to: '2025-04-11', days: 2, reason: 'Family function', status: 'approved', comment: 'Approved. Enjoy!', appliedOn: '2025-04-01' },
  { id: 2, emp: 'Arjun Kumar', dept: 'Engineering', type: 'Sick Leave', from: '2025-03-20', to: '2025-03-20', days: 1, reason: 'Fever and rest', status: 'approved', comment: '', appliedOn: '2025-03-19' },
  { id: 3, emp: 'Arjun Kumar', dept: 'Engineering', type: 'Casual Leave', from: '2025-05-01', to: '2025-05-02', days: 2, reason: 'Personal work', status: 'pending', comment: '', appliedOn: '2025-04-28' },
  { id: 4, emp: 'Rahul Menon', dept: 'Engineering', type: 'Earned Leave', from: '2025-05-05', to: '2025-05-09', days: 5, reason: 'Vacation trip', status: 'pending', comment: '', appliedOn: '2025-04-25' },
  { id: 5, emp: 'Divya S', dept: 'Engineering', type: 'Sick Leave', from: '2025-04-28', to: '2025-04-28', days: 1, reason: 'Not feeling well', status: 'pending', comment: '', appliedOn: '2025-04-27' },
  { id: 6, emp: 'Karthik R', dept: 'Design', type: 'Casual Leave', from: '2025-05-12', to: '2025-05-13', days: 2, reason: 'Wedding attendance', status: 'pending', comment: '', appliedOn: '2025-04-29' },
  { id: 7, emp: 'Meera V', dept: 'Marketing', type: 'Emergency Leave', from: '2025-04-30', to: '2025-04-30', days: 1, reason: 'Medical emergency at home', status: 'approved', comment: 'Take care', appliedOn: '2025-04-30' },
  { id: 8, emp: 'Suresh P', dept: 'Finance', type: 'Earned Leave', from: '2025-05-15', to: '2025-05-20', days: 6, reason: 'Annual vacation', status: 'rejected', comment: 'Critical project deadline', appliedOn: '2025-04-20' },
];
 
const balances = { 'Casual Leave': 6, 'Sick Leave': 8, 'Earned Leave': 12 };
 
function daysBetween(from, to) {
  const d1 = new Date(from), d2 = new Date(to);
  return Math.max(1, Math.round((d2 - d1) / 86400000) + 1);
}
 
function formatDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  return dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
 
function showToast(msg) {
  const t = document.getElementById('toast');
  t.querySelector('.toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
 
function switchRole(role) {
  currentRole = role;
  document.querySelectorAll('.role-btn').forEach((b, i) => {
    b.classList.toggle('active', ['employee','manager','hr'][i] === role);
  });
  const u = USERS[role];
  document.getElementById('avatar-initials').textContent = u.initials;
  document.getElementById('user-name').textContent = u.name;
  render();
}
 
function render() {
  const app = document.getElementById('app');
  if (currentRole === 'employee') app.innerHTML = renderEmployee();
  else if (currentRole === 'manager') app.innerHTML = renderManager();
  else app.innerHTML = renderHR();
  attachEvents();
}
 
function badgeHtml(status) {
  const labels = { pending: 'Pending', approved: 'Approved', rejected: 'Rejected' };
  return `<span class="badge badge-${status}">${labels[status] || status}</span>`;
}
 
/* ── EMPLOYEE ── */
function renderEmployee() {
  const myLeaves = leaves.filter(l => l.emp === 'Arjun Kumar');
  const usedCasual  = myLeaves.filter(l => l.type === 'Casual Leave'  && l.status === 'approved').reduce((s,l) => s+l.days, 0);
  const usedSick    = myLeaves.filter(l => l.type === 'Sick Leave'    && l.status === 'approved').reduce((s,l) => s+l.days, 0);
  const usedEarned  = myLeaves.filter(l => l.type === 'Earned Leave'  && l.status === 'approved').reduce((s,l) => s+l.days, 0);
 
  return `
    <div class="page-header">
      <div>
        <div class="page-title">My Leaves ✦</div>
        <div class="page-sub">Track your balance and submit new requests</div>
      </div>
    </div>
 
    <div class="balance-grid">
      <div class="balance-item">
        <div class="balance-label">Casual Leave</div>
        <div class="balance-val">${balances['Casual Leave'] - usedCasual}</div>
        <div class="balance-unit">of ${balances['Casual Leave']} days remaining</div>
      </div>
      <div class="balance-item">
        <div class="balance-label">Sick Leave</div>
        <div class="balance-val">${balances['Sick Leave'] - usedSick}</div>
        <div class="balance-unit">of ${balances['Sick Leave']} days remaining</div>
      </div>
      <div class="balance-item">
        <div class="balance-label">Earned Leave</div>
        <div class="balance-val">${balances['Earned Leave'] - usedEarned}</div>
        <div class="balance-unit">of ${balances['Earned Leave']} days remaining</div>
      </div>
    </div>
 
    <div class="section-grid">
      <div class="card">
        <div class="card-title">Request Leave</div>
        <div class="form-grid">
          <div class="form-group">
            <label>Leave Type</label>
            <select id="f-type">${LEAVE_TYPES.map(t => `<option>${t}</option>`).join('')}</select>
          </div>
          <div class="form-group"></div>
          <div class="form-group">
            <label>From</label>
            <input type="date" id="f-from" />
          </div>
          <div class="form-group">
            <label>To</label>
            <input type="date" id="f-to" />
          </div>
          <div class="form-group full">
            <label>Reason</label>
            <textarea id="f-reason" placeholder="Brief reason for leave..."></textarea>
          </div>
        </div>
        <div class="form-actions">
          <button class="btn btn-ghost" onclick="resetForm()">Clear</button>
          <button class="btn btn-primary" onclick="submitLeave()">Submit Request →</button>
        </div>
      </div>
 
      <div class="card">
        <div class="card-title">Leave History</div>
        ${myLeaves.length === 0
          ? `<div class="empty"><div class="empty-icon">📋</div>No leave requests yet</div>`
          : `<div class="table-wrap">
              <table>
                <thead>
                  <tr><th>Type</th><th>Dates</th><th>Days</th><th>Status</th></tr>
                </thead>
                <tbody>
                  ${myLeaves.map(l => `
                    <tr>
                      <td>${l.type}</td>
                      <td style="font-size:12px;color:var(--text2)">${formatDate(l.from)}${l.from !== l.to ? ' – ' + formatDate(l.to) : ''}</td>
                      <td style="font-family:'Space Mono',monospace;color:var(--violet-light)">${l.days}</td>
                      <td>${badgeHtml(l.status)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>`
        }
      </div>
    </div>
  `;
}
 
function resetForm() {
  ['f-type','f-from','f-to','f-reason'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = el.tagName === 'SELECT' ? el.options[0].value : '';
  });
}
 
function submitLeave() {
  const type   = document.getElementById('f-type').value;
  const from   = document.getElementById('f-from').value;
  const to     = document.getElementById('f-to').value;
  const reason = document.getElementById('f-reason').value.trim();
  if (!from || !to || !reason) { showToast('Please fill all fields'); return; }
  if (new Date(to) < new Date(from)) { showToast('End date must be after start date'); return; }
  const days = daysBetween(from, to);
  leaves.push({
    id: Date.now(), emp: 'Arjun Kumar', dept: 'Engineering',
    type, from, to, days, reason, status: 'pending', comment: '',
    appliedOn: new Date().toISOString().slice(0, 10)
  });
  showToast('Leave request submitted!');
  render();
}
 
/* ── MANAGER ── */
function renderManager() {
  const teamEmps  = ['Arjun Kumar', 'Rahul Menon', 'Divya S'];
  const teamLeaves = leaves.filter(l => teamEmps.includes(l.emp));
  const pending    = teamLeaves.filter(l => l.status === 'pending');
 
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Team Requests ✦</div>
        <div class="page-sub">Review and action pending requests from your team</div>
      </div>
    </div>
 
    <div class="card">
      <div class="card-title">Pending Approvals (${pending.length})</div>
      ${pending.length === 0
        ? `<div class="empty"><div class="empty-icon">✓</div>All caught up — no pending requests</div>`
        : pending.map(l => `
            <div class="request-card" id="rc-${l.id}">
              <div class="request-header">
                <div style="display:flex;align-items:center;gap:10px">
                  <div style="width:34px;height:34px;border-radius:50%;background:var(--grad-violet);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff">
                    ${l.emp.split(' ').map(w=>w[0]).join('')}
                  </div>
                  <div>
                    <div style="font-weight:700;font-size:14px">${l.emp}</div>
                    <div style="font-size:11px;color:var(--text3)">${l.dept}</div>
                  </div>
                </div>
                <span class="badge badge-pending">Pending</span>
              </div>
              <div class="request-meta">
                <span class="meta-chip">${l.type}</span>
                <span class="meta-chip">${formatDate(l.from)}${l.from !== l.to ? ' – ' + formatDate(l.to) : ''}</span>
                <span class="meta-chip highlight">${l.days} day${l.days > 1 ? 's' : ''}</span>
                <span class="meta-chip">Applied ${formatDate(l.appliedOn)}</span>
              </div>
              <div class="request-reason">"${l.reason}"</div>
              <div class="request-actions">
                <input class="comment-input" id="comment-${l.id}" type="text" placeholder="Add a comment (optional)..." />
                <button class="btn btn-approve" onclick="actionLeave(${l.id},'approved')">✓ Approve</button>
                <button class="btn btn-reject" onclick="actionLeave(${l.id},'rejected')">✕ Reject</button>
              </div>
            </div>
          `).join('')
      }
    </div>
 
    <div class="card">
      <div class="card-title">Team Leave History</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Employee</th><th>Type</th><th>Dates</th><th>Days</th><th>Status</th><th>Comment</th></tr>
          </thead>
          <tbody>
            ${teamLeaves.filter(l => l.status !== 'pending').map(l => `
              <tr>
                <td class="td-name">${l.emp}</td>
                <td>${l.type}</td>
                <td style="font-size:12px;color:var(--text2)">${formatDate(l.from)}${l.from !== l.to ? ' – ' + formatDate(l.to) : ''}</td>
                <td style="font-family:'Space Mono',monospace;color:var(--violet-light)">${l.days}</td>
                <td>${badgeHtml(l.status)}</td>
                <td style="font-size:12px;color:var(--text2);font-style:italic">${l.comment || '—'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
 
function actionLeave(id, status) {
  const comment = document.getElementById('comment-' + id)?.value || '';
  const leave = leaves.find(l => l.id === id);
  if (leave) { leave.status = status; leave.comment = comment; }
  showToast(`Request ${status === 'approved' ? '✓ Approved' : '✕ Rejected'}`);
  render();
}
 
/* ── HR ── */
function renderHR() {
  const total    = leaves.length;
  const pending  = leaves.filter(l => l.status === 'pending').length;
  const approved = leaves.filter(l => l.status === 'approved').length;
  const rejected = leaves.filter(l => l.status === 'rejected').length;
 
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Leave Overview ✦</div>
        <div class="page-sub">Company-wide leave status and records</div>
      </div>
    </div>
 
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-label">Total Requests</div>
        <div class="stat-val">${total}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Pending</div>
        <div class="stat-val">${pending}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Approved</div>
        <div class="stat-val">${approved}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Rejected</div>
        <div class="stat-val">${rejected}</div>
      </div>
    </div>
 
    <div class="card">
      <div class="card-title">All Leave Requests</div>
      <div class="filters">
        <select class="filter-select" id="hr-status">
          <option value="">All Status</option>
          <option>pending</option>
          <option>approved</option>
          <option>rejected</option>
        </select>
        <select class="filter-select" id="hr-dept">
          <option value="">All Departments</option>
          <option>Engineering</option>
          <option>Design</option>
          <option>Marketing</option>
          <option>Finance</option>
        </select>
        <select class="filter-select" id="hr-type">
          <option value="">All Types</option>
          ${LEAVE_TYPES.map(t => `<option>${t}</option>`).join('')}
        </select>
      </div>
      <div class="table-wrap" id="hr-table-wrap"></div>
    </div>
  `;
}
 
function renderHRTable() {
  const statusEl = document.getElementById('hr-status');
  const deptEl   = document.getElementById('hr-dept');
  const typeEl   = document.getElementById('hr-type');
  if (!statusEl) return;
 
  const statusF = statusEl.value;
  const deptF   = deptEl.value;
  const typeF   = typeEl.value;
 
  let filtered = leaves.filter(l =>
    (!statusF || l.status === statusF) &&
    (!deptF   || l.dept   === deptF) &&
    (!typeF   || l.type   === typeF)
  );
 
  const wrap = document.getElementById('hr-table-wrap');
  if (!wrap) return;
 
  if (filtered.length === 0) {
    wrap.innerHTML = `<div class="empty"><div class="empty-icon">🔍</div>No records match your filters</div>`;
    return;
  }
 
  wrap.innerHTML = `
    <table>
      <thead>
        <tr><th>Employee</th><th>Dept</th><th>Type</th><th>Dates</th><th>Days</th><th>Status</th><th>Applied</th></tr>
      </thead>
      <tbody>
        ${filtered.map(l => `
          <tr>
            <td class="td-name">${l.emp}</td>
            <td style="color:var(--text2)">${l.dept}</td>
            <td>${l.type}</td>
            <td style="font-size:12px;color:var(--text2)">${formatDate(l.from)}${l.from !== l.to ? ' – ' + formatDate(l.to) : ''}</td>
            <td style="font-family:'Space Mono',monospace;color:var(--violet-light)">${l.days}</td>
            <td>${badgeHtml(l.status)}</td>
            <td style="font-size:12px;color:var(--text3)">${formatDate(l.appliedOn)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}
 
function attachEvents() {
  if (currentRole === 'hr') {
    renderHRTable();
    ['hr-status', 'hr-dept', 'hr-type'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', renderHRTable);
    });
  }
}
 
// Initialize
render();
