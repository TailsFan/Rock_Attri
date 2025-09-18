'use client';

import { useState, useTransition } from 'react';
import { Palette, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { suggestColorPaletteAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface ColorPaletteProps {
  prompt: string;
}

export default function ColorPalette({ prompt }: ColorPaletteProps) {
  const [paletteUrl, setPaletteUrl] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSuggestPalette = () => {
    if (!prompt) {
      toast({
        title: 'No Prompt',
        description: 'Please generate a prompt first.',
        variant: 'destructive',
      });
      return;
    }

    startTransition(async () => {
      const result = await suggestColorPaletteAction({ prompt });
      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      } else if (result.paletteUrl) {
        setPaletteUrl(result.paletteUrl);
      }
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="text-primary" />
          <span>Color Palette Suggestion</span>
        </CardTitle>
        <CardDescription>
          Get a color palette suggestion from coolors.co based on your prompt.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleSuggestPalette} disabled={!prompt || isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Suggesting...
            </>
          ) : (
            'Suggest Palette'
          )}
        </Button>
      </CardContent>
      {paletteUrl && (
        <CardFooter>
          <a
            href={paletteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="outline" className="w-full">
              View Palette on Coolors.co
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </CardFooter>
      )}
    </Card>
  );
}
