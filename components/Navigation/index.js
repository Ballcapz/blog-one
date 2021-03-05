import Link from "next/link";
import classNames from "classnames";
import css from "./style.module.css";

export default function Navigation({ tags, selectedTag, setSelectedTag }) {
  return (
    <div className={css.nav}>
      <div className={css.title}>
        <Link href="/">
          <a>Zach</a>
        </Link>
      </div>
      <div className={css.links}>
        <div className={css.link} onClick={() => setSelectedTag("")}>
          #nofilter
        </div>
        {tags.map((t) => (
          <div
            className={classNames(css.link, {
              [css.active]: selectedTag === t,
            })}
            onClick={() => setSelectedTag(t)}
            key={t}
          >
            #{t}
          </div>
        ))}
      </div>
    </div>
  );
}
