import React, { useEffect, useState } from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";
import Calendar from "@/shared/assets/icons/noto_calendar.svg";
import RevokeTrue from "@/shared/assets/icons/revoke_true.svg";
import RevokeFalse from "@/shared/assets/icons/revoke_false.svg";
import EyeHide from "@/shared/assets/icons/eyetoggle.svg";
import EyeShow from "@/shared/assets/icons/eye_show.svg";
import { format } from 'date-fns';

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
  const [isRevoked, setIsRevoked] = useState(token.isRevoked); // Local state for revocation

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleRevokeToken = () => {
    setIsRevoked(true);
  };
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
        <div className="flex items-center justify-center mb-4 -ml-4">
          <h2 className="text-2xl font-bold text-center">
            Manage Token for <span>{agentId}</span>
          </h2>
        </div>

        {/* Token Details Form (no, its a div, I no know why I use form) */}
        <div className="space-y-1 text-sm ml-10">
          <div className="flex items-center space-x-1 ml-8 text-base">
            <p>Agent ID:</p>
            <p>{agentId}</p>
          </div>

          {/* Token */}
          <div className="flex items-center space-x-1 ml-8 text-base">
            <p>Token:</p>
            <p className="w-[100px] font-mono leading-none">
              {showToken ? token.actualToken.slice(0, 10) : "**********"}
            </p>
            <button
              className="ml-3"
              onClick={() => setShowToken((prev) => !prev)}
              aria-label={showToken ? "Hide token" : "Show token"}
            >
              {showToken ? (
                <img src={EyeHide} alt="Hide Token" className="h-4 w-4" />
              ) : (
                <img src={EyeShow} alt="Show Token" className="h-4 w-4" />
              )}
            </button>
          </div>

<div className="flex items-center space-x-1 ml-8 text-base">
            <p>Created At:</p>
            <p>{format(new Date(token.createdAt), "yyyy-MM-dd h:mm:ss a")}</p>
          </div>

          <div className="flex items-center space-x-1 ml-8 text-base">
            <p>Expires At:</p>
            <p>{format(new Date(token.expiresAt), "yyyy-MM-dd h:mm:ss a")}</p>
          </div>

          <div className="flex items-center space-x-1 ml-8 text-base">
            <p>Is Revoked:</p>
            {isRevoked ? (
              <img src={RevokeTrue} alt="Revoked" className="h-4 w-4" />
            ) : (
              <img src={RevokeFalse} alt="Not Revoked" className="h-4 w-4" />
            )}
          </div>

          <div className="flex items-center justify-evenly pt-6 -ml-6">
            <button
              type="button"
              className="bg-[#D10F24] text-white px-4 py-2 text-lg font-semibold hover:bg-[#830311] rounded-bl-2xl rounded-tr-2xl"
              onClick={handleRevokeToken}
              disabled={isRevoked}
            >
              Revoke Token
            </button>
            <button
              type="button"
              className="bg-[#0C0E5D] text-white px-4 py-2 text-lg font-semibold hover:bg-[#06083a] rounded-tl-2xl rounded-br-2xl"
            >
              <img
                src={Calendar}
                alt="Calendar"
                className="h-6 w-6 inline mr-2"
              />
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAgentModal;
