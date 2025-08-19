"use client";

import { Badge } from "@/components/ui/badge";
import type { KycStatus } from "@/lib/types";
import { CheckCircle2, Hourglass, AlertTriangle, ShieldOff } from "lucide-react";

interface KycStatusBadgeProps {
  status: KycStatus;
}

export default function KycStatusBadge({ status }: KycStatusBadgeProps) {
  const statusConfig = {
    verified: {
      label: "KYC Verified",
      icon: <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />,
      variant: "default",
      className: "bg-green-500/20 text-green-500 border-green-500/30",
    },
    pending: {
      label: "KYC Pending",
      icon: <Hourglass className="mr-1.5 h-3.5 w-3.5" />,
      variant: "secondary",
      className: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
    },
    rejected: {
      label: "KYC Rejected",
      icon: <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />,
      variant: "destructive",
      className: "bg-red-500/20 text-red-500 border-red-500/30",
    },
    "not-started": {
      label: "KYC Not Started",
      icon: <ShieldOff className="mr-1.5 h-3.5 w-3.5" />,
      variant: "outline",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant as any} className={config.className}>
      {config.icon}
      {config.label}
    </Badge>
  );
}
