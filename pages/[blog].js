import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

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
      <h1>{frontmatter.title}</h1>
      <h3>{frontmatter.description}</h3>
      <ReactMarkdown
        escapeHtml={true}
        source={content}
        renderers={{ code: CodeBlock }}
      />
    </>
  );
}

Blog.getInitialProps = async (context) => {
  const { blog } = context.query;

  const content = await import(`../content/${blog}.md`);
  const data = matter(content.default);

  return { ...data };
};
