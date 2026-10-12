import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Closing } from "@/components/sections/Closing";
import { ControlCenter } from "@/components/sections/ControlCenter";
import { Engagement } from "@/components/sections/Engagement";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Practices } from "@/components/sections/Practices";
import { Sectors } from "@/components/sections/Sectors";
import { Stack } from "@/components/sections/Stack";
import { Ticker } from "@/components/sections/Ticker";
import { Trust } from "@/components/sections/Trust";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Manifesto />
        <Practices />
        <Stack />
        <ControlCenter />
        <Engagement />
        <Trust />
        <Sectors />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
