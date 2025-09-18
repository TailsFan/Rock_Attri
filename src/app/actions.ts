'use server';

import { generateCreativePrompt as generateCreativePromptFlow } from '@/ai/flows/generate-creative-prompt';
import { suggestColorPalette as suggestColorPaletteFlow } from '@/ai/flows/suggest-color-palette';
import { z } from 'zod';

const generatePromptSchema = z.object({
  topic: z.string().optional(),
});

export async function generateCreativePromptAction(values: { topic?: string }) {
  const validated = generatePromptSchema.safeParse(values);
  if (!validated.success) {
    return { error: 'Invalid input.' };
  }
  try {
    const result = await generateCreativePromptFlow(validated.data);
    return { prompt: result.prompt };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate prompt.' };
  }
}


const suggestPaletteSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required.'),
});

export async function suggestColorPaletteAction(values: { prompt: string }) {
  const validated = suggestPaletteSchema.safeParse(values);
  if (!validated.success) {
    return { error: 'Invalid input.' };
  }
  try {
    const result = await suggestColorPaletteFlow(validated.data);
    return { paletteUrl: result.paletteUrl };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to suggest color palette.' };
  }
}
