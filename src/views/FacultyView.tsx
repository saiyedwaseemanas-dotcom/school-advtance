import React from 'react';
import { TEACHER_PROFILE } from '../data/mockData';

export const FacultyView: React.FC = () => {
  const staff = [
    {
      name: 'Sarah Jenkins, M.Sc.',
      role: 'Sr. Mathematics Faculty & Mentor',
      dept: 'Mathematics',
      avatar: TEACHER_PROFILE.avatar,
      status: 'Present',
      room: 'Room 102',
      checkIn: '07:55 AM',
    },
    {
      name: 'Dr. Rajesh Kulkarni',
      role: 'Head of Physics Department',
      dept: 'Science',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOWQ-P8SRi7ZIwI2RBzL2GV79Q_yWqur-S5hUjFjM9L9b9kqbdSUf1XXIdievx3-jp9OKq3LLbLrBR-uV7bRJ8bnfKTz2PXTIw5YmyKim6VQl3k35VipNMWFflFw5AqunsFGIjnh1RRtGalbxMn48D2k138CVVWndq55Ss9b16x0fGRLNjM29hCAR0IPwOsMVZibdWow9gGonJms5s6iUud0Kyuo274BSUcdLnkZCWcckwY3SLmI3-Pw',
      status: 'Present',
      room: 'Physics Lab 1',
      checkIn: '07:48 AM',
    },
    {
      name: 'Pooja Malhotra, M.A.',
      role: 'English Literature Specialist',
      dept: 'Humanities',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCytCC-VdVaIQUzmYd3jmEMiG9FjwbqmIHm_Mlb9P39W1y4VGaFWyM2g0EElVz5ryLZhs76S5BT_pwILmavAVonRg8xHdnqVADvPuG7m_0oDmx8aL6gxTmIiIu534pVzysTwZlkS7G_cQkoHJ1aJVYK02p9qY35a7PbqEJo5Y57V4wVzTIpCLPJY_sZQpH6PIpGoyiC458y2KTOHuMcuTuIniATSCwD0zBDWJni__eNRVv9Vb_CTnswHA',
      status: 'On Leave',
      room: 'Language Lab',
      checkIn: 'Casual Leave (Approved)',
    },
    {
      name: 'Mr. Tarun Roy',
      role: 'Junior Section Head & Social Studies',
      dept: 'Social Sciences',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC3WAJaXEAGSNA4N2Jb4_9pGNau8GvpaJvAnZYastW5SY5b_44ouebb5LxxBJoVecNdfiOWuKgOOqIV8AjrOaDIfBJrggiuBMJ5ouCkrNoldt9ANT3eDQCSYalSOkVHFNmZfvcmX_Fn8LJp-s5_JStVWjj2GzDrbmJWVfQuR7MJoq9UOW5INv8obV6t_SOvifL5ZOChxWdUWgjtIUbv5Dnj-2U14TZ3T1oVQB5XZ25RA1406OlB1tPWg',
      status: 'Present',
      room: 'Room 204',
      checkIn: '08:02 AM',
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-28 pt-2 px-4 space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#2563eb] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">badge</span>
          </div>
          <div>
            <h2 className="font-bold text-[16px] text-[#131b2e]">Faculty &amp; Staff</h2>
            <span className="text-[12px] text-[#434655]">18 of 20 Active Today</span>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#d5e3fc] text-[#0d1c2e] text-[11px] font-bold">
          Term 2
        </span>
      </div>

      <div className="space-y-2.5">
        {staff.map((member, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover border border-[#eaedff] shrink-0"
              />
              <div className="min-w-0">
                <span className="font-semibold text-[14px] text-[#131b2e] block truncate">
                  {member.name}
                </span>
                <span className="text-[11px] text-[#434655] block truncate">{member.role}</span>
                <span className="text-[10px] text-[#004ac6] font-medium block mt-0.5">
                  {member.room} • {member.checkIn}
                </span>
              </div>
            </div>

            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 ${
                member.status === 'Present'
                  ? 'bg-[#d5e3fc] text-[#0d1c2e]'
                  : 'bg-[#e2dfff] text-[#3323cc]'
              }`}
            >
              {member.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
