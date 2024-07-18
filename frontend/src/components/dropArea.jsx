import { useState } from "react";

const DropArea = () => {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <div
      onDragEnter={() => setShowDrop(true)}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => setShowDrop(false)}
      className={`${
        showDrop
          ? "text-[#dcdcdc] w-full h-80px flex justify-center items-center p-4 mb-4 rounded shadow-lg space-y-5 border-2 border-dashed"
          : "opacity-0"
      }`}
    >
      Drop here
    </div>
  );
};

export default DropArea;
