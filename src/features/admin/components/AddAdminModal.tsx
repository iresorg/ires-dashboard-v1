import React, { useEffect } from "react";

interface AddAdminModalProps {
  onClose: () => void;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({ onClose }) => {
  // Prevent scroll while modal is open
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
      {/* Background blur */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal box */}
      <div
        className="relative z-10 bg-white rounded-lg shadow-md p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Add New Admin</h2>

        {/* Sample Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--ires-dark-blue)] text-white rounded hover:bg-[var(--ires-navy-blue)]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdminModal;
