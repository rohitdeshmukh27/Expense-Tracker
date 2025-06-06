import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash, LuCamera } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="flex flex-col items-center gap-4">
          <div
            onClick={onChooseFile}
            className="group relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-50 to-purple-100 
              border-2 border-dashed border-[#875cf5] cursor-pointer 
              hover:border-solid transition-all duration-300
              flex items-center justify-center overflow-hidden"
          >
            {/* Upload State Icon Container */}
            <div className="flex flex-col items-center gap-2 group-hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 rounded-full bg-[#875cf5]/10 flex items-center justify-center">
                <LuCamera size={24} className="text-[#875cf5]" />
              </div>
              <p className="text-xs font-medium text-[#875cf5]">Upload Photo</p>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-[#875cf5]/0 group-hover:bg-[#875cf5]/5 
              transition-colors duration-300 rounded-full" />
          </div>

          <p className="text-sm text-gray-500">
            Click to upload your profile picture
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          {/* Preview Container */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-purple-100">
              <img
                src={previewUrl}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Change Photo Overlay */}
            <div
              onClick={onChooseFile}
              className="absolute inset-0 rounded-full bg-black/40 opacity-0 
                group-hover:opacity-100 transition-all duration-300 
                flex flex-col items-center justify-center cursor-pointer"
            >
              <LuCamera size={24} className="text-white mb-1" />
              <span className="text-xs text-white font-medium">Change Photo</span>
            </div>
          </div>

          {/* Remove Button */}
          <button
            type="button"
            onClick={handleRemoveImage}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium
              text-red-500 bg-red-50 rounded-xl 
              hover:bg-red-100 active:bg-red-200
              transition-all duration-200"
          >
            <LuTrash size={18} />
            Remove Photo
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
