// Integrations — all disconnected/test mode
import { getState } from '../core/store.js';
import { card, badge, kv, fmtDateTime, sectionTitle, empty } from '../core/ui.js';

export function render() {
  const s = getState();
  const integrations = s.integrations;

  const cards = integrations.map(i => card({
    title: i.name,
    subtitle: `${badge(i.status.toUpperCase(), 'gray')} · ${badge(i.mode.toUpperCase() + ' MODE', 'amber')}`,
    accent: 'gray',
    body: `
      ${kv('Category', i.category)}
      ${kv('Last Checked', fmtDateTime(i.lastChecked))}
      <div class="integration-note">${i.notes}</div>
    `,
  })).join('');

  return `
    ${sectionTitle('Integrations', 'All integrations are disconnected and in test mode. No live APIs, no secrets, no external connectors.')}
    <div class="integration-banner">
      ${badge('TEST MODE', 'amber')} ${badge('DISCONNECTED', 'gray')}
      <span>No live connections. All data is synthetic. No credentials are stored or transmitted.</span>
    </div>
    <div class="grid-2">${cards}</div>
  `;
}
