import { useState } from "react";
import matter from "gray-matter";
import Head from "next/head";
import Link from "next/link";
import Navigation from "../components/Navigation";
import css from "../styles/Home.module.css";

export default function Home({ tags, data }) {
  const [selectedTag, setSelectedTag] = useState("");

  const realData = data.map((blog) => matter(blog));
  const listItems = realData.map((listItem) => listItem.data);

  return (
    <div className={css.container}>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation
        tags={tags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <h1>Blog Posts</h1>
      <div className={css.content}>
        {/* POSTS PREVIEW */}
        <ul className={css.posts}>
          {/* TODO: filter by selected tag */}
          {listItems.map((blog, i) => (
            <li key={i}>
              <Link href={`/${blog.slug}`}>
                <a>{blog.title}</a>
              </Link>
              <p>{blog.description}</p>
              <p className={css.tags}>
                {blog.tags.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        {/* SUBSCRIBE */}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const tags = ["code", "money", "life"];
  const fs = require("fs");

  const files = fs.readdirSync(`${process.cwd()}/content`, "utf-8");

  const blogs = files.filter((f) => f.endsWith(".md"));

  const data = blogs.map((blog) => {
    const path = `${process.cwd()}/content/${blog}`;
    const rawContent = fs.readFileSync(path, {
      encoding: "utf-8",
    });
    return rawContent;
  });

  return {
    props: {
      tags,
      data,
    },
  };
}
