// hooks/use-cloudinary-upload.ts
"use client";

import { useCallback, useRef, useState } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

type UploadItem = {
  file: File;
  previewUrl: string;
  status: UploadStatus;
  progress: number; // 0-100
  url?: string;
  publicId?: string;
  error?: string;
};

type CloudinaryResponse = {
  secure_url: string;
  public_id: string;
  [key: string]: unknown;
};

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

function uploadFileToCloudinary(
  file: File,
  onProgress: (percent: number) => void,
): Promise<CloudinaryResponse> {
  return new Promise((resolve, reject) => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      reject(
        new Error(
          "Falta configurar NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME o NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET",
        ),
      );
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    );

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch {
          reject(new Error("Respuesta inválida de Cloudinary"));
        }
      } else {
        try {
          const parsed = JSON.parse(xhr.responseText);
          reject(new Error(parsed?.error?.message ?? "Error al subir la imagen"));
        } catch {
          reject(new Error(`Error al subir la imagen (status ${xhr.status})`));
        }
      }
    };

    xhr.onerror = () => reject(new Error("Error de red al subir la imagen"));

    xhr.send(formData);
  });
}

export function useCloudinaryUpload() {
  const [items, setItems] = useState<UploadItem[]>([]);
  const itemsRef = useRef<UploadItem[]>([]);
  itemsRef.current = items;

  const updateItem = useCallback((index: number, patch: Partial<UploadItem>) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  }, []);

  const uploadFiles = useCallback(async (files: File[]) => {
    const startIndex = itemsRef.current.length;

    const newItems: UploadItem[] = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      status: "idle",
      progress: 0,
    }));

    setItems((prev) => [...prev, ...newItems]);

    await Promise.all(
      files.map(async (file, i) => {
        const index = startIndex + i;
        updateItem(index, { status: "uploading", progress: 0 });

        try {
          const result = await uploadFileToCloudinary(file, (percent) =>
            updateItem(index, { progress: percent }),
          );
          updateItem(index, {
            status: "success",
            progress: 100,
            url: result.secure_url,
            publicId: result.public_id,
          });
        } catch (err) {
          updateItem(index, {
            status: "error",
            error: err instanceof Error ? err.message : "Error desconocido",
          });
        }
      }),
    );
  }, [updateItem]);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const reset = useCallback(() => {
    itemsRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setItems([]);
  }, []);

  const isUploading = items.some((item) => item.status === "uploading");
  const uploadedUrls = items
    .filter((item) => item.status === "success" && item.url)
    .map((item) => item.url as string);

  return {
    items,
    uploadFiles,
    removeItem,
    reset,
    isUploading,
    uploadedUrls,
  };
}