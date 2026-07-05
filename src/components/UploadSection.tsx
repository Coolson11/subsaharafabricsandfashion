"use client";

import React, { useState, useRef } from "react";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { Image as ImageIcon, Plus, X, Upload, Loader2, CheckCircle2 } from "lucide-react";

interface UploadSectionProps {
  onUploadSuccess?: () => void;
}

export default function UploadSection({ onUploadSuccess }: UploadSectionProps) {
  const [category, setCategory] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      toast.success(`Successfully uploaded ${res.length} image(s)!`);
      setSelectedFiles([]);
      setUploadProgress(0);
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    },
    onUploadError: (error) => {
      console.error("Upload error details:", error);
      toast.error(`Upload failed: ${error.message}`);
      setUploadProgress(0);
    },
    onUploadProgress: (p) => {
      setUploadProgress(p);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Limit to image types
      const imageFiles = filesArray.filter(file => file.type.startsWith("image/"));
      if (imageFiles.length !== filesArray.length) {
        toast.warning("Some selected files were skipped because they are not images.");
      }
      
      setSelectedFiles(prev => [...prev, ...imageFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!category) {
      toast.error("Please select a category first.");
      return;
    }
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one image.");
      return;
    }

    try {
      await startUpload(selectedFiles, { category });
    } catch (err: any) {
      toast.error(err.message || "Failed to start upload.");
    }
  };

  const isUploadDisabled = !category || selectedFiles.length === 0 || isUploading;

  return (
    <div className="space-y-6">
      {/* Category Selection Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:border-zinc-700/60">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-500 mb-4">
          1. Select Category
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <label className={`
            relative flex items-center justify-between p-4 rounded-lg border cursor-pointer select-none transition-all duration-200
            ${category === "male" 
              ? "bg-amber-950/20 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.1)] text-white" 
              : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"}
          `}>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="category"
                value="male"
                checked={category === "male"}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isUploading}
                className="sr-only"
              />
              <div className={`
                w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors
                ${category === "male" ? "border-amber-500" : "border-zinc-600"}
              `}>
                {category === "male" && <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>}
              </div>
              <span className="font-medium text-sm">Male Collection</span>
            </div>
            <span className="text-xs opacity-60">Men's Apparel</span>
          </label>

          <label className={`
            relative flex items-center justify-between p-4 rounded-lg border cursor-pointer select-none transition-all duration-200
            ${category === "female" 
              ? "bg-amber-950/20 border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.1)] text-white" 
              : "bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"}
          `}>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                name="category"
                value="female"
                checked={category === "female"}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isUploading}
                className="sr-only"
              />
              <div className={`
                w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors
                ${category === "female" ? "border-amber-500" : "border-zinc-600"}
              `}>
                {category === "female" && <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>}
              </div>
              <span className="font-medium text-sm">Female Collection</span>
            </div>
            <span className="text-xs opacity-60">Women's Apparel</span>
          </label>
        </div>
      </div>

      {/* File Selection Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:border-zinc-700/60">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-500 mb-4">
          2. Choose Images
        </h3>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
          disabled={isUploading}
          className="hidden"
        />

        {/* Drop Area / Clickable Selection Box */}
        <div 
          onClick={!isUploading ? triggerFileInput : undefined}
          className={`
            border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200
            ${isUploading ? "border-zinc-800 bg-zinc-950/20 cursor-not-allowed opacity-50" : "border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-950/80"}
          `}
        >
          <div className="h-12 w-12 rounded-full bg-zinc-900 flex items-center justify-center mb-4 border border-zinc-800">
            <Plus className="h-5 w-5 text-zinc-400" />
          </div>
          <p className="text-sm text-zinc-300 font-medium mb-1">
            Click to select or drag and drop images
          </p>
          <p className="text-xs text-zinc-500">
            PNG, JPG, JPEG, WEBP up to 8MB each
          </p>
        </div>

        {/* Selected Files List */}
        {selectedFiles.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800 pb-2">
              <span>Selected Images ({selectedFiles.length})</span>
              <button 
                onClick={() => setSelectedFiles([])}
                disabled={isUploading}
                className="text-red-400 hover:text-red-300 font-medium transition-colors disabled:opacity-50"
              >
                Clear All
              </button>
            </div>
            
            <div className="max-h-60 overflow-y-auto pr-1 space-y-2 scrollbar-thin">
              {selectedFiles.map((file, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700/60 transition-colors"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <div className="h-10 w-10 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="h-5 w-5 text-zinc-500" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs text-zinc-200 font-medium truncate">{file.name}</p>
                      <p className="text-[10px] text-zinc-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFile(idx)}
                    disabled={isUploading}
                    className="p-1 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded transition-all disabled:opacity-50"
                    title="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upload Control Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-md transition-all duration-300 hover:border-zinc-700/60">
        {isUploading && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-zinc-400 mb-2">
              <span className="flex items-center">
                <Loader2 className="h-3 w-3 animate-spin mr-1.5 text-amber-500" />
                Uploading files to secure vault...
              </span>
              <span className="font-semibold text-amber-500">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden border border-zinc-800">
              <div 
                className="bg-gradient-to-r from-amber-600 to-amber-400 h-2 rounded-full transition-all duration-150 ease-out" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={isUploadDisabled}
          className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-zinc-950 font-bold text-sm tracking-wider uppercase transition-all duration-200 shadow-md shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading... ({uploadProgress}%)
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload Images ({selectedFiles.length})
            </>
          )}
        </button>

        {/* Validation Helper Info */}
        <div className="mt-4 flex flex-col gap-1.5 border-t border-zinc-800/80 pt-4">
          <div className="flex items-center gap-2 text-[11px]">
            <CheckCircle2 className={`h-3.5 w-3.5 ${category ? "text-amber-500" : "text-zinc-600"}`} />
            <span className={category ? "text-zinc-300" : "text-zinc-500"}>
              Category selected: <span className="font-semibold">{category || "None"}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <CheckCircle2 className={`h-3.5 w-3.5 ${selectedFiles.length > 0 ? "text-amber-500" : "text-zinc-600"}`} />
            <span className={selectedFiles.length > 0 ? "text-zinc-300" : "text-zinc-500"}>
              At least one image selected ({selectedFiles.length})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
