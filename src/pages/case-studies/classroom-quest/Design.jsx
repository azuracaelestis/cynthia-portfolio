import landingPageDesign from '../../../assets/case study/case-study-classroom-quest/design/landing-page-design.png';
import chooseYourCompanionDesign from '../../../assets/case study/case-study-classroom-quest/design/choose-your-companion-design.png';
import ImagePlaceholder from '../../../components/case-study/ImagePlaceholder';
import Section from '../../../components/case-study/Section';

export default function Design() {
  return (
    <Section id="design" eyebrow="DESIGN" title="Here's what teachers actually played.">
      <div className="flex flex-col gap-6">
        <img
          src={landingPageDesign}
          alt="Landing Page, desktop and mobile: 'Welcome to the Classroom Quest' hero banner with an 'Embark on Your Quest' CTA, illustrated classroom-hero characters, and intro copy."
          className="w-full h-auto rounded-2xl"
        />
        <img
          src={chooseYourCompanionDesign}
          alt="Choose Your Companion, desktop and mobile: a 'Choose Your Avatar for Today's Quest' screen with four character cards and an 'I'm Ready' CTA on the selected card."
          className="w-full h-auto rounded-2xl"
        />
        <ImagePlaceholder className="h-64 lg:h-96" />
        <ImagePlaceholder className="h-64 lg:h-96" />
      </div>
    </Section>
  );
}
