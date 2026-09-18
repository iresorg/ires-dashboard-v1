import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@/shared/assets/icons/close.svg";
import { getExternalUsers } from "@/features/dashboard/external-cta/lib/services/externalUserService";
import type { ExternalUser } from "@/features/dashboard/external-cta/lib/types/externalUser";
import { createTicket, getTicketEligibility } from "../services/ticketService";
import type {
  CreateTicketPayload,
  TicketCategory,
  TicketEligibility,
} from "../types";
import { formatEntitlementSource, getApiErrorMessage } from "../types";
import { ROUTES } from "@/shared/constants/routes";
import { useDebounce } from "@/shared/hooks";

interface CreateTicketModalProps {
  categories: TicketCategory[];
  isOpen?: boolean;
  onClose: () => void;
  onCreated: (ticketId: string) => void;
}

const CreateTicketModal: React.FC<CreateTicketModalProps> = ({
  categories,
  onClose,
  onCreated,
}) => {
  const [accountSearch, setAccountSearch] = useState("");
  const debouncedSearch = useDebounce(accountSearch, 400);
  const [accounts, setAccounts] = useState<ExternalUser[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<ExternalUser | null>(null);
  const [eligibility, setEligibility] = useState<TicketEligibility | null>(null);
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [victimInformation, setVictimInformation] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id === categoryId) ?? null,
    [categories, categoryId]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const response = await getExternalUsers({
          search: debouncedSearch || undefined,
          page: 1,
          limit: 10,
        });
        setAccounts(response.data ?? []);
      } catch {
        setAccounts([]);
      }
    };
    loadAccounts();
  }, [debouncedSearch]);

  useEffect(() => {
    const check = async () => {
      if (!selectedAccount) {
        setEligibility(null);
        return;
      }
      setCheckingEligibility(true);
      try {
        const result = await getTicketEligibility(selectedAccount.id);
        setEligibility(result);
      } catch (err) {
        setEligibility({
          eligible: false,
          accountId: selectedAccount.id,
          email: selectedAccount.email,
          source: null,
          reason: getApiErrorMessage(err, "Could not check eligibility"),
          paygCreditsAvailable: 0,
        });
      } finally {
        setCheckingEligibility(false);
      }
    };
    check();
  }, [selectedAccount]);

  const canSubmit =
    Boolean(selectedAccount) &&
    eligibility?.eligible === true &&
    Boolean(title.trim()) &&
    Boolean(type.trim()) &&
    Boolean(description.trim()) &&
    Boolean(location.trim()) &&
    Boolean(reporterName.trim()) &&
    Boolean(categoryId) &&
    categories.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccount || !canSubmit) return;

    const payload: CreateTicketPayload = {
      accountId: selectedAccount.id,
      title: title.trim(),
      type: type.trim(),
      description: description.trim(),
      location: location.trim(),
      reporterName: reporterName.trim(),
      categoryId,
      ...(subCategoryId ? { subCategoryId } : {}),
      ...(internalNotes.trim() ? { internalNotes: internalNotes.trim() } : {}),
      ...(contactInformation.trim()
        ? { contactInformation: contactInformation.trim() }
        : {}),
      ...(victimInformation.trim()
        ? { victimInformation: victimInformation.trim() }
        : {}),
      ...(attachments.length ? { attachments } : {}),
    };

    setIsSaving(true);
    setError(null);
    try {
      const result = await createTicket(payload);
      const ticketId = result.data?.ticketId;
      if (ticketId) onCreated(ticketId);
      else onClose();
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not create ticket"));
    } finally {
      setIsSaving(false);
    }
  };

  if (categories.length === 0) {
    return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[var(--ires-dark-blue)]/40" onClick={onClose} />
        <div className="relative z-10 ui-card w-full max-w-md p-6">
          <h2 className="text-lg font-semibold text-[var(--ires-navy-blue)]">
            Categories required
          </h2>
          <p className="text-sm text-[var(--muted)] mt-2">
            Create at least one ticket category before filing incidents.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <button type="button" className="ui-action-btn" onClick={onClose}>
              Close
            </button>
            <Link to={ROUTES.TICKET_CATEGORIES} className="ui-btn-primary">
              Manage categories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-[var(--ires-dark-blue)]/40" onClick={onClose} />
      <div
        className="relative z-10 ui-card w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--ires-navy-blue)]">
          <h2 className="text-sm font-semibold text-white">Create ticket</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            <img src={CloseIcon} alt="" className="w-3.5 h-3.5 invert" />
          </button>
        </div>

        <form className="p-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <span className="text-xs font-medium text-[var(--muted)]">
              Customer account (created for)
            </span>
            <input
              className="ui-input mt-1"
              value={accountSearch}
              onChange={(e) => setAccountSearch(e.target.value)}
              placeholder="Search customer by name or email"
            />
            <div className="mt-2 max-h-36 overflow-y-auto border border-[var(--border)] rounded-lg">
              {accounts.map((account) => (
                <button
                  key={account.id}
                  type="button"
                  className={`w-full text-left px-3 py-2 text-sm border-b border-[var(--border)] last:border-0 ${
                    selectedAccount?.id === account.id
                      ? "bg-[var(--cool-blue-tint)]"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedAccount(account)}
                >
                  <div className="font-medium">{account.name || account.email}</div>
                  <div className="text-xs text-[var(--muted)]">
                    {account.email} · {account.role}
                  </div>
                </button>
              ))}
              {accounts.length === 0 && (
                <p className="px-3 py-4 text-sm text-[var(--muted)]">No accounts found</p>
              )}
            </div>
          </div>

          {selectedAccount && (
            <div className="ui-card px-4 py-3 bg-[var(--cool-blue-tint)]/40 border-none shadow-none">
              {checkingEligibility ? (
                <p className="text-sm text-[var(--muted)]">Checking eligibility...</p>
              ) : eligibility ? (
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium">Eligible:</span>{" "}
                    {eligibility.eligible ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="font-medium">Source:</span>{" "}
                    {formatEntitlementSource(eligibility.source)}
                  </p>
                  {eligibility.subscription && (
                    <p>
                      Plan {eligibility.subscription.planName} · remaining{" "}
                      {eligibility.subscription.remainingIncidents ?? "Unlimited"}
                    </p>
                  )}
                  <p>
                    PAYG credits: {eligibility.paygCreditsAvailable ?? 0}
                  </p>
                  {!eligibility.eligible && (
                    <p className="text-[var(--ires-red)]">
                      {eligibility.reason || "Account is not eligible for a new ticket"}
                    </p>
                  )}
                </div>
              ) : null}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Title</span>
              <input className="ui-input mt-1" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Type</span>
              <input className="ui-input mt-1" value={type} onChange={(e) => setType(e.target.value)} placeholder="e.g. phishing" />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Reporter name</span>
              <input className="ui-input mt-1" value={reporterName} onChange={(e) => setReporterName(e.target.value)} />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Location</span>
              <input className="ui-input mt-1" value={location} onChange={(e) => setLocation(e.target.value)} />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Category</span>
              <select
                className="ui-input mt-1"
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setSubCategoryId("");
                }}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Sub-category</span>
              <select
                className="ui-input mt-1"
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
                disabled={!selectedCategory || selectedCategory.subCategories.length === 0}
              >
                <option value="">
                  {selectedCategory?.subCategories.length
                    ? "Select sub-category"
                    : "No sub-categories"}
                </option>
                {selectedCategory?.subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-medium text-[var(--muted)]">Description</span>
            <textarea
              className="ui-input mt-1 min-h-[100px] resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Internal notes</span>
              <textarea
                className="ui-input mt-1 min-h-[72px] resize-y"
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Contact information</span>
              <textarea
                className="ui-input mt-1 min-h-[72px] resize-y"
                value={contactInformation}
                onChange={(e) => setContactInformation(e.target.value)}
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-medium text-[var(--muted)]">Victim information</span>
            <textarea
              className="ui-input mt-1 min-h-[72px] resize-y"
              value={victimInformation}
              onChange={(e) => setVictimInformation(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-[var(--muted)]">Attachments</span>
            <input
              type="file"
              multiple
              className="mt-1 block w-full text-sm"
              onChange={(e) => setAttachments(Array.from(e.target.files ?? []))}
            />
          </label>

          {error && <p className="text-sm text-[var(--ires-red)]">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="ui-action-btn h-10 px-4" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="ui-btn-primary" disabled={!canSubmit || isSaving}>
              {isSaving ? "Creating..." : "Create ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketModal;
