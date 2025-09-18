'use client';

import { useState, useTransition } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { generateCreativePromptAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Label } from './ui/label';

interface InspirationGeneratorProps {
  onPromptGenerated: (prompt: string) => void;
  currentPrompt: string;
}

export default function InspirationGenerator({ onPromptGenerated, currentPrompt }: InspirationGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const result = await generateCreativePromptAction({ topic });
      if (result.error) {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      } else if (result.prompt) {
        onPromptGenerated(result.prompt);
      }
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-primary" />
          <span>Inspiration Prompt</span>
        </CardTitle>
        <CardDescription>
          Stuck? Generate a creative prompt to get you started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="topic-input">Optional Topic</Label>
            <Input
              id="topic-input"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., enchanted forest, futuristic city..."
            />
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? 'Generating...' : 'Generate Prompt'}
          </Button>
        </form>
        {currentPrompt && (
          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <p className="font-medium text-secondary-foreground text-center">
              {currentPrompt}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
