import React, { useState } from "react";
import { createStaffIncident } from "../services/incidentService";
import {
  INCIDENT_ONGOING,
  INCIDENT_SEVERITY_OPTIONS,
  INCIDENT_TYPE_OPTIONS,
  type CreateIncidentPayload,
  type CreateIncidentResponse,
  type IncidentOngoing,
  type IncidentSeverity,
} from "../types";
import { getApiErrorMessage } from "@/features/tickets/types";
import { getEmailError, toLowerEmail } from "@/shared/utils/email";

interface CreateIncidentModalProps {
  onClose: () => void;
  onCreated: (result: CreateIncidentResponse) => void;
}

type FieldKey =
  | "severity"
  | "incidentType"
  | "ongoing"
  | "name"
  | "phone"
  | "email"
  | "description";

type FieldErrors = Partial<Record<FieldKey, string>>;

/** Same red asterisk as the public report form. Inline color so it cannot be theme-purged. */
const RequiredMark = () => (
  <span
    aria-hidden="true"
    className="ml-0.5 font-bold"
    style={{ color: "#ef4444" }}
  >
    *
  </span>
);

const inputBase =
  "ui-input mt-1 w-full";
const inputError =
  "ui-input mt-1 w-full !border-[#ef4444] focus:!border-[#ef4444] focus:!ring-[#ef4444]/20";

const CreateIncidentModal: React.FC<CreateIncidentModalProps> = ({ onClose, onCreated }) => {
  const [severity, setSeverity] = useState<IncidentSeverity | "">("");
  const [incidentType, setIncidentType] = useState("");
  const [ongoing, setOngoing] = useState<IncidentOngoing | "">("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [detectedAt, setDetectedAt] = useState("");
  const [affectedSystems, setAffectedSystems] = useState("");
  const [description, setDescription] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const clearFieldError = (field: FieldKey) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!severity) next.severity = "Select a severity";
    if (!incidentType.trim()) next.incidentType = "Select an incident type";
    if (!ongoing) next.ongoing = "Select whether the incident is ongoing";
    if (!name.trim()) next.name = "Name is required";
    else if (name.trim().length > 120) next.name = "Name must be 120 characters or fewer";
    if (!phone.trim()) next.phone = "Phone is required";
    else if (phone.trim().length > 40) next.phone = "Phone must be 40 characters or fewer";
    const emailError = getEmailError(email);
    if (emailError) next.email = emailError;
    if (!description.trim()) next.description = "Describe what happened";
    else if (description.trim().length > 8000) {
      next.description = "Description must be 8000 characters or fewer";
    }
    return next;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validate();
    setFieldErrors(nextErrors);
    setError("");
    if (Object.keys(nextErrors).length > 0) {
      setError("Fix the highlighted fields before submitting.");
      return;
    }
    if (!severity || !ongoing) return;

    const payload: CreateIncidentPayload = {
      severity,
      incidentType: incidentType.trim(),
      ongoing,
      name: name.trim(),
      phone: phone.trim(),
      email: toLowerEmail(email.trim()),
      description: description.trim(),
      confirmed: true,
      ...(organization.trim() ? { organization: organization.trim() } : {}),
      ...(detectedAt.trim() ? { detectedAt: detectedAt.trim() } : {}),
      ...(affectedSystems.trim() ? { affectedSystems: affectedSystems.trim() } : {}),
    };

    setIsSaving(true);
    try {
      const result = await createStaffIncident(payload);
      onCreated(result);
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not send the report."));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-[var(--ires-dark-blue)]/40" onClick={isSaving ? undefined : onClose} />
      <div className="relative z-10 ui-card w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="shrink-0 px-5 py-4 border-b border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--heading)]">Report an incident</h2>
          <p className="text-sm text-[var(--muted)] mt-1">
            Filed for the caller. A new email gets an account and a temporary password. An existing email keeps the incident on that account.
          </p>
        </div>

        <form className="flex flex-col flex-1 min-h-0" onSubmit={handleSubmit} noValidate>
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            <div>
              <p className="text-sm font-medium text-[var(--heading)]">
                Severity
                <RequiredMark />
              </p>
              <div className="mt-2 grid grid-cols-2 lg:grid-cols-4 gap-2">
                {INCIDENT_SEVERITY_OPTIONS.map((option) => {
                  const selected = severity === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSeverity(option.value);
                        clearFieldError("severity");
                      }}
                      className={`rounded-xl px-3 py-3 text-left transition-colors border ${
                        selected
                          ? "border-[var(--primary)] bg-[color-mix(in_srgb,var(--primary)_12%,var(--surface))]"
                          : fieldErrors.severity
                            ? "border-[#ef4444] bg-[var(--surface)]"
                            : "border-[var(--border)] bg-[var(--surface)] hover:border-[color-mix(in_srgb,var(--primary)_35%,var(--border))]"
                      }`}
                    >
                      <div className="text-sm font-semibold text-[var(--heading)]">{option.label}</div>
                      <div className="text-xs text-[var(--muted)] mt-0.5">{option.hint}</div>
                    </button>
                  );
                })}
              </div>
              {fieldErrors.severity ? (
                <p className="mt-1.5 text-xs font-medium" style={{ color: "#ef4444" }}>
                  {fieldErrors.severity}
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-[var(--heading)]">
                  Incident type
                  <RequiredMark />
                </span>
                <select
                  className={fieldErrors.incidentType ? inputError : inputBase}
                  value={incidentType}
                  onChange={(e) => {
                    setIncidentType(e.target.value);
                    clearFieldError("incidentType");
                  }}
                >
                  <option value="">Select an option</option>
                  {INCIDENT_TYPE_OPTIONS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {fieldErrors.incidentType ? (
                  <p className="mt-1.5 text-xs text-[#ef4444]">{fieldErrors.incidentType}</p>
                ) : null}
              </label>

              <label className="block">
                <span className="text-sm font-medium text-[var(--heading)]">
                  Is the incident ongoing?
                  <RequiredMark />
                </span>
                <select
                  className={fieldErrors.ongoing ? inputError : inputBase}
                  value={ongoing}
                  onChange={(e) => {
                    setOngoing(e.target.value as IncidentOngoing);
                    clearFieldError("ongoing");
                  }}
                >
                  <option value="">Select an option</option>
                  {INCIDENT_ONGOING.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {fieldErrors.ongoing ? (
                  <p className="mt-1.5 text-xs text-[#ef4444]">{fieldErrors.ongoing}</p>
                ) : null}
              </label>

              <label className="block">
                <span className="text-sm font-medium text-[var(--heading)]">
                  Your name
                  <RequiredMark />
                </span>
                <input
                  className={fieldErrors.name ? inputError : inputBase}
                  maxLength={120}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearFieldError("name");
                  }}
                />
                {fieldErrors.name ? (
                  <p className="mt-1.5 text-xs text-[#ef4444]">{fieldErrors.name}</p>
                ) : null}
              </label>

              <label className="block">
                <span className="text-sm font-medium text-[var(--heading)]">
                  Organization{" "}
                  <span className="font-normal text-[var(--muted)]">(optional)</span>
                </span>
                <input
                  className={inputBase}
                  maxLength={200}
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-[var(--heading)]">
                  Phone (we will call this number)
                  <RequiredMark />
                </span>
                <input
                  className={fieldErrors.phone ? inputError : inputBase}
                  type="tel"
                  maxLength={40}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    clearFieldError("phone");
                  }}
                />
                {fieldErrors.phone ? (
                  <p className="mt-1.5 text-xs text-[#ef4444]">{fieldErrors.phone}</p>
                ) : null}
              </label>

              <label className="block">
                <span className="text-sm font-medium text-[var(--heading)]">
                  Email (use a trusted account)
                  <RequiredMark />
                </span>
                <input
                  className={fieldErrors.email ? inputError : inputBase}
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(toLowerEmail(e.target.value));
                    clearFieldError("email");
                  }}
                  onBlur={() => {
                    const emailError = getEmailError(email);
                    if (emailError) {
                      setFieldErrors((prev) => ({ ...prev, email: emailError }));
                    }
                  }}
                />
                {fieldErrors.email ? (
                  <p className="mt-1.5 text-xs text-[#ef4444]">{fieldErrors.email}</p>
                ) : null}
              </label>

              <label className="block">
                <span className="text-sm font-medium text-[var(--heading)]">
                  When was it detected?{" "}
                  <span className="font-normal text-[var(--muted)]">(optional)</span>
                </span>
                <input
                  className={`${inputBase} [color-scheme:dark]`}
                  type="datetime-local"
                  value={detectedAt}
                  onChange={(e) => setDetectedAt(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-[var(--heading)]">
                  Affected systems{" "}
                  <span className="font-normal text-[var(--muted)]">(optional)</span>
                </span>
                <input
                  className={inputBase}
                  maxLength={2000}
                  value={affectedSystems}
                  onChange={(e) => setAffectedSystems(e.target.value)}
                  placeholder="For example: email, file server, website"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-[var(--heading)]">
                  What happened?
                  <RequiredMark />
                </span>
                <textarea
                  className={`${fieldErrors.description ? inputError : inputBase} min-h-[110px]`}
                  maxLength={8000}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    clearFieldError("description");
                  }}
                  placeholder="Describe what you observed, any messages or ransom notes, and actions already taken."
                />
                {fieldErrors.description ? (
                  <p className="mt-1.5 text-xs text-[#ef4444]">{fieldErrors.description}</p>
                ) : null}
              </label>
            </div>

            {error ? <p className="text-sm text-[#ef4444]">{error}</p> : null}
          </div>

          <div className="shrink-0 flex justify-end gap-2 px-5 py-4 border-t border-[var(--border)] bg-[var(--surface)]">
            <button type="button" className="ui-action-btn h-10 px-4" onClick={onClose} disabled={isSaving}>
              Cancel
            </button>
            <button type="submit" className="ui-btn-primary" disabled={isSaving}>
              {isSaving ? "Sending..." : "Submit report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIncidentModal;
