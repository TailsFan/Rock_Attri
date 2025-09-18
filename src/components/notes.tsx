'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { FileText } from 'lucide-react';

export default function Notes() {
  return (
    <Card className="shadow-md flex-grow flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <FileText className="text-primary"/>
            <span>Notes</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <Textarea
          placeholder="Jot down your ideas..."
          className="h-full min-h-48 resize-none"
        />
      </CardContent>
    </Card>
  );
}
