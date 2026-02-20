"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg text-sm">
          Your message has been sent successfully! We will get back to you soon.
        </div>
      )}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Full Name</label>
        <Input
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Email Address</label>
        <Input
          name="email"
          type="email"
          placeholder="your@email.com"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Message</label>
        <textarea
          name="message"
          placeholder="How can we help you?"
          required
          rows={5}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-dark hover:bg-gold text-white py-6 text-lg"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
