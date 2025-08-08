export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export const scrollToPricing = () => scrollToSection('pricing');
export const scrollToHome = () => scrollToSection('home');
export const scrollToHowItWorks = () => scrollToSection('how-it-works');
export const scrollToFeatures = () => scrollToSection('features');
