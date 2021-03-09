import Link from "next/link";
import Head from "next/head";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import css from "../styles/post.module.css";

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter showLineNumbers={true} language={language}>
      {value}
    </SyntaxHighlighter>
  );
};

export default function Blog({ content, data }) {
  const frontmatter = data;

  return (
    <>
      <Head>
        <title>Zach Johnson | {frontmatter.title}</title>
      </Head>
      <Link href="/">
        <a className={css.topBack}>👈 Back Home</a>
      </Link>
      <div className={css.post}>
        <h1>{frontmatter.title}</h1>
        <h3>{frontmatter.description}</h3>
        <ReactMarkdown
          escapeHtml={true}
          source={content}
          renderers={{ code: CodeBlock }}
        />
        <Link href="/">
          <a>👈 Back Home</a>
        </Link>
      </div>
    </>
  );
}

Blog.getInitialProps = async (context) => {
  const { blog } = context.query;

  const content = await import(`../content/${blog}.md`);
  const data = matter(content.default);

  return { ...data };
};
