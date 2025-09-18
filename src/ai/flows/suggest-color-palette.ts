'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting a color palette based on a given prompt.
 *
 * @fileOverview A color palette suggestion AI agent.
 * - suggestColorPalette - A function that handles the color palette suggestion process.
 * - SuggestColorPaletteInput - The input type for the suggestColorPalette function.
 * - SuggestColorPaletteOutput - The return type for the suggestColorPalette function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestColorPaletteInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate a color palette for.'),
});
export type SuggestColorPaletteInput = z.infer<typeof SuggestColorPaletteInputSchema>;

const SuggestColorPaletteOutputSchema = z.object({
  paletteUrl: z.string().describe('The URL of the suggested color palette on coolors.co.'),
});
export type SuggestColorPaletteOutput = z.infer<typeof SuggestColorPaletteOutputSchema>;

export async function suggestColorPalette(input: SuggestColorPaletteInput): Promise<SuggestColorPaletteOutput> {
  return suggestColorPaletteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestColorPalettePrompt',
  input: {schema: SuggestColorPaletteInputSchema},
  output: {schema: SuggestColorPaletteOutputSchema},
  prompt: `You are a color palette expert. Based on the prompt, suggest a URL from coolors.co that contains a color palette relevant to the prompt.\n\nPrompt: {{{prompt}}}`,
});

const suggestColorPaletteFlow = ai.defineFlow(
  {
    name: 'suggestColorPaletteFlow',
    inputSchema: SuggestColorPaletteInputSchema,
    outputSchema: SuggestColorPaletteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
