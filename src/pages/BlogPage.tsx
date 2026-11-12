import React from 'react';
import { ArrowRight, Clock, User } from 'lucide-react';
import { PageRoute } from '../types';
import { blogsData } from '../data/blogs';

interface BlogPageProps {
  onNavigate: (route: PageRoute) => void;
  onSelectBlog: (blogId: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onSelectBlog }) => {
  return (
    <div className="bg-[#F7F3EE] text-[#24201D] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#7A7167] font-medium">
            • OUR JOURNAL
          </span>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl text-[#171512] leading-[1.1]">
            Thoughts on Creating
            <br />
            <span className="italic font-light">Elevated Everyday Spaces</span>
          </h1>
          <p className="mt-6 text-[#5C554E] text-sm md:text-base leading-relaxed">
            Essays on architectural materiality, warm minimalism, the poetry of daylight, and the craftsmanship of enduring spaces.
          </p>
        </div>

        {/* Featured Editorial Post */}
        <div
          onClick={() => {
            onSelectBlog(blogsData[0].id);
            onNavigate('blog-detail');
          }}
          className="group cursor-pointer bg-[#EEE7DE]/60 border border-[#E0D7CC] p-6 sm:p-10 mb-16 transition-all hover:border-[#171512]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#EEE7DE]">
              <img
                src={blogsData[0].heroImage}
                alt={blogsData[0].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-4 text-xs text-[#7A7167]">
                <span className="font-serif font-bold text-[#171512]">
                  {blogsData[0].day} {blogsData[0].month}
                </span>
                <span>•</span>
                <span className="uppercase tracking-wider">{blogsData[0].category}</span>
                <span>•</span>
                <span>{blogsData[0].readTime}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#171512] group-hover:underline underline-offset-4 leading-snug">
                {blogsData[0].title}
              </h2>
              <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed">
                {blogsData[0].excerpt}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#171512] font-semibold group-hover:gap-3 transition-all">
                  Read Article →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {blogsData.slice(1).map((post) => (
            <article
              key={post.id}
              onClick={() => {
                onSelectBlog(post.id);
                onNavigate('blog-detail');
              }}
              className="group cursor-pointer bg-[#F7F3EE] border border-[#E0D7CC] p-6 sm:p-8 flex flex-col justify-between transition-all hover:border-[#171512]"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-[#EEE7DE] border border-[#E3DACF] mb-6">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center gap-3 text-xs text-[#7A7167] mb-3">
                  <span className="font-serif font-bold text-[#171512]">
                    {post.day} {post.month}
                  </span>
                  <span>•</span>
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-[#171512] group-hover:underline underline-offset-4 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-[#5C554E] mt-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#E8E2D7] flex items-center justify-between">
                <span className="text-[11px] text-[#7A7167]">By {post.author}</span>
                <span className="text-xs uppercase tracking-widest text-[#171512] font-semibold group-hover:gap-2 transition-all">
                  Read More →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
