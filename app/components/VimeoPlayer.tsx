// components/VimeoPlayer.tsx
'use client'
import React, { useEffect, useRef } from "react";
import Player from "@vimeo/player";

const VimeoPlayer: React.FC = () => {
  const iframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const player = new Player(iframeRef.current, {
        url: "https://player.vimeo.com/video/1028296911?h=4f68858e78",
        width: 640, // Set your desired width
      });

      player.on("play", () => {
        console.log("Video is playing");
      });

      player.getVideoTitle().then((title) => {
        console.log("Video title:", title);
      });
    }
  }, []);

  return <div ref={iframeRef} />;
};

export default VimeoPlayer;

//no need of .env till we're not uploading our video with the use of admin site.