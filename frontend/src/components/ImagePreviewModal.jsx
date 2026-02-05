const ImagePreviewModal = ({ src, onClose }) => {
  if (!src) return null;

  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = "image.jpg"; // you can improve name later
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Download failed");
      console.error(err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90%] max-h-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt="Preview"
          className="max-w-full max-h-[80vh] rounded-lg"
        />

        {/* DOWNLOAD BUTTON */}
        <button
          onClick={handleDownload}
          className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded"
        >
          Download
        </button>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 bg-black/60 text-white px-3 py-1 rounded"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
