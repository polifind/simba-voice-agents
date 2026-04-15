import { HeroSection } from '@/components/sections/HeroSection';
import { LogoBar } from '@/components/sections/LogoBar';
import { IntroSection } from '@/components/sections/IntroSection';
import { WorkflowShowcase } from '@/components/sections/WorkflowShowcase';
import { StatsCounter } from '@/components/sections/StatsCounter';
import { PlatformFeatures } from '@/components/sections/PlatformFeatures';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { VoiceSection } from '@/components/sections/VoiceSection';
import { IndustryDeepDive } from '@/components/sections/IndustryDeepDive';
import { EnterpriseSecuritySection } from '@/components/sections/EnterpriseSecuritySection';
import { GettingStartedCTA } from '@/components/sections/GettingStartedCTA';
import { FAQSection } from '@/components/sections/FAQSection';
import { RelatedUseCases } from '@/components/sections/RelatedUseCases';
import type { PageData } from './types';

interface StandardPageTemplateProps {
  data: PageData;
}

export function StandardPageTemplate({ data }: StandardPageTemplateProps) {
  return (
    <>
      <HeroSection data={data.hero} />
      <LogoBar />
      <IntroSection data={data.intro} />
      {data.workflows && <WorkflowShowcase data={data.workflows} />}
      {data.industryDeepDive && <IndustryDeepDive data={data.industryDeepDive} />}
      {data.stats && <StatsCounter data={data.stats} />}
      {data.platformFeatures && <PlatformFeatures data={data.platformFeatures} />}
      {data.featureGrid && <FeatureGrid data={data.featureGrid} />}
      {data.voiceSection && <VoiceSection data={data.voiceSection} />}
      {data.enterpriseSecurity && <EnterpriseSecuritySection data={data.enterpriseSecurity} />}
      {data.gettingStarted && <GettingStartedCTA data={data.gettingStarted} />}
      <FAQSection questions={data.faq.questions} />
      {data.relatedUseCases && <RelatedUseCases items={data.relatedUseCases} />}
    </>
  );
}
