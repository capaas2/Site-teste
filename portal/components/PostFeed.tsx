import { Post } from "@/types/post";
import { PostCard } from "./PostCard";
import { getTranslation } from "@/lib/translations";

interface PostFeedProps {
  posts: Post[];
  locale?: string;
}

export function PostFeed({ posts, locale = "pt" }: PostFeedProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400 dark:text-slate-500">
        <p className="text-lg font-medium">{getTranslation(locale, "no_news_found")}</p>
      </div>
    );
  }

  return (
    <section>
      <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
        {getTranslation(locale, "all_news")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </section>
  );
}
