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

  function sortDateDescending(a, b) {
    return new Date(b.date) - new Date(a.date);
  }

  return (
    <div className={css.container}>
      <Head>
        <title>Zach's Blog | My thoughts on life</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Zach Johnson, personal blog. Thoughts on life, code, software, and learning."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta charset="UTF-8" />
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
          {listItems
            .sort((a, b) => sortDateDescending(a, b))
            .filter((b) => b.tags.includes(selectedTag) || selectedTag === "")
            .map((blog, i) => (
              <li key={i}>
                <div className={css.date}>
                  <span style={{ marginLeft: "-16px" }}>📓</span> {blog.date}
                </div>
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
        {/*  AND Sort control? */}
        {/*  Maybe the tags will eventually live here too. Who knows */}
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
