export const STORAGE_KEYS = {
  TASKS: 'mytodo_tasks',
  LISTS: 'mytodo_lists',
  SELECTED_LIST: 'mytodo_selected_list',
  ONBOARDING_COMPLETED: 'mytodo_onboarding_completed',
  LAST_SYNC: 'mytodo_last_sync',
} as const;

export const PRIORITY_LEVELS = {
  low: { label: 'Low', color: 'bg-blue-100 text-blue-800' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  high: { label: 'High', color: 'bg-red-100 text-red-800' },
} as const;

export const LIST_COLORS = [
  { name: 'Blue', value: '#0066ff' },
  { name: 'Red', value: '#ff6b35' },
  { name: 'Green', value: '#10b981' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Yellow', value: '#f59e0b' },
  { name: 'Teal', value: '#14b8a6' },
  { name: 'Gray', value: '#6b7280' },
] as const;

export const TEMPLATES = [
  {
    id: 'template-1',
    name: 'Weekly Planning',
    description: 'Organize your week with key tasks',
    category: 'work' as const,
    tasks: [
      { title: 'Review weekly goals', priority: 'high', order: 0 },
      { title: 'Schedule meetings', priority: 'medium', order: 1 },
      { title: 'Complete project deliverables', priority: 'high', order: 2 },
      { title: 'Team sync', priority: 'medium', order: 3 },
      { title: 'Plan next week', priority: 'low', order: 4 },
    ],
  },
  {
    id: 'template-2',
    name: 'Study Session',
    description: 'Prepare for exams and assignments',
    category: 'education' as const,
    tasks: [
      { title: 'Review lecture notes', priority: 'high', order: 0 },
      { title: 'Complete practice problems', priority: 'high', order: 1 },
      { title: 'Read textbook chapters', priority: 'medium', order: 2 },
      { title: 'Form study group', priority: 'low', order: 3 },
    ],
  },
  {
    id: 'template-3',
    name: 'Project Launch',
    description: 'Checklist for launching a new project',
    category: 'work' as const,
    tasks: [
      { title: 'Define project scope', priority: 'high', order: 0 },
      { title: 'Assign team members', priority: 'high', order: 1 },
      { title: 'Set up project tools', priority: 'medium', order: 2 },
      { title: 'Create timeline', priority: 'high', order: 3 },
      { title: 'Schedule kickoff meeting', priority: 'medium', order: 4 },
    ],
  },
  {
    id: 'template-4',
    name: 'Health & Wellness',
    description: 'Daily health and wellness routine',
    category: 'health' as const,
    tasks: [
      { title: 'Morning exercise', priority: 'high', order: 0 },
      { title: 'Drink water', priority: 'medium', order: 1 },
      { title: 'Meal prep', priority: 'medium', order: 2 },
      { title: 'Evening meditation', priority: 'low', order: 3 },
    ],
  },
  {
    id: 'template-5',
    name: 'Monthly Budget Review',
    description: 'Review and plan monthly finances',
    category: 'finance' as const,
    tasks: [
      { title: 'Review expenses', priority: 'high', order: 0 },
      { title: 'Update budget', priority: 'high', order: 1 },
      { title: 'Pay bills', priority: 'high', order: 2 },
      { title: 'Check savings goals', priority: 'medium', order: 3 },
    ],
  },
] as const;

export const KEYBOARD_SHORTCUTS = {
  NEW_TASK: 'Ctrl+N',
  NEW_LIST: 'Ctrl+L',
  FOCUS_SEARCH: 'Ctrl+K',
  TOGGLE_COMPLETE: 'Ctrl+Enter',
  DELETE_TASK: 'Delete',
} as const;
