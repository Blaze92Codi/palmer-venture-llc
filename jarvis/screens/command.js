// Executive Command — urgent items, decisions, people, opportunities, calendar, quarantine
import { getCommandSummary } from '../core/agent.js';
import { card, badge, stat, btn, statusBadge, fmtDateTime, sectionTitle, empty } from '../core/ui.js';

export function render() {
  const cmd = getCommandSummary();
  const t = cmd.triage;

  const statsHtml = `
    <div class="stats-row">
      ${stat('Business Inbox', t.businessInbox, 'Trusted contacts only')}
      ${stat('Promotions & Spam', t.promotionsAndSpam, 'Quarantined, not deleted')}
      ${stat('Drafts Pending', t.draftsPending, 'Awaiting Palmer approval')}
      ${stat('Awaiting Reply', t.awaitingReply, 'People waiting on you')}
      ${stat('Waiting on Others', t.waitingOnOther, 'External blockers')}
    </div>`;

  // Urgent items
  const urgentHtml = cmd.urgentItems.length === 0
    ? empty('No urgent items right now.')
    : cmd.urgentItems.map(item => `
      <div class="list-item">
        <div class="list-item-main">
          ${badge(item.type === 'task' ? 'TASK' : 'CONFLICT', item.type === 'task' ? 'amber' : 'red')}
          <span class="list-item-title">${item.label}</span>
        </div>
        <div class="list-item-meta">Due ${fmtDateTime(item.due)}</div>
      </div>`).join('');

  // Decisions needed
  const decisionsHtml = cmd.decisionsNeeded.length === 0
    ? empty('No decisions pending.')
    : cmd.decisionsNeeded.map(a => `
      <div class="list-item">
        <div class="list-item-main">
          ${badge(a.type.toUpperCase(), 'amber')}
          <span class="list-item-title">${a.summary}</span>
        </div>
        <div class="list-item-actions">
          ${btn('Approve', 'approve', a.id, 'success')}
          ${btn('Reject', 'reject', a.id, 'danger')}
        </div>
      </div>`).join('');

  // People awaiting reply
  const peopleHtml = cmd.peopleAwaitingReply.length === 0
    ? empty('No one awaiting reply.')
    : cmd.peopleAwaitingReply.map(({ thread, contact }) => `
      <div class="list-item">
        <div class="list-item-main">
          <span class="list-item-title">${contact.name}</span>
          <span class="list-item-sub">${thread.subject}</span>
        </div>
        <div class="list-item-meta">${fmtDateTime(thread.lastMessageAt)}</div>
      </div>`).join('');

  // Opportunities
  const oppsHtml = cmd.opportunities.map(o => `
    <div class="list-item">
      <div class="list-item-main">
        <span class="list-item-title">${o.title}</span>
        <span class="list-item-sub">Recommendation: ${o.recommendation.toUpperCase()} · ${o.confidence}% confidence</span>
      </div>
      <div class="list-item-meta">${badge(o.stage, 'blue')}</div>
    </div>`).join('');

  // Calendar conflicts
  const calHtml = cmd.calendarConflicts.length === 0
    ? empty('No calendar conflicts or duplicates.')
    : cmd.calendarConflicts.map(c => `
      <div class="list-item">
        <div class="list-item-main">
          ${badge(c.conflicts.length > 0 ? 'CONFLICT' : 'DUPLICATE', 'red')}
          <span class="list-item-title">${c.title}</span>
          <span class="list-item-sub">${c.conflicts.length > 0 ? `Conflicts with: ${c.conflicts[0].event}` : `Duplicate of: ${c.duplicates[0].event}`}</span>
        </div>
        <div class="list-item-meta">${fmtDateTime(c.start)}</div>
      </div>`).join('');

  // Waiting on others
  const waitingHtml = cmd.waitingOnOthers.length === 0
    ? empty('Nothing waiting on others.')
    : cmd.waitingOnOthers.map(t => `
      <div class="list-item">
        <div class="list-item-main">
          <span class="list-item-title">${t.title}</span>
          <span class="list-item-sub">Waiting on: ${t.waitingOn}</span>
        </div>
        <div class="list-item-meta">Due ${fmtDateTime(t.dueDate)}</div>
      </div>`).join('');

  // Quarantined
  const quarHtml = cmd.quarantined.length === 0
    ? empty('No quarantined items.')
    : cmd.quarantined.map(q => `
      <div class="list-item">
        <div class="list-item-main">
          ${badge('QUARANTINED', 'red')}
          <span class="list-item-title">${q.reason}</span>
          <span class="list-item-sub">${q.confidence}% confidence · ${q.category}</span>
        </div>
        <div class="list-item-actions">
          ${btn('Release', 'release-quarantine', q.id, 'secondary')}
          ${btn('Keep', 'keep-quarantine', q.id, 'danger')}
        </div>
      </div>`).join('');

  // Handled drafts
  const handledHtml = cmd.handledDrafts.length === 0
    ? empty('No handled drafts yet.')
    : cmd.handledDrafts.map(m => `
      <div class="list-item">
        <div class="list-item-main">
          ${statusBadge(m.status)}
          <span class="list-item-title">${m.subject}</span>
        </div>
      </div>`).join('');

  return `
    ${sectionTitle('Executive Command', 'Your daily command center. JARVIS triages everything — you make the calls.')}
    ${statsHtml}
    <div class="grid-2">
      ${card({ title: 'Urgent Items', accent: 'red', body: urgentHtml })}
      ${card({ title: 'Decisions Needed', accent: 'amber', body: decisionsHtml })}
      ${card({ title: 'People Awaiting Reply', accent: 'blue', body: peopleHtml })}
      ${card({ title: 'Opportunities', accent: 'gold', body: oppsHtml })}
      ${card({ title: 'Calendar Conflicts & Duplicates', accent: 'red', body: calHtml })}
      ${card({ title: 'Waiting on Others', body: waitingHtml })}
      ${card({ title: 'Quarantined', accent: 'red', body: quarHtml })}
      ${card({ title: 'Handled Drafts', accent: 'green', body: handledHtml })}
    </div>
  `;
}
