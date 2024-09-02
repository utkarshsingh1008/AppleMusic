import React, { useState } from 'react';
import { IoVolumeHighSharp } from "react-icons/io5";
const VolumeControl = () => {
  const [volume, setVolume] = useState(50);

  const handleChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <div className="volume-control">
    <span><IoVolumeHighSharp/></span>
      <input type="range" min={0} max={100} value={volume} onChange={handleChange} />
      <span>{volume}%</span>
    </div>
  );
};

export default VolumeControl;