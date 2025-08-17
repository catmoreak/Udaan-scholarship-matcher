

# Udaan Scholarship Matcher

**Live Preview:** [https://udaan-scholarship.vercel.app/](https://udaan-scholarship.vercel.app/)

## Idea behind Udaan

Many deserving students miss out on scholarships due to lack of awareness, confusing eligibility criteria, or overwhelming application processes. Udaan was created to bridge this gap—making it easy for students to discover, filter, and apply for scholarships that truly match their background and aspirations. With a focus on accessibility, guidance, and a seamless user experience, Udaan empowers students to pursue their educational dreams without financial barriers.

Powered by Supabase and Gemini 

Udaan Scholarship Matcher is a modern, user-friendly web application that helps students discover and apply for scholarships that match their profile. Built with React, TypeScript, Tailwind CSS, and Supabase, it features a professional UI, dark mode, advanced filtering, and a helpful chatbot assistant.

## Features

- **Scholarship Search & Filter:**
  - Filter scholarships by eligibility, category, and more.
  - Only shows scholarships matching user criteria.
- **Professional UI:**
  - Clean, responsive design with dark mode support.
  - Animated loading screen and beautiful buttons.
- **ChatBot Assistant:**
  - Floating chatbot with preset Q&A and animated tooltip for help.
- **Supabase Integration:**
  - Fetches scholarship data securely from Supabase backend.


## Techstacks
- React + Vite
- Tailwind
- Supabase
- Gemini 



## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Set up your `.env` file with Supabase credentials

### Running the App
```sh
npm run dev
# or
yarn dev
```
The app will be available at `http://localhost:5173` (or as shown in your terminal).

## Project Structure

```
project/
├── src/
│   ├── components/         # React components (Header, FilterForm, ScholarshipCard, ChatBot, etc.)
│   ├── contexts/           # React context (ThemeContext)
│   ├── hooks/              # Custom hooks (useScholarships)
│   ├── lib/                # Supabase client setup
│   ├── types/              # TypeScript types
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Tailwind/global styles
├── public/
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── ...
```

## Customization
- **Supabase:** Update `src/lib/supabase.ts` with your Supabase project URL and anon key.
- **ChatBot:** Edit `src/components/ChatBot.tsx` to customize questions, answers, or appearance.
- **Styling:** Modify `tailwind.config.js` and `index.css` for custom themes.

## Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

## License
MIT

---

**Made with ❤️ for students**
