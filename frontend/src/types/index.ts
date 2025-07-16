export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  googleId: string;
}

export interface Resume {
  id: string;
  userId: string;
  name: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  parsedContent: string;
  isActive: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
  userId: string;
  resumeId: string;
  companyName: string;
  positionTitle: string;
  jobDescription: string;
  recruiterEmail: string;
  generatedEmail: string;
  status: ApplicationStatus;
  googleSheetUrl?: string;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
}

export enum ApplicationStatus {
  APPLIED = 'APPLIED',
  INTERVIEW_SCHEDULED = 'INTERVIEW_SCHEDULED',
  INTERVIEW_COMPLETED = 'INTERVIEW_COMPLETED',
  REJECTED = 'REJECTED',
  OFFER_RECEIVED = 'OFFER_RECEIVED',
  ACCEPTED = 'ACCEPTED',
  WITHDRAWN = 'WITHDRAWN',
}

export interface EmailLog {
  id: string;
  applicationId: string;
  emailSubject: string;
  emailBody: string;
  sentAt: string;
  status: EmailStatus;
  errorMessage?: string;
}

export enum EmailStatus {
  SENT = 'SENT',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}