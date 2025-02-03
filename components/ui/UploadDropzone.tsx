"use client";

import type React from "react";
import { useCallback, useState, useEffect, useRef } from "react";
import { Upload, FileIcon, X } from "lucide-react";
import ResponsiveImage from "./ResponsiveImage";

interface UploadDropzoneProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];

export default function UploadDropzone({ onFileSelect, selectedFile }: UploadDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);
  const dragCounter = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const validateAndHandleFile = useCallback(
    (file: File) => {
      setError(null);

      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setError("Please upload an image file (JPEG, PNG, GIF, or WebP)");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;

    const items = Array.from(e.dataTransfer.items);
    if (items.some(item => ACCEPTED_IMAGE_TYPES.includes(item.type))) {
      setIsDragActive(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;

    if (dragCounter.current === 0) {
      setIsDragActive(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);
      dragCounter.current = 0;

      const file = e.dataTransfer.files[0];
      if (file) {
        validateAndHandleFile(file);
      }
    },
    [validateAndHandleFile],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        validateAndHandleFile(file);
      }
    },
    [validateAndHandleFile],
  );

  const handleClear = useCallback(() => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setError(null);
    onFileSelect(null);
  }, [preview, onFileSelect]);

  return (
    <div ref={containerRef} className="flex flex-col w-full gap-y-2">
      {!selectedFile ? (
        <>
          <label
            htmlFor="fileInput"
            className="text-sm pr-4 uppercase font-semibold text-slate-300/60"
          >
            Image
          </label>
          <div
            className={`relative border-2 border-dashed rounded-lg text-center ${isDragActive ? "border-blue-500 bg-blue-600/10" : error ? "border-red-500" : "border-slate-600"}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="hidden"
              id="fileInput"
              onChange={handleFileInput}
              accept={ACCEPTED_IMAGE_TYPES.join(",")}
            />


            <label
              htmlFor="fileInput"
              className="cursor-pointer flex flex-col items-center justify-center p-8"
            >
              <Upload className={`w-12 h-12 mb-4 ${error ? "text-red-500" : "text-gray-400"}`} />
              <p className={`text-lg font-semibold mb-2 ${error ? "text-red-500" : ""}`}>
                {isDragActive ? "Drop image here" : "Drag & drop image here"}
              </p>
              <p className={`text-sm ${error ? "text-red-500" : "text-gray-500"}`}>
                {error || "or click to select image"}
              </p>
              {error && <p className="text-xs text-gray-500 mt-2">Supported formats: JPEG, PNG, GIF, WebP</p>}
            </label>
          </div>
        </>
      ) : (
        <div className="border border-slate-600 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-5 h-5 mr-2 text-gray-500" />
              <span className="text-sm">{selectedFile.name}</span>
            </div>
            <button type="button" onClick={handleClear} className="p-1 hover:bg-rose-500/20 rounded-lg transition">
              <X className="w-5 h-5 text-rose-500" />
            </button>
          </div>
          {preview && (
            <div className="flex justify-center mt-4">
              <ResponsiveImage src={preview} alt="Preview" maxWidth={containerWidth} maxHeight={800} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
