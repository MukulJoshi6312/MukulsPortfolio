export type Profile = {
  name: string;
  shortName: string;
  role: string;
  location: string;
  email: string;
  available: boolean;
  availabilityText: string;
  tagline: string;
  intro: string;
  subIntro: string;
  bio: string;
  geo: { latitude: number; longitude: number; label: string };
  stats: { label: string; value: number; suffix: string }[];
  socials: { title: string; href: string }[];
};

export type Project = {
  id: string;
  company: string;
  year: string;
  title: string;
  results: string[];
  stack: string[];
  link: string;
  githubLink: string;
  image: string;
};

export type Experience = {
  id: number;
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  skills: string[];
  showTeam: boolean;
};

export type Testimonial = {
  id: number;
  name: string;
  position: string;
  text: string;
  avatar: string;
  rating: number;
};

export type Faq = {
  id: number;
  title: string;
  description: string;
};

export type SkillTool = {
  title: string;
  icon: string;
  level: number;
};

export type Hobby = {
  title: string;
  emoji: string;
  top: string;
  left: string;
};

export type Skills = {
  tools: SkillTool[];
  hobbies: Hobby[];
};

export type Company = {
  name: string;
  logo: string;
};

export type ApproachItem = {
  id: number;
  phase: string;
  title: string;
  description: string;
  icon: string;
};

export type TeamMember = {
  id: number;
  src: string;
  alt: string;
};

export type Theme = "dark" | "light" | "cyberpunk";
