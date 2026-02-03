import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProcessFlow from "@/components/ProcessFlow";
import FeatureGrid from "@/components/FeatureGrid";
import SecuritySuite from "@/components/SecuritySuite";
import HowItWorks from "@/components/HowItWorks";
import UploadPanel from "@/components/UploadPanel";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "No-Code MCP Generator",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "Generate secure, production-ready MCP servers from OpenAPI specs with auth injection and rate limiting.",
  url: siteUrl,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Header />
        <Hero />
        <ProcessFlow />
        <FeatureGrid />
        <SecuritySuite />
        <HowItWorks />
        <UploadPanel />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
