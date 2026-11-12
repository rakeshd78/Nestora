import React, { useState } from 'react';
import { X, Check, ArrowRight, Loader2 } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Project } from '../types';
import { useAuth } from '../context/AuthContext';

interface ProjectEnquiryModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectEnquiryModal: React.FC<ProjectEnquiryModalProps> = ({ project, isOpen, onClose }) => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !project) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    const enquiryId = `enquiry-${Date.now()}`;
    try {
      await setDoc(doc(db, 'projectEnquiries', enquiryId), {
        id: enquiryId,
        projectId: project.id,
        projectName: project.name,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || 'Not specified',
        notes: notes.trim() || `Inquiry regarding ${project.name} concept and specifications`,
        createdAt: new Date().toISOString(),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit enquiry:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#F7F3EE] border border-[#E3DACF] shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-[#7A7167] hover:text-[#171512] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#171512] text-white flex items-center justify-center">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#7A7167]">
              • PROJECT ENQUIRY RECEIVED
            </span>
            <h3 className="font-serif text-3xl text-[#171512]">Thank You, {name.split(' ')[0]}</h3>
            <p className="text-xs text-[#5C554E] max-w-sm mx-auto leading-relaxed">
              We have received your enquiry regarding <strong className="text-[#171512]">{project.name}</strong>. A project director will share the full case monograph and feasibility information.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 bg-[#171512] text-[#F7F3EE] text-xs uppercase tracking-widest hover:bg-[#2C2723]"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#7A7167]">
                • PROJECT ENQUIRY
              </span>
              <h2 className="font-serif text-3xl text-[#171512]">{project.name}</h2>
              <p className="text-xs text-[#7A7167]">
                {project.location} • Budget: {project.price}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#4A433D] uppercase tracking-wider mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full bg-[#EEE7DE] border border-[#D8CEBF] px-3.5 py-2.5 text-[#171512] focus:outline-none focus:border-[#171512]"
                />
              </div>

              <div>
                <label className="block text-[#4A433D] uppercase tracking-wider mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full bg-[#EEE7DE] border border-[#D8CEBF] px-3.5 py-2.5 text-[#171512] focus:outline-none focus:border-[#171512]"
                />
              </div>

              <div>
                <label className="block text-[#4A433D] uppercase tracking-wider mb-1">Phone (Optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-[#EEE7DE] border border-[#D8CEBF] px-3.5 py-2.5 text-[#171512] focus:outline-none focus:border-[#171512]"
                />
              </div>

              <div>
                <label className="block text-[#4A433D] uppercase tracking-wider mb-1">
                  Questions or Project Scope
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={`Inquiring about material finishes, budget, or architectural drawings for ${project.name}...`}
                  className="w-full bg-[#EEE7DE] border border-[#D8CEBF] p-3 text-[#171512] focus:outline-none focus:border-[#171512]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#171512] text-[#F7F3EE] uppercase tracking-widest text-xs font-medium hover:bg-[#2C2723] transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Enquiry...
                  </>
                ) : (
                  <>
                    Request Project Monograph
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
