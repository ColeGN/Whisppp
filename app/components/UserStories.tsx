import React from "react";
import { client } from "@/sanity/lib/client";
import { STORIES_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StoriesCard, {StoriesTypeCard} from "./StoriesCard";

const UserStories = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STORIES_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StoriesTypeCard) => (
          <StoriesCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};
export default UserStories;