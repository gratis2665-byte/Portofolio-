export interface PersonalInfo {
  fullName: string;
  name?: string;
  title: string;
  location: string;
  bio: string;
  email: string;
  whatsappNumber: string;
  linkedinUrl?: string;
  githubUrl?: string;
  availabilityStatus?: string;
  specializations: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'cloud' | 'enterprise' | 'ai' | 'training' | string;
  description: string;
  longDescription?: string;
  architectureHighlights?: string[];
  impactMetrics?: string[];
  technologies: string[];
  role?: string;
  timeline?: string;
  clientOrOrg?: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyAvailable?: boolean;
  featured?: boolean;
  image?: string;
  imageUrl?: string;
}

export interface TrainingProgram {
  id: string;
  title: string;
  targetAudience: string;
  level: 'Fundamental' | 'Intermediate' | 'Advanced' | 'Executive' | string;
  duration: string;
  description: string;
  syllabus: {
    moduleNumber: number;
    title: string;
    topics: string[];
    handsOnLab: string;
  }[];
  prerequisites?: string[];
  outcomes: string[];
  iconName: string;
  popular?: boolean;
}

export interface TrainingStat {
  id: string;
  label: string;
  value: string;
  numericValue?: number;
  suffix?: string;
  subtext: string;
  icon?: string;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface EducationCertification {
  name: string;
  issuer: string;
  year: string;
  badgeUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  honors?: string;
  description: string;
  certifications?: EducationCertification[];
}

export type Education = EducationItem;

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'corporate' | 'bootcamp' | 'conference' | 'university' | string;
  date: string;
  location: string;
  client: string;
  participantCount: number;
  description: string;
  shortStory?: string;
  quote?: string;
  takeaway?: string;
  imageUrl: string;
  fallbackUrl?: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
  content: string;
  category: 'corporate' | 'bootcamp' | 'mentorship' | string;
  rating: number;
  trainingTopic: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedDate: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  icon: string;
}

export interface WhatsAppTemplate {
  id: string;
  title: string;
  description: string;
  message: string;
  topic: string;
}
