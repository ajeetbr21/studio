// Summarizes service reviews using generative AI for quick buyer insights.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeServiceReviewsInputSchema = z.object({
  reviews: z.array(z.string()).describe('An array of service reviews.'),
});

export type SummarizeServiceReviewsInput = z.infer<typeof SummarizeServiceReviewsInputSchema>;

const SummarizeServiceReviewsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the service reviews.'),
});

export type SummarizeServiceReviewsOutput = z.infer<typeof SummarizeServiceReviewsOutputSchema>;

export async function summarizeServiceReviews(
  input: SummarizeServiceReviewsInput
): Promise<SummarizeServiceReviewsOutput> {
  return summarizeServiceReviewsFlow(input);
}

const summarizeServiceReviewsPrompt = ai.definePrompt({
  name: 'summarizeServiceReviewsPrompt',
  input: {schema: SummarizeServiceReviewsInputSchema},
  output: {schema: SummarizeServiceReviewsOutputSchema},
  prompt: `You are an AI assistant helping buyers understand the sentiment of service reviews. Provide a concise summary of the following reviews:\n\n{% each reviews %}\n- {{{this}}}{% endeach %}\n\nSummary: `,
});

const summarizeServiceReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeServiceReviewsFlow',
    inputSchema: SummarizeServiceReviewsInputSchema,
    outputSchema: SummarizeServiceReviewsOutputSchema,
  },
  async input => {
    const {output} = await summarizeServiceReviewsPrompt(input);
    return output!;
  }
);
