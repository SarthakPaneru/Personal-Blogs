import { getBlogPostsByPage, getAllBlogPosts, getAllTopics } from "../../Lib/Data";
import BlogHeader from "../../Components/BlogHeader";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Head from "next/head";
import Link from "next/link";
import Header from "../../Components/Header";

const PAGE_SIZE = 10;

export default function BlogListPage({ blogs, topics, page, totalPages }) {
  return (
    <>
      <Head>
        <title>Sarthak's Blog - Page {page}</title>
        <meta name="title" content="Bits-0f-C0de 🚀" />
        <meta
          name="description"
          content="Tech blogs and articles on various topics related to Software Development"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blogs.soumya-jit.tech/" />
        <meta property="og:title" content="Bits-0f-C0de 🚀" />
        <meta
          property="og:description"
          content="Tech blogs and articles on various topics related to Software Development"
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/soumyajit4419/Bits-0f-C0de/main/Extra/sc.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://blogs.soumya-jit.tech/" />
        <meta property="twitter:title" content="Bits-0f-C0de 🚀" />
        <meta
          property="twitter:description"
          content="Tech blogs and articles on various topics related to Software Development"
        />
        <meta
          property="twitter:image"
          content="https://raw.githubusercontent.com/soumyajit4419/Bits-0f-C0de/main/Extra/sc.png"
        />
      </Head>
      <div className="min-h-screen relative bg-white dark:bg-gray-900">
        <Navbar topics={topics} />
        <Header />
        <div className="px-0.5 md:px-7 pb-14 pt-6 mx-auto">
          <div className="flex flex-wrap">
            {blogs &&
              blogs.map(
                (blog) =>
                  blog.data.isPublished && (
                    <BlogHeader
                      key={blog.data.Id}
                      data={blog.data}
                      content={blog.content}
                      readTime={blog.readTime.text}
                    />
                  )
              )}
          </div>
          <div className="flex justify-center gap-4 mt-8">
            {page > 1 && (
              <Link
                href={page === 2 ? "/" : `/page/${page - 1}`}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Previous
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={`/page/${page + 1}`}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Next
              </Link>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const totalBlogs = getAllBlogPosts().length;
  const totalPages = Math.ceil(totalBlogs / PAGE_SIZE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: String(i + 1) },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const page = parseInt(params.page, 10) || 1;
  const blogs = getBlogPostsByPage(page, PAGE_SIZE);
  const topics = getAllTopics();
  const totalBlogs = getAllBlogPosts().length;
  const totalPages = Math.ceil(totalBlogs / PAGE_SIZE);
  return {
    props: {
      blogs,
      topics,
      page,
      totalPages,
    },
  };
}
