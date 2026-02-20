export default function TermsOfService() {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-background">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-serif mb-8 text-foreground">Terms of Service</h1>
        <div className="prose prose-slate max-w-none text-gray-600 space-y-6">
          <p>Effective Date: February 20, 2026</p>
          <p>By using our services, you agree to the following terms and conditions.</p>
          <h2 className="text-xl font-bold text-foreground">Booking & Cancellation</h2>
          <p>Bookings are subject to availability. Cancellation policies vary by room type and will be provided at the time of booking.</p>
          <h2 className="text-xl font-bold text-foreground">Guest Conduct</h2>
          <p>Guests are expected to follow hotel rules and respect other guests and staff.</p>
          <h2 className="text-xl font-bold text-foreground">Liability</h2>
          <p>The hotel is not liable for loss of personal belongings unless caused by our negligence.</p>
        </div>
      </div>
    </main>
  );
}
