import AboutUs1 from "./AboutUs1";
import Community from "./Community";
import OurMission from "./OurMission";

export default function AboutPage() {
  return (
    <main className="container">
      <h3 className="fw-bold fs-1 text-center mt-5">About Us</h3>
      <AboutUs1 />
      <OurMission />
      <Community />
    </main>
  );
}
