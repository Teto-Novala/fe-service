import Footer from "@/components/Footer";
import TopNavbar from "@/components/TopNavbar";
import React from "react";

export default function layout({ children }) {
  return (
    <section>
      <TopNavbar />
      {children}
      <Footer />
    </section>
  );
}
