import Head from "next/head";
import { getAllPostSlugs, getPostdata } from "../../lib/posts";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";

const components = {};

export default function Posts({ source, frontMatter }) {
  const content = hydrate(source, { components });
  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <div>
          <h1>{frontMatter.title}</h1>
          <p>
            {frontMatter.author}
            {" / "}
            <span>{frontMatter.date}</span>
          </p>

          <div>{content}</div>
  
      </div>
    </>
  );
}
export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false
  };
}
export async function getStaticProps({ params }) {
  const postContent = await getPostdata(params.slug);
  const { data, content } = matter(postContent);
  const mdxSource = await renderToString(content, {
    components,
    scope: data
  });
  return {
    props: {
      source: mdxSource,
      frontMatter: data
    }
  };
}