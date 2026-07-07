import Image from "next/image";

import { useState, useRef, useEffect } from "react";
import { Star, Trash2, Upload } from "lucide-react";


const createImageEntry = (file, isThumbnail = false) => ({
    file,
    previewUrl: URL.createObjectURL(file),
    isThumbnail,
});

export default function ImageUploader({ onChange, maxImage = 5 }) {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const fileInputRef = useRef();

    const notifyParent = (updatedImages) => {
        const thumbnailEntry = updatedImages.find((image) => image.isThumbnail);
        const remainingImages = updatedImages
            .filter((image) => !image.isThumbnail)
            .map((image) => image.file);

        onChange({
            thumbnail: thumbnailEntry?.file ?? null,
            images: remainingImages,
        });
    };

    const addFiles = (incomingFiles) => {
        const validImageFiles = Array.from(incomingFiles).filter((file) =>
            file.type.startsWith("image/")
        );

        setUploadedImages((previousImages) => {
            const remainingSlotsCount = maxImage - previousImages.length;
            const filesToAdd = validImageFiles.slice(0, remainingSlotsCount);
            const hasExistingThumbnail = previousImages.some((image) => image.isThumbnail);

            const newImageEntries = filesToAdd.map((file, fileIndex) =>
                createImageEntry(file, !hasExistingThumbnail && fileIndex === 0)
            );

            return [...previousImages, ...newImageEntries];  // ← just return, don't notify
        });
    };

    // notify parent separately via useEffect whenever uploadedImages changes
    useEffect(() => {
        notifyParent(uploadedImages);
    }, [uploadedImages]);


    const handleFileInputChange = (event) => {
        addFiles(event.target.files);
        event.target.value = "";
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDraggingOver(true);
    };

    const handleDragLeave = () => {
        setIsDraggingOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDraggingOver(false);
        addFiles(event.dataTransfer.files);
    };

    const handleSetAsThumbnail = (targetIndex) => {
        const updatedImages = uploadedImages.map((image, imageIndex) => ({
            ...image,
            isThumbnail: imageIndex === targetIndex,
        }));
        setUploadedImages(updatedImages);
        notifyParent(updatedImages);
    };

    const handleRemoveImage = (targetIndex) => {
        const removedImage = uploadedImages[targetIndex];
        URL.revokeObjectURL(removedImage.previewUrl);

        let updatedImages = uploadedImages.filter((_, imageIndex) => imageIndex !== targetIndex);

        if (removedImage.isThumbnail && updatedImages.length > 0) {
            updatedImages = updatedImages.map((image, imageIndex) => ({
                ...image,
                isThumbnail: imageIndex === 0,
            }));
        }

        setUploadedImages(updatedImages);
        notifyParent(updatedImages);
    };

    const isAtMaxCapacity = uploadedImages.length >= maxImage;

    return (
        <div className="flex flex-col gap-3 w-full">
            <label className="text-xs text-text/75 pl-1">
                Photos <span className="text-red-500">*</span>
                <span className="text-text/40 ml-1">({uploadedImages.length}/{maxImage} — star one as thumbnail)</span>
            </label>

            {!isAtMaxCapacity && (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dotted rounded-lg px-4 py-8 flex flex-col items-center gap-2 cursor-pointer transition-colors ${
                        isDraggingOver
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-text/40 hover:border-primary/50 hover:text-primary/50"
                    }`}
                >
                    <Upload size={22} />
                    <span className="text-sm">Drop images here</span>
                    <span className="text-xs text-text/30">MAX {maxImage} images</span>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileInputChange}
                    />
                </div>
            )}

            {uploadedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                    {uploadedImages.map((image, imageIndex) => (
                        <div
                            key={imageIndex}
                            className={`relative rounded-lg overflow-hidden border-2 transition-colors ${
                                image.isThumbnail ? "border-primary" : "border-border"
                            }`}
                        >
                            <Image
                                width={400}
                                height={700}
                                src={image.previewUrl}
                                alt={`Upload ${imageIndex + 1}`}
                                className="w-full h-56 object-cover"
                                unoptimized
                            />

                            {image.isThumbnail && (
                                <span className="absolute top-1 left-1 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-md font-medium">
                                    Thumbnail
                                </span>
                            )}

                            <div className="absolute top-1 right-1 flex gap-1">
                                
                                <button
                                    type="button"
                                    onClick={() => handleSetAsThumbnail(imageIndex)}
                                    className={`${image.isThumbnail ? "bg-primary" : "bg-primary/40"}  hover:bg-primary text-white rounded-md p-1 transition-colors`}
                                    title="Set as thumbnail"
                                >
                                    <Star size={12} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(imageIndex)}
                                    className="bg-black/40 hover:bg-red-500 text-white rounded-md p-1 transition-colors"
                                    title="Remove image"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}