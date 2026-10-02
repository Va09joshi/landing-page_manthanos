/**
 * FAQ source of truth.
 *
 * These answers are rendered twice: once as the visible accordion on the home
 * and pricing pages, and once as FAQPage structured data for search engines.
 *
 * They live here rather than inside the accordion component because that
 * component is a "use client" module. A server component cannot read a plain
 * value out of a client module — it would have to ship the whole accordion to
 * the browser just to serialise the text — so the copy is lifted out and both
 * consumers import it.
 *
 * Nothing here is marketing copy invented for the crawler. Every answer
 * describes behaviour that exists in the product (workspace types, the
 * NO_ACCESS→ADMIN_CONTROL permission ladder, review-provisioned workspaces),
 * and it is the same text a reader sees on the page. Structured data that
 * disagrees with the visible page is a ranking liability, not a shortcut.
 */

export const faqs = [
  {
    q: "Who is ManthanOS built for?",
    a: "Three workspace types ship today. A creator team runs scripts, production phases, publishing and sponsor deals. A company runs CRM, client projects, departments and employee phase tracking. A platform workspace handles provisioning and audit across all of them.",
  },
  {
    q: "How does a workspace get created?",
    a: "You submit an application describing your team, your platforms and how you plan to use it. A platform admin reviews it and provisions the workspace with the right role templates already in place. You are not configuring a blank system.",
  },
  {
    q: "Do I need to migrate my existing work in?",
    a: "No. The workspace starts with its own records and a shape designed for the work. Importing history is a separate conversation we can have once you know how you want to run the new system.",
  },
  {
    q: "What happens to a piece of work that gets stuck?",
    a: "It surfaces on the Command Center as an overdue task or a phase that has not moved, with an owner attached. You do not have to go looking for it in a channel.",
  },
  {
    q: "How do permissions actually work?",
    a: "Roles are seeded per workspace type, then each role is granted a level per resource — from NO_ACCESS up to ADMIN_CONTROL. An intern can hold VIEW on brand assets while a reviewer holds APPROVE on content projects.",
  },
  {
    q: "Is this a self-serve product?",
    a: "Not yet. Workspaces are reviewed and provisioned by our team, which is how we keep the role templates and module setup correct on day one. Tell us what you need and we will set it up.",
  },
];