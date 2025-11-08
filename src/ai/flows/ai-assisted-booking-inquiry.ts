// AIAssistedBookingInquiry flow determines if a user benefits from agent assistance based on inquiry complexity.
// It exports the aiAssistedBookingInquiry function, its input type (AIAssistedBookingInquiryInput), and output type (AIAssistedBookingInquiryOutput).

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIAssistedBookingInquiryInputSchema = z.object({
  destination: z.string().describe('The desired travel destination.'),
  travelDates: z.string().describe('The desired travel dates.'),
  numTravelers: z.number().describe('The number of travelers.'),
  specialRequests: z.string().describe('Any special requests or needs.'),
});
export type AIAssistedBookingInquiryInput = z.infer<typeof AIAssistedBookingInquiryInputSchema>;

const AIAssistedBookingInquiryOutputSchema = z.object({
  agentAssistanceRecommended: z
    .boolean()
    .describe(
      'Whether agent assistance is recommended based on the inquiry details. True if the request is complex or requires specific expertise, false otherwise.'
    ),
  reason: z.string().describe('The reason why agent assistance is recommended or not.'),
});
export type AIAssistedBookingInquiryOutput = z.infer<typeof AIAssistedBookingInquiryOutputSchema>;

export async function aiAssistedBookingInquiry(
  input: AIAssistedBookingInquiryInput
): Promise<AIAssistedBookingInquiryOutput> {
  return aiAssistedBookingInquiryFlow(input);
}

const aiAssistedBookingInquiryPrompt = ai.definePrompt({
  name: 'aiAssistedBookingInquiryPrompt',
  input: {schema: AIAssistedBookingInquiryInputSchema},
  output: {schema: AIAssistedBookingInquiryOutputSchema},
  prompt: `You are a travel expert AI assistant. You will analyze user inquiry data to determine if the user would benefit from agent assistance.

Analyze the following inquiry data:
Destination: {{{destination}}}
Travel Dates: {{{travelDates}}}
Number of Travelers: {{{numTravelers}}}
Special Requests: {{{specialRequests}}}

Based on the complexity of the request, location, and any special needs, determine if agent assistance is recommended.

Consider factors such as:
- Unusual or remote destinations
- Complex itineraries
- Specific accessibility needs
- Large group bookings

Output in JSON format whether \"agentAssistanceRecommended\" is true or false, and provide a \"reason\" for your determination. The \"reason\" should be concise.
`,
});

const aiAssistedBookingInquiryFlow = ai.defineFlow(
  {
    name: 'aiAssistedBookingInquiryFlow',
    inputSchema: AIAssistedBookingInquiryInputSchema,
    outputSchema: AIAssistedBookingInquiryOutputSchema,
  },
  async input => {
    const {output} = await aiAssistedBookingInquiryPrompt(input);
    return output!;
  }
);
