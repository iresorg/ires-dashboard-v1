import React from "react";
import type { TicketStatus } from "../types";
import { formatTicketStatus, getTicketStatusBadgeClass } from "../types";

interface TicketStatusBadgeProps {
  status: TicketStatus | string;
}

const TicketStatusBadge: React.FC<TicketStatusBadgeProps> = ({ status }) => (
  <span className={`ui-chip ${getTicketStatusBadgeClass(status)}`}>
    {formatTicketStatus(status)}
  </span>
);

export default TicketStatusBadge;
