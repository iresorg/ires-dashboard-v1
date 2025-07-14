import React, { useEffect, useState } from "react";
import CloseIcon from "@/shared/assets/icons/close.svg";
import Calendar from "@/shared/assets/icons/noto_calendar.svg";
import RevokeTrue from "@/shared/assets/icons/revoke_true.svg";
import RevokeFalse from "@/shared/assets/icons/revoke_false.svg";
import EyeHide from "@/shared/assets/icons/eyetoggle.svg";
import EyeShow from "@/shared/assets/icons/eye_show.svg";

export interface TokenData {
  id: string;
  actualToken: string;
  isRevoked: boolean;
  createdAt: string;
  expiresAt: string;
}

interface ManageResponderModalProps {
  onClose: () => void;
  responderId: string;
  token: TokenData;
}

const ManageResponderModal: React.FC<ManageResponderModalProps> = ({
  onClose,
  responderId,
  token,
}) => {
  const [showToken, setShowToken] = useState(false);

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
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative z-10 bg-white rounded-xl shadow-lg px-8 py-10 w-[550px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 cursor-pointer">
          <img
            src={CloseIcon}
            alt="Close"
            onClick={onClose}
            className="h-4 w-4"
          />
        </div>

        <div className="flex items-center justify-center mb-8">
          <h2 className="text-2xl font-bold text-center">
            Manage Token for Responder <span>{responderId}</span>
          </h2>
        </div>

        <div className="space-y-6 text-sm">
          <div className="flex items-center space-x-3">
            <p className="font-medium">Responder ID:</p>
            <p>{responderId}</p>
          </div>

          <div className="flex items-center space-x-3">
            <p className="font-medium">Token:</p>
            <p>{showToken ? token.actualToken : token.id}</p>
            <button
              className="ml-2"
              onClick={() => setShowToken((prev) => !prev)}
            >
              {showToken ? (
                <img src={EyeHide} alt="Hide Token" className="h-4 w-4" />
              ) : (
                <img src={EyeShow} alt="Show Token" className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <p className="font-medium">Created At:</p>
            <p>{token.createdAt}</p>
          </div>

          <div className="flex items-center space-x-3">
            <p className="font-medium">Expires At:</p>
            <p>{token.expiresAt}</p>
          </div>

          <div className="flex items-center space-x-3">
            <p className="font-medium">Is Revoked:</p>
            {token.isRevoked ? (
              <img src={RevokeTrue} alt="Revoked" className="h-4 w-4" />
            ) : (
              <img src={RevokeFalse} alt="Not Revoked" className="h-4 w-4" />
            )}
          </div>

          <div className="flex items-center justify-evenly pt-6">
            <button
              type="button"
              className="bg-[#D10F24] text-white px-8 py-2 text-lg font-semibold hover:bg-[#830311] rounded-bl-2xl rounded-tr-2xl"
            >
              Revoke Token
            </button>
            <button
              type="button"
              className="bg-[#0C0E5D] text-white px-8 py-2 text-lg font-semibold hover:bg-[#06083a] rounded-tl-2xl rounded-br-2xl"
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

export default ManageResponderModal;
