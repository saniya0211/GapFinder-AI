# GapFinder AI — runnable demo

A Next.js + TypeScript demo for diagnosing learning gaps from a student's own uploaded material. It works locally without paid APIs or API keys and includes a small sample dataset.

## Requirements
- Node.js 18.17+ (Node 20 LTS recommended)
- npm

## Run on Windows
1. Extract `GapFinderAI.zip`.
2. Open the extracted `GapFinderAI` folder in VS Code.
3. Open Terminal in that folder and run:

```bash
npm install
npm run dev
```

4. Open http://localhost:3000

## Login
- Student: enter any non-empty student name and password manually. This is demo-only authentication; credentials are stored in browser session storage and are not sent to a server.
- Admin portal: choose **Admin Login**, then enter name `Admin` and password `Admin123` exactly.

## Included features
1. Material upload: `.txt` and `.pdf` upload; PDF text extraction uses `pdf-parse`.
2. Topic map: detects headings / common topic labels from material and shows topic counts.
3. Diagnostic quiz: generates questions from retrieved text chunks, with source citations.
4. Gap report: weak / medium / strong topic ratings based on quiz answers, with explanations.
5. Revision plan: prioritizes weak topics and allocates sessions based on available study days.
6. Explain topic: retrieves only from uploaded/sample material and cites the source chunk. If no relevant source is found, it says so.
7. Progress dashboard: stores attempts in browser session storage for the current session and shows recent scores.
8. Student login and personal material separation in the UI; admin portal with current-session login activity.

## AI / RAG design and honest limitations
- **Retrieval:** local lexical relevance scoring (term overlap) selects source chunks from uploaded/sample content. This is a lightweight offline retrieval baseline, not a vector embedding model.
- **Generation:** quiz items and explanations are generated from retrieved source sentences using templates. No external model is called in the default offline demo, so it does not invent unsupported facts intentionally.
- **Evaluation / gap analysis:** compares the student's selected answer with a source-grounded answer key and aggregates scores by topic.
- **Plan generation:** sorts topics by weakness and creates a time-bounded revision schedule.
- **Citations:** each quiz item and answer includes a source label and excerpt.
- **For production:** replace lexical retrieval with embeddings + pgvector and connect an LLM provider through a server-side API route; add real authentication, server-side database persistence, file validation, malware scanning, authorization, and privacy controls. This project is a functional academic demo, not production-grade secure authentication.

## Dataset
`data/sample_material.txt` is a simple computer-science study dataset. It is preloaded into the app, so the app can be tested immediately without uploading a file.

## Troubleshooting
- If `npm` is not recognized, install Node.js LTS from https://nodejs.org and restart VS Code.
- If port 3000 is busy, Next.js will offer another port.
- For PDF upload, use a text-based PDF. Scanned image-only PDFs need OCR and are not supported in this demo.

## Updated interface
- Student navigation is in a left sidebar.
- Login hint text has been removed from the login screen.
- Quiz submission shows the score and topic-wise results in the Quiz page; use the sidebar's Gap Report item when ready.
- Admin portal includes a recent login activity table for logins recorded during the current app session.

## Material upload behavior
Uploading a readable PDF or TXT replaces the sample material for the current workspace. Topic Map is a separate sidebar page and shows sections extracted from the current file. The quiz generator uses only the current workspace chunks. If a PDF has no headings, paragraph-based section labels are created automatically. Scanned image-only PDFs require OCR and are not supported by this demo.
