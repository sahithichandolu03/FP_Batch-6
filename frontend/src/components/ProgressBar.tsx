import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
  variant?: "default" | "success" | "warning" | "destructive";
}

const variantClasses: Record<string, string> = {
  default: "[&>div]:bg-primary",
  success: "[&>div]:bg-success",
  warning: "[&>div]:bg-warning",
  destructive: "[&>div]:bg-destructive",
};

const ProgressBar = ({ value, label, showPercentage = true, variant = "default" }: ProgressBarProps) => (
  <div className="space-y-1.5">
    {(label || showPercentage) && (
      <div className="flex items-center justify-between text-sm">
        {label && <span className="font-medium text-foreground">{label}</span>}
        {showPercentage && <span className="text-muted-foreground">{Math.round(value)}%</span>}
      </div>
    )}
    <Progress value={value} className={`h-2.5 rounded-full bg-muted ${variantClasses[variant]}`} />
  </div>
);

export default ProgressBar;
