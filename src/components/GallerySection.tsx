"use client";

import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { deleteImage } from "@/actions/imageActions";
import { toast } from "sonner";
import { Copy, Trash2, Eye, Calendar, Tag, Check, X, AlertTriangle, RefreshCw } from "lucide-react";

export interface GalleryImage {
  id: string;
  imageUrl: string;
  fileKey: string;
  category: string;
  originalFileName: string;
  uploadedAt: string;
}

export interface GallerySectionRef {
  refresh: () => void;
}

const GallerySection = forwardRef<GallerySectionRef, {}>((props, ref) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "male" | "female">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<GalleryImage | null>(null);
  const [deleteConfirmImage, setDeleteConfirmImage] = useState<GalleryImage | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/images");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setImages(data);
    } catch (err) {
      toast.error("Failed to load images from database.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Expose refresh function to parent component
  useImperativeHandle(ref, () => ({
    refresh() {
      fetchImages();
    }
  }));

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("Image URL copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async () => {
    if (!deleteConfirmImage) return;
    
    setIsDeleting(true);
    const toastId = toast.loading("Removing image from storage and database...");
    
    try {
      const res = await deleteImage(deleteConfirmImage.id);
      if (res && res.error) {
        toast.error(res.error, { id: toastId });
      } else {
        toast.success("Image deleted successfully!", { id: toastId });
        setImages(prev => prev.filter(img => img.id !== deleteConfirmImage.id));
        setDeleteConfirmImage(null);
      }
    } catch (err) {
      toast.error("An unexpected error occurred while deleting.", { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredImages = images.filter((img) => {
    if (filter === "all") return true;
    return img.category.toLowerCase() === filter;
  });

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Unknown Date";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold uppercase tracking-wider text-amber-500">
            Image Gallery
          </span>
          <span className="text-xs text-zinc-500 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded-full font-mono">
            {filteredImages.length} images
          </span>
        </div>
        
        {/* Filters */}
        <div className="flex bg-zinc-950 border border-zinc-800 p-1 rounded-lg w-full sm:w-auto">
          {(["all", "male", "female"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`
                flex-1 sm:flex-none py-1.5 px-4 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-200
                ${filter === tab 
                  ? "bg-gradient-to-r from-amber-600 to-amber-500 text-zinc-950 shadow-md shadow-amber-500/10" 
                  : "text-zinc-400 hover:text-zinc-200"}
              `}
            >
              {tab}
            </button>
          ))}
          <button 
            onClick={fetchImages}
            disabled={isLoading}
            className="p-1.5 text-zinc-500 hover:text-zinc-300 rounded-md transition-colors border-l border-zinc-800/80 ml-1 disabled:opacity-50"
            title="Reload images"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      {isLoading ? (
        // Skeleton loader
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-square bg-zinc-950"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-zinc-800 rounded w-2/3"></div>
                <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
                <div className="flex gap-2 pt-2">
                  <div className="h-8 bg-zinc-800 rounded flex-1"></div>
                  <div className="h-8 bg-zinc-800 rounded w-8"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredImages.length === 0 ? (
        // Empty State
        <div className="flex flex-col items-center justify-center p-12 bg-zinc-900 border border-zinc-800 rounded-xl text-center">
          <div className="h-16 w-16 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-500">
            <X className="h-8 w-8" />
          </div>
          <h3 className="text-zinc-200 font-bold mb-1">No images found</h3>
          <p className="text-sm text-zinc-500 max-w-sm">
            {filter === "all" 
              ? "Your gallery is empty. Upload some images to display them here." 
              : `No images have been uploaded for the ${filter} category yet.`}
          </p>
        </div>
      ) : (
        // Images view
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <div 
              key={img.id}
              className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-700/80 rounded-xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-black/40 flex flex-col"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-square bg-zinc-950 overflow-hidden cursor-pointer" onClick={() => setPreviewImage(img)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.imageUrl}
                  alt={img.originalFileName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="flex items-center gap-1.5 py-2 px-4 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-semibold text-white tracking-wide shadow-lg">
                    <Eye className="h-3.5 w-3.5 text-amber-500" />
                    Preview Image
                  </span>
                </div>
                
                {/* Category Badge overlay */}
                <span className={`
                  absolute top-3 left-3 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md border shadow-md
                  ${img.category.toLowerCase() === "male"
                    ? "bg-blue-950/80 text-blue-300 border-blue-800/80"
                    : "bg-purple-950/80 text-purple-300 border-purple-800/80"}
                `}>
                  {img.category}
                </span>
              </div>

              {/* Detail block */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div className="space-y-1.5 mb-4">
                  <p className="text-xs font-medium text-zinc-300 truncate" title={img.originalFileName}>
                    {img.originalFileName}
                  </p>
                  <div className="flex flex-col gap-1 text-[10px] text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Uploaded: {formatDate(img.uploadedAt)}
                    </span>
                    <span className="flex items-center gap-1 truncate font-mono">
                      <Tag className="h-3 w-3" />
                      {img.fileKey}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopyUrl(img.id, img.imageUrl)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-300 transition-colors"
                  >
                    {copiedId === img.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-zinc-400 group-hover:text-amber-500" />
                        Copy URL
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setDeleteConfirmImage(img)}
                    className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-red-900/60 hover:bg-red-950/10 text-zinc-400 hover:text-red-400 transition-colors"
                    title="Delete Image"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-sm animate-fade-in">
          <button 
            onClick={() => setPreviewImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Close overlay"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewImage.imageUrl}
              alt={previewImage.originalFileName}
              className="max-w-full max-h-[75vh] object-contain rounded-lg border border-zinc-800 shadow-2xl"
            />
            <div className="mt-4 text-center space-y-1">
              <p className="text-sm font-semibold text-white">{previewImage.originalFileName}</p>
              <div className="flex items-center justify-center gap-3 text-xs text-zinc-400">
                <span className="capitalize px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-amber-500">
                  {previewImage.category}
                </span>
                <span>•</span>
                <span>Uploaded: {formatDate(previewImage.uploadedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-800 max-w-md w-full p-6 rounded-2xl shadow-2xl space-y-5 animate-scale-up">
            <div className="flex items-center space-x-3 text-red-500">
              <div className="h-10 w-10 rounded-full bg-red-950/50 border border-red-900 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Confirm Deletion</h3>
            </div>
            
            <p className="text-zinc-400 text-sm leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-zinc-200">"{deleteConfirmImage.originalFileName}"</span>? 
              This will permanently delete it from both UploadThing storage and the database. This action cannot be undone.
            </p>

            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setDeleteConfirmImage(null)}
                disabled={isDeleting}
                className="py-2.5 px-4 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="py-2.5 px-4 rounded-lg bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md shadow-red-900/10 active:scale-[0.98] disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Image"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

GallerySection.displayName = "GallerySection";

export default GallerySection;
