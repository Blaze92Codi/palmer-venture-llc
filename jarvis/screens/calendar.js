// Calendar Candidates — propose/conflict/duplicate; no automatic commit
import { getState } from '../core/store.js';
import { card, badge, statusBadge, kv, btn, fmtDateTime, sectionTitle, empty } from '../core/ui.js';

export function render() {
  const s = getState();
  const candidates = s.calendarCandidates;

  if (candidates.length === 0) return sectionTitle('Calendar Candidates', 'No proposed events.') + empty('None.');

  const cards = candidates.map(c => {
    const hasConflict = c.conflicts.length > 0;
    const hasDup = c.duplicates.length > 0;

    const conflictsHtml = hasConflict
      ? `<div class="conflict-box"><strong>Conflict:</strong> ${c.conflicts.map(cf => `${cf.event} (${fmtDateTime(cf.start)})`).join(', ')}</div>`
      : '';
    const dupsHtml = hasDup
      ? `<div class="conflict-box conflict-box--dup"><strong>Duplicate:</strong> ${c.duplicates.map(d => `${d.event} (${fmtDateTime(d.start)})`).join(', ')}</div>`
      : '';

    return card({
      title: c.title,
      subtitle: `${badge(c.type.toUpperCase(), 'blue')} · Proposed by ${c.proposedBy} · ${statusBadge(c.status)}`,
      accent: hasConflict ? 'red' : hasDup ? 'amber' : 'green',
      body: `
        ${kv('Start', fmtDateTime(c.start))}
        ${kv('End', fmtDateTime(c.end))}
        ${conflictsHtml}
        ${dupsHtml}
        <div class="calendar-note">Prototype: no automatic commit. Palmer must approve before any calendar event is created.</div>
      `,
      actions: c.status === 'pending'
        ? `${btn('Approve & Commit', 'approve-calendar', c.id, 'success')} ${btn('Reject', 'reject-calendar', c.id, 'danger')}`
        : statusBadge(c.status),
    });
  }).join('');

  return `
    ${sectionTitle('Calendar Candidates', 'Proposed events with conflict and duplicate detection. Nothing commits without Palmer approval.')}
    <div class="grid-2">${cards}</div>
  `;
}
