export type ViewMode = 'dashboard' | 'take-attendance' | 'syllabus' | 'marks-exams' | 'google-sheets-sync' | 'students' | 'teachers' | 'reports' | 'settings';

export type UserRole = 'Teacher' | 'Admin' | 'Student';

export type AttendanceStatus = 'P' | 'A' | 'L' | 'HD';

export interface StudentRecord {
  id: number;
  name: string;
  rollNo: string;
  avatar: string;
  attendancePct: number;
  section: string;
  guardianPhone: string;
  isDefaulter?: boolean;
  score50: number; // For marks view
  rank?: number;
  statusToday: AttendanceStatus;
}

export interface SyllabusChapter {
  id: number;
  number: number;
  title: string;
  status: 'Completed' | 'In Progress' | 'Not Started';
  periodsAllotted: number;
  periodsConducted?: number;
  completionDate?: string;
  notes?: string;
  homework?: string;
  nextTopic?: string;
}

export interface FacultyRecord {
  id: string;
  name: string;
  designation: string;
  department: string;
  avatar: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'On Leave' | 'Excused';
  leaveType?: string;
  room?: string;
  leaveBalance: {
    casual: { used: number; total: number };
    sick: { used: number; total: number };
    earned: { used: number; total: number };
  };
}

export interface ExamSubject {
  name: string;
  avgScore: number;
  color: string;
  active?: boolean;
}
