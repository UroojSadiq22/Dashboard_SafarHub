"use server";

import { z } from "zod";
import { aiAssistedBookingInquiry } from "@/ai/flows/ai-assisted-booking-inquiry";

const inquirySchema = z.object({
  packageId: z.string(),
  destination: z.string(),
  travelDates: z.string(),
  pax: z.coerce.number().min(1, "At least one traveler is required."),
  specialRequests: z.string().optional(),
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Invalid email address."),
});

type State = {
  success: boolean;
  message: string;
};

export async function submitInquiry(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = inquirySchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid form data. Please check your entries.",
    };
  }

  const { destination, travelDates, pax, specialRequests } = validatedFields.data;

  try {
    const aiResult = await aiAssistedBookingInquiry({
      destination,
      travelDates,
      numTravelers: pax,
      specialRequests: specialRequests || "None",
    });

    // Here you would typically save the booking/inquiry to Firestore.
    // For example:
    // await db.collection("bookings").add({
    //   ...validatedFields.data,
    //   status: "inquiry",
    //   createdAt: new Date(),
    //   agentAssistanceRecommended: aiResult.agentAssistanceRecommended,
    //   aiReason: aiResult.reason,
    // });

    console.log("Inquiry submitted:", validatedFields.data);
    console.log("AI Recommendation:", aiResult);

    return {
      success: true,
      message: aiResult.reason,
    };
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
