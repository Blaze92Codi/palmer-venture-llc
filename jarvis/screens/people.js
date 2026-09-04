// People & Messages — drafts and status; never live-send in prototype
import { getState } from '../core/store.js';
import { card, badge, statusBadge, kv, btn, fmtDateTime, sectionTitle, empty } from '../core/ui.js';

export function render() {
  const s = getState();
  const threads = s.threads;

  const inboxCount = s.messages.filter(m => m.category === 'business').length;
  const spamCount = s.quarantine.filter(q => q.status === 'quarantined').length;
  const draftCount = s.messages.filter(m => m.status === 'draft').length;

  const countsHtml = `
    <div class="stats-row">
      <div class="stat-box"><div class="stat-value">${inboxCount}</div><div class="stat-label">Business Inbox</div><div class="stat-sub">Trusted contacts</div></div>
      <div class="stat-box"><div class="stat-value">${spamCount}</div><div class="stat-label">Quarantined</div><div class="stat-sub">Not deleted</div></div>
      <div class="stat-box"><div class="stat-value">${draftCount}</div><div class="stat-label">Draft Replies</div><div class="stat-sub">Awaiting approval</div></div>
    </div>`;

  const threadsHtml = threads.map(t => {
    const contact = s.contacts.find(c => c.id === t.contactId);
    const messages = s.messages.filter(m => m.threadId === t.id);
    const msgsHtml = messages.map(m => `
      <div class="message-item ${m.direction}">
        <div class="message-meta">
          ${badge(m.direction === 'inbound' ? 'IN' : m.direction === 'outbound-draft' ? 'DRAFT' : 'OUT', m.direction === 'inbound' ? 'blue' : m.direction === 'outbound-draft' ? 'amber' : 'green')}
          <span class="message-from">${m.from}</span>
          <span class="message-time">${fmtDateTime(m.receivedAt)}</span>
        </div>
        <div class="message-subject">${m.subject}</div>
        <div class="message-preview">${m.preview}</div>
        <div class="message-status">${statusBadge(m.status)}</div>
        ${m.status === 'draft' ? `<div class="message-actions">${btn('Approve Draft', 'approve-draft', m.id, 'success')} ${btn('Edit Draft', 'edit-draft', m.id, 'secondary')}</div>` : ''}
        <div class="message-note">${m.direction === 'outbound-draft' ? 'Prototype: draft only — not sent. Palmer must approve before any send.' : ''}</div>
      </div>`).join('');

    return card({
      title: contact ? contact.name : 'Unknown',
      subtitle: `${t.subject} · ${statusBadge(t.status)} · ${t.messageCount} message${t.messageCount !== 1 ? 's' : ''}`,
      accent: t.status === 'quarantined' ? 'red' : t.status === 'draft-ready' ? 'amber' : 'blue',
      body: msgsHtml,
    });
  }).join('');

  return `
    ${sectionTitle('People & Messages', 'Business inbox with draft acknowledgements. JARVIS drafts — Palmer approves before anything sends.')}
    ${countsHtml}
    <div class="grid-2">${threadsHtml}</div>
  `;
}
