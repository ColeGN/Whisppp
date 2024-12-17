import SearchForm from "../components/SearchForm";
import { STORIES_QUERY } from "@/sanity/lib/queries";
import StoriesCard from "../components/StoriesCard";
import { StoriesTypeCard } from "../components/StoriesCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import AnimatedHeader from "../components/Header";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = {search: query || null};

  const session = await auth()

  console.log(session?.id)
  const {data: posts} = await sanityFetch({ query: STORIES_QUERY , params});

  console.log(JSON.stringify(posts, null, 2));
  return (
    
    <>
    <section className="pink-container">
     <AnimatedHeader/>

      <p className="sub-heading !max-w-3xl"> Express your creativity freely and engage with others!
      </p>
      <SearchForm query={query}/>
    </section>
    <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Stories"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StoriesTypeCard) => (
              <StoriesCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No stories found</p>
          )}
        </ul>
      </section>

      <SanityLive/>
    </>
  );
}
