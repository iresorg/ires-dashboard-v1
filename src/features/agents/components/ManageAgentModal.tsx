import React, { useEffect, useState } from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";
import Calendar from "@/shared/assets/icons/noto_calendar.svg";
import RevokeTrue from "@/shared/assets/icons/revoke_true.svg";
import RevokeFalse from "@/shared/assets/icons/revoke_false.svg";
import EyeHide from "@/shared/assets/icons/eyetoggle.svg";
import EyeShow from "@/shared/assets/icons/eye_show.svg";


interface TokenData {
  id: string; // The Masked token
  actualToken: string; // The real token
  isRevoked: boolean;
  expiresAt: string;
  createdAt: string;
}

interface ManageAgentModalProps {
  onClose: () => void;
  agentId: string;
  token: TokenData; // The token for display when you click the (Generate Token button) or (manage button)
}

const ManageAgentModal: React.FC<ManageAgentModalProps> = ({ onClose, agentId, token }) => {
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        className="relative z-10 bg-white rounded-xl shadow-lg px-8 py-10 w-[550px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Icon */}
        <div className="absolute top-4 right-4 cursor-pointer">
          <img
            src={CloseIcon}
            alt="Close"
            onClick={onClose}
            className="h-4 w-4"
          />
        </div>

        {/* Modal Title */}
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-2xl font-bold text-center">
            Manage Token for Agent <span>{agentId}</span>
          </h2>
        </div>

        {/* Token Details Form (no, its a div, I no know why I use form) */}
        <div className="space-y-6">
          {/* Agent ID */}
          <div className="flex items-center space-x-3">
            <p>Agent ID:</p>
            <p>{agentId}</p>
          </div>

          {/* Token */}
          <div className="flex items-center space-x-3">
            <p>Token:</p>
            <p>{showToken ? token.actualToken : token.id}</p>
            <button
              className="ml-2 px-2 py-1 text-xs"
              onClick={() => setShowToken((prev) => !prev)}
            >
              {showToken ? <img src={EyeHide} alt="Hide Token" className="h-4 w-4" /> : <img src={EyeShow} alt="Show Token" className="h-4 w-4" />}
            </button>
          </div>

          {/* Created At */}
          <div className="flex items-center space-x-3">
            <p>Created At:</p>
            <p>{token.createdAt}</p>
          </div>

          {/* Expires At */}
          <div className="flex items-center space-x-3">
            <p>Expires At:</p>
            <p>{token.expiresAt}</p>
          </div>

          {/* Is Revoked Row with icon */}
          <div className="flex items-center space-x-3">
            <p>Is Revoked:</p>
            <p>{token.isRevoked ? <img src={RevokeTrue} alt="Revoked" className="h-4 w-4 inline" /> : <img src={RevokeFalse} alt="Not Revoked" className="h-4 w-4 inline" />}</p>
          </div>

          {/* Buttons Here */}
          <div className="flex items-center justify-evenly pt-6">
            {/* Revoke Token */}
            <button
              type="button"
              className="bg-[#D10F24] text-white px-8 py-2 text-lg font-semibold hover:bg-[#830311] rounded-bl-2xl rounded-tr-2xl"
            >
              Revoke Token
            </button>

            {/* Generate Token */}
            <button
              type="button"
              className="space-x-2 bg-[#0C0E5D] text-white px-8 py-2 text-lg font-semibold hover:bg-[#06083a] rounded-tl-2xl rounded-br-2xl"
            >
              <img src={Calendar} alt="Calendar" className="h-6 w-6 inline mr-2" />
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAgentModal;
