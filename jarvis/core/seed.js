// ============================================================
// Palmer Venture LLC JARVIS — Synthetic Seed Data
// All data is synthetic. No real PII, credentials, or records.
// ============================================================

export function createSeed() {
  const now = '2026-09-04T08:00:00Z';

  return {
    identity: {
      id: 'bi-pvllc',
      name: 'Palmer Venture LLC',
      legalName: 'Palmer Venture LLC',
      type: 'LLC',
      owner: 'James Palmer',
      ownerRole: 'Managing Member',
      taxId: 'REDACTED',
      state: 'WA',
      createdAt: '2024-01-15T00:00:00Z',
    },

    contacts: [
      { id: 'c-1', name: 'Marcus Webb', role: 'Operations Director', company: 'Webb Dynamics', email: 'REDACTED', phone: 'REDACTED', category: 'client', trustLevel: 'trusted', lastContact: '2026-09-03T14:22:00Z', threadCount: 3 },
      { id: 'c-2', name: 'Sarah Chen', role: 'Fractional CFO', company: 'Chen Consulting', email: 'REDACTED', phone: 'REDACTED', category: 'vendor', trustLevel: 'trusted', lastContact: '2026-09-02T11:05:00Z', threadCount: 2 },
      { id: 'c-3', name: 'Linda Park', role: 'Attorney', company: 'Park Legal Services', email: 'REDACTED', phone: 'REDACTED', category: 'vendor', trustLevel: 'trusted', lastContact: '2026-08-29T09:30:00Z', threadCount: 1 },
      { id: 'c-4', name: 'David Okafor', role: 'Partner', company: 'Okafor Capital', email: 'REDACTED', phone: 'REDACTED', category: 'investor', trustLevel: 'verified', lastContact: '2026-08-28T16:00:00Z', threadCount: 2 },
      { id: 'c-5', name: 'Rachel Torres', role: 'CEO', company: 'Torres Growth', email: 'REDACTED', phone: 'REDACTED', category: 'partner', trustLevel: 'trusted', lastContact: '2026-09-01T13:15:00Z', threadCount: 2 },
      { id: 'c-6', name: 'Unknown Sender', role: 'Unknown', company: 'Unknown', email: 'REDACTED', phone: 'REDACTED', category: 'unknown', trustLevel: 'untrusted', lastContact: '2026-09-03T22:41:00Z', threadCount: 1 },
    ],

    opportunities: [
      {
        id: 'opp-1', title: 'Webb Dynamics — Monthly Systems Retainer', contactId: 'c-1',
        stage: 'qualified', qualification: 'Confirmed pain point (scattered quoting), budget approved, decision-maker engaged',
        expectedValue: 48000, valuePeriod: 'ARR', effort: 'medium', risk: 'medium',
        recommendation: 'pursue', confidence: 82,
        nextStep: 'Send tailored proposal by Sep 6; follow up Sep 9',
        createdAt: '2026-08-25T10:00:00Z',
      },
      {
        id: 'opp-2', title: 'Okafor Capital — Seed Investment Round', contactId: 'c-4',
        stage: 'evaluation', qualification: 'Interested but terms unclear; dilution and control risks need modeling',
        expectedValue: 250000, valuePeriod: 'one-time', effort: 'high', risk: 'high',
        recommendation: 'defer', confidence: 61,
        nextStep: 'Request clarified term sheet; model dilution scenarios before Sep 15',
        createdAt: '2026-08-20T12:00:00Z',
      },
      {
        id: 'opp-3', title: 'Chen Consulting — Fractional CFO Engagement', contactId: 'c-2',
        stage: 'proposal', qualification: 'Scope agreed, rate negotiated, ready to sign',
        expectedValue: 18000, valuePeriod: 'annual', effort: 'low', risk: 'low',
        recommendation: 'accept', confidence: 91,
        nextStep: 'Approve MSA; schedule onboarding for week of Sep 15',
        createdAt: '2026-08-28T09:00:00Z',
      },
      {
        id: 'opp-4', title: 'Torres Growth — Strategic Partnership', contactId: 'c-5',
        stage: 'discovery', qualification: 'Mutual referral value; revenue share model needs definition',
        expectedValue: 0, valuePeriod: 'TBD', effort: 'medium', risk: 'low',
        recommendation: 'explore', confidence: 74,
        nextStep: 'Waiting on Torres for partnership terms; follow up Sep 10',
        createdAt: '2026-08-30T14:00:00Z',
      },
    ],

    threads: [
      { id: 't-1', contactId: 'c-1', subject: 'Systems retainer — scope discussion', messageCount: 3, lastMessageAt: '2026-09-03T14:22:00Z', status: 'awaiting-reply', category: 'business' },
      { id: 't-2', contactId: 'c-2', subject: 'Fractional CFO MSA and onboarding', messageCount: 2, lastMessageAt: '2026-09-02T11:05:00Z', status: 'draft-ready', category: 'business' },
      { id: 't-3', contactId: 'c-3', subject: 'Invoice inquiry — August services', messageCount: 1, lastMessageAt: '2026-08-29T09:30:00Z', status: 'handled', category: 'business' },
      { id: 't-4', contactId: 'c-6', subject: 'URGENT: Bitcoin opportunity!!!', messageCount: 1, lastMessageAt: '2026-09-03T22:41:00Z', status: 'quarantined', category: 'spam' },
      { id: 't-5', contactId: 'c-5', subject: 'Partnership terms — next steps', messageCount: 2, lastMessageAt: '2026-09-01T13:15:00Z', status: 'waiting-on-other', category: 'business' },
    ],

    messages: [
      { id: 'm-1', threadId: 't-1', contactId: 'c-1', from: 'Marcus Webb', direction: 'inbound', subject: 'Re: Systems retainer — scope discussion', preview: 'This sounds exactly like what we need. Can you send a proposal with pricing?', body: 'REDACTED — content quarantined for summary only', receivedAt: '2026-09-03T14:22:00Z', status: 'triaged', category: 'business', spamScore: 0, confidence: 95 },
      { id: 'm-2', threadId: 't-1', contactId: 'c-1', from: 'JARVIS', direction: 'outbound-draft', subject: 'Re: Systems retainer — scope discussion', preview: 'DRAFT: Thanks Marcus — here is a tailored proposal for the monthly retainer...', body: 'REDACTED — draft awaiting approval', receivedAt: null, status: 'draft', category: 'business', spamScore: 0, confidence: 88 },
      { id: 'm-3', threadId: 't-2', contactId: 'c-2', from: 'Sarah Chen', direction: 'inbound', subject: 'Fractional CFO MSA and onboarding', preview: 'I have the MSA ready for review. Can we schedule onboarding for the week of Sep 15?', body: 'REDACTED — content quarantined for summary only', receivedAt: '2026-09-02T11:05:00Z', status: 'triaged', category: 'business', spamScore: 0, confidence: 97 },
      { id: 'm-4', threadId: 't-2', contactId: 'c-2', from: 'JARVIS', direction: 'outbound-draft', subject: 'Re: Fractional CFO MSA and onboarding', preview: 'DRAFT: Hi Sarah — the MSA looks good. I have a few minor edits to Section 3...', body: 'REDACTED — draft awaiting approval', receivedAt: null, status: 'draft', category: 'business', spamScore: 0, confidence: 90 },
      { id: 'm-5', threadId: 't-3', contactId: 'c-3', from: 'Linda Park', direction: 'inbound', subject: 'Invoice inquiry — August services', preview: 'Question about line item 3 on the August invoice. Can we discuss?', body: 'REDACTED — content quarantined for summary only', receivedAt: '2026-08-29T09:30:00Z', status: 'handled', category: 'business', spamScore: 0, confidence: 93 },
      { id: 'm-6', threadId: 't-4', contactId: 'c-6', from: 'Unknown Sender', direction: 'inbound', subject: 'URGENT: Bitcoin opportunity!!!', preview: 'You have been selected for a limited-time crypto investment...', body: 'REDACTED — quarantined', receivedAt: '2026-09-03T22:41:00Z', status: 'quarantined', category: 'spam', spamScore: 94, confidence: 94 },
      { id: 'm-7', threadId: 't-5', contactId: 'c-5', from: 'Rachel Torres', direction: 'inbound', subject: 'Partnership terms — next steps', preview: 'Working on the revenue share model. Will have terms to you by end of week.', body: 'REDACTED — content quarantined for summary only', receivedAt: '2026-09-01T13:15:00Z', status: 'triaged', category: 'business', spamScore: 0, confidence: 89 },
    ],

    decisionBriefs: [
      {
        id: 'db-1', title: 'Which CRM to adopt for PVLLC operations', type: 'tooling',
        what: 'PVLLC needs a CRM to track client engagements, opportunities, and follow-ups. Three options evaluated.',
        options: [
          { label: 'Notion (as CRM)', pros: 'Low cost, already in use, flexible', cons: 'Not purpose-built, manual pipeline tracking, no automation', cost: '$10/mo', risk: 'low' },
          { label: 'HubSpot Starter', pros: 'Purpose-built CRM, email tracking, reporting', cons: 'Feature bloat, upsell pressure, contact limits', cost: '$20/mo', risk: 'low' },
          { label: 'Attio', pros: 'Modern, fast, great pipeline views, strong API', cons: 'Newer platform, smaller community, pricing scales with seats', cost: '$25/mo', risk: 'medium' },
        ],
        risks: ['Migration effort if wrong choice', 'Lock-in with annual plans'],
        costs: '$10–25/mo plus migration time (~4 hrs)',
        recommendation: 'Attio', confidence: 78,
        missingData: ['Exact seat count needed', 'Integration requirements with existing tools'],
        nextAction: 'Approve Attio subscription ($25/mo, 1 seat) and begin trial',
        status: 'pending', createdAt: '2026-09-03T09:00:00Z',
      },
      {
        id: 'db-2', title: 'Office lease renewal — 2027 term', type: 'facilities',
        what: 'Current lease expires Dec 2026. Landlord offered renewal at 12% increase. Three paths evaluated.',
        options: [
          { label: 'Renew at proposed rate', pros: 'No disruption, stay in place', cons: '12% increase, no leverage used', cost: '+$360/mo', risk: 'low' },
          { label: 'Renegotiate', pros: 'Likely 4–6% reduction based on market comps', cons: 'Negotiation time, possible friction', cost: '+$200/mo est.', risk: 'medium' },
          { label: 'Go fully remote', pros: 'Eliminates rent entirely', cons: 'Lose meeting space, client impression, team cohesion', cost: '$0', risk: 'high' },
        ],
        risks: ['Market may shift by renewal date', 'Renegotiation could sour landlord relationship'],
        costs: '$200–360/mo delta',
        recommendation: 'Renegotiate', confidence: 71,
        missingData: ['Current market comps for comparable spaces', 'Landlord vacancy rate'],
        nextAction: 'Approve engagement of commercial broker for comp pull',
        status: 'pending', createdAt: '2026-09-02T15:00:00Z',
      },
      {
        id: 'db-3', title: 'Health insurance plan selection for 2027', type: 'benefits',
        what: 'Open enrollment approaches. Three plan structures evaluated for a 1-person LLC with planned hire.',
        options: [
          { label: 'Traditional PPO', pros: 'Wide network, predictable copays', cons: 'Highest premium, high overhead', cost: '$680/mo', risk: 'low' },
          { label: 'HSA + High Deductible', pros: 'Lower premium, tax-advantaged savings, flexible', cons: 'Higher out-of-pocket before deductible', cost: '$420/mo', risk: 'medium' },
          { label: 'PEO (TriNet/Justworks)', pros: 'Group rates, bundled HR/payroll', cons: 'Per-employee fees, less control', cost: '$510/mo + $120/ee', risk: 'medium' },
        ],
        risks: ['HSA requires cash buffer for deductible', 'PEO lock-in for payroll'],
        costs: '$420–680/mo',
        recommendation: 'HSA + High Deductible', confidence: 69,
        missingData: ['Expected medical utilization for 2027', 'Hire timeline affects PEO math'],
        nextAction: 'Approve HSA plan selection; set up HSA contribution schedule',
        status: 'pending', createdAt: '2026-09-01T10:00:00Z',
      },
      {
        id: 'db-4', title: 'Engage Sarah Chen as Fractional CFO', type: 'hiring',
        what: 'Sarah Chen proposes a fractional CFO engagement at $1,500/mo for 12 months. Scope and terms agreed.',
        options: [
          { label: 'Accept — $1,500/mo, 12-mo term', pros: 'Financial clarity, investor-ready reporting, tax planning', cons: 'Fixed monthly cost', cost: '$18k/yr', risk: 'low' },
          { label: 'Counter — $1,200/mo, 6-mo trial', pros: 'Lower commitment, test value', cons: 'May lose candidate, less continuity', cost: '$7.2k/6mo', risk: 'medium' },
          { label: 'Decline — handle in-house', pros: 'No cost', cons: 'No financial expertise, missed opportunities', cost: '$0', risk: 'high' },
        ],
        risks: ['Cash flow impact of fixed monthly cost', 'Scope creep without clear boundaries'],
        costs: '$7.2k–18k/yr',
        recommendation: 'Accept — $1,500/mo, 12-mo term', confidence: 91,
        missingData: [],
        nextAction: 'Approve MSA with Sarah Chen; schedule onboarding week of Sep 15',
        status: 'pending', createdAt: '2026-08-30T08:00:00Z',
      },
    ],

    calendarCandidates: [
      {
        id: 'cal-1', title: 'Webb Dynamics — Discovery Call', proposedBy: 'JARVIS',
        start: '2026-09-09T10:00:00Z', end: '2026-09-09T10:30:00Z', type: 'discovery-call',
        conflicts: [{ event: 'Weekly review with Sarah Chen', start: '2026-09-09T10:00:00Z' }],
        duplicates: [], status: 'pending', requiresApproval: true,
      },
      {
        id: 'cal-2', title: 'Sarah Chen — CFO Onboarding', proposedBy: 'Sarah Chen',
        start: '2026-09-16T14:00:00Z', end: '2026-09-16T15:30:00Z', type: 'onboarding',
        conflicts: [], duplicates: [], status: 'pending', requiresApproval: true,
      },
      {
        id: 'cal-3', title: 'Weekly Review', proposedBy: 'Calendar Sync',
        start: '2026-09-08T09:00:00Z', end: '2026-09-08T09:30:00Z', type: 'recurring',
        conflicts: [],
        duplicates: [{ event: 'Weekly Review (existing)', start: '2026-09-08T09:00:00Z' }],
        status: 'pending', requiresApproval: true,
      },
    ],

    tasks: [
      { id: 'task-1', title: 'Send Webb Dynamics proposal', owner: 'Palmer', status: 'in-progress', priority: 'high', dueDate: '2026-09-06T17:00:00Z', waitingOn: null, linkedOpportunityId: 'opp-1' },
      { id: 'task-2', title: 'Review Chen MSA — Section 3 edits', owner: 'Palmer', status: 'pending', priority: 'high', dueDate: '2026-09-07T17:00:00Z', waitingOn: null, linkedOpportunityId: 'opp-3' },
      { id: 'task-3', title: 'File Q3 estimated taxes', owner: 'Palmer', status: 'pending', priority: 'high', dueDate: '2026-09-15T17:00:00Z', waitingOn: null, linkedOpportunityId: null },
      { id: 'task-4', title: 'Receive Torres partnership terms', owner: 'Palmer', status: 'waiting', priority: 'medium', dueDate: '2026-09-10T17:00:00Z', waitingOn: 'Rachel Torres', linkedOpportunityId: 'opp-4' },
      { id: 'task-5', title: 'Follow up with Okafor on term sheet', owner: 'Palmer', status: 'waiting', priority: 'medium', dueDate: '2026-09-12T17:00:00Z', waitingOn: 'David Okafor', linkedOpportunityId: 'opp-2' },
      { id: 'task-6', title: 'Approve Attio CRM subscription', owner: 'Palmer', status: 'pending', priority: 'medium', dueDate: '2026-09-08T17:00:00Z', waitingOn: null, linkedOpportunityId: null },
    ],

    documents: [
      { id: 'doc-1', title: 'Webb Dynamics NDA — Draft', type: 'NDA', metadata: { format: 'PDF', size: '124 KB', modifiedAt: '2026-09-02T10:00:00Z', author: 'Linda Park' }, referenceOnly: true },
      { id: 'doc-2', title: 'Chen Consulting MSA', type: 'MSA', metadata: { format: 'PDF', size: '286 KB', modifiedAt: '2026-09-01T14:00:00Z', author: 'Sarah Chen' }, referenceOnly: true },
      { id: 'doc-3', title: 'Q3 2026 P&L Statement', type: 'Financial', metadata: { format: 'XLSX', size: '94 KB', modifiedAt: '2026-08-31T17:00:00Z', author: 'Palmer' }, referenceOnly: true },
      { id: 'doc-4', title: 'Okafor Capital Term Sheet', type: 'Term Sheet', metadata: { format: 'PDF', size: '178 KB', modifiedAt: '2026-08-28T16:00:00Z', author: 'David Okafor' }, referenceOnly: true },
    ],

    quarantine: [
      { id: 'q-1', messageId: 'm-6', reason: 'Cryptocurrency investment scam — unsolicited, urgency language, unknown sender', confidence: 94, quarantinedAt: '2026-09-03T22:42:00Z', status: 'quarantined', category: 'spam' },
      { id: 'q-2', messageId: null, reason: 'Phishing attempt — spoofed sender domain mimicking Park Legal Services', confidence: 76, quarantinedAt: '2026-09-03T18:15:00Z', status: 'quarantined', category: 'phishing' },
      { id: 'q-3', messageId: null, reason: 'Promotional mass email — "Free business listing on Google" (not from Google)', confidence: 88, quarantinedAt: '2026-09-03T12:30:00Z', status: 'quarantined', category: 'promotional' },
    ],

    approvals: [
      { id: 'ap-1', type: 'message', refId: 'm-2', summary: 'Send draft reply to Marcus Webb (Webb Dynamics retainer proposal)', requestedAt: '2026-09-03T15:00:00Z', status: 'pending', decidedBy: null, decidedAt: null },
      { id: 'ap-2', type: 'message', refId: 'm-4', summary: 'Send draft reply to Sarah Chen (MSA review and onboarding)', requestedAt: '2026-09-02T12:00:00Z', status: 'pending', decidedBy: null, decidedAt: null },
      { id: 'ap-3', type: 'calendar', refId: 'cal-1', summary: 'Commit calendar event: Webb Dynamics Discovery Call (Sep 9, 10:00 AM — conflicts with Weekly Review)', requestedAt: '2026-09-03T16:00:00Z', status: 'pending', decidedBy: null, decidedAt: null },
      { id: 'ap-4', type: 'handoff', refId: 'ho-1', summary: 'Approve handoff packet to Personal JARVIS: busy/free metadata for week of Sep 9', requestedAt: '2026-09-04T08:00:00Z', status: 'pending', decidedBy: null, decidedAt: null },
      { id: 'ap-5', type: 'purchase', refId: 'db-1', summary: 'Approve purchase: Attio CRM subscription ($25/mo, 1 seat)', requestedAt: '2026-09-03T09:30:00Z', status: 'pending', decidedBy: null, decidedAt: null },
    ],

    auditEvents: [
      { id: 'aud-1', timestamp: '2026-09-03T22:42:00Z', actor: 'JARVIS', action: 'quarantine', entityType: 'message', entityId: 'm-6', from: 'inbound', to: 'quarantined', details: { reason: 'Crypto scam detected', confidence: 94 } },
      { id: 'aud-2', timestamp: '2026-09-03T18:15:00Z', actor: 'JARVIS', action: 'quarantine', entityType: 'message', entityId: 'q-2-msg', from: 'inbound', to: 'quarantined', details: { reason: 'Phishing — spoofed domain', confidence: 76 } },
      { id: 'aud-3', timestamp: '2026-09-03T15:00:00Z', actor: 'JARVIS', action: 'create-draft', entityType: 'message', entityId: 'm-2', from: null, to: 'draft', details: { thread: 't-1', recipient: 'Marcus Webb' } },
      { id: 'aud-4', timestamp: '2026-09-03T16:00:00Z', actor: 'JARVIS', action: 'propose-calendar', entityType: 'calendar', entityId: 'cal-1', from: null, to: 'pending', details: { conflict: true } },
      { id: 'aud-5', timestamp: '2026-09-04T08:00:00Z', actor: 'JARVIS', action: 'create-handoff-draft', entityType: 'handoff', entityId: 'ho-1', from: null, to: 'draft', details: { target: 'Personal JARVIS' } },
    ],

    integrations: [
      { id: 'int-1', name: 'Email (Gmail)', category: 'communication', status: 'disconnected', mode: 'test', lastChecked: '2026-09-04T08:00:00Z', notes: 'No credentials configured. Synthetic inbox only.' },
      { id: 'int-2', name: 'Calendar (Google Calendar)', category: 'scheduling', status: 'disconnected', mode: 'test', lastChecked: '2026-09-04T08:00:00Z', notes: 'No live calendar connected. Synthetic candidates only.' },
      { id: 'int-3', name: 'CRM (Attio)', category: 'tooling', status: 'disconnected', mode: 'test', lastChecked: '2026-09-04T08:00:00Z', notes: 'Purchase pending approval.' },
      { id: 'int-4', name: 'Document Store (Drive)', category: 'documents', status: 'disconnected', mode: 'test', lastChecked: '2026-09-04T08:00:00Z', notes: 'Metadata references only. No file access.' },
      { id: 'int-5', name: 'Payments (Stripe)', category: 'finance', status: 'disconnected', mode: 'test', lastChecked: '2026-09-04T08:00:00Z', notes: 'No API keys. No live transactions.' },
    ],

    gateways: [
      {
        id: 'gw-1', name: 'Personal JARVIS Gateway', peerType: 'personal-jarvis',
        status: 'disconnected', endpoint: 'https://placeholder.personal-jarvis.local/handoff',
        credentials: 'separate (not stored in PVLLC app)', signedWebhooks: true,
        replayChecks: true, rateLimit: '10 requests/min', expiry: '5 min TTL per packet',
        dualAudit: true, killSwitch: true, killSwitchActive: false,
      },
    ],

    handoffs: [
      {
        id: 'ho-1', targetAgent: 'Personal JARVIS', gatewayId: 'gw-1', status: 'draft',
        fields: {
          referenceId: 'PVLLC-REF-2026-0904-001',
          senderCategory: 'business',
          urgency: 'normal',
          deadline: '2026-09-09T17:00:00Z',
          redactedSummary: 'Discovery call proposed with prospect; conflicts with existing weekly review — needs reschedule decision.',
          recommendation: 'Reschedule discovery call to Sep 10, 10:00 AM',
          approvedFields: ['referenceId', 'senderCategory', 'urgency', 'deadline', 'redactedSummary', 'recommendation', 'status', 'expiry', 'busyFree', 'deepLink'],
          status: 'pending-approval',
          expiry: '2026-09-04T13:00:00Z',
          busyFree: { '2026-09-09': 'busy 10:00–10:30', '2026-09-10': 'free 09:00–12:00' },
          deepLink: 'https://placeholder.pvllc.local/handoff/PVLLC-REF-2026-0904-001',
        },
        approvedAt: null, approvedBy: null,
        policyChecks: null,
      },
      {
        id: 'ho-2', targetAgent: 'Personal JARVIS', gatewayId: 'gw-1', status: 'draft',
        fields: {
          referenceId: 'PVLLC-REF-2026-0904-002',
          senderCategory: 'business',
          urgency: 'low',
          deadline: '2026-09-15T17:00:00Z',
          redactedSummary: 'Fractional CFO engagement ready to sign; awaiting MSA approval.',
          recommendation: 'Approve MSA and schedule onboarding',
          approvedFields: ['referenceId', 'senderCategory', 'urgency', 'deadline', 'redactedSummary', 'recommendation', 'status', 'expiry'],
          status: 'pending-approval',
          expiry: '2026-09-04T13:00:00Z',
          busyFree: null,
          deepLink: 'https://placeholder.pvllc.local/handoff/PVLLC-REF-2026-0904-002',
        },
        approvedAt: null, approvedBy: null,
        policyChecks: null,
      },
    ],

    policies: [
      {
        id: 'pol-1', name: 'Personal JARVIS — Allowed Fields', peerType: 'personal-jarvis',
        allowed: ['referenceId', 'senderCategory', 'urgency', 'deadline', 'redactedSummary', 'recommendation', 'approvedFields', 'status', 'expiry', 'busyFree', 'deepLink'],
        blocked: ['rawMessages', 'fullThreads', 'attachments', 'credentials', 'contactDetails', 'sourceRecords', 'fullCalendar'],
        rules: [
          'Only opaque reference IDs — no raw entity IDs from PVLLC store',
          'Redacted summaries max 280 characters',
          'No raw message bodies, full threads, or attachments',
          'No credentials, contact details, or source records',
          'No full calendar details — busy/free metadata only',
          'Every packet starts as draft and requires Palmer approval',
          'Packets expire after 5 minutes if not approved',
        ],
      },
      {
        id: 'pol-2', name: 'County Systems — Blocked', peerType: 'county',
        allowed: [],
        blocked: ['*'],
        rules: [
          'No route exists between County and PVLLC',
          'Blocked by default — no exceptions',
          'No handoffs, no data exchange, no gateway endpoint',
          'County-related content is blocked in all handoff packets',
        ],
      },
    ],

    policyTestResults: null,
  };
}
