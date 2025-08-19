"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { summarizeServiceReviews } from '@/ai/flows/summarize-service-reviews';
import { Sparkles, LoaderCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReviewSummarizerProps {
  reviews: string[];
}

export default function ReviewSummarizer({ reviews }: ReviewSummarizerProps) {
  const [summary, setSummary] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSummarize = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');
    try {
      const result = await summarizeServiceReviews({ reviews });
      setSummary(result.summary);
    } catch (e) {
      console.error(e);
      setError('Could not generate summary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-6">
      <div className="text-center mb-4">
        <Button onClick={handleSummarize} disabled={isLoading} className="font-headline">
          {isLoading ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {isLoading ? 'Generating...' : 'Get AI-Powered Summary'}
        </Button>
      </div>
      
      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader className="flex-row items-center gap-2 space-y-0">
             <AlertTriangle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive font-headline text-lg">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-body text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {summary && (
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardHeader>
             <div className="flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" />
              <CardTitle className="font-headline text-lg text-primary">AI Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-body text-foreground/90">{summary}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
