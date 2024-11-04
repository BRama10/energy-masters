// components/StatusBadge.tsx
import { Badge } from "@/components/ui/badge";
import { AuditStatus } from "../types/audit";

const statusConfig = {
    draft: { label: "Draft", variant: "secondary" },
    completed: { label: "Completed", variant: "success" },
    review: { label: "In Review", variant: "warning" },
} as const;

interface StatusBadgeProps {
    status: AuditStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const config = statusConfig[status];
    return (
        <Badge variant={config.variant as any}>
            {config.label}
        </Badge>
    );
};