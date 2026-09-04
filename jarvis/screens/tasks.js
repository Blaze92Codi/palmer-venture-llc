// Tasks & Waiting
import { getState } from '../core/store.js';
import { card, badge, statusBadge, kv, btn, fmtDateTime, sectionTitle, empty } from '../core/ui.js';

export function render() {
  const s = getState();
  const tasks = s.tasks;

  const active = tasks.filter(t => t.status === 'pending' || t.status === 'in-progress');
  const waiting = tasks.filter(t => t.status === 'waiting');

  const priorityBadge = (p) => badge(p.toUpperCase(), p === 'high' ? 'red' : p === 'medium' ? 'amber' : 'green');

  const activeHtml = active.length === 0
    ? empty('No active tasks.')
    : active.map(t => `
      <div class="list-item">
        <div class="list-item-main">
          ${priorityBadge(t.priority)}
          ${statusBadge(t.status)}
          <span class="list-item-title">${t.title}</span>
        </div>
        <div class="list-item-meta">
          Due ${fmtDateTime(t.dueDate)}
          ${t.status === 'pending' ? btn('Start', 'task-start', t.id, 'secondary') : ''}
          ${t.status === 'in-progress' ? btn('Complete', 'task-complete', t.id, 'success') : ''}
        </div>
      </div>`).join('');

  const waitingHtml = waiting.length === 0
    ? empty('Nothing waiting on others.')
    : waiting.map(t => `
      <div class="list-item">
        <div class="list-item-main">
          ${priorityBadge(t.priority)}
          <span class="list-item-title">${t.title}</span>
          <span class="list-item-sub">Waiting on: ${t.waitingOn}</span>
        </div>
        <div class="list-item-meta">Due ${fmtDateTime(t.dueDate)}</div>
      </div>`).join('');

  return `
    ${sectionTitle('Tasks & Waiting', 'Active tasks and items blocked waiting on others.')}
    <div class="grid-2">
      ${card({ title: 'Active Tasks', accent: 'amber', body: activeHtml })}
      ${card({ title: 'Waiting on Others', accent: 'blue', body: waitingHtml })}
    </div>
  `;
}
