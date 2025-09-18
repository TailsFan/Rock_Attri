import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Eye } from 'lucide-react';

interface VisualReferenceProps {
  prompt: string;
}

export default function VisualReference({ prompt }: VisualReferenceProps) {
  const placeholderInfo = PlaceHolderImages[0];

  const seed =
    prompt
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0) ||
    placeholderInfo.id;

  const imageUrl = `https://picsum.photos/seed/${seed}/600/400`;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="text-primary" />
          <span>Visual Reference</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          {prompt ? (
            <Image
              src={imageUrl}
              alt={prompt}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform hover:scale-105"
              data-ai-hint={placeholderInfo.imageHint}
              priority
            />
          ) : (
            <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center p-4">
              <p className="text-muted-foreground text-center">
                Generate a prompt to see a visual reference
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
