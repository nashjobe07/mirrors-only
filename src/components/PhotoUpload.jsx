import { useRef, useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function PhotoUpload({ value = [], onChange, max = 15, label = "Upload photos" }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const remaining = max - value.length;
      const slice = Array.from(files).slice(0, remaining);
      const uploaded = [];
      for (const file of slice) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        if (file_url) uploaded.push(file_url);
      }
      onChange([...value, ...uploaded]);
    } catch (e) {
      // ignore individual failures
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = (url) => onChange(value.filter((u) => u !== url));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[12px] font-semibold tracking-tight text-slate-ink">{label}</span>
        <span className="text-[12px] text-slate-ink/70">({value.length}/{max})</span>
      </div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-silver bg-lightgray px-6 py-8 text-center transition-colors hover:border-icy"
      >
        {uploading ? (
          <Loader2 className="h-5 w-5 animate-spin text-slate-ink" />
        ) : (
          <UploadCloud className="h-6 w-6 text-slate-ink" />
        )}
        <p className="text-[13px] font-medium text-obsidian">
          {uploading ? "Uploading…" : "Click or drag photos here"}
        </p>
        <p className="text-[11px] text-slate-ink/70">JPG / PNG · up to {max} images</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {value.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {value.map((url) => (
            <div key={url} className="group relative aspect-square overflow-hidden border border-silver">
              <img src={url} alt="Upload preview" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  remove(url);
                }}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-obsidian/70 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}