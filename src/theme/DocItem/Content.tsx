import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/plugin-content-docs/client"; // Updated import path
import Heading from "@theme/Heading";
import MDXContent from "@theme/MDXContent";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";

/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === "undefined";
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}
export default function DocItemContent({ children }) {
  const { metadata, frontMatter } = useDoc();

  const topLevel = isTopLevel(metadata?.slug);
  const syntheticTitle = useSyntheticTitle();
  const lastUpdatedAt = frontMatter.lastUpdatedAt;

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, "markdown")}>
      {syntheticTitle && (
        <header>
          <div>
            <Heading as="h1">{syntheticTitle}</Heading>
          </div>
        </header>
      )}

      <div className={topLevel ? styles.topLevelDoc : ""}>
        <MetaActions 
          style={{ ...(!topLevel && { top: 61, right: 0 }) }}
          lastUpdatedAt={lastUpdatedAt}
        />
        <MDXContent>{children}</MDXContent>
      </div>
    </div>
  );
}

function isTopLevel(str) {
  return str.split("/").length - 1 < 2;
}

// Sub component
function MetaActions({ style, lastUpdatedAt }) {
  // Last updated at
  const formattedLastUpdatedAt = lastUpdatedAt 
    ? new Date(lastUpdatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      })
    : 'N/A';

  return (
    <div
      className={styles.hideOnMobile}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        textAlign: "right",
        position: "absolute",
        right: 40,
        height: 58,
        zIndex: 100,
        ...style,
      }}>
      {/* Edit URL link */}
      <a
        className={styles.link}
        href={'https://github.com/Hugo-SEQUIER/docs-trophe'}
        target="_blank"
        rel="noopener noreferrer">
        SUBMIT A PR
      </a>
      {/* Last updated */}
      <span className={styles.lastEdit}>
        LAST EDIT : {formattedLastUpdatedAt}
      </span>
    </div>
  );
}
