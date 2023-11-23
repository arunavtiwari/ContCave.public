import ClientOnly from "@/components/ClientOnly";
import Navbar from "@/components/navbar/Navbar";
import { Nunito } from "next/font/google";
import "../styles/globals.css";  // Import your global styles
import Footer from "@/app/Footer";
import Container from "@/components/Container";

const font = Nunito({
    subsets: ["latin"],
});

function About() {
    return (
        <div>
            <ClientOnly>
                <Navbar />
                <Container>
                    <div className="pt-40 pb-60">
                        <div className="container mx-auto mt-8 p-8 bg-white shadow-lg">
                            <h1 className="text-3xl font-semibold mb-4">About Us</h1>

                            <p className="text-gray-700">
                                Welcome to our amazing world of creativity and innovation. At Contcave, we strive to provide a platform for content creators to express their unique visions. Our mission is to connect people with inspiring locations, fostering a community that celebrates storytelling through visuals.
                            </p>
                            <p className="text-gray-700 mt-4">
                                Join us on this journey as we continue to redefine the way content is created and experienced. We believe in the power of imagination, and we are dedicated to supporting creators in bringing their ideas to life.
                            </p>
                        </div>
                    </div>
                </Container>
            </ClientOnly>
            <Footer />
        </div>
    );
}

export default About;
