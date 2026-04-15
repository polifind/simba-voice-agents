export interface CTA {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface HeroData {
  headline: string;
  subheadline: string;
  primaryCTA: CTA;
  secondaryCTA: CTA;
}

export interface LogoItem {
  name: string;
}

export interface IntroCard {
  title: string;
  description: string;
}

export interface IntroData {
  sectionLabel: string;
  headline: string;
  description?: string;
  cards: IntroCard[];
}

export interface WorkflowItem {
  title: string;
  description: string;
  conversation?: { role: 'user' | 'agent'; text: string }[];
}

export interface WorkflowData {
  headline: string;
  description?: string;
  items: WorkflowItem[];
}

export interface StatsData {
  value: string;
  label: string;
}

export interface TabItem {
  label: string;
  title: string;
  description: string;
}

export interface PlatformFeaturesData {
  headline: string;
  description?: string;
  tabs: TabItem[];
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface FeatureGridData {
  headline?: string;
  description?: string;
  features: FeatureItem[];
}

export interface VoiceSectionData {
  headline: string;
  description?: string;
  features: FeatureItem[];
}

export interface SecurityData {
  headline?: string;
  features: FeatureItem[];
}

export interface GettingStartedData {
  headline: string;
  webOption: {
    title: string;
    description: string;
    ctas: CTA[];
  };
  apiOption: {
    title: string;
    description: string;
    ctas: CTA[];
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RelatedItem {
  title: string;
  description: string;
  href: string;
}

export interface IndustryItem {
  name: string;
  description: string;
}

export interface IndustryDeepDiveData {
  headline: string;
  industries: IndustryItem[];
}

export interface TestimonialData {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface PageData {
  meta: {
    title: string;
    description: string;
  };
  hero: HeroData;
  logos: LogoItem[];
  intro: IntroData;
  workflows?: WorkflowData;
  industryDeepDive?: IndustryDeepDiveData;
  stats?: StatsData;
  platformFeatures?: PlatformFeaturesData;
  featureGrid?: FeatureGridData;
  voiceSection?: VoiceSectionData;
  testimonial?: TestimonialData;
  enterpriseSecurity?: SecurityData;
  gettingStarted?: GettingStartedData;
  faq: { questions: FAQItem[] };
  relatedUseCases?: RelatedItem[];
}
