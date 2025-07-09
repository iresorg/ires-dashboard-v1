import React, { useEffect } from "react";
import PencilIcon from "@/shared/assets/icons/pencil.svg";
import CloseIcon from "@/shared/assets/icons/close.svg";


interface CreateAgentModalProps {
    onClose: () => void;
}

const CreateAgentModal: React.FC<CreateAgentModalProps> = ({ onClose }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            {/* Dimmed blur background */}
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal box */}
            <div
                className="relative z-10 bg-white rounded-lg shadow-md px-6 py-12 w-full max-w-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Title */}
                <div className="flex flex-row justify-center mb-6 space-x-1">
                    <h2 className="text-xl font-semibold text-center">Create Agent</h2>
                    <img src={PencilIcon} alt="Create Agent" className="w-5 h-6" />
                </div>

                {/* Close Icon */}
                <div className="absolute top-2 right-2 cursor-pointer">
                    <img
                        src={CloseIcon}
                        alt="Close/Cancel"
                        onClick={onClose}
                        className="w-4 h-4"
                    />
                </div>

                {/* Form */}
                <form className="space-y-5">
                    {/* First Name */}
                    <div className="flex flex-row space-x-3">
                        <label className="text-gray-700 mb-1 w-1/3 text-right">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-lg bg-gray-200 px-4 py-2 focus:outline-none"
                            placeholder=""
                        />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-row space-x-3">
                        <label className="text-gray-700 mb-1 w-1/3 text-right">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="w-full rounded-lg bg-gray-200 px-4 py-2 focus:outline-none"
                            placeholder=""
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="rounded-full px-8 py-2 bg-[var(--ires-dark-blue)] text-white hover:bg-[var(--ires-navy-blue)]"
                        >
                            Create Agent
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAgentModal;
