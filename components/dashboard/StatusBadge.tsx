import { Badge } from "@/components/ui/badge";
import { CheckCircleIcon, AlertCircleIcon, ClockIcon } from "lucide-react";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200">
          <CheckCircleIcon className="w-3 h-3 mr-1" />
          Selesai
        </Badge>
      );
    case "in-progress":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200">
          <AlertCircleIcon className="w-3 h-3 mr-1" />
          Dikerjakan
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200">
          <ClockIcon className="w-3 h-3 mr-1" />
          Menunggu
        </Badge>
      );
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};
