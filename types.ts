
export enum ViewState {
  HOME = 'HOME',
  AI_STUDIO = 'AI_STUDIO',
  BUSINESS = 'BUSINESS',
  PORTFOLIO = 'PORTFOLIO',
  SOLUTIONS = 'SOLUTIONS',
  ABOUT = 'ABOUT',
  CAREERS = 'CAREERS',
  CONTACT = 'CONTACT',
  LEGAL = 'LEGAL'
}

export interface BusinessEntity {
  name: string;
  description: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type AspectRatio = "16:9" | "9:16";
export type ImageSize = "1K" | "2K" | "4K";