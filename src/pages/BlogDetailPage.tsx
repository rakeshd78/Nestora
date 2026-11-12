import React from 'react';
import { ArrowLeft, ArrowRight, Clock, User, Share2 } from 'lucide-react';
import { PageRoute, BlogPost } from '../types';
import { blogsData } from '../data/blogs';

interface BlogDetailPageProps {
  blogId: string;
  onNavigate: (route: PageRoute) => void;
  onSelectBlog: (id: string) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ blogId, onNavigate, onSelectBlog }) => {
  const post = blogsData.find((b) => b.id === blogId) || blogsData[0];
  const relatedPosts = blogsData.filter((b) => b.id !== post.id).slice(0, 2);

  return (
    <div className="bg-[#F7F3EE] text-[#24201D] py-16 md:py-24">
      <article className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Back Link */}
        <button
          onClick={() => onNavigate('blog')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7A7167] hover:text-[#171512] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Journal
        </button>

        {/* Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#7A7167]">
            <span className="font-semibold text-[#171512]">{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#171512] leading-[1.12]">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-[#EEE7DE] border border-[#D8CEBF] flex items-center justify-center font-serif text-sm font-semibold text-[#171512]">
              {post.author.charAt(0)}
            </div>
            <div>
              <span className="text-xs font-semibold text-[#171512] block">{post.author}</span>
              <span className="text-[11px] text-[#7A7167]">{post.authorRole}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="aspect-[16/10] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF] mb-12">
          <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body */}
        <div className="space-y-6 text-sm sm:text-base text-[#4A433D] leading-relaxed">
          {post.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}

          {/* Pull Quote */}
          {post.quote && (
            <div className="my-10 p-8 bg-[#EEE7DE] border-l-2 border-[#171512]">
              <p className="font-serif italic text-xl sm:text-2xl text-[#171512] leading-snug">
                "{post.quote}"
              </p>
              <span className="block mt-3 text-xs uppercase tracking-wider text-[#7A7167]">
                — {post.author}, Nestora Studio
              </span>
            </div>
          )}
        </div>

        {/* Share & Tags */}
        <div className="mt-12 pt-6 border-t border-[#E3DACF] flex items-center justify-between text-xs text-[#7A7167]">
          <span>Tags: Interior Architecture, Warm Minimalism, Bespoke Millwork</span>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: post.title, url: window.location.href }).catch(() => {});
              }
            }}
            className="inline-flex items-center gap-1.5 text-[#171512] hover:text-[#5C554E]"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Article
          </button>
        </div>

        {/* Related Articles */}
        <div className="mt-20 pt-12 border-t border-[#E3DACF]">
          <h3 className="font-serif text-2xl text-[#171512] mb-8">Related Journal Perspectives</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {relatedPosts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectBlog(rel.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group cursor-pointer bg-[#F7F3EE] border border-[#E0D7CC] p-6 transition-all hover:border-[#171512]"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#EEE7DE] mb-4">
                  <img
                    src={rel.heroImage}
                    alt={rel.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#7A7167]">
                  {rel.date}
                </span>
                <h4 className="font-serif text-lg text-[#171512] group-hover:underline underline-offset-2 mt-1">
                  {rel.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};
