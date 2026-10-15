/**
 * Datos de ejemplo del colegio activo (Fase 0). En la Fase 1 estas exportaciones se
 * reemplazan por la capa de datos real (src/server/dal) con la misma forma.
 */
import { schoolConfig } from "@/schools";
import { beehiveData } from "./beehive";
import { curieData } from "./curie";
import type { MockData } from "./types";

export type { BadgeDef, CafeteriaCategory, Child, GradeRow, Homework, MockData, Role, TodoItem } from "./types";
export { band } from "./shared";

const data: MockData = schoolConfig.id === "curie" ? curieData : beehiveData;

export const {
  school,
  users,
  children,
  focusChildId,
  parentTodo,
  subjectColors,
  homework,
  homeworkDetail,
  grades,
  gradesSummary,
  badges,
  badgeAward,
  announcements,
  announcementTabs,
  events,
  monthlyActivities,
  activityForm,
  dailyAgenda,
  agendaRoster,
  pickup,
  absenceReports,
  absenceDefaults,
  threads,
  conversation,
  permissionSlip,
  albums,
  roster,
  rosterLabel,
  teacherToday,
  submissions,
  review,
  syllabus,
  gradebook,
  enrollmentPipeline,
  enrollmentForm,
  appointment,
  gateQueue,
  gateVerify,
  admin,
  timetable,
  teacherTimetable,
  exams,
  clubs,
  account,
  cafeteria,
  financeOverview,
  studentHome,
} = data;

export const focusChild = children.find((c) => c.id === focusChildId) ?? children[0]!;
