import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-serif text-dark mb-4">Contact Us</h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We are here to assist you. Reach out to us for any inquiries or special requests.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="bg-cream p-3 rounded-xl text-gold">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-dark mb-2">Our Location</h3>
                  <p className="text-gray-600">123 Luxury Avenue, Victoria Island, Lagos, Nigeria</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="bg-cream p-3 rounded-xl text-gold">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-dark mb-2">Phone</h3>
                  <p className="text-gray-600">+234 800 GRAND COM</p>
                  <p className="text-gray-600">+234 123 456 7890</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="bg-cream p-3 rounded-xl text-gold">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-dark mb-2">Email</h3>
                  <p className="text-gray-600">info@grandcommodores.com</p>
                  <p className="text-gray-600">reservations@grandcommodores.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="bg-cream p-3 rounded-xl text-gold">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-dark mb-2">Opening Hours</h3>
                  <p className="text-gray-600">Reception: 24/7</p>
                  <p className="text-gray-600">Restaurant: 06:00 - 23:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-2xl shadow-xl">
              <h2 className="text-3xl font-serif text-dark mb-8">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
