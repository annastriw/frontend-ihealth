import Footer from "@/components/atoms/footer/Footer";
import SectionTitleSecondary from "@/components/atoms/typography/SectionTitleSecondary";
import AboutUsWrapper from "@/components/organisms/about-us/AboutUsWrapper";
import Navbar from "@/components/organisms/navbar/Navbar";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <section className="pad-x-xl">
        <SectionTitleSecondary title="Tentang Kami" />
        <AboutUsWrapper />
      </section>
      <Footer />
    </>
  );
}
