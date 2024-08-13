import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section id="about" className="text-center my-16">
        <SectionHeaders subHeader={'Our story'} mainHeader={'About Us'} />
        <div className="flex flex-col gap-4 max-w-md mx-auto text-gray-500 mt-4">
          <p>Welcome to Burger Hut!</p>
          <p>At Burger Hut, we're passionate about crafting the perfect burger experience. Our journey began with a simple idea: to create delicious, high-quality burgers that bring people together. We believe that great food starts with great ingredients.</p>
          <p>Our team of dedicated chefs and food enthusiasts works tirelessly to innovate and bring new flavors to your table. From classic cheeseburgers to gourmet specialties, every burger is made to order, ensuring you get the freshest and most flavorful meal every time you visit us.</p>
          <p>Thank you for choosing Burger Hut. We look forward to serving you and making every bite a memorable one!</p>
        </div>
      </section>
      <section id="contact" className="text-center my-8">
        <SectionHeaders subHeader={'Don\'t Hesitate '} mainHeader={'Contact Us'} />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+9988771234">+9988771234</a>
        </div>
      </section>
    </>
  );
}
