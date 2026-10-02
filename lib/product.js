/**
 * Product source of truth.
 *
 * Every string below is derived from the actual product:
 *  - Backend/prisma/schema.prisma    (models, enums, workspace types)
 *  - manthanos-admin/lib/resources.js (navigation, permission levels)
 *
 * ---------------------------------------------------------------------------
 * A NOTE ON THE SAMPLE DATA BELOW
 * ---------------------------------------------------------------------------
 * This is a marketing site. It is public, indexable and readable by anyone.
 *
 * Earlier revisions of this file published the real records from
 * Backend/prisma/seed.js verbatim — named people, named client companies,
 * brand-deal values and revenue goals. That data exists to develop and test
 * against. It is not a customer roster, and presenting it as one put internal
 * records and invented financial figures in front of the public.
 *
 * The examples below are therefore ANONYMISED DEMONSTRATIONS. They keep the
 * exact record shapes, statuses and relationships the product produces, so the
 * interface is still truthful about what ManthanOS does — without shipping
 * anyone's personal or business information. Roles are first names and initials
 * only. No currency values, no view counts, no company names.
 *
 * If a number is shown anywhere on this site, it is either a real count of
 * things the schema produces (eleven stages, four groups) or a number a user
 * can verify. Never a metric borrowed from seed data.
 * ---------------------------------------------------------------------------
 */

export const product = {
  name: "ManthanOS",
  tagline: "One workspace for the work behind the work",
  description:
    "Ideas, projects, tasks, clients, meetings, content and collaboration in one connected workspace — with the handoffs, ownership and approvals already built in.",
};

/* Workspace types exist in the schema as WorkspaceType. */
export const workspaceTypes = [
  {
    id: "CREATOR",
    label: "Creator team",
    audience: "Studios, creators, editors, managers",
    summary:
      "Scripts, production phases, publishing, sponsor deals and channel analytics for a compact production crew.",
    modules: ["Production Pipeline", "Script Studio", "Universal Planner", "Brand Deals", "Personal Brand", "Asset Library"],
  },
  {
    id: "COMPANY",
    label: "Company",
    audience: "Agencies, consultancies, startups, enterprise",
    summary:
      "CRM, client projects, departments, approvals and employee phase tracking for teams that deliver to other people.",
    modules: ["Client Projects", "CRM & Brand Deals", "My Phases", "Meetings", "Attendance", "Roles & Permissions"],
  },
  {
    id: "AGENCY",
    label: "Agency",
    audience: "Client-facing delivery teams",
    summary:
      "Client workspaces with account managers, project managers and reviewers held inside one permission model.",
    modules: ["Client Projects", "Chatrooms", "Reports", "Polls", "Audit Logs", "Roles"],
  },
];

/* The eleven production stages are the CreatorContentStage enum, in order. */
export const pipelineStages = [
  { id: "IDEA", label: "Idea", group: "Plan", note: "Shape the angle, audience and channel before production begins." },
  { id: "RESEARCH", label: "Research", group: "Plan", note: "Keep sources, references and insights attached to the project." },
  { id: "SCRIPT", label: "Script", group: "Create", note: "Write, refine and approve every draft in one shared record." },
  { id: "VOICEOVER", label: "Voiceover", group: "Create", note: "Assign the recording with a clear owner, brief and deadline." },
  { id: "VISUALS", label: "Visuals", group: "Create", note: "Keep every visual and revision beside the cut it supports." },
  { id: "EDITING", label: "Editing", group: "Create", note: "Move cuts, feedback and handoffs through one visible timeline." },
  { id: "THUMBNAIL", label: "Thumbnail", group: "Create", note: "Compare options and approve the image that earns the click." },
  { id: "SEO", label: "SEO", group: "Review", note: "Polish the title, description and tags before the release." },
  { id: "REVIEW", label: "Review", group: "Review", note: "Turn focused feedback into a clear approval or next action." },
  { id: "SCHEDULED", label: "Scheduled", group: "Publish", note: "Set the release time and coordinate every connected channel." },
  { id: "PUBLISHED", label: "Published", group: "Publish", note: "Bring live performance back to the work that produced it." },
];

export const pipelineGroups = [
  { id: "Plan", caption: "Capture the why before the work starts." },
  { id: "Create", caption: "Keep every contributor close to the context they need." },
  { id: "Review", caption: "Turn feedback into decisions with a name attached." },
  { id: "Publish", caption: "Send it out, then bring the signal back to the same record." },
];

/* How deep a role can go on any single record, in plain language.
   The PermissionLevel enum in the schema also carries three internal levels
   including a secret-reveal level and a top-level administrative level. Those
   are not shown here: a visitor has no use for them, and naming the
   secret-reveal level on a public page describes the authorisation surface far
   more precisely than any customer needs. */
export const permissionLevels = [
  "View", "Comment", "Edit", "Approve", "Manage",
];

export const permissionResources = [
  "Team", "Roles", "Permissions", "Channels", "Credentials", "Links", "Ideas", "Meetings",
  "Content projects", "Tasks", "Daily logs", "Prompts", "Brand assets", "Blog", "Reports",
  "Activity logs", "Audit logs", "Notifications", "AI runs", "Chatrooms", "Polls", "Attendance",
];

/* The admin navigation, grouped exactly as the product ships it. */
export const moduleGroups = [
  {
    label: "Core",
    items: ["Command Center", "Analytics", "Goals Planner"],
    summary: "The operating picture: what is moving, what is blocked, what is due.",
  },
  {
    label: "Workflow",
    items: ["Ideas Engine", "Production Pipeline", "Universal Planner", "Script Studio", "Tasks", "Meetings", "Daily Logs"],
    summary: "From a raw angle to a shipped deliverable without leaving the workspace.",
  },
  {
    label: "Business & Assets",
    items: ["Brand Deals", "Personal Brand", "Asset Library", "Channels", "Platform Accounts", "Links"],
    summary: "The commercial and reference layer that keeps delivery billable and on-brand.",
  },
  {
    label: "Admin",
    items: ["Workspace", "Team", "Chatrooms", "Polls", "Attendance", "Roles", "Permissions", "Settings"],
    summary: "Structure that keeps a growing team predictable instead of chaotic.",
  },
];

/* Two ANONYMISED example workspaces, shaped exactly like the records a real
   workspace creates. Names, companies and money have been removed. */
export const exampleWorkspaces = [
  {
    type: "CREATOR",
    name: "Creator workspace",
    slug: "creator-workspace",
    who: "A small production team making video content",
    shape: "Creator",
    records: [
      ["Profile", "Technology education · long-form video"],
      ["Goal", "Publish on a consistent weekly cadence"],
      ["Goal", "Grow sponsor revenue alongside audience"],
      ["Brand deal", "In negotiation · terms private to the workspace"],
      ["Project", "AI productivity setup video · stage SCRIPT"],
      ["Phases", "Script approval (in review) · Edit first cut · Thumbnail export"],
    ],
    team: [
      ["Creator", "Creator Owner", "C"],
      ["Editor", "Video Editor", "E"],
    ],
  },
  {
    type: "COMPANY",
    name: "Client delivery workspace",
    slug: "client-delivery-workspace",
    who: "A consultancy delivering client engagements",
    shape: "Company",
    records: [
      ["Project", "Client onboarding portal · delivery phases"],
      ["Phase", "Client review — in progress · due this week"],
      ["Phase", "Discovery — not started"],
      ["Phase", "Delivery handoff — not started"],
      ["Lead", "Inbound enquiry · needs a CRM rollout plan"],
      ["Lead", "Inbound enquiry · delivery dashboards"],
    ],
    team: [
      ["Partner", "Managing Partner", "P"],
      ["Associate", "Delivery Associate", "A"],
    ],
  },
];

/* Roles are seeded per workspace type in prisma/seed.js. */
export const roleTemplates = {
  CREATOR: ["Owner", "Manager", "Editor", "Designer", "Viewer"],
  AGENCY: ["Owner", "Admin", "Account Manager", "Project Manager", "Writer", "Editor", "Designer", "Client"],
  COMPANY: ["Owner", "Admin", "Department Lead", "Project Manager", "Employee", "Reviewer", "Viewer"],
};

/* Platform capabilities that come from Backend/package.json.

   These describe what the platform DOES for a customer, not how it is secured
   internally. Auth internals, dependency names and entity counts were removed
   from this public page: they are not buying criteria, and publishing the
   security stack's shape is information a marketing site has no reason to give
   away. The customer-facing promise — typed data, role-scoped access, realtime
   updates — is kept. */
export const infrastructure = [
  { label: "Live meetings", detail: "In-meeting video rooms with live transcription and AI analysis" },
  { label: "Media library", detail: "Uploads, brand assets and deliverables in one place" },
  { label: "Realtime updates", detail: "Chat, presence and notifications without refreshing" },
  { label: "Structured data", detail: "A typed model, so every record is queryable and exportable" },
  { label: "Scoped access", detail: "Role-based permissions down to the individual resource" },
  { label: "Invitations", detail: "Invites, resets and workspace provisioning handled for you" },
];

export const portals = [
  { label: "Admin", detail: "Full workspace control: projects, team, permissions, settings." },
  { label: "Employee", detail: "A narrow lane containing only the phases assigned to you." },
  { label: "Public", detail: "This site: product, pricing and workspace requests." },
];

/* fieldOptions.platform in manthanos-admin/lib/resources.js */
export const platforms = [
  "YouTube", "Instagram", "Facebook", "X", "LinkedIn", "TikTok", "Podcast", "Website",
];
