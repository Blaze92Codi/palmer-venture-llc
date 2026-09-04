// Audit & Undo — full audit log of all state transitions
import { getState } from '../core/store.js';
import { card, badge, table, fmtDateTime, sectionTitle, empty } from '../core/ui.js';

export function render() {
  const s = getState();
  const events = s.auditEvents;

  if (events.length === 0) return sectionTitle('Audit & Undo', 'No audit events.') + empty('None.');

  const actionVariant = (action) => {
    if (action.includes('approve')) return 'green';
    if (action.includes('reject')) return 'red';
    if (action.includes('quarantine')) return 'red';
    if (action.includes('kill-switch')) return 'red';
    if (action.includes('create')) return 'amber';
    if (action.includes('release')) return 'blue';
    return 'gray';
  };

  const rows = events.map(e => [
    fmtDateTime(e.timestamp),
    badge(e.actor, e.actor === 'JARVIS' ? 'gold' : 'blue'),
    badge(e.action, actionVariant(e.action)),
    e.entityType,
    e.entityId,
    e.from ? `<span class="audit-from">${e.from}</span> → ` : '',
    `<span class="audit-to">${e.to}</span>`,
  ]);

  const tableHtml = table(['Timestamp', 'Actor', 'Action', 'Entity', 'ID', 'From', 'To'], rows);

  return `
    ${sectionTitle('Audit & Undo', 'Every state transition is logged. Palmer can review all agent actions and decisions.')}
    ${card({ title: 'Audit Log', subtitle: `${events.length} events`, body: tableHtml })}
    <div class="audit-note">All actions by JARVIS are logged with timestamp, actor, action, and state transition. In a production system, each transition would be reversible via undo. In this prototype, the audit trail is immutable evidence of what happened.</div>
  `;
}
