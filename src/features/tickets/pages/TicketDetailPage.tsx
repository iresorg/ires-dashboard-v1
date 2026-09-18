import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTicketDetail } from "../hooks/useTicketDetail";
import TicketStatusBadge from "../components/TicketStatusBadge";
import TicketDetailSkeleton from "../components/TicketDetailSkeleton";
import AttachmentPreviewModal, {
  getDisplayName,
  getPreviewKind,
} from "../components/AttachmentPreviewModal";
import Pagination from "@/shared/components/ui/Pagination";
import { useToast } from "@/shared/components/ui/useToast";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Role } from "@/shared/types/roles";
import { getResponders, type ResponderProfile } from "@/features/responders/services/respondersService";
import { getUsers } from "@/features/users/services/userService";
import { ROUTES } from "@/shared/constants/routes";
import CloseIcon from "@/shared/assets/icons/close.svg";
import { Eye, FileText, Image as ImageIcon } from "lucide-react";
import {
  formatDateTime,
  formatEntitlementSource,
  formatStaffName,
  getApiErrorMessage,
  type AssignTicketPayload,
  type TicketAttachment,
  type TicketAttachmentInput,
  type TicketSeverity,
  type TicketTier,
  normalizeTicketAttachment,
} from "../types";

const NotesModal: React.FC<{
  title: string;
  label?: string;
  required?: boolean;
  isSaving?: boolean;
  onClose: () => void;
  onSubmit: (value: string) => Promise<void>;
}> = ({ title, label = "Notes", required = false, isSaving, onClose, onSubmit }) => {
  const [value, setValue] = useState("");
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[var(--ires-dark-blue)]/40" onClick={onClose} />
      <div className="relative z-10 ui-card w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--ires-navy-blue)]">
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            <img src={CloseIcon} alt="" className="w-3.5 h-3.5 invert" />
          </button>
        </div>
        <form
          className="p-5 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (required && !value.trim()) return;
            await onSubmit(value.trim());
          }}
        >
          <label className="block">
            <span className="text-xs font-medium text-[var(--muted)]">{label}</span>
            <textarea
              className="ui-input mt-1 min-h-[100px] resize-y"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required={required}
            />
          </label>
          <div className="flex justify-end gap-2">
            <button type="button" className="ui-action-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="ui-btn-primary" disabled={isSaving}>
              {isSaving ? "Saving..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AssignModal: React.FC<{
  title: string;
  responders: ResponderProfile[];
  isSaving?: boolean;
  onClose: () => void;
  onSubmit: (payload: AssignTicketPayload) => Promise<void>;
}> = ({ title, responders, isSaving, onClose, onSubmit }) => {
  const [assignedResponderId, setAssignedResponderId] = useState("");
  const [tier, setTier] = useState<TicketTier>("TIER_1");
  const [severity, setSeverity] = useState<TicketSeverity>("MEDIUM");
  const [notes, setNotes] = useState("");

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[var(--ires-dark-blue)]/40" onClick={onClose} />
      <div className="relative z-10 ui-card w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--ires-navy-blue)]">
          <h2 className="text-sm font-semibold text-white">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            <img src={CloseIcon} alt="" className="w-3.5 h-3.5 invert" />
          </button>
        </div>
        <form
          className="p-5 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!assignedResponderId) return;
            await onSubmit({
              assignedResponderId,
              tier,
              severity,
              ...(notes.trim() ? { notes: notes.trim() } : {}),
            });
          }}
        >
          <label className="block">
            <span className="text-xs font-medium text-[var(--muted)]">Responder</span>
            <select
              className="ui-input mt-1"
              value={assignedResponderId}
              onChange={(e) => setAssignedResponderId(e.target.value)}
              required
            >
              <option value="">Select responder</option>
              {responders.map((responder) => (
                <option key={responder.id} value={responder.id}>
                  {responder.firstName} {responder.lastName} ({responder.role})
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Tier</span>
              <select
                className="ui-input mt-1"
                value={tier}
                onChange={(e) => setTier(e.target.value as TicketTier)}
              >
                <option value="TIER_1">Tier 1</option>
                <option value="TIER_2">Tier 2</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Severity</span>
              <select
                className="ui-input mt-1"
                value={severity}
                onChange={(e) => setSeverity(e.target.value as TicketSeverity)}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-medium text-[var(--muted)]">Notes</span>
            <textarea
              className="ui-input mt-1 min-h-[80px] resize-y"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          <div className="flex justify-end gap-2">
            <button type="button" className="ui-action-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="ui-btn-primary" disabled={isSaving}>
              {isSaving ? "Saving..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TicketDetailPage: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();
  const {
    ticket,
    lifecycle,
    lifecyclePagination,
    isLoading,
    isActing,
    error,
    fetchDetail,
    fetchLifecyclePage,
    startAnalysis,
    assign,
    startRespondingAction,
    escalate,
    reassign,
    resolve,
    close,
  } = useTicketDetail(ticketId);

  const [responders, setResponders] = useState<ResponderProfile[]>([]);
  const [previewAttachment, setPreviewAttachment] = useState<{
    file: TicketAttachmentInput;
    index: number;
  } | null>(null);
  const [modal, setModal] = useState<
    null | "analysis" | "assign" | "respond" | "escalate" | "reassign" | "resolve" | "close"
  >(null);

  const canAdminActions =
    user?.role === Role.SUPER_ADMIN ||
    user?.role === Role.ADMIN ||
    user?.role === Role.RESPONDER_ADMIN;

  useEffect(() => {
    const load = async () => {
      try {
        const [tier1, tier2] = await Promise.all([
          getUsers({ page: 1, limit: 50, role: "RESPONDER_TIER_1" }),
          getUsers({ page: 1, limit: 50, role: "RESPONDER_TIER_2" }),
        ]);
        const mapped: ResponderProfile[] = [...tier1.data, ...tier2.data].map((user) => ({
          ...user,
          role: user.role as ResponderProfile["role"],
          status: user.status === "inactive" ? "inactive" : "active",
          avatar:
            user.avatar && typeof user.avatar === "object"
              ? { url: user.avatar.url, publicId: user.avatar.publicId }
              : typeof user.avatar === "string"
                ? { url: user.avatar }
                : null,
        }));
        setResponders(mapped);
      } catch {
        try {
          const response = await getResponders(1, 50);
          setResponders(response.data ?? []);
        } catch {
          setResponders([]);
        }
      }
    };
    load();
  }, []);

  const actions = useMemo(() => {
    if (!ticket) return [];
    const list: Array<{
      key: typeof modal;
      label: string;
      adminOnly?: boolean;
    }> = [];

    switch (ticket.status) {
      case "CREATED":
      case "PENDING":
        list.push({ key: "analysis", label: "Start analysis", adminOnly: true });
        break;
      case "ANALYSING":
        list.push({ key: "assign", label: "Assign", adminOnly: true });
        break;
      case "ASSIGNED":
      case "REASSIGNED":
        list.push({ key: "respond", label: "Start responding" });
        list.push({ key: "resolve", label: "Resolve" });
        list.push({ key: "close", label: "Close" });
        break;
      case "IN_PROGRESS":
        list.push({ key: "escalate", label: "Escalate" });
        list.push({ key: "resolve", label: "Resolve" });
        list.push({ key: "close", label: "Close" });
        break;
      case "ESCALATED":
        list.push({ key: "reassign", label: "Reassign", adminOnly: true });
        list.push({ key: "resolve", label: "Resolve" });
        list.push({ key: "close", label: "Close" });
        break;
      case "RESOLVED":
        list.push({ key: "close", label: "Close" });
        break;
      default:
        break;
    }

    return list.filter((item) => !item.adminOnly || canAdminActions);
  }, [ticket, canAdminActions]);

  const notifySuccess = (message: string) => {
    showSuccess(message, "Customer / responder notified where applicable");
  };

  if (isLoading) {
    return <TicketDetailSkeleton />;
  }

  if (error || !ticket) {
    return (
      <div className="ui-card px-4 py-3 text-sm text-[var(--ires-red)] flex items-center justify-between gap-3">
        <span>{error || "Ticket not found"}</span>
        <div className="flex gap-2">
          <button type="button" className="ui-action-btn" onClick={fetchDetail}>
            Retry
          </button>
          <Link to={ROUTES.TICKETS} className="ui-action-btn">
            Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="ui-toolbar">
        <div>
          <Link to={ROUTES.TICKETS} className="text-xs text-[var(--muted)] hover:underline">
            ← Tickets
          </Link>
          <h2 className="text-xl font-semibold text-[var(--ires-navy-blue)] mt-1">
            {ticket.ticketId}
          </h2>
          <p className="text-sm text-[var(--muted)]">{ticket.title}</p>
        </div>
        <TicketStatusBadge status={ticket.status} />
      </div>

      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action.key as string}
            type="button"
            className="ui-btn-primary"
            onClick={() => setModal(action.key)}
            disabled={isActing}
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <section className="ui-card p-5 xl:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold text-[var(--ires-navy-blue)]">Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-[var(--muted)]">Severity</p>
              <p>{ticket.severity || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">Tier</p>
              <p>{ticket.tier || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">Category</p>
              <p>{ticket.category?.name || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">Sub-category</p>
              <p>{ticket.subCategory?.name || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">Reporter</p>
              <p>{ticket.reporterName || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">Location</p>
              <p>{ticket.location || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">Created by</p>
              <p>{formatStaffName(ticket.createdBy)}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">Created for</p>
              <p>{ticket.createdFor?.email || "—"}</p>
              <p className="text-xs text-[var(--muted)]">
                {formatEntitlementSource(ticket.entitlementSource)}
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">Assigned responder</p>
              <p>{formatStaffName(ticket.assignedResponder)}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">Type</p>
              <p>{ticket.type || "—"}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-[var(--muted)]">Description</p>
            <p className="text-sm mt-1 whitespace-pre-wrap">{ticket.description || "—"}</p>
          </div>

          {(ticket.attachments?.length ?? 0) > 0 && (
            <div>
              <p className="text-xs text-[var(--muted)] mb-2">Attachments</p>
              <ul className="space-y-2">
                {(ticket.attachments ?? []).map((raw, index) => {
                  const file = normalizeTicketAttachment(
                    raw as TicketAttachmentInput,
                    index
                  );
                  const label = getDisplayName(file, index);
                  const kind = getPreviewKind(file);
                  return (
                    <li
                      key={file.id || file.url || index}
                      className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[#f8f9fc] px-3 py-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {kind === "image" ? (
                          <ImageIcon className="h-4 w-4 shrink-0 text-[var(--muted)]" />
                        ) : (
                          <FileText className="h-4 w-4 shrink-0 text-[var(--muted)]" />
                        )}
                        <span className="text-sm text-[var(--ires-navy-blue)] truncate">
                          {label}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="ui-action-btn h-8 px-3 inline-flex items-center gap-1.5 shrink-0"
                        onClick={() => setPreviewAttachment({ file, index })}
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Preview
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>

        <section className="ui-card p-5">
          <h3 className="text-sm font-semibold text-[var(--ires-navy-blue)] mb-3">
            Lifecycle
          </h3>
          {lifecycle.length === 0 ? (
            <p className="text-sm text-[var(--muted)]">No lifecycle events yet.</p>
          ) : (
            <ol className="space-y-3">
              {[...lifecycle]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
                .map((entry, index) => (
                  <li key={entry.id || `${entry.action}-${index}`} className="text-sm">
                    <div className="font-medium">{entry.action}</div>
                    <div className="text-xs text-[var(--muted)]">
                      {formatStaffName(entry.performedBy)} · {formatDateTime(entry.createdAt)}
                    </div>
                    {entry.notes && <p className="mt-1 text-[var(--ires-dark-blue)]">{entry.notes}</p>}
                  </li>
                ))}
            </ol>
          )}
          {lifecyclePagination.totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={lifecyclePagination.currentPage}
                totalPages={lifecyclePagination.totalPages}
                onPageChange={(page) => fetchLifecyclePage(page)}
              />
            </div>
          )}
        </section>
      </div>

      {(modal === "analysis" ||
        modal === "respond" ||
        modal === "resolve" ||
        modal === "close") && (
        <NotesModal
          title={
            modal === "analysis"
              ? "Start analysis"
              : modal === "respond"
                ? "Start responding"
                : modal === "resolve"
                  ? "Resolve ticket"
                  : "Close ticket"
          }
          isSaving={isActing}
          onClose={() => setModal(null)}
          onSubmit={async (notes) => {
            try {
              if (modal === "analysis") await startAnalysis(notes ? { notes } : {});
              if (modal === "respond") await startRespondingAction(notes ? { notes } : {});
              if (modal === "resolve") await resolve(notes ? { notes } : {});
              if (modal === "close") await close(notes ? { notes } : {});
              notifySuccess("Ticket updated");
              setModal(null);
            } catch (err) {
              showError(getApiErrorMessage(err, "Action failed"));
            }
          }}
        />
      )}

      {modal === "escalate" && (
        <NotesModal
          title="Escalate ticket"
          label="Escalation reason"
          required
          isSaving={isActing}
          onClose={() => setModal(null)}
          onSubmit={async (escalationReason) => {
            try {
              await escalate({ escalationReason });
              notifySuccess("Ticket escalated");
              setModal(null);
            } catch (err) {
              showError(getApiErrorMessage(err, "Could not escalate"));
            }
          }}
        />
      )}

      {(modal === "assign" || modal === "reassign") && (
        <AssignModal
          title={modal === "assign" ? "Assign ticket" : "Reassign ticket"}
          responders={responders}
          isSaving={isActing}
          onClose={() => setModal(null)}
          onSubmit={async (payload) => {
            try {
              if (modal === "assign") await assign(payload);
              else await reassign(payload);
              notifySuccess(modal === "assign" ? "Ticket assigned" : "Ticket reassigned");
              setModal(null);
            } catch (err) {
              showError(getApiErrorMessage(err, "Could not update assignment"));
            }
          }}
        />
      )}

      {previewAttachment && (
        <AttachmentPreviewModal
          file={previewAttachment.file}
          index={previewAttachment.index}
          onClose={() => setPreviewAttachment(null)}
        />
      )}
    </div>
  );
};

export default TicketDetailPage;
