import React, { useEffect, useState } from 'react';
import VolunteerSidebar from '../components/VolunteerSidebar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { FaMapMarkerAlt, FaCalendarAlt, FaTag } from 'react-icons/fa';

const MyVolunteering = () => {
  const [posts, setPosts] = useState([]);

  const myVol = async () => {
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const token = userInfo?.token;

    try {
      const response = await axios.get(BACKEND_URL + '/ngo/myvolunteering', {
        headers: {
          Authorization: token,
        },
      });

      const posts = response?.data?.posts || [];
      console.log(posts);
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    myVol();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <VolunteerSidebar />

      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-3">
          My Volunteering Opportunities
        </h1>

        {posts.length === 0 ? (
          <p className="text-gray-400 text-center mt-20">
            You haven’t applied for any opportunities yet.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => {
              const details = post.ngoDataId;

              if (!details) return null; // skip if ngoDataId is null

              return (
                <div
                  key={index}
                  className="bg-gray-800/80 border border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1"
                >
                  <h2 className="text-xl font-semibold text-blue-400 mb-2">
                    {details.title}
                  </h2>

                  <p className="text-gray-300 mb-4 text-sm line-clamp-3">
                    {details.desc}
                  </p>

                  <div className="text-sm text-gray-400 space-y-2">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-400" />
                      <span>{details.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-400" />
                      <span>
                        {new Date(details.startDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}{' '}
                        -{' '}
                        {new Date(details.endDate).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400">
                      <FaTag />
                      <span>{details.postType}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyVolunteering;
