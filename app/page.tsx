// pages/index.tsx
import React from 'react';
import VimeoPlayer from './components/VimeoPlayer';


const HomePage: React.FC = () => {
  return (
    <div>
      <h1>My Vimeo Video</h1>
      <VimeoPlayer />
    </div>
  );
};

export default HomePage;
