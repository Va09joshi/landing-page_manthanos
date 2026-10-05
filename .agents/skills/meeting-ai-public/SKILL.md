---
name: meeting-ai-public
description: Update public ManthanOS website content that explains meeting transcription, AI summaries, decisions, and action items without overstating the implemented product.
---

# ManthanOS Meeting AI Public Content

Use [the backend flow](../../../../Backend/docs/MEETING_AI_FLOW.md) as the source of truth before editing claims about meeting AI.

Describe the user-visible outcome plainly: participant-attributed transcripts are captured during a LiveKit meeting, and an ended meeting can produce a structured summary, key points, decisions, follow-ups, and suggested action items.

Do not claim perfect transcription, automatic task creation without approval, universal speaker diarization, sentiment analysis, or support for providers that are not configured in the repository. Keep operational secrets, internal endpoints, model prompts, and vendor credentials out of public copy.

After changing public content, run the repository's lint/build checks and confirm responsive layout at mobile and desktop widths.
