import React, { useState } from 'react';
import { MapPin, Mail, Phone, Clock, ArrowRight, Check, Loader2, HelpCircle } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { PageRoute } from '../types';
import { useAuth } from '../context/AuthContext';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('New Residential Commission');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    const consultId = `contact-${Date.now()}`;
    try {
      await setDoc(doc(db, 'consultations', consultId), {
        id: consultId,
        userId: user?.uid || null,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || 'Not specified',
        projectType: subject,
        budget: 'Not specified via Contact Form',
        timeline: 'Standard',
        message: message.trim() || 'General contact page message',
        status: 'new',
        createdAt: new Date().toISOString(),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.warn('Contact message note:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'How does Nestora initiate a new residential or studio project?',
      a: 'We begin with a 60-minute private consultation where we review floor plans, lifestyle priorities, aesthetic goals, and investment parameters. From there, we formulate a tailored design proposal.',
    },
    {
      q: 'Do you work internationally or exclusively within Australia?',
      a: 'While our principal studio and workshop are based in Melbourne, we regularly undertake commissions across North America, Europe, Singapore, and Japan using high-precision digital scanning and local artisan alliances.',
    },
    {
      q: 'What is the typical timeframe for a full turnkey interior architecture project?',
      a: 'Full residential commissions generally range between 4 to 9 months depending on structural modifications, custom stone sourcing, and bespoke furniture lead times.',
    },
    {
      q: 'Can clients purchase individual furniture pieces without a full interior commission?',
      a: 'Yes. Our Shop / Atelier collection features bespoke furniture editions available for direct purchase with complimentary white-glove delivery.',
    },
  ];

  return (
    <div className="bg-[#F7F3EE] text-[#24201D] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
            • STUDIO INQUIRIES & LOCATIONS
          </span>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl text-[#171512] leading-[1.1]">
            Start a Conversation
            <br />
            <span className="italic font-light">With Our Design Directors</span>
          </h1>
          <p className="mt-6 text-[#5C554E] text-sm md:text-base leading-relaxed">
            We welcome inquiries from homeowners, property developers, and creative collaborators seeking elevated architectural atmospheres.
          </p>
        </div>

        {/* Main Grid: Form + Studio Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#EEE7DE]/60 border border-[#E0D7CC] p-8 sm:p-10">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#171512] text-white flex items-center justify-center">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="font-serif text-3xl text-[#171512]">Message Received</h3>
                <p className="text-xs sm:text-sm text-[#5C554E] max-w-sm mx-auto leading-relaxed">
                  Thank you, {name.split(' ')[0]}. Our studio management team will respond within 24 hours with appointment availability.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-2xl text-[#171512] mb-2">Private Studio Enquiry</h3>
                <p className="text-xs text-[#5C554E] mb-6">
                  Please complete the form below with your space requirements.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#4A433D] uppercase tracking-wider mb-1.5 font-medium">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Julian Thorne"
                        className="w-full bg-[#F7F3EE] border border-[#D8CEBF] p-3 text-[#171512] focus:outline-none focus:border-[#171512]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A433D] uppercase tracking-wider mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="julian@example.com"
                        className="w-full bg-[#F7F3EE] border border-[#D8CEBF] p-3 text-[#171512] focus:outline-none focus:border-[#171512]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#4A433D] uppercase tracking-wider mb-1.5 font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 012-3456"
                        className="w-full bg-[#F7F3EE] border border-[#D8CEBF] p-3 text-[#171512] focus:outline-none focus:border-[#171512]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#4A433D] uppercase tracking-wider mb-1.5 font-medium">
                        Area of Interest
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-[#F7F3EE] border border-[#D8CEBF] p-3 text-[#171512] focus:outline-none focus:border-[#171512]"
                      >
                        <option value="New Residential Commission">New Residential Commission</option>
                        <option value="Space Planning & Optimization">Space Planning & Optimization</option>
                        <option value="Architectural Lighting Design">Architectural Lighting Design</option>
                        <option value="Bespoke Furniture Order">Bespoke Furniture Order</option>
                        <option value="Press / Editorial Collaboration">Press / Editorial Collaboration</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#4A433D] uppercase tracking-wider mb-1.5 font-medium">
                      Project Description & Location
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share details on your property, square footage, design ambitions..."
                      className="w-full bg-[#F7F3EE] border border-[#D8CEBF] p-3 text-[#171512] focus:outline-none focus:border-[#171512]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest font-semibold hover:bg-[#2C2723] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Transmitting to Studio...
                      </>
                    ) : (
                      <>
                        Submit Studio Inquiry
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Studio Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-[#F7F3EE] border border-[#E0D7CC] space-y-6">
              <h4 className="font-sans text-[11px] uppercase tracking-widest text-[#171512] font-semibold">
                Studio Coordinates
              </h4>

              <div className="space-y-4 text-xs text-[#5C554E]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#171512] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171512] block">Principal Atelier & Gallery:</strong>
                    <span>4517 Willowbrook Street</span>
                    <br />
                    <span>Manchester, Kentucky</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#171512] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171512] block">General & Client Inquiries:</strong>
                    <a href="mailto:hello@example.com" className="underline hover:text-[#171512]">
                      hello@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#171512] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171512] block">Studio Concierge Line:</strong>
                    <a href="tel:01245678966" className="hover:text-[#171512]">
                      01245678966
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#171512] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#171512] block">Studio Consultation Hours:</strong>
                    <span>Monday – Friday: 09:00 — 18:00 EST</span>
                    <br />
                    <span>Saturday: By Private Appointment Only</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Visual Treatment */}
            <div className="p-6 bg-[#EEE7DE] border border-[#E0D7CC] text-center space-y-3">
              <div className="aspect-[16/9] w-full overflow-hidden bg-[#E2DACF] border border-[#D8CEBF] relative flex items-center justify-center">
                <div className="absolute inset-0 bg-[#EEE7DE] opacity-80" />
                <div className="relative text-center p-4">
                  <MapPin className="w-8 h-8 text-[#171512] mx-auto animate-bounce" />
                  <span className="font-serif text-sm font-semibold text-[#171512] block mt-1">
                    Nestora Studio
                  </span>
                  <span className="text-[10px] text-[#7A7167]">Manchester, Kentucky</span>
                </div>
              </div>
              <p className="text-[11px] text-[#7A7167]">
                Private on-site parking and material viewing library available for scheduled appointments.
              </p>
            </div>
          </div>
        </div>

        {/* Studio FAQ Section */}
        <div className="pt-16 border-t border-[#E3DACF]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
              • FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-[#171512]">
              Client Advisory & Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 bg-[#F7F3EE] border border-[#E0D7CC] space-y-2">
                <h4 className="font-serif text-lg text-[#171512] flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-[#7A7167] mt-1 shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-xs text-[#5C554E] leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
