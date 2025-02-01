"use client";

import { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP, FaTelegramPlane, FaEnvelope } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";

const url = "https://cms.digitalmocktails.com/api/blogs?populate=*";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const [showShare, setShowShare] = useState(null);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null); 
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        setBlogs(data?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load blogs. Please try again later."); 
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleLoadMore = () => {
    setLoadMoreLoading(true);
    setTimeout(() => {
      setVisibleBlogs((prev) => prev + 6);
      setLoadMoreLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-16">
      {loading && <p className="text-center text-blue-500">Loading blogs...</p>}
      {error && <p className="text-center text-red-500">{error}</p>} {/* Display error message */}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, visibleBlogs).map((blog) => {
            const { id, attributes } = blog;
            const blogImage = attributes?.Main_Image?.data?.attributes?.url
              ? `https://cms.digitalmocktails.com${attributes.Main_Image.data.attributes.url}`
              : "/default-blog.jpg";
            const profileImage = attributes?.Title_Image?.data?.attributes?.url
              ? `https://cms.digitalmocktails.com${attributes.Title_Image.data.attributes.url}`
              : "/default-profile.jpg";
            const authorName = "Manikanta";
            const formattedDate = attributes?.publishedAt
              ? new Date(attributes.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "No Date";
            const categoryTitle = attributes?.categories?.data?.[0]?.attributes?.Title || "Uncategorized";

            return (
              <div key={id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
                <div className="relative w-full">
                  <img
                    src={blogImage}
                    alt="Blog"
                    className="w-full h-48 object-cover cursor-pointer transition-transform duration-1000 hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white transition-all cursor-pointer hover:from-orange-600 hover:to-pink-500 duration-1000 px-4 py-2 text-sm font-semibold rounded-full">
                    {categoryTitle}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4">
                  <div className="flex cursor-pointer items-center">
                    <img src={profileImage} alt="Author" className="w-12 h-12 rounded-full border border-gray-300" />
                    <p className="text-sm font-semibold ml-3">{authorName}</p>
                  </div>
                  <p className="text-xs text-gray-500">{formattedDate}</p>
                </div>

                <div className="p-4 flex-grow">
                <h2 className="text-lg font-bold text-gray-900 hover:text-pink-600 cursor-pointer duration-700">
                    {attributes.Title}
                  </h2>
                  <p className="text-gray-600">{attributes.Content_1?.substring(0, 100)}...</p>
                </div>

                <div className="p-4 flex justify-between items-center border-t border-gray-200">
                  <button
                    onClick={() => setShowShare(showShare === id ? null : id)}
                    className="flex items-center text-gray-700 hover:text-black cursor-pointer"
                  >
                    <IoMdShareAlt className="mr-2" />
                  </button>
                  {showShare === id && (
                    <div className="flex space-x-3">
                      <FaFacebookF className="text-black hover:text-pink-600 transition-colors duration-300 cursor-pointer" />
                      <FaTwitter className="text-black hover:text-pink-600 transition-colors duration-300 cursor-pointer" />
                      <FaLinkedinIn className="text-black hover:text-pink-600 transition-colors duration-300 cursor-pointer" />
                      <FaPinterestP className="text-black hover:text-pink-600 transition-colors duration-300 cursor-pointer" />
                      <FaTelegramPlane className="text-black hover:text-pink-600 transition-colors duration-300 cursor-pointer" />
                      <FaEnvelope className="text-black hover:text-pink-600 transition-colors duration-300 cursor-pointer" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {visibleBlogs < blogs.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="text-black px-6 py-2 rounded-lg border border-black hover:border-pink-600 duration-300 hover:text-pink-600 transition cursor-pointer flex items-center justify-center"
          >
            {loadMoreLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-pink-600" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8h4l-3-3-3 3h4z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
