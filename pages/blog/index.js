import Link from "next/link";
import { getSortedPosts } from "../../lib/posts";

const BlogIndex = ({ allPostsData }) => {
  return (
    <>
      <section>
        <h1>My Blog</h1>
        <ul>
          {allPostsData.map(({ slug, date, title, excerpt }) => (
            <li key={slug}>
              <Link key={slug} href="/blog/[slug]" as={`/blog/${slug}`}>
                <a>
                  <h2>
                    {title}
                  </h2>
                </a>
              </Link>
              <p>{excerpt}</p>
              <p>{date}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default BlogIndex;

export async function getStaticProps() {
  const allPostsData = getSortedPosts();
  return {
    props: {
      allPostsData,
    },
  };
}