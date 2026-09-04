// ============================================================
// UI Helpers — reusable HTML-string builders for JARVIS screens
// ============================================================

export function card({ title, subtitle, body, actions, accent, id }) {
  const accentClass = accent ? `card--${accent}` : '';
  const idAttr = id ? `data-card-id="${id}"` : '';
  const subtitleHtml = subtitle ? `<div class="card-subtitle">${subtitle}</div>` : '';
  const actionsHtml = actions ? `<div class="card-actions">${actions}</div>` : '';
  return `<div class="card ${accentClass}" ${idAttr}>
    ${title ? `<div class="card-header"><h3 class="card-title">${title}</h3>${subtitleHtml}</div>` : ''}
    <div class="card-body">${body}</div>
    ${actionsHtml}
  </div>`;
}

export function badge(text, variant = 'gray') {
  return `<span class="badge badge--${variant}">${text}</span>`;
}

export function stat(label, value, sub) {
  return `<div class="stat-box"><div class="stat-value">${value}</div><div class="stat-label">${label}</div>${sub ? `<div class="stat-sub">${sub}</div>` : ''}</div>`;
}

export function confidenceBar(value) {
  const cls = value >= 80 ? 'conf-high' : value >= 60 ? 'conf-medium' : 'conf-low';
  return `<div class="confidence ${cls}"><div class="confidence-fill" style="width:${value}%"></div><span class="confidence-label">${value}%</span></div>`;
}

export function tag(text) {
  return `<span class="tag">${text}</span>`;
}

export function kv(label, value) {
  return `<div class="kv"><span class="kv-label">${label}</span><span class="kv-value">${value}</span></div>`;
}

export function btn(text, action, id, variant = 'primary') {
  const idAttr = id ? `data-id="${id}"` : '';
  return `<button class="jv-btn jv-btn--${variant}" data-action="${action}" ${idAttr}>${text}</button>`;
}

export function table(headers, rows) {
  const head = headers.map(h => `<th>${h}</th>`).join('');
  const body = rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
  return `<table class="jv-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

export function sectionTitle(title, subtitle) {
  return `<div class="section-title"><h2>${title}</h2>${subtitle ? `<p>${subtitle}</p>` : ''}</div>`;
}

export function empty(msg) {
  return `<div class="empty-state">${msg}</div>`;
}

export function riskBadge(level) {
  const map = { low: 'green', medium: 'amber', high: 'red' };
  return badge(level.toUpperCase(), map[level] || 'gray');
}

export function statusBadge(status) {
  const map = {
    pending: 'amber', approved: 'green', rejected: 'red',
    'in-progress': 'blue', waiting: 'gray', quarantined: 'red',
    draft: 'gray', 'draft-ready': 'amber', 'awaiting-reply': 'blue',
    'waiting-on-other': 'gray', handled: 'green', triaged: 'blue',
    disconnected: 'gray', released: 'green', 'approved-not-sent': 'green',
    'approved-not-committed': 'green',
  };
  return badge(status.replace(/-/g, ' '), map[status] || 'gray');
}

export function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function fmtDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export function fmtMoney(v) {
  if (v === 0 || v === null) return '—';
  return '$' + v.toLocaleString('en-US');
}
