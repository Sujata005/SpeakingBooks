# 📚 Speaking Books – AI-Powered PDF Conversations

**Speaking Books** is a full-stack SaaS platform that allows users to upload PDF books and engage in real-time, high-fidelity voice conversations with them. By leveraging advanced AI orchestration, the app "reads" your books and acts as an interactive mentor, answering questions based on the actual text of the PDF.

🚀 Visit Live Site
## ✨ Features
-  🎙️ **Real-time Voice Chat**: Hands-free interaction using Vapi for natural, low-latency AI voice conversations.

-   📄 **Smart PDF Processing**: Automatic extraction and segmentation of PDF content for precise AI context.

-   🖼️ **Custom Library UI**: A specialized dashboard to manage your books, featuring dynamic book cover generation and storage.

-   💳 **Subscription Management**: Custom-built pricing tiers (Free & Pro) to manage user access and features.

-   🔐 **Secure Authentication**: User sign-in and profile management powered by Clerk.

-   📱 **Fully Responsive**: Optimized experience across mobile, tablet, and desktop devices.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)

- **Styling**: Tailwind CSS & Shadcn UI

- **Database**: MongoDB (Mongoose)

- **Auth**: Clerk

- **AI/Voice**: Vapi

- **Storage**: Vercel Blob

- **Embeddings**: Google Gemini AI

## 🚀 Getting Started
- **Prerequisites**
Ensure you have Node.js 18+ installed on your machine.

**Installation**
1. Clone the repository:
``` git clone https://github.com/Sujata005/SpeakingBooks.git 
cd SpeakingBooks```

2. Install dependencies:
```npm install```

3. Set up environment variables:
Create a ```.env.local``` file in the root directory and add the following keys:

Code snippet
```
# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Storage & Database
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
MONGODB_URI=your_mongodb_connection_string

# Vapi (Voice AI)
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_public_key
VAPI_SERVER_SECRET=your_vapi_secret
NEXT_PUBLIC_VAPI_ASSISTANT_ID=your_assistant_id

# Google Gemini (Embeddings)
GOOGLE_GEMINI_API_KEY=your_gemini_key
```
4. Run the development server:
```npm run dev ```

Open ```http://localhost:3000``` to see the result.

# 📸 Screenshots
Library Page: View all your uploaded books with generated covers.

Add New Book: Seamlessly upload PDFs and enter metadata.

Voice Interface: Engage in real-time conversation with the selected book persona.

📝 Configuration Note
If you encounter a 413 Payload Too Large error when uploading large PDFs, update your next.config.mjs to increase the server action limit:

JavaScript
experimental: {
  serverActions: {
    bodySizeLimit: '100mb',
  },
},
🤝 Contributing
This project was built as part of a technical journey to master AI engineering in 2026. Feel free to fork the repo and submit pull requests for any features or bug fixes.

Developed with ❤️ by Sujata Bijalwan
