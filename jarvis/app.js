// ============================================================
// JARVIS App — router, navigation, event handling, init
// ============================================================

import { subscribe, approveApproval, rejectApproval, releaseQuarantine, keepQuarantined, updateTaskStatus, approveHandoff, rejectHandoff, toggleKillSwitch, runPolicyTests } from './core/store.js';
import { runAllTests } from './core/policy.js';
import { render as commandScreen } from './screens/command.js';
import { render as opportunitiesScreen } from './screens/opportunities.js';
import { render as decisionsScreen } from './screens/decisions.js';
import { render as peopleScreen } from './screens/people.js';
import { render as calendarScreen } from './screens/calendar.js';
import { render as tasksScreen } from './screens/tasks.js';
import { render as documentsScreen } from './screens/documents.js';
import { render as auditScreen } from './screens/audit.js';
import { render as integrationsScreen } from './screens/integrations.js';
import { render as gatewayScreen } from './screens/gateway.js';

const NAV = [
  { id: 'command', label: 'Executive Command', icon: '⚡' },
  { id: 'opportunities', label: 'Opportunities', icon: '🎯' },
  { id: 'decisions', label: 'Decisions', icon: '✓' },
  { id: 'people', label: 'People & Messages', icon: '✉' },
  { id: 'calendar', label: 'Calendar Candidates', icon: '📅' },
  { id: 'tasks', label: 'Tasks & Waiting', icon: '☑' },
  { id: 'documents', label: 'Documents', icon: '📄' },
  { id: 'audit', label: 'Audit & Undo', icon: '🔍' },
  { id: 'integrations', label: 'Integrations', icon: '🔌' },
  { id: 'gateway', label: 'Agent Gateway', icon: '🔐' },
];

const SCREENS = {
  command: commandScreen,
  opportunities: opportunitiesScreen,
  decisions: decisionsScreen,
  people: peopleScreen,
  calendar: calendarScreen,
  tasks: tasksScreen,
  documents: documentsScreen,
  audit: auditScreen,
  integrations: integrationsScreen,
  gateway: gatewayScreen,
};

let currentRoute = 'command';

function getRoute() {
  const hash = location.hash.replace('#/', '').replace('#', '');
  return NAV.find(n => n.id === hash) ? hash : 'command';
}

function renderNav() {
  return NAV.map(n => `
    <a href="#/${n.id}" class="nav-item ${n.id === currentRoute ? 'active' : ''}" data-route="${n.id}">
      <span class="nav-icon">${n.icon}</span>
      <span class="nav-label">${n.label}</span>
    </a>`).join('');
}

function renderBanner() {
  return `
    <div class="test-banner">
      <span class="test-banner-badge">TEST MODE</span>
      <span class="test-banner-badge test-banner-disconnected">DISCONNECTED</span>
      <span class="test-banner-text">Owner-only prototype. No live APIs. No secrets. No external connectors. All data is synthetic. JARVIS recommends — Palmer decides.</span>
    </div>`;
}

function render() {
  currentRoute = getRoute();
  const app = document.getElementById('jarvis-app');
  if (!app) return;

  const screenFn = SCREENS[currentRoute] || commandScreen;
  app.innerHTML = `
    ${renderBanner()}
    <div class="jarvis-layout">
      <aside class="sidebar">
        <div class="sidebar-brand">
          <span class="sidebar-logo">PV</span>
          <div class="sidebar-brand-text">
            <strong>JARVIS</strong>
            <span>Palmer Venture LLC</span>
          </div>
        </div>
        <nav class="sidebar-nav">${renderNav()}</nav>
        <div class="sidebar-footer">
          <a href="/" class="back-to-site">← Back to Marketing Site</a>
        </div>
      </aside>
      <main class="main-content">
        ${screenFn()}
      </main>
    </div>
  `;
}

// Event delegation
function handleAction(action, id) {
  switch (action) {
    case 'approve': approveApproval(id); break;
    case 'reject': rejectApproval(id); break;
    case 'release-quarantine': releaseQuarantine(id); break;
    case 'keep-quarantine': keepQuarantined(id); break;
    case 'task-start': updateTaskStatus(id, 'in-progress'); break;
    case 'task-complete': updateTaskStatus(id, 'completed'); break;
    case 'approve-calendar': approveApproval(id); break;
    case 'reject-calendar': rejectApproval(id); break;
    case 'approve-draft': approveApproval(id); break;
    case 'approve-handoff': approveHandoff(id); break;
    case 'reject-handoff': rejectHandoff(id); break;
    case 'toggle-kill': toggleKillSwitch(id); break;
    case 'run-policy-tests': runPolicyTests(); break;
    case 'approve-brief': {
      // Find the approval linked to this brief
      const { getState } = window.__jarvis || {};
      // Use the store directly
      import('./core/store.js').then(({ getState, approveApproval }) => {
        const s = getState();
        const ap = s.approvals.find(a => a.refId === id);
        if (ap) approveApproval(ap.id);
      });
      break;
    }
    case 'navigate':
      location.hash = '#/' + id;
      break;
    case 'edit-draft':
      // Prototype: no editing — just inform
      break;
  }
}

function init() {
  // Initial render
  render();

  // Re-render on state changes
  subscribe(() => render());

  // Hash-based routing
  window.addEventListener('hashchange', () => render());

  // Event delegation
  document.addEventListener('click', (e) => {
    const btnEl = e.target.closest('[data-action]');
    if (!btnEl) return;
    e.preventDefault();
    const { action, id } = btnEl.dataset;
    if (action) handleAction(action, id);
  });
}

document.addEventListener('DOMContentLoaded', init);
