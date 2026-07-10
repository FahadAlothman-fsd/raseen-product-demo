// All demo data is static, local, and deterministic. No network, no randomness.

export const org = {
  name: 'ACME Financial Services',
  domain: 'acme.sa',
  region: 'Saudi Arabia',
  industry: 'Financial Technology',
  employees: 248,
  resources: 1284,
  posture: 91,
}

export const user = {
  name: 'Omar Al-Qahtani',
  email: 'omar@acme.sa',
  role: 'Compliance Manager',
  initials: 'OA',
}

export const sso = {
  provider: 'Microsoft Entra ID',
  status: 'Connected',
  domain: 'acme.sa',
  scope: 'Required for all employees',
  provisioning: 'Just-in-time provisioning',
  lastSignIn: 'Today 09:42',
}

export type IntegrationStatus = 'healthy' | 'attention'

export type Integration = {
  id: string
  provider: 'gcp' | 'aws' | 'azure'
  providerName: string
  name: string
  status: IntegrationStatus
  statusLabel: string
  detailKey: string
  detailValue: string
  resources: number
  lastSync: string
  duration: string
  note?: string
}

export const integrations: Integration[] = [
  {
    id: 'int-gcp',
    provider: 'gcp',
    providerName: 'Google Cloud',
    name: 'ACME Production',
    status: 'healthy',
    statusLabel: 'Healthy',
    detailKey: 'Project',
    detailValue: 'acme-production',
    resources: 842,
    lastSync: 'Today 09:31',
    duration: '2m 14s',
  },
  {
    id: 'int-aws',
    provider: 'aws',
    providerName: 'AWS',
    name: 'Core Banking',
    status: 'healthy',
    statusLabel: 'Healthy',
    detailKey: 'Account',
    detailValue: '4281-9032-1147',
    resources: 396,
    lastSync: 'Today 09:29',
    duration: '1m 48s',
  },
  {
    id: 'int-azure',
    provider: 'azure',
    providerName: 'Azure',
    name: 'Corporate',
    status: 'attention',
    statusLabel: 'Attention required',
    detailKey: 'Directory',
    detailValue: 'acme.onmicrosoft.com',
    resources: 46,
    lastSync: 'Yesterday 23:00',
    duration: '—',
    note: 'Consent renewal required',
  },
]

export const compliance = {
  posture: 91,
  compliantControls: 43,
  needAttention: 4,
  critical: 1,
  resourcesEvaluated: 1238,
  lastSync: 'Today 09:31',
  nextScheduled: 'Tomorrow 02:00',
  trend: [
    { month: 'Apr', value: 82 },
    { month: 'May', value: 86 },
    { month: 'Jun', value: 89 },
    { month: 'Jul', value: 91 },
  ],
}

export type WorkQueueItem = {
  id: string
  control: string
  title: string
  severity: 'high' | 'medium' | 'low'
  status: 'non-compliant' | 'attention'
  summary: string
  failed: number
  total: number
}

export const workQueue: WorkQueueItem[] = [
  {
    id: 'wq-335',
    control: 'SAMA-3.3.5',
    title: 'Data Encryption',
    severity: 'high',
    status: 'non-compliant',
    summary: 'Cloud storage must prohibit public access',
    failed: 2,
    total: 74,
  },
  {
    id: 'wq-518',
    control: 'SAMA-5.1.8',
    title: 'Network Segmentation',
    severity: 'medium',
    status: 'attention',
    summary: 'Two subnets allow unrestricted egress',
    failed: 2,
    total: 38,
  },
  {
    id: 'wq-274',
    control: 'SAMA-2.7.4',
    title: 'Logging & Audit Trails',
    severity: 'medium',
    status: 'attention',
    summary: 'Log retention below 365 days on 1 project',
    failed: 1,
    total: 22,
  },
  {
    id: 'wq-419',
    control: 'SAMA-4.1.9',
    title: 'Backup Integrity',
    severity: 'low',
    status: 'attention',
    summary: 'Backup verification not enabled on 1 dataset',
    failed: 1,
    total: 16,
  },
]

export const featuredFinding = {
  control: 'SAMA-3.3.5',
  title: 'Data Encryption',
  severity: 'high',
  status: 'non-compliant',
  requirement: 'Cloud storage must prohibit public access',
  failed: 2,
  total: 74,
  firstDetected: 'July 8, 2026',
}

export type ResourceResult = 'Failed' | 'Passed'

export type EvaluatedResource = {
  id: string
  name: string
  project: string
  result: ResourceResult
  finding: string
  type: string
  location: string
  created: string
  publicAccess: boolean
  uniformAccess: boolean
  encryption: string
  firstObserved: string
  lastObserved: string
  remediation: string
}

export const evaluatedResources: EvaluatedResource[] = [
  {
    id: 'res-1',
    name: 'customer-exports-prod',
    project: 'acme-production',
    result: 'Failed',
    finding: 'Public access enabled',
    type: 'Cloud Storage bucket',
    location: 'me-central1 (Dammam)',
    created: 'Feb 3, 2025',
    publicAccess: true,
    uniformAccess: false,
    encryption: 'Google-managed key',
    firstObserved: 'July 8, 2026',
    lastObserved: 'Today 09:31',
    remediation:
      'Remove allUsers and allAuthenticatedUsers IAM bindings, then enable uniform bucket-level access and public access prevention.',
  },
  {
    id: 'res-2',
    name: 'monthly-reports-archive',
    project: 'acme-production',
    result: 'Failed',
    finding: 'Uniform access disabled',
    type: 'Cloud Storage bucket',
    location: 'me-central1 (Dammam)',
    created: 'Nov 18, 2024',
    publicAccess: true,
    uniformAccess: false,
    encryption: 'Google-managed key',
    firstObserved: 'July 8, 2026',
    lastObserved: 'Today 09:31',
    remediation:
      'Enable uniform bucket-level access to enforce IAM-only permissions and disable per-object ACLs.',
  },
  {
    id: 'res-3',
    name: 'customer-documents-prod',
    project: 'acme-production',
    result: 'Passed',
    finding: 'Private and encrypted',
    type: 'Cloud Storage bucket',
    location: 'me-central1 (Dammam)',
    created: 'Jan 9, 2025',
    publicAccess: false,
    uniformAccess: true,
    encryption: 'Customer-managed key (CMEK)',
    firstObserved: 'July 8, 2026',
    lastObserved: 'Today 09:31',
    remediation: 'No action required. Resource meets encryption and access controls.',
  },
  {
    id: 'res-4',
    name: 'transaction-archive',
    project: 'acme-production',
    result: 'Passed',
    finding: 'Private and encrypted',
    type: 'Cloud Storage bucket',
    location: 'me-central1 (Dammam)',
    created: 'Aug 22, 2024',
    publicAccess: false,
    uniformAccess: true,
    encryption: 'Customer-managed key (CMEK)',
    firstObserved: 'July 8, 2026',
    lastObserved: 'Today 09:31',
    remediation: 'No action required. Resource meets encryption and access controls.',
  },
]

export type SyncJob = {
  id: string
  integration: string
  startedAt: string
  duration: string
  resources: number
  evaluations: number
  result: 'success' | 'partial'
  changes: number
}

export const syncJobs: SyncJob[] = [
  {
    id: 'SYNC-2026-0718',
    integration: 'GCP Production',
    startedAt: 'Today 09:31',
    duration: '2m 14s',
    resources: 842,
    evaluations: 74,
    result: 'success',
    changes: 2,
  },
  {
    id: 'SYNC-2026-0717',
    integration: 'AWS Core Banking',
    startedAt: 'Today 09:29',
    duration: '1m 48s',
    resources: 396,
    evaluations: 41,
    result: 'success',
    changes: 0,
  },
  {
    id: 'SYNC-2026-0712',
    integration: 'GCP Production',
    startedAt: 'Jul 12 02:00',
    duration: '2m 21s',
    resources: 840,
    evaluations: 74,
    result: 'success',
    changes: 1,
  },
  {
    id: 'SYNC-2026-0709',
    integration: 'AWS Core Banking',
    startedAt: 'Jul 9 02:00',
    duration: '1m 52s',
    resources: 394,
    evaluations: 41,
    result: 'success',
    changes: 0,
  },
  {
    id: 'SYNC-2026-0705',
    integration: 'GCP Production',
    startedAt: 'Jul 5 02:00',
    duration: '2m 09s',
    resources: 838,
    evaluations: 74,
    result: 'partial',
    changes: 3,
  },
]

export const monitoringContract = {
  name: 'SAMA CSF Continuous Monitoring 2026',
  status: 'Active',
  framework: 'SAMA Cyber Security Framework v1.0',
  coverageTotal: 48,
  coverageCovered: 48,
  integrations: ['GCP Production', 'AWS Core Banking'],
  schedule: 'Daily at 02:00 AST',
  periodStart: 'Jan 1, 2026',
  periodEnd: 'Dec 31, 2026',
}

export type CoveredControl = {
  id: string
  title: string
  domain: string
  type: string
  result: 'Compliant' | 'Non-compliant' | 'Attention'
  resources: number
}

export const coveredControls: CoveredControl[] = [
  { id: 'SAMA-2.2.1', title: 'Cybersecurity Governance', domain: 'Governance', type: 'Document', result: 'Compliant', resources: 0 },
  { id: 'SAMA-2.7.4', title: 'Logging & Audit Trails', domain: 'Operations', type: 'Configuration', result: 'Attention', resources: 22 },
  { id: 'SAMA-3.3.5', title: 'Data Encryption', domain: 'Data Protection', type: 'Hybrid', result: 'Non-compliant', resources: 74 },
  { id: 'SAMA-4.1.2', title: 'Identity & Access Management', domain: 'Access Control', type: 'Configuration', result: 'Compliant', resources: 126 },
  { id: 'SAMA-4.1.9', title: 'Backup Integrity', domain: 'Resilience', type: 'Configuration', result: 'Attention', resources: 16 },
  { id: 'SAMA-5.1.8', title: 'Network Segmentation', domain: 'Network', type: 'Configuration', result: 'Attention', resources: 38 },
  { id: 'SAMA-5.4.2', title: 'Vulnerability Management', domain: 'Operations', type: 'Configuration', result: 'Compliant', resources: 61 },
  { id: 'SAMA-6.2.3', title: 'Incident Response Readiness', domain: 'Resilience', type: 'Document', result: 'Compliant', resources: 0 },
]

export const auditSession = {
  name: 'SAMA Cybersecurity Review 2026',
  id: 'AUD-SAMA-2026-014',
  regulator: 'Saudi Central Bank',
  periodStart: 'Jan 1, 2026',
  periodEnd: 'Jun 30, 2026',
  due: 'July 24, 2026',
  auditor: 'Layla Al-Harbi',
  auditorTitle: 'Lead Auditor, Saudi Central Bank',
  controlsTotal: 48,
  completed: 39,
  inReview: 6,
  revisionRequested: 3,
}

export type AuditControl = {
  id: string
  title: string
  type: 'Hybrid Control' | 'Configuration Control' | 'Document Control'
  status: 'Completed' | 'In review' | 'Revision requested'
  detail: string
  metric: string
}

export const auditControls: AuditControl[] = [
  {
    id: 'SAMA-3.3.5',
    title: 'Data Encryption',
    type: 'Hybrid Control',
    status: 'Revision requested',
    detail: 'Connected to two failed cloud resources',
    metric: '2 of 74 resources failed',
  },
  {
    id: 'SAMA-4.1.2',
    title: 'Identity & Access Management',
    type: 'Configuration Control',
    status: 'Completed',
    detail: 'Zero privileged accounts without MFA',
    metric: '126 identities evaluated',
  },
  {
    id: 'SAMA-2.2.1',
    title: 'Cybersecurity Governance',
    type: 'Document Control',
    status: 'Completed',
    detail: 'Policies and board approval uploaded',
    metric: '4 documents on file',
  },
  {
    id: 'SAMA-5.1.8',
    title: 'Network Segmentation',
    type: 'Configuration Control',
    status: 'In review',
    detail: 'Egress rules under auditor review',
    metric: '38 resources evaluated',
  },
  {
    id: 'SAMA-2.7.4',
    title: 'Logging & Audit Trails',
    type: 'Configuration Control',
    status: 'In review',
    detail: 'Retention evidence submitted',
    metric: '22 resources evaluated',
  },
  {
    id: 'SAMA-6.2.3',
    title: 'Incident Response Readiness',
    type: 'Document Control',
    status: 'Completed',
    detail: 'Runbooks and tabletop results uploaded',
    metric: '3 documents on file',
  },
]

export type SubmissionDoc = {
  name: string
  kind: 'pdf' | 'xlsx'
  size: string
}

export const submissionRound1 = {
  round: 1,
  submittedOn: 'July 7, 2026',
  submittedBy: 'Omar Al-Qahtani',
  status: 'Revision requested',
  documents: [
    { name: 'Data Encryption Policy v3.1.pdf', kind: 'pdf', size: '412 KB' },
    { name: 'Cloud Security Standard.pdf', kind: 'pdf', size: '308 KB' },
    { name: 'Key Rotation Procedure.pdf', kind: 'pdf', size: '196 KB' },
    { name: 'Encryption Inventory.xlsx', kind: 'xlsx', size: '88 KB' },
    { name: 'Security Committee Approval.pdf', kind: 'pdf', size: '141 KB' },
  ] as SubmissionDoc[],
  configEvidence: 'SYNC-2026-0712',
  auditorName: 'Layla Al-Harbi',
  auditorResponse:
    'The submitted policy adequately defines encryption requirements. However, two production storage resources remain publicly accessible. Please remediate the resources and provide evidence that public access has been removed.',
  targetedResources: ['customer-exports-prod', 'monthly-reports-archive'],
}

export const regulatoryResponse = {
  respondedOn: 'July 10, 2026',
  respondedBy: 'Omar Al-Qahtani',
  status: 'Ready for resubmission',
  body:
    'Public access was removed from both affected storage resources. Uniform bucket-level access was enabled, and organization-level public-access prevention is now enforced.',
  attachments: [
    { name: 'Remediation Change Record CHG-1042.pdf', kind: 'pdf', size: '204 KB' },
    { name: 'GCP Policy Confirmation.pdf', kind: 'pdf', size: '167 KB' },
  ] as SubmissionDoc[],
}

export const submissionRound2 = {
  round: 2,
  submittedOn: 'July 10, 2026',
  status: 'Accepted',
  sync: 'SYNC-2026-0718',
  reevaluated: 74,
  passed: 74,
  failed: 0,
  comparison: {
    publicResourcesBefore: 2,
    publicResourcesAfter: 0,
    controlResultBefore: 'Non-compliant',
    controlResultAfter: 'Compliant',
    resources: [
      { name: 'customer-exports-prod', before: 'Failed', after: 'Passed' },
      { name: 'monthly-reports-archive', before: 'Failed', after: 'Passed' },
    ],
  },
}

export const finalReport = {
  title: 'SAMA Cybersecurity Review 2026',
  id: 'RPT-2026-014',
  issued: 'July 15, 2026',
  assessed: 48,
  compliant: 46,
  partiallyCompliant: 2,
  nonCompliant: 0,
  outcome: 'Compliant',
  signedBy: 'Layla Al-Harbi',
  signerTitle: 'Lead Auditor, Saudi Central Bank',
  framework: 'SAMA CSF v1.0',
  issuedTo: 'ACME Financial Services',
  executiveSummary:
    'ACME Financial Services was assessed against the SAMA Cyber Security Framework v1.0 for the period January 1 to June 30, 2026. Of 48 controls in scope, 46 were found compliant and 2 partially compliant, with no non-compliant controls remaining following remediation. Two production storage exposures identified during the review were remediated and independently re-verified against continuously synced configuration evidence.',
  timeline: [
    { date: 'Jul 7', label: 'Submission Round 1 received' },
    { date: 'Jul 8', label: 'Finding raised: SAMA-3.3.5' },
    { date: 'Jul 10', label: 'Remediation response submitted' },
    { date: 'Jul 10', label: 'Submission Round 2 accepted' },
    { date: 'Jul 15', label: 'Final report issued' },
  ],
  evidenceCoverage: [
    { label: 'Configuration evidence', value: '48 / 48 controls' },
    { label: 'Document evidence', value: '11 documents' },
    { label: 'Re-verified resources', value: '74 resources' },
  ],
}

export const verification = {
  code: 'RASEEN-RPT-2026-014',
  result: 'Authentic and unchanged',
  issuedTo: 'ACME Financial Services',
  framework: 'SAMA CSF v1.0',
  issued: 'July 15, 2026',
  hash: '8c42…91af',
  fullHash: '8c42a7f1e9d34b6c0a52f8e71d9c4b3a7e10f6d2c88b45a9e3f7016b2d4c891af',
  signature: 'Valid',
}

export type Chapter = {
  n: number
  key: string
  title: string
}

export const chapters: Chapter[] = [
  { n: 1, key: 'sso', title: 'SSO sign-in' },
  { n: 2, key: 'integration', title: 'Cloud integration' },
  { n: 3, key: 'compliance', title: 'Continuous Compliance' },
  { n: 4, key: 'sync', title: 'Sync and evaluations' },
  { n: 5, key: 'contract', title: 'Monitoring contract' },
  { n: 6, key: 'audit', title: 'Audit Session' },
  { n: 7, key: 'submission1', title: 'Submission Round 1' },
  { n: 8, key: 'response', title: 'Regulatory response' },
  { n: 9, key: 'submission2', title: 'Submission Round 2' },
  { n: 10, key: 'report', title: 'Final report' },
  { n: 11, key: 'verification', title: 'Report verification' },
]
