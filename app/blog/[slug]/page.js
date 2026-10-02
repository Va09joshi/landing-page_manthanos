import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Header } from "../../../components/site-header";
import { Footer } from "../../../components/site-footer";
import { Reveal } from "../../../components/ui";
import { api } from "../../../lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const post = await api.post(slug);
    return { title: post.title, description: post.excerpt };
  } catch {
    return { title: "Journal" };
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params;

  let post = null;
  try {
    post = await api.post(slug);
  } catch {
    post = null;
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="band-dark flex min-h-[70dvh] items-center">
          <div className="shell py-24 text-center">
            <p className="eyebrow">Not found</p>
            <h1 className="mt-6 text-[clamp(28px,4vw,48px)] font-semibold text-white">
              That story is not published
            </h1>
            <p className="lede mx-auto mt-6 text-center">
              The journal has posts in progress. Here is the full list of what is live.
            </p>
            <Link
              href="/blog"
              className="mt-9 inline-flex h-11 items-center gap-2 rounded-[10px] border border-white/18 px-5 text-[15px] text-chalk transition-colors hover:border-white/35 hover:bg-white/[.06]"
            >
              <ArrowLeft size={15} />
              Back to the journal
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  /* Plain text is wrapped in paragraphs; HTML from the CMS is left intact. */
  let bodyHtml = post.body || "";
  if (bodyHtml && !/<[a-z][\s\S]*>/i.test(bodyHtml)) {
    bodyHtml = bodyHtml
      .split(/\n\s*\n/)
      .filter((part) => part.trim())
      .map((part) => `<p>${part.trim()}</p>`)
      .join("");
  }

  return (
    <>
      <Header />
      <main className="band-dark">
        <article className="shell pb-24 pt-[136px] lg:pt-[168px]">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[14px] text-chalk-dim transition-colors hover:text-white"
            >
              <ArrowLeft size={15} />
              Back to the journal
            </Link>
          </Reveal>

          <div className="mt-14 max-w-[46ch]">
            <p className="eyebrow">{post.category?.name ?? "Journal"}</p>
            <h1 className="mt-5 text-[clamp(30px,4.4vw,52px)] font-semibold leading-[1.05] text-white">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="lede mt-6 text-[17px]">{post.excerpt}</p>
            )}
          </div>

          {post.coverImageUrl && (
            <Reveal delay={0.1}>
              <div className="relative mt-14 aspect-[21/9] w-full overflow-hidden rounded-[14px] border border-white/10 bg-ink-900">
                <Image
                  src={post.coverImageUrl}
                  alt=""
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                  className="object-cover"
                />
              </div>
            </Reveal>
          )}

          <Reveal delay={0.15}>
            <div
              className="prose prose-invert mt-14 max-w-[70ch] prose-headings:font-semibold prose-headings:tracking-[-.02em] prose-a:text-soft prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  );
}
