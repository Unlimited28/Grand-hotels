import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1920&q=80"
            alt="About Grand Commodores"
            fill
            className="object-cover brightness-[0.5]"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-7xl font-serif font-bold mb-4 italic">Our Story</h1>
          <p className="text-lg uppercase tracking-[0.4em] opacity-80">Hospitality Reimagined</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-24">
          <div>
            <h2 className="text-primary text-sm uppercase tracking-widest mb-4 font-bold">About Us</h2>
            <h3 className="text-4xl font-serif font-bold mb-8">Elegance and Comfort in the Heart of Oyo</h3>
            <p className="text-foreground/70 mb-6 leading-relaxed text-lg">
              Grand Commodores Hotel and Suites is a premier hospitality destination located in Isokun, Oyo. We pride ourselves on providing a home away from home for both business executives and leisure travelers.
            </p>
            <p className="text-foreground/70 mb-8 leading-relaxed">
              Our journey began with a simple vision: to create a space where luxury meets local warmth. Today, we stand as a beacon of excellence in the Oyo hospitality industry, known for our attentive service, modern facilities, and unwavering commitment to guest satisfaction.
            </p>
            <div className="border-l-4 border-primary pl-6 py-2 italic text-xl font-serif text-foreground/80">
              "To be the leading hospitality provider in Oyo, offering unmatched luxury and personalized service."
            </div>
          </div>
          <div className="relative h-[500px] shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1551882547-ff43c63fedfe?auto=format&fit=crop&w=800&q=80"
              alt="Hotel Experience"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Landmarks */}
        <div className="bg-secondary/20 p-12 md:p-20">
          <h3 className="text-3xl font-serif font-bold mb-12 text-center italic">Nearby Landmarks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 border-b-4 border-primary/20">
              <h4 className="text-xl font-serif font-bold mb-4 text-primary">Old Oyo National Park</h4>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Explore the rich history and diverse wildlife of the Old Oyo National Park, located just a short drive from our hotel. A perfect destination for nature lovers and history buffs.
              </p>
            </div>
            <div className="bg-white p-8 border-b-4 border-primary/20">
              <h4 className="text-xl font-serif font-bold mb-4 text-primary">Akesan Market</h4>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Experience the vibrant local culture and traditional commerce at Akesan Market, the historic heart of Oyo Town's trading activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-primary text-sm uppercase tracking-widest mb-4 font-bold">Contact Us</h2>
              <h3 className="text-4xl font-serif font-bold mb-12 italic text-white">Get In Touch</h3>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="text-2xl text-primary">📍</div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-2 opacity-60">Address</h4>
                    <p className="text-lg">Eyin Cele Rd, Isokun, Oyo, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="text-2xl text-primary">📞</div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-2 opacity-60">Phone</h4>
                    <p className="text-lg">+234 802 235 2108</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="text-2xl text-primary">✉️</div>
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-2 opacity-60">Email</h4>
                    <p className="text-lg">info@grandcommodores.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 w-full h-64 grayscale contrast-125 overflow-hidden">
                 {/* Google Maps Placeholder - In production use real iframe */}
                 <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary/50 text-xs tracking-widest uppercase italic">
                   [ Google Maps Integration ]
                 </div>
              </div>
            </div>

            <div className="bg-white p-10 shadow-2xl">
              <h4 className="text-2xl font-serif font-bold mb-8 text-foreground italic text-center">Send Us a Message</h4>
              <form className="space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2 block">Your Name</label>
                  <input type="text" className="w-full border-b border-primary/20 p-3 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2 block">Email Address</label>
                  <input type="email" className="w-full border-b border-primary/20 p-3 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2 block">Message</label>
                  <textarea rows={4} className="w-full border-b border-primary/20 p-3 text-foreground focus:outline-none focus:border-primary transition-colors" placeholder="How can we help you?"></textarea>
                </div>
                <button className="w-full bg-primary text-white py-4 uppercase text-xs font-bold tracking-widest hover:bg-foreground transition-all">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
