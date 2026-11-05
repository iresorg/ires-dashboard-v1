import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import CloseIcon from "@/shared/assets/icons/close.svg";
import {
  createTicket,
  getEligibleAccounts,
  getTicketEligibility,
} from "../services/ticketService";
import type {
  CreateTicketPayload,
  EligibleAccount,
  TicketCategory,
  TicketEligibility,
} from "../types";
import { formatEntitlementSource, getApiErrorMessage } from "../types";
import {
  getIncident,
  getIncidentQueue,
} from "@/features/incidents/services/incidentService";
import type { Incident } from "@/features/incidents/types";
import { ROUTES } from "@/shared/constants/routes";
import { useDebounce } from "@/shared/hooks";
import UploadIcon from "@/shared/assets/icons/Upload.svg";
import TrashIcon from "@/shared/assets/icons/delete.svg";

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
  const [accounts, setAccounts] = useState<EligibleAccount[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<EligibleAccount | null>(null);
  const [eligibility, setEligibility] = useState<TicketEligibility | null>(null);
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [incidentLookup, setIncidentLookup] = useState("");
  const [incidentId, setIncidentId] = useState("");
  const [linkedIncident, setLinkedIncident] = useState<Incident | null>(null);
  const [lookingUpIncident, setLookingUpIncident] = useState(false);
  const [incidentLookupError, setIncidentLookupError] = useState<string | null>(null);
  const [accountIncidents, setAccountIncidents] = useState<Incident[]>([]);
  const [loadingAccountIncidents, setLoadingAccountIncidents] = useState(false);
  const [incidentSearch, setIncidentSearch] = useState("");
  const [showPasteLookup, setShowPasteLookup] = useState(false);
  const [includeContact, setIncludeContact] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactAddress, setContactAddress] = useState("");
  const [includeVictim, setIncludeVictim] = useState(false);
  const [victimName, setVictimName] = useState("");
  const [victimPhone, setVictimPhone] = useState("");
  const [victimAddress, setVictimAddress] = useState("");
  const [victimEmail, setVictimEmail] = useState("");
  const [victimAge, setVictimAge] = useState("");
  const [victimGender, setVictimGender] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fromIncident = Boolean(linkedIncident);

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
    const onPointerDown = (event: MouseEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  useEffect(() => {
    if (!pickerOpen) return;

    const loadAccounts = async () => {
      setIsLoadingAccounts(true);
      try {
        const response = await getEligibleAccounts({
          search: debouncedSearch || undefined,
          page: 1,
          limit: 10,
        });
        setAccounts(response.data ?? []);
      } catch {
        setAccounts([]);
      } finally {
        setIsLoadingAccounts(false);
      }
    };

    loadAccounts();
  }, [debouncedSearch, pickerOpen]);

  useEffect(() => {
    const check = async () => {
      if (!selectedAccount) {
        setEligibility(null);
        return;
      }

      // Prefer picker row entitlement; confirm with eligibility endpoint
      setEligibility({
        eligible: true,
        accountId: selectedAccount.accountId,
        email: selectedAccount.email,
        source: selectedAccount.source,
        subscription: selectedAccount.subscription,
        paygCreditsAvailable: selectedAccount.paygCreditsAvailable ?? 0,
      });

      setCheckingEligibility(true);
      try {
        const result = await getTicketEligibility(selectedAccount.accountId);
        setEligibility(result);
      } catch (err) {
        setEligibility({
          eligible: false,
          accountId: selectedAccount.accountId,
          email: selectedAccount.email,
          source: selectedAccount.source ?? null,
          reason: getApiErrorMessage(err, "Could not check eligibility"),
          paygCreditsAvailable: selectedAccount.paygCreditsAvailable ?? 0,
          subscription: selectedAccount.subscription,
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

  const accountEligible =
    Boolean(selectedAccount) && eligibility?.eligible === true && !checkingEligibility;

  const filteredAccountIncidents = useMemo(() => {
    const needle = incidentSearch.trim().toLowerCase();
    if (!needle) return accountIncidents;
    return accountIncidents.filter((incident) => {
      const haystack = [
        incident.reference,
        incident.incidentType,
        incident.severity,
        incident.name,
        incident.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [accountIncidents, incidentSearch]);

  useEffect(() => {
    if (!accountEligible || !selectedAccount) {
      setAccountIncidents([]);
      setLoadingAccountIncidents(false);
      return;
    }

    let cancelled = false;
    const load = async () => {
      setLoadingAccountIncidents(true);
      setIncidentLookupError(null);
      try {
        const result = await getIncidentQueue({
          accountId: selectedAccount.accountId,
          status: "OPEN",
          unlinked: true,
          page: 1,
          limit: 50,
        });
        if (!cancelled) setAccountIncidents(result.data);
      } catch (err) {
        if (!cancelled) {
          setAccountIncidents([]);
          setIncidentLookupError(
            getApiErrorMessage(err, "Could not load open incidents for this customer")
          );
        }
      } finally {
        if (!cancelled) setLoadingAccountIncidents(false);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [accountEligible, selectedAccount]);

  const clearLinkedIncidentFields = () => {
    setLinkedIncident(null);
    setIncidentId("");
    setIncidentLookupError(null);
    setType("");
    setLocation("");
    setDescription("");
    setReporterName("");
    setSubCategoryId("");
  };

  const clearLinkedIncident = () => {
    clearLinkedIncidentFields();
    setIncidentLookup("");
    setIncidentSearch("");
  };

  const handleSelectAccount = (account: EligibleAccount) => {
    if (selectedAccount?.accountId !== account.accountId) {
      clearLinkedIncidentFields();
      setIncidentLookup("");
      setIncidentSearch("");
      setShowPasteLookup(false);
      setAccountIncidents([]);
    }
    setSelectedAccount(account);
    setAccountSearch(account.name || account.email);
    setPickerOpen(false);
  };

  const applyIncidentToForm = (incident: Incident) => {
    if (!selectedAccount) {
      setIncidentLookupError("Select an eligible customer account first");
      return;
    }
    if (incident.accountId !== selectedAccount.accountId) {
      setIncidentLookupError(
        `Incident ${incident.reference} belongs to a different customer account`
      );
      return;
    }
    if (incident.ticketId) {
      setIncidentLookupError(
        `Incident ${incident.reference} is already linked to ticket ${incident.ticketId}`
      );
      return;
    }
    if (incident.status === "CLOSED") {
      setIncidentLookupError(`Incident ${incident.reference} is closed`);
      return;
    }

    setLinkedIncident(incident);
    setIncidentId(incident.id);
    setIncidentLookup(incident.reference);
    setIncidentLookupError(null);

    setType(incident.incidentType || "");
    setReporterName(incident.name || "");
    setLocation(
      [incident.organization, incident.affectedSystems].filter(Boolean).join(" · ") ||
        "Not specified"
    );
    setDescription(incident.description || "");
    setSubCategoryId("");

    if (incident.email?.trim() || incident.phone?.trim()) {
      setIncludeContact(true);
      setContactEmail(incident.email || "");
      setContactPhone(incident.phone || "");
    }
  };

  const handleLookupIncident = async () => {
    if (!accountEligible) {
      setIncidentLookupError("Select an eligible customer account before loading an incident");
      return;
    }

    const key = incidentLookup.trim();
    if (!key) {
      setIncidentLookupError("Enter an incident number (e.g. IR-20261102-A1B2C3)");
      return;
    }

    setLookingUpIncident(true);
    setIncidentLookupError(null);
    setError(null);
    try {
      const incident = await getIncident(key);
      applyIncidentToForm(incident);
    } catch (err) {
      setLinkedIncident(null);
      setIncidentId("");
      setIncidentLookupError(getApiErrorMessage(err, "Incident not found"));
    } finally {
      setLookingUpIncident(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccount || !canSubmit) return;

    if (includeContact) {
      if (!contactEmail.trim() || !contactPhone.trim() || !contactAddress.trim()) {
        setError("Contact email, phone, and address are required when contact info is included");
        return;
      }
    }

    if (includeVictim) {
      if (
        !victimName.trim() ||
        !victimPhone.trim() ||
        !victimAddress.trim() ||
        !victimEmail.trim()
      ) {
        setError(
          "Victim name, phone, address, and email are required when victim info is included"
        );
        return;
      }
    }

    const payload: CreateTicketPayload = {
      accountId: selectedAccount.accountId,
      title: title.trim(),
      type: type.trim(),
      description: description.trim(),
      location: location.trim(),
      reporterName: reporterName.trim(),
      categoryId,
      ...(subCategoryId ? { subCategoryId } : {}),
      ...(internalNotes.trim() ? { internalNotes: internalNotes.trim() } : {}),
      ...(incidentId.trim() ? { incidentId: incidentId.trim() } : {}),
      ...(includeContact
        ? {
            contactInformation: {
              email: contactEmail.trim(),
              phone: contactPhone.trim(),
              address: contactAddress.trim(),
            },
          }
        : {}),
      ...(includeVictim
        ? {
            victimInformation: {
              name: victimName.trim(),
              phone: victimPhone.trim(),
              address: victimAddress.trim(),
              email: victimEmail.trim(),
              ...(victimAge.trim() ? { age: Number(victimAge) } : {}),
              ...(victimGender.trim() ? { gender: victimGender.trim() } : {}),
            },
          }
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

  const handleFilesSelected = (files: FileList | null) => {
    if (!files?.length) return;
    const next = Array.from(files);
    const tooLarge = next.find((file) => file.size > 10 * 1024 * 1024);
    if (tooLarge) {
      setAttachmentError("Each file must be under 10MB");
      return;
    }
    setAttachmentError(null);
    setAttachments((prev) => {
      const merged = [...prev];
      next.forEach((file) => {
        if (!merged.some((item) => item.name === file.name && item.size === file.size)) {
          merged.push(file);
        }
      });
      return merged;
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  if (categories.length === 0) {
    return (
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[var(--ires-dark-blue)]/40" onClick={onClose} />
        <div className="relative z-10 ui-card w-full max-w-md p-6">
          <h2 className="text-lg font-semibold text-[var(--heading)]">
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
        className="relative z-10 ui-card w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-[var(--border)] bg-[var(--ires-navy-blue)]">
          <h2 className="text-sm font-semibold text-white">Create ticket</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            <img src={CloseIcon} alt="" className="w-3.5 h-3.5 invert" />
          </button>
        </div>

        <form className="flex flex-col flex-1 min-h-0" onSubmit={handleSubmit}>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div ref={pickerRef} className="relative">
            <span className="text-xs font-medium text-[var(--muted)]">
              Customer account (created for)
            </span>
            <input
              className="ui-input mt-1"
              value={accountSearch}
              onChange={(e) => {
                setAccountSearch(e.target.value);
                setSelectedAccount(null);
                setEligibility(null);
                setPickerOpen(true);
                clearLinkedIncidentFields();
                setIncidentLookup("");
                setIncidentSearch("");
                setShowPasteLookup(false);
                setAccountIncidents([]);
              }}
              onFocus={() => setPickerOpen(true)}
              placeholder="Search eligible customers by name or email"
              autoComplete="off"
            />

            {pickerOpen && (
              <div className="absolute left-0 right-0 top-full mt-1 z-20 max-h-56 overflow-y-auto rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-lg">
                {isLoadingAccounts ? (
                  <p className="px-3 py-4 text-sm text-[var(--muted)]">Searching...</p>
                ) : accounts.length === 0 ? (
                  <p className="px-3 py-4 text-sm text-[var(--muted)]">
                    No eligible accounts found
                  </p>
                ) : (
                  accounts.map((account) => (
                    <button
                      key={account.accountId}
                      type="button"
                      className={`w-full text-left px-3 py-2.5 text-sm border-b border-[var(--border)] last:border-0 ${
                        selectedAccount?.accountId === account.accountId
                          ? "bg-[var(--cool-blue-tint)]"
                          : "hover:bg-[var(--cool-blue-tint)]"
                      }`}
                      onClick={() => handleSelectAccount(account)}
                    >
                      <div className="font-medium text-[var(--heading)]">
                        {account.name || account.email}
                      </div>
                      <div className="text-xs text-[var(--muted)] mt-0.5">
                        {account.email} · {account.role || "account"} ·{" "}
                        {formatEntitlementSource(account.source)}
                      </div>
                      <div className="text-xs text-[var(--muted)] mt-0.5">
                        {account.source === "subscription"
                          ? `Remaining this period: ${
                              account.remainingIncidentsThisPeriod ??
                              account.subscription?.remainingIncidents ??
                              "Unlimited"
                            }`
                          : `PAYG credits: ${account.paygCreditsAvailable ?? 0}`}
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {selectedAccount && (
            <div className="rounded-lg border border-[var(--border)] bg-[var(--cool-blue-tint)]/30 px-4 py-3">
              {checkingEligibility ? (
                <p className="text-sm text-[var(--muted)]">Confirming eligibility...</p>
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
                  <p>PAYG credits: {eligibility.paygCreditsAvailable ?? 0}</p>
                  {!eligibility.eligible && (
                    <p className="text-[var(--ires-red)]">
                      {eligibility.reason || "Account is not eligible for a new ticket"}
                    </p>
                  )}
                </div>
              ) : null}
            </div>
          )}

          <div className="rounded-lg border border-[var(--border)] bg-[var(--cool-blue-tint)]/20 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-[var(--muted)]">
                Open incident (optional)
              </span>
              {fromIncident && (
                <button
                  type="button"
                  className="ui-action-btn h-8 px-3"
                  onClick={clearLinkedIncident}
                >
                  Clear selection
                </button>
              )}
            </div>

            {!accountEligible ? (
              <p className="text-xs text-[var(--muted)]">
                Select an eligible customer first to see their open, unlinked incidents.
              </p>
            ) : loadingAccountIncidents ? (
              <p className="text-sm text-[var(--muted)]">Loading open incidents…</p>
            ) : (
              <>
                <input
                  className="ui-input"
                  value={incidentSearch}
                  onChange={(e) => setIncidentSearch(e.target.value)}
                  placeholder="Search by reference, type, or name"
                  autoComplete="off"
                  disabled={accountIncidents.length === 0}
                />

                {accountIncidents.length === 0 ? (
                  <p className="text-sm text-[var(--muted)]">
                    No open unlinked incidents for this customer.
                  </p>
                ) : filteredAccountIncidents.length === 0 ? (
                  <p className="text-sm text-[var(--muted)]">No incidents match that search.</p>
                ) : (
                  <div className="max-h-56 overflow-y-auto rounded-lg border border-[var(--border)] bg-[var(--surface)]">
                    {filteredAccountIncidents.map((incident) => {
                      const selected = linkedIncident?.id === incident.id;
                      return (
                        <button
                          key={incident.id}
                          type="button"
                          aria-pressed={selected}
                          className={`w-full text-left px-3 py-2.5 text-sm border-b border-[var(--border)] last:border-0 ${
                            selected
                              ? "bg-[var(--cool-blue-tint)]"
                              : "hover:bg-[var(--cool-blue-tint)]"
                          }`}
                          onClick={() => applyIncidentToForm(incident)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="font-medium text-[var(--heading)]">
                                {incident.reference}
                              </div>
                              <div className="text-xs text-[var(--muted)] mt-0.5">
                                {incident.severity} · {incident.incidentType}
                                {incident.name ? ` · ${incident.name}` : ""}
                              </div>
                            </div>
                            {selected && (
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-[var(--heading)]"
                                aria-label="Selected"
                              />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                <p className="text-xs text-[var(--muted)]">
                  Selecting an incident fills reporter, type, location, and description. You still
                  fill title and category.
                </p>

                <button
                  type="button"
                  className="text-xs font-medium text-[var(--heading)] underline"
                  onClick={() => setShowPasteLookup((open) => !open)}
                >
                  {showPasteLookup ? "Hide paste lookup" : "Or paste an incident number"}
                </button>

                {showPasteLookup && (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      className="ui-input flex-1"
                      value={incidentLookup}
                      onChange={(e) => {
                        setIncidentLookup(e.target.value);
                        setIncidentLookupError(null);
                        if (linkedIncident) clearLinkedIncidentFields();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          void handleLookupIncident();
                        }
                      }}
                      placeholder="e.g. IR-20261102-A1B2C3"
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      className="ui-btn-primary h-10 px-4 shrink-0"
                      onClick={() => void handleLookupIncident()}
                      disabled={lookingUpIncident || !incidentLookup.trim()}
                    >
                      {lookingUpIncident ? "Looking up..." : "Load incident"}
                    </button>
                  </div>
                )}
              </>
            )}

            {incidentLookupError && (
              <p className="text-xs text-[var(--ires-red)]">{incidentLookupError}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Title</span>
              <input className="ui-input mt-1" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">
                Type{fromIncident ? " (from incident)" : ""}
              </span>
              <input
                className="ui-input mt-1"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g. phishing"
                readOnly={fromIncident}
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">Reporter name</span>
              <input
                className="ui-input mt-1"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-[var(--muted)]">
                Location{fromIncident ? " (from incident)" : ""}
              </span>
              <input
                className="ui-input mt-1"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                readOnly={fromIncident}
              />
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
            <span className="text-xs font-medium text-[var(--muted)]">
              Description{fromIncident ? " (from incident)" : ""}
            </span>
            <textarea
              className="ui-input mt-1 min-h-[100px] resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              readOnly={fromIncident}
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-[var(--muted)]">Internal notes</span>
            <textarea
              className="ui-input mt-1 min-h-[72px] resize-y"
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
            />
          </label>

          <section className="rounded-lg border border-[var(--border)] p-4 space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-[var(--heading)]">
              <input
                type="checkbox"
                checked={includeContact}
                onChange={(e) => setIncludeContact(e.target.checked)}
              />
              Add contact information
            </label>
            {includeContact && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block sm:col-span-2">
                  <span className="text-xs font-medium text-[var(--muted)]">Email</span>
                  <input
                    type="email"
                    className="ui-input mt-1"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="contact@example.com"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-[var(--muted)]">Phone</span>
                  <input
                    className="ui-input mt-1"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+234…"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-medium text-[var(--muted)]">Address</span>
                  <input
                    className="ui-input mt-1"
                    value={contactAddress}
                    onChange={(e) => setContactAddress(e.target.value)}
                    placeholder="Street, city"
                  />
                </label>
              </div>
            )}
          </section>

          <section className="rounded-lg border border-[var(--border)] p-4 space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-[var(--heading)]">
              <input
                type="checkbox"
                checked={includeVictim}
                onChange={(e) => setIncludeVictim(e.target.checked)}
              />
              Add victim information
            </label>
            {includeVictim && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs font-medium text-[var(--muted)]">Name</span>
                  <input
                    className="ui-input mt-1"
                    value={victimName}
                    onChange={(e) => setVictimName(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-[var(--muted)]">Phone</span>
                  <input
                    className="ui-input mt-1"
                    value={victimPhone}
                    onChange={(e) => setVictimPhone(e.target.value)}
                    placeholder="+234…"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-[var(--muted)]">Email</span>
                  <input
                    type="email"
                    className="ui-input mt-1"
                    value={victimEmail}
                    onChange={(e) => setVictimEmail(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-[var(--muted)]">Age (optional)</span>
                  <input
                    type="number"
                    min={0}
                    className="ui-input mt-1"
                    value={victimAge}
                    onChange={(e) => setVictimAge(e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-[var(--muted)]">Gender (optional)</span>
                  <select
                    className="ui-input mt-1"
                    value={victimGender}
                    onChange={(e) => setVictimGender(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-medium text-[var(--muted)]">Address</span>
                  <input
                    className="ui-input mt-1"
                    value={victimAddress}
                    onChange={(e) => setVictimAddress(e.target.value)}
                  />
                </label>
              </div>
            )}
          </section>

          <section className="space-y-2">
            <span className="text-xs font-medium text-[var(--muted)]">Attachments</span>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFilesSelected(e.target.files)}
            />
            <button
              type="button"
              className="w-full rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-6 text-center hover:border-[var(--primary)] transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                handleFilesSelected(e.dataTransfer.files);
              }}
            >
              <img src={UploadIcon} alt="" className="ui-icon-adaptive mx-auto h-6 w-6 opacity-70" />
              <p className="mt-2 text-sm font-medium text-[var(--heading)]">
                Choose files or drag them here
              </p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Images, PDFs, or docs · up to 10MB each
              </p>
            </button>
            {attachmentError && (
              <p className="text-xs text-[var(--ires-red)]">{attachmentError}</p>
            )}
            {attachments.length > 0 && (
              <ul className="space-y-2">
                {attachments.map((file, index) => (
                  <li
                    key={`${file.name}-${file.size}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-[var(--heading)]">
                        {file.name}
                      </p>
                      <p className="text-xs text-[var(--muted)]">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      className="ui-action-btn ui-action-danger h-9 px-3 inline-flex items-center gap-1.5"
                      onClick={() => removeAttachment(index)}
                    >
                      <img src={TrashIcon} alt="" className="ui-icon-adaptive w-3.5 h-3.5" />
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {error && <p className="text-sm text-[var(--ires-red)]">{error}</p>}
          </div>

          <div className="shrink-0 flex justify-end gap-2 px-5 py-4 border-t border-[var(--border)] bg-[var(--surface)]">
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
