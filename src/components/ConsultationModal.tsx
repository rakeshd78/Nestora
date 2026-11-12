import React, { useState } from 'react';
import { X, Check, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from '../context/AuthContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectType?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultProjectType = 'Residential Interior Architecture',
}) => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState(defaultProjectType);
  const [budget, setBudget] = useState('$150,000 – $350,000');
  const [timeline, setTimeline] = useState('Within 3–6 Months');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please provide your name and email address.');
      return;
    }

    setIsSubmitting(true);
    const consultationId = `consult-${Date.now()}`;
    const collectionPath = 'consultations';

    try {
      await setDoc(doc(db, collectionPath, consultationId), {
        id: consultationId,
        userId: user?.uid || null,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || 'Not specified',
        projectType,
        budget,
        timeline,
        message: message.trim() || 'General design consultation inquiry',
        status: 'new',
        createdAt: new Date().toISOString(),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error saving consultation:', err);
      // As specified in skill, handleFirestoreError or show user feedback
      try {
        handleFirestoreError(err, OperationType.CREATE, collectionPath);
      } catch (e) {
        setErrorMsg('We could not send your request right now. Please try again or reach out directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div
        className="relative w-full max-w-xl bg-[#F7F3EE] border border-[#E3DACF] shadow-2xl p-8 md:p-10 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 p-2 text-[#7A7167] hover:text-[#171512] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#171512] text-white flex items-center justify-center">
              <Check className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="inline-block text-xs uppercase tracking-widest text-[#7A7167] font-medium">
              • CONSULTATION REQUEST RECEIVED
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-[#171512]">
              Thank You, {name.split(' ')[0]}
            </h3>
            <p className="text-[#5C554E] text-sm leading-relaxed max-w-md mx-auto">
              Our principal design studio director will review your project details and reach out within 24 business hours to schedule your private design session.
            </p>
            <div className="pt-4">
              <button
                onClick={handleResetAndClose}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest hover:bg-[#2C2723] transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#7A7167] font-medium">
                • PRIVATE STUDIO APPOINTMENT
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#171512]">
                Start Your Project
              </h2>
              <p className="text-xs text-[#5C554E] pt-1">
                Tell us about your space, aesthetic vision, and aspirations.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4A433D] uppercase tracking-wider mb-1.5 font-medium">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Julian Hayes"
                    className="w-full bg-[#EEE7DE] border border-[#D8CEBF] px-3.5 py-2.5 text-[#171512] placeholder-[#9A8F82] focus:outline-none focus:border-[#171512]"
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
                    className="w-full bg-[#EEE7DE] border border-[#D8CEBF] px-3.5 py-2.5 text-[#171512] placeholder-[#9A8F82] focus:outline-none focus:border-[#171512]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4A433D] uppercase tracking-wider mb-1.5 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 234-5678"
                    className="w-full bg-[#EEE7DE] border border-[#D8CEBF] px-3.5 py-2.5 text-[#171512] placeholder-[#9A8F82] focus:outline-none focus:border-[#171512]"
                  />
                </div>
                <div>
                  <label className="block text-[#4A433D] uppercase tracking-wider mb-1.5 font-medium">
                    Project Type
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-[#EEE7DE] border border-[#D8CEBF] px-3.5 py-2.5 text-[#171512] focus:outline-none focus:border-[#171512]"
                  >
                    <option value="Residential Living Architecture">Residential Living Architecture</option>
                    <option value="Space Planning & Optimization">Space Planning & Optimization</option>
                    <option value="Lighting Architecture Design">Lighting Architecture Design</option>
                    <option value="Bespoke Furniture & Styling">Bespoke Furniture & Styling</option>
                    <option value="Commercial / Boutique Studio">Commercial / Boutique Studio</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#4A433D] uppercase tracking-wider mb-1.5 font-medium">
                    Estimated Budget Range
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#EEE7DE] border border-[#D8CEBF] px-3.5 py-2.5 text-[#171512] focus:outline-none focus:border-[#171512]"
                  >
                    <option value="$50,000 – $150,000">$50,000 – $150,000</option>
                    <option value="$150,000 – $350,000">$150,000 – $350,000</option>
                    <option value="$350,000 – $750,000">$350,000 – $750,000</option>
                    <option value="$750,000+">$750,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#4A433D] uppercase tracking-wider mb-1.5 font-medium">
                    Project Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-[#EEE7DE] border border-[#D8CEBF] px-3.5 py-2.5 text-[#171512] focus:outline-none focus:border-[#171512]"
                  >
                    <option value="Immediate (Within 1–2 months)">Immediate (Within 1–2 months)</option>
                    <option value="Within 3–6 Months">Within 3–6 Months</option>
                    <option value="6–12 Months Planning">6–12 Months Planning</option>
                    <option value="Exploring Feasibility">Exploring Feasibility</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#4A433D] uppercase tracking-wider mb-1.5 font-medium">
                  Project Notes & Space Details
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about the property, square footage, aesthetic goals, or specific challenges..."
                  className="w-full bg-[#EEE7DE] border border-[#D8CEBF] p-3.5 text-[#171512] placeholder-[#9A8F82] focus:outline-none focus:border-[#171512]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#171512] text-[#F7F3EE] uppercase tracking-widest text-xs font-medium hover:bg-[#2C2723] transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting to Studio...
                    </>
                  ) : (
                    <>
                      Schedule Consultation
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
