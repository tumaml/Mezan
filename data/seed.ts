import { OrgNode } from '@/types';

export const SEED_DATA: OrgNode[] = [
  {
    id: 'node-1',
    name: 'Tuma Al-Madanat',
    role: 'Manager',
    department: 'Operations',
    parentId: null,
    jobDescription:
      'Oversees the entire operations department, sets strategic direction, manages team leads and supervisors, ensures KPIs are met, and drives continuous improvement across all teams. Responsible for hiring decisions, budgeting, and cross-functional alignment.',
    dateAdded: '2024-01-01',
  },
  {
    id: 'node-2',
    name: 'Sara Khalil',
    role: 'Team Lead',
    department: 'Customer Success',
    parentId: 'node-1',
    jobDescription:
      'Leads the Customer Success pod, manages day-to-day agent performance, conducts weekly 1:1s, handles escalations, and ensures SLA targets are consistently achieved. Collaborates with HR/TA on onboarding new team members.',
    dateAdded: '2024-02-10',
  },
  {
    id: 'node-3',
    name: 'Omar Nasser',
    role: 'Team Lead',
    department: 'Technical Support',
    parentId: 'node-1',
    jobDescription:
      'Leads the Technical Support pod, responsible for triaging complex tickets, mentoring agents on product knowledge, maintaining internal knowledge base, and reporting weekly metrics to management.',
    dateAdded: '2024-02-15',
  },
  {
    id: 'node-4',
    name: 'Layla Hamdan',
    role: 'HR/TA',
    department: 'Human Resources',
    parentId: 'node-1',
    jobDescription:
      'Manages all talent acquisition and HR operations for the department. Responsible for job postings, candidate screening, interviews, onboarding, and maintaining employee records. Partners with team leads to forecast headcount needs.',
    dateAdded: '2024-01-20',
  },
  {
    id: 'node-5',
    name: 'Rania Mahmoud',
    role: 'Agent',
    department: 'Customer Success',
    parentId: 'node-2',
    jobDescription:
      'Handles inbound customer inquiries via chat and email. Responsible for resolving tier-1 and tier-2 issues, maintaining CSAT scores above target, and logging all interactions in the CRM.',
    dateAdded: '2024-03-01',
  },
  {
    id: 'node-6',
    name: 'Faris Al-Jabri',
    role: 'Agent',
    department: 'Customer Success',
    parentId: 'node-2',
    jobDescription:
      'Specializes in customer onboarding and retention. Handles outreach to at-risk accounts, conducts check-in calls, and documents customer feedback to improve product experience.',
    dateAdded: '2024-03-05',
  },
  {
    id: 'node-7',
    name: 'Nour Saleh',
    role: 'Agent',
    department: 'Customer Success',
    parentId: 'node-2',
    jobDescription:
      'Manages high-priority customer accounts, handles escalated tickets from tier-1, and provides detailed resolution reports. Works closely with the team lead on process improvements.',
    dateAdded: '2024-03-10',
  },
  {
    id: 'node-8',
    name: 'Khalid Younis',
    role: 'Agent',
    department: 'Technical Support',
    parentId: 'node-3',
    jobDescription:
      'Handles technical troubleshooting for product issues, documents bugs in the issue tracker, communicates with engineering for critical escalations, and creates help articles for common problems.',
    dateAdded: '2024-03-12',
  },
  {
    id: 'node-9',
    name: 'Dana Bishara',
    role: 'Agent',
    department: 'Technical Support',
    parentId: 'node-3',
    jobDescription:
      'Provides technical support via email and phone, specializes in API integration issues, maintains internal runbooks, and assists junior agents with complex technical queries.',
    dateAdded: '2024-03-18',
  },
  {
    id: 'node-10',
    name: 'Tariq Idris',
    role: 'Agent',
    department: 'Technical Support',
    parentId: 'node-3',
    jobDescription:
      'Handles tier-1 technical support tickets, follows standard operating procedures for common issues, contributes to the knowledge base, and escalates complex issues to senior agents.',
    dateAdded: '2024-04-01',
  },
];
