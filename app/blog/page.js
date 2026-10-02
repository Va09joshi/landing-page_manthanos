import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Header } from "../../components/site-header";
import { Footer } from "../../components/site-footer";
import { PageHead, Reveal } from "../../components/ui";
import { ClosingCTA } from "../../components/closing-cta";
import { api } from "../../lib/api";

export const metadata = {
  title: "Journal",
  description: "Notes on creator operations, delivery systems and the structures that protect good work.",
};

/* Shown only when the API is unreachable, so the route never renders empty.
   It is labelled as a sample rather than dressed up as a real article. */
const fallback = [
  {
    slug: "workspace-applications",
    title: "Why workspaces are provisioned instead of self-serve",
    excerpt:
      "A role template seeded from the workspace type removes an entire afternoon of setup. Here is what that decision buys and what it costs.",
    category: { name: "Product" },
  },
  {
    slug: "eleven-stages",
    title: "Eleven stages, and why the count matters",
    excerpt:
      "A production pipeline earns its length from the handoffs it makes explicit. We walked through every stage ManthanOS defines and what belongs in each.",
    category: { name: "Operations" },
  },
  {
    slug: "eight-permission-levels",
    title: "Eight levels is more than most teams think they need",
    excerpt:
      "Most permission systems offer view and edit. Interns, reviewers, clients and secret-holding roles need a ladder that is finer than that.",
    category: { name: "Engineering" },
  },
];

export default async function Blog() {
  let posts = [];
  try {
    posts = await api.posts();
  } catch {
    posts = [];
  }

  const list = posts.length ? posts : fallback;
  const isSample = posts.length === 0;

  return (
    <>
      <Header />
      <main>
        <PageHead
          eyebrow="Journal"
          title="Notes on making the work clearer"
          lede="Writing about creator operations, delivery systems and the structures that protect good work."
        />

        <section className="band-paper band-pad relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 mesh-light opacity-40" />
          <div className="shell relative">
            {isSample && (
              <Reveal>
                <p className="mb-10 rounded-[10px] border border-[#d5e1f2] bg-white px-5 py-4 text-[13.5px] leading-6 text-slate-dim">
                  The journal has no published posts yet, so these are the pieces we are writing.
                  They appear here as previews rather than as published articles.
                </p>
              </Reveal>
            )}

            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.05}>
                  <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
                    {post.coverImageUrl && (
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] border border-[#dbe5f4] bg-white">
                        <Image
                          src={post.coverImageUrl}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    )}

                    <div className="mt-6 flex flex-1 flex-col">
                      <p className="mono-label text-royal-600">{post.category?.name ?? "Journal"}</p>
                      <h2 className="mt-3 text-[19px] font-semibold leading-snug text-slate-ink transition-colors group-hover:text-royal-600">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-3 flex-1 text-[14.5px] leading-6 text-slate-dim">{post.excerpt}</p>
                      )}
                      <span className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-medium text-slate-dim transition-colors group-hover:text-royal-600">
                        Read
                        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
