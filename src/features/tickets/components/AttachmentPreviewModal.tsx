import React, { useEffect, useMemo } from "react";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import {
  normalizeTicketAttachment,
  type TicketAttachment,
  type TicketAttachmentInput,
} from "../types";

type PreviewKind = "image" | "pdf" | "video" | "audio" | "other";

const IMAGE_EXT = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"];
const VIDEO_EXT = ["mp4", "webm", "ogg", "mov"];
const AUDIO_EXT = ["mp3", "wav", "ogg", "m4a"];

const toAttachment = (
  file: TicketAttachmentInput,
  index = 0
): TicketAttachment => normalizeTicketAttachment(file, index);

const getExtension = (file: TicketAttachment): string => {
  const name = file.fileName || file.name || file.url || "";
  const clean = name.split("?")[0].split("#")[0];
  const parts = clean.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
};

const getPreviewKind = (file: TicketAttachmentInput): PreviewKind => {
  const normalized = toAttachment(file);
  const ext = getExtension(normalized);
  if (IMAGE_EXT.includes(ext)) return "image";
  if (ext === "pdf") return "pdf";
  if (VIDEO_EXT.includes(ext)) return "video";
  if (AUDIO_EXT.includes(ext)) return "audio";
  // Cloudinary image delivery paths without a clear extension
  if (/\/image\/upload\//i.test(normalized.url)) return "image";
  if (/\/video\/upload\//i.test(normalized.url)) return "video";
  if (/\/raw\/upload\/.*\.pdf/i.test(normalized.url)) return "pdf";
  return "other";
};

const getDisplayName = (file: TicketAttachmentInput, index: number): string => {
  const normalized = toAttachment(file, index);
  return normalized.fileName || normalized.name || `Attachment ${index + 1}`;
};

interface AttachmentPreviewModalProps {
  file: TicketAttachmentInput;
  index: number;
  onClose: () => void;
}

const AttachmentPreviewModal: React.FC<AttachmentPreviewModalProps> = ({
  file,
  index,
  onClose,
}) => {
  const attachment = useMemo(() => toAttachment(file, index), [file, index]);
  const kind = useMemo(() => getPreviewKind(attachment), [attachment]);
  const title = getDisplayName(attachment, index);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Preview ${title}`}
    >
      <div className="absolute inset-0 bg-[var(--ires-dark-blue)]/50" onClick={onClose} />
      <div
        className="relative z-10 ui-card w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex items-center justify-between gap-3 px-5 py-4 border-b border-[var(--border)] bg-[var(--ires-navy-blue)]">
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-white truncate">{title}</h2>
            <p className="text-xs text-white/70 mt-0.5 capitalize">{kind} preview</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={attachment.url}
              target="_blank"
              rel="noreferrer"
              className="ui-action-btn h-9 px-3 inline-flex items-center gap-1.5 bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Open
            </a>
            <a
              href={attachment.url}
              download={title}
              className="ui-action-btn h-9 px-3 inline-flex items-center gap-1.5 bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
            <button
              type="button"
              className="ui-action-btn h-9 w-9 p-0 inline-flex items-center justify-center bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={onClose}
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-auto bg-[#f4f5f9] p-4 flex items-center justify-center">
          {kind === "image" && (
            <img
              src={attachment.url}
              alt={title}
              className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-sm"
            />
          )}

          {kind === "pdf" && (
            <iframe
              title={title}
              src={attachment.url}
              className="w-full h-[70vh] rounded-lg border border-[var(--border)] bg-white"
            />
          )}

          {kind === "video" && (
            <video
              src={attachment.url}
              controls
              className="max-h-[70vh] max-w-full rounded-lg bg-black"
            >
              Your browser does not support video playback.
            </video>
          )}

          {kind === "audio" && (
            <div className="w-full max-w-lg ui-card p-6 space-y-3">
              <p className="text-sm font-medium text-[var(--ires-navy-blue)]">{title}</p>
              <audio src={attachment.url} controls className="w-full">
                Your browser does not support audio playback.
              </audio>
            </div>
          )}

          {kind === "other" && (
            <div className="ui-card p-8 max-w-md text-center space-y-4">
              <FileText className="h-12 w-12 mx-auto text-[var(--muted)]" />
              <div>
                <p className="text-sm font-medium text-[var(--ires-navy-blue)]">{title}</p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Preview isn’t available for this file type. Open or download it instead.
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noreferrer"
                  className="ui-btn-primary inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open file
                </a>
                <a
                  href={attachment.url}
                  download={title}
                  className="ui-action-btn h-10 px-4 inline-flex items-center gap-1.5"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { getDisplayName, getPreviewKind };
export default AttachmentPreviewModal;
