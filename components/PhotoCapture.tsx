// components/PhotoCapture.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, X } from "lucide-react";

interface PhotoCaptureProps {
    onCapture: (photo: string) => void;
    existingPhotos?: string[];
    onDelete?: (index: number) => void;
}

export const PhotoCapture: React.FC<PhotoCaptureProps> = ({
    onCapture,
    existingPhotos = [],
    onDelete,
}) => {
    const [photos, setPhotos] = useState<string[]>(existingPhotos);

    const handleCapture = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.createElement('video');
            video.srcObject = stream;
            await video.play();

            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d')?.drawImage(video, 0, 0);

            const photo = canvas.toDataURL('image/jpeg');
            setPhotos([...photos, photo]);
            onCapture(photo);

            stream.getTracks().forEach(track => track.stop());
        } catch (error) {
            console.error('Error capturing photo:', error);
        }
    };

    const handleDelete = (index: number) => {
        const updatedPhotos = photos.filter((_, i) => i !== index);
        setPhotos(updatedPhotos);
        onDelete?.(index);
    };

    return (
        <div className="space-y-4">
            <Button
                onClick={handleCapture}
                className="w-full"
                variant="outline"
            >
                <Camera className="mr-2 h-4 w-4" />
                Take Photo
            </Button>

            <div className="grid grid-cols-2 gap-4">
                {photos.map((photo, index) => (
                    <Card key={index} className="relative">
                        <CardContent className="p-2">
                            <img
                                src={photo}
                                alt={`Photo ${index + 1}`}
                                className="w-full h-32 object-cover rounded"
                            />
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1"
                                onClick={() => handleDelete(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};