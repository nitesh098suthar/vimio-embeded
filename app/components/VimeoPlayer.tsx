// // components/VimeoPlayer.tsx
// 'use client'
// import React, { useEffect, useRef } from "react";
// import Player from "@vimeo/player";

// const VimeoPlayer: React.FC = () => {
//   const iframeRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (iframeRef.current) {
//       const player = new Player(iframeRef.current, {
//         url: "https://player.vimeo.com/video/1028296911?h=4f68858e78",
//         width: 640, // Set your desired width
//       });

//       player.on("play", () => {
//         console.log("Video is playing");
//       });

//       player.getVideoTitle().then((title) => {
//         console.log("Video title:", title);
//       });
//     }
//   }, []);

//   return <div ref={iframeRef} />;
// };

// export default VimeoPlayer;

// //no need of .env till we're not uploading our video with the use of admin site.

// pages/index.tsx
"use client";
import React, { useEffect, useState } from "react";
import Player from "@vimeo/player";

type VideoData = {
  player_embed_url: string;
  name: string;
  uri: string;
};

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the videos from the Vimeo API
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "https://api.vimeo.com/users/125140327/videos",
          {
            headers: {
              //   Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
              Authorization: "Bearer 83ca04cb5712b92328103640a4926682",
            },
          }
        );
        const data = await response.json();
        console.log("data", data);
        const videoData = data?.data?.map((video: any) => ({
          player_embed_url: video.player_embed_url,
          name: video.name,
          uri: video.uri,
        }));
        setVideos(videoData);
        if (videoData.length > 0)
          setCurrentVideoUrl(videoData[0].player_embed_url); // Set first video as default
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Handle video change on list item click
  const handleVideoClick = (url: string) => {
    setCurrentVideoUrl(url);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Video Player Section */}
      <div style={{ flex: 3 }}>
        {currentVideoUrl && (
          <div>
            <iframe
              src={currentVideoUrl}
              width="640"
              height="360"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Vimeo Player"
            ></iframe>
          </div>
        )}
      </div>

      {/* Video List Section */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h3>Video List</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {videos.map((video) => (
            <li
              key={video.uri}
              style={{ marginBottom: "10px", cursor: "pointer" }}
            >
              <button
                onClick={() => handleVideoClick(video.player_embed_url)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "10px",
                  border: "1px solid #ddd",
                }}
              >
                {video.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
