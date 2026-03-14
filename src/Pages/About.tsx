import SEO from "../components/SEO";
import AboutComponent from "../components/home/About";

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Digital Delivery — our mission, vision, and the team behind Nigeria's trusted international logistics and cross-border shipping platform."
        canonical="/about"
      />
      <AboutComponent />
    </>
  );
}
