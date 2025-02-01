"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const url = "https://cms.digitalmocktails.com/api/blogs?populate=*";
      try {
        const response = await fetch(url);
        const data = await response.json();
        setBlogs(data?.data || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const result = blogs.filter((blog) => {
        const blogTitle = blog.attributes?.Title?.toLowerCase() || "";
        const categoryTitle =
          blog.attributes?.categories?.data?.[0]?.attributes?.Title?.toLowerCase() || "";

        return (
          blogTitle.includes(searchQuery.toLowerCase()) ||
          categoryTitle.includes(searchQuery.toLowerCase())
        );
      });

      setFilteredBlogs(result);
    } else {
      setFilteredBlogs([]);
    }
  }, [searchQuery, blogs]);

  const handleClose = () => {
    router.push("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTriggered(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  return (
    <div className="min-h-[110vh] md:mt-[-10vh] mt-[-12vh] lg:mt-[-20vh] xl:mt-[-10vh] z-[999] sticky top-0 flex flex-col items-center justify-center bg-white p-4">

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 md:text-2xl text-xl text-black p-2 block md:block "

      >
        &times;
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Search</h1>

      {/* Search Input */}
      <div className="relative w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-4 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          onClick={handleSearchSubmit}
          className="absolute right-1.5 top-1 p-3 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full text-white"
        >
          🔍
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {searchTriggered && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto py-6 px-4">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => {
              const { id, attributes } = blog;
              const blogImage = attributes?.Main_Image?.data?.attributes?.url
                ? `https://cms.digitalmocktails.com${attributes.Main_Image.data.attributes.url}`
                : "/default-blog.jpg";
              const profileImage = attributes?.Title_Image?.data?.attributes?.url
                ? `https://cms.digitalmocktails.com${attributes.Title_Image.data.attributes.url}`
                : "/default-profile.jpg";
              const formattedDate = attributes?.publishedAt
                ? new Date(attributes.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "No Date";
              const categoryTitle =
                attributes?.categories?.data?.[0]?.attributes?.Title || "Uncategorized";

              return (
                <div key={id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
                  <div className="relative w-full">
                    <img
                      src={blogImage}
                      alt="Blog"
                      className="w-full h-48 object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white transition-all cursor-pointer hover:from-orange-600 hover:to-pink-500 duration-500 px-4 py-2 text-sm font-semibold rounded-full">
                      {categoryTitle}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <img
                        src={profileImage}
                        alt="Author"
                        className="w-12 h-12 rounded-full border border-gray-300"
                      />
                      <p className="text-sm font-semibold ml-3">Unknown Author</p>
                    </div>
                    <p className="text-xs text-gray-500">{formattedDate}</p>
                  </div>
                  <div className="p-4 flex-grow">
                    <h2 className="text-lg font-bold text-gray-900 hover:text-pink-600 cursor-pointer duration-300">
                      {attributes.Title}
                    </h2>
                    <p className="text-gray-600">{attributes.Content_1?.substring(0, 100)}...</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No matching blogs found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
