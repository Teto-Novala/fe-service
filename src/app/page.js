import TopNavbar from "@/components/TopNavbar";
import Home from "./(sites)/home/page";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="bg-light">
      <TopNavbar />
      <Home />
      <Footer />
    </main>
  );
}
