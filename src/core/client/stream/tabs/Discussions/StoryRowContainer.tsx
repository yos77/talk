import React, { FunctionComponent } from "react";
import { graphql } from "react-relay";

import { withFragmentContainer } from "coral-framework/lib/relay";
import {
  Flex,
  HorizontalGutter,
  Icon,
  RelativeTime,
} from "coral-ui/components/v2";

import { StoryRowContainer_story } from "coral-stream/__generated__/StoryRowContainer_story.graphql";

import styles from "./StoryRowContainer.css";

interface Props {
  story: StoryRowContainer_story;
  currentSiteID: string;
}

const StoryRowContainer: FunctionComponent<Props> = ({
  story,
  currentSiteID,
}) => {
  return (
    <a href={story.url} className={styles.root}>
      <HorizontalGutter spacing={1}>
        {currentSiteID !== story.site.id && (
          <p className={styles.siteName}>{story.site.name}</p>
        )}
        {story.metadata && story.metadata.title && (
          <h3 className={styles.storyTitle}>{story.metadata.title}</h3>
        )}
        {(!story.metadata || !story.metadata.title) && <h3>N/A</h3>}
        <Flex spacing={3}>
          {story.metadata && story.metadata.publishedAt && (
            <RelativeTime
              date={story.metadata.publishedAt}
              className={styles.time}
            />
          )}
          <Flex spacing={1} alignItems="center">
            <Icon className={styles.commentsCountIcon}>mode_comment</Icon>
            <span className={styles.commentsCount}>
              {story.commentCounts.totalPublished}
            </span>
          </Flex>
        </Flex>
      </HorizontalGutter>
    </a>
  );
};

const enhanced = withFragmentContainer<Props>({
  story: graphql`
    fragment StoryRowContainer_story on Story {
      site {
        id
        name
      }
      id
      url
      metadata {
        title
        publishedAt
      }
      commentCounts {
        totalPublished
      }
    }
  `,
})(StoryRowContainer);

export default enhanced;
