import { GQLCommentMediaTypeResolver } from "coral-server/graph/schema/__generated__/types";
import * as comment from "coral-server/models/comment";

const resolveType: GQLCommentMediaTypeResolver<comment.CommentMedia> = (
  embed
) => {
  switch (embed.type) {
    case "giphy":
      return "GiphyMedia";
    case "youtube":
      return "YouTubeMedia";
    case "twitter":
      return "TwitterMedia";
    default:
      // TODO: replace with better error.
      throw new Error("invalid embed type");
  }
};
export const CommentMedia = {
  __resolveType: resolveType,
};
