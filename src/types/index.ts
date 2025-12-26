
export enum ViewState {
  HOME = 'HOME',
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

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
      group: any;
      mesh: any;
      torusGeometry: any;
      meshStandardMaterial: any;
      icosahedronGeometry: any;
      meshPhysicalMaterial: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
    }
  }
}
