// components/NotesSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface NotesSectionProps {
    notes: string;
    onUpdate: (notes: string) => void;
}

export const NotesSection: React.FC<NotesSectionProps> = ({ notes, onUpdate }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea
                    placeholder="Add any additional observations or notes..."
                    value={notes}
                    onChange={(e) => onUpdate(e.target.value)}
                    rows={6}
                />
            </CardContent>
        </Card>
    );
};
