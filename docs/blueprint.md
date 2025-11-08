# **App Name**: SafarHub

## Core Features:

- Agent Listing: Display a list of verified travel agents with ratings, specialties, and locations sourced from Firestore.
- Package Search & Filtering: Allow users to search and filter travel packages by price, duration, destination, and travel type, based on package data stored in Firestore.
- Package Details: Display detailed information about a travel package, including itinerary, images (stored in Firebase Storage), and available seats.  Data is pulled from Firestore.
- Inquiry/Booking Form: Enable users to submit inquiries or bookings for travel packages, writing the form data to Firestore. The AI tool decides if agent assistance would be beneficial.
- Agent Dashboard: Provide a dashboard for agents to upload packages (images to Firebase Storage, data to Firestore) and manage bookings, with access control based on ownerUserId.
- Admin Dashboard: Provide an admin dashboard to verify agents and approve listings, with access control based on user role (admin). Data stored and managed in Firestore.
- Notifications: Use Cloud Functions to notify agents when a new inquiry/booking is created. Agent data managed in Firestore.

## Style Guidelines:

- Primary color: Deep blue (#2E5CB8) to evoke trust and wanderlust, reminiscent of deep ocean exploration.
- Background color: Light gray (#F0F4F8), a desaturated version of the primary, for a clean and modern backdrop.
- Accent color: Teal (#3E8A89), an analogous color to the primary, to add vibrancy and guide user attention to key actions.
- Body and headline font: 'Inter', a grotesque-style sans-serif for a modern, machined look suitable for both headlines and body text
- Use clean, outlined icons from a set like Remix Icon, focusing on clarity and easy recognition.
- Implement a responsive, mobile-first design using TailwindCSS with glass and soft gradient effects for a modern feel.
- Incorporate subtle animations for page transitions and loading states to enhance user experience.