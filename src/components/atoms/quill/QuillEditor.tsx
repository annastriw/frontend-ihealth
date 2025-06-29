"use client";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useEffect } from "react";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuillEditor({ value, onChange }: QuillEditorProps) {
  const { quill, quillRef } = useQuill({
    theme: "snow",
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        ["link", "image"],
        ["clean"],
      ],
    },
    placeholder: "Masukkan konten artikel...",
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        onChange(quill.root.innerHTML);
      });
    }
  }, [quill, onChange]);

  useEffect(() => {
    if (quill && value !== quill.root.innerHTML) {
      quill.root.innerHTML = value;
    }
  }, [quill, value]);

  return <div ref={quillRef} />;
}
