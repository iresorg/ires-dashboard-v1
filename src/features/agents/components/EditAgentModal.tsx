import React, { useState, useEffect } from "react";
import PencilIcon from "@/shared/assets/icons/pencil.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";
import { SingleFileUpload } from "@/shared/components/SingleFileUpload";
import type { AgentProfile } from "@/features/agents/services/agentService";

export interface Agent extends Omit<AgentProfile, 'avatar'> {
  avatar?: string; // Override to use string for form handling
  avatarFile?: File | null; // New: optional avatar file to send to backend
}

interface Props {
  agent: Agent;
  onClose: () => void;
  onSave: (agent: Agent) => void;
}

const EditAgentModal: React.FC<Props> = ({ agent, onClose, onSave }) => {
  const [form, setForm] = useState<Agent>({
    ...agent,
    avatarFile: null,
  });
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    // Simulate loading state for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, []);

  // Update form when agent prop changes
  useEffect(() => {
    setForm({
      ...agent,
      avatarFile: null,
    });
  }, [agent]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (file: File) => {
    setSelectedAvatarFile(file);
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.avatar;
      return newErrors;
    });
  };

  const handleAvatarRemove = () => {
    setSelectedAvatarFile(null);
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.avatar;
      return newErrors;
    });
  };

  const handleAvatarError = (error: string) => {
    setErrors(prev => ({ ...prev, avatar: error }));
  };

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!form.firstName.trim()) e.firstName = "First name required";
    if (!form.lastName.trim()) e.lastName = "Last name required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      try {
        // Pass through avatarFile (if selected) to parent; backend will handle upload
        onSave({
          ...form,
          avatarFile: selectedAvatarFile ?? null,
        });

        onClose();
      } catch (error) {
        console.error('Error preparing update:', error);
        setErrors(prev => ({ ...prev, avatar: 'Failed to process image' }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative z-10 bg-white rounded-lg shadow-md px-6 py-12 w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-center mb-6 space-x-1">
          <h2 className="text-xl font-semibold text-center">Edit Agent</h2>
          <img src={PencilIcon} alt="Edit Agent" className="w-5 h-6" />
        </div>
        <div className="absolute top-2 right-2 cursor-pointer">
          <img
            src={CloseIcon}
            alt="Close/Cancel"
            onClick={onClose}
            className="w-4 h-4"
          />
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {isLoading ? (
            // Loading state with skeletons
            <div className="flex flex-col items-center space-y-5">
              <div className="w-[70%]">
                <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
              <div className="w-[70%]">
                <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
              <div className="w-[70%]">
                <div className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
              <div className="w-[70%]">
                <div className="h-20 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
              <div className="w-20">
                <div className="h-10 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          ) : (
            // Actual form content
            <div className="flex flex-col items-center space-y-5">
              <div className="w-[70%]">
                <input
                  type="text"
                  name="firstName"
                  className={`w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 focus:outline-none ${
                    errors.firstName ? "border border-red-500" : ""
                  }`}
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div className="w-[70%]">
                <input
                  type="text"
                  name="lastName"
                  className={`w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 focus:outline-none ${
                    errors.lastName ? "border border-red-500" : ""
                  }`}
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
              <div className="w-[70%] mb-2">
                <input
                  type="email"
                  name="email"
                  className={`w-full rounded-xl bg-[#D9D9D9]/70 px-4 py-2 focus:outline-none ${
                    errors.email ? "border border-red-500" : ""
                  }`}
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Avatar Upload */}
              <div className="w-[70%]">
                <SingleFileUpload
                  label="Upload agent avatar"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  maxSize={5}
                  onFileSelect={handleAvatarSelect}
                  onFileRemove={handleAvatarRemove}
                  onUploadError={handleAvatarError}
                  placeholder="No file chosen"
                  showPreview={true}
                  selectedFile={selectedAvatarFile}
                />
                {errors.avatar && (
                  <p className="text-red-500 text-sm mt-1 break-words">{errors.avatar}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[var(--ires-dark-blue)] text-white rounded-full px-8 py-2 hover:bg-[var(--ires-navy-blue)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditAgentModal;