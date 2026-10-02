import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Header } from "../../components/site-header";
import { Footer } from "../../components/site-footer";
import { PageHead, Reveal } from "../../components/ui";
import { api } from "../../lib/api";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata({
  path: "/blog",
  title: "Journal",
  description: "Notes on creator operations, delivery systems and the structures that protect good work.",
});

export default async function Blog() {
  let posts = [];
  let apiError = false;
  try {
    posts = await api.posts();
  } catch {
    apiError = true;
  }

  const list = Array.isArray(posts) ? posts : [];

  return (
    <>
      <Header />
      <main>
        <PageHead
          eyebrow="Journal"
          title="Notes on making the work clearer"
          lede="Writing about creator operations, delivery systems and the structures that protect good work."
        />

        <section className="band-raise relative py-[clamp(40px,5vw,72px)]">
          <div aria-hidden className="pointer-events-none absolute inset-0 mesh-dark opacity-30" />
          <div className="shell relative">
            {apiError && (
              <Reveal>
                <p className="mb-10 rounded-[10px] border border-white/10 bg-ink-850 px-5 py-4 text-[13.5px] leading-6 text-chalk-dim" role="alert">
                  The journal is temporarily unavailable. Please try again shortly.
                </p>
              </Reveal>
            )}

            {!apiError && list.length === 0 && (
              <p className="rounded-[10px] border border-white/10 bg-ink-850 px-5 py-4 text-[13.5px] leading-6 text-chalk-dim">
                No published posts yet.
              </p>
            )}

            {list.length > 0 && <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.05}>
                  <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
                    {post.coverImageUrl && (
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] border border-white/10 bg-ink-850">
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
                      <h2 className="mt-3 text-[19px] font-semibold leading-snug text-chalk transition-colors group-hover:text-signal">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-3 flex-1 text-[14.5px] leading-6 text-chalk-dim">{post.excerpt}</p>
                      )}
                      <span className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-medium text-chalk-dim transition-colors group-hover:text-signal">
                        Read
                        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
