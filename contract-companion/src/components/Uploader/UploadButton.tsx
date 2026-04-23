import { Upload, FileDown } from "lucide-react";
import { MouseEvent, useRef } from "react";
import { toast } from "sonner";

// Updated interface to match the new Index.tsx props
interface UploadButtonProps {
  onUploadStart: () => void;
  onUploadComplete: (data: any, pdfUrl: string) => void;
}

export const UploadButton = ({ onUploadStart, onUploadComplete }: UploadButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    btnRef.current?.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    btnRef.current?.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const handlePrimaryClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // 1. Tell the parent component to show the "Scanning" animation
    onUploadStart();

    // 2. Prepare the file for the backend
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      console.log("Sending PDF to FastAPI backend...");
      
      // 3. Send it to your Python server
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/api/audit`,  {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      
      console.log("🔥 SUCCESS! AI Results:", result.data);
      
      toast.success("Audit Complete!", {
        description: "Your contract analysis is ready for review."
      });

      // 4. Pass data up to Index.tsx
      onUploadComplete(result.data, result.download_url);

    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Connection Failed", {
        description: "Make sure your FastAPI server is running in the terminal!"
      });
    }
  };

  const handleDownloadTest = () => {
    // Static demo contract bundled in /public — a realistic NDA seeded with
    // red/yellow/green issues that ClauseCheck will detect when re-uploaded.
    const a = document.createElement("a");
    a.href = "/sample-contract.pdf";
    a.download = "Startup_Test_Contract_ClauseCheck.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Test contract downloaded", {
      description: "Startup_Test_Contract_ClauseCheck.pdf — now upload it to see the audit.",
    });
  };

  return (
    <div
      className="mt-16 flex flex-col items-center px-6 animate-float-up"
      style={{ animationDelay: "600ms" }}
    >
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Primary CTA */}
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-ring" />
          <span
            className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring"
            style={{ animationDelay: "0.6s" }}
          />

          <button
            ref={btnRef}
            onMouseMove={handleMove}
            onClick={handlePrimaryClick}
            className="ripple-btn group relative inline-flex items-center gap-3 px-9 py-5 rounded-full bg-gradient-primary text-primary-foreground font-semibold text-lg shadow-elegant transition-all duration-300 hover:scale-[1.03]"
          >
            <Upload className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={2.2} />
            Upload Contract (PDF)
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Secondary CTA — fills with cream on hover */}
        <button
          onClick={handleDownloadTest}
          className="group relative inline-flex items-center gap-2.5 px-8 py-5 rounded-full border-2 border-primary/40 bg-card text-foreground font-semibold text-lg overflow-hidden transition-all duration-300 hover:border-primary hover:scale-[1.02]"
        >
          <span className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <FileDown className="w-5 h-5 relative z-10 text-primary-deep transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={2.2} />
          <span className="relative z-10">Download Test Contract</span>
        </button>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Drop a PDF · For demo purposes, download the test contract to see the output
      </p>
    </div>
  );
};