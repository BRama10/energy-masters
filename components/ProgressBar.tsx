// components/ProgressBar.tsx
interface ProgressBarProps {
    value: number;
    max: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value, max }) => {
    const percentage = (value / max) * 100;

    return (
        <div className="space-y-2">
            <div className="w-full bg-secondary h-2 rounded-full">
                <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <p className="text-sm text-muted-foreground">
                {value} of {max} items completed ({Math.round(percentage)}%)
            </p>
        </div>
    );
};
