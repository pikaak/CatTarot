import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface CatPhotoUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (imageDataUrl: string) => void;
  currentImage?: string;
}

export default function CatPhotoUpload({ isOpen, onClose, onUpload, currentImage }: CatPhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (preview) {
      onUpload(preview);
      onClose();
    }
  };

  const handleClose = () => {
    setPreview(currentImage || null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md" data-testid="cat-photo-upload-dialog">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-center">고양이 사진을 업로드하세요!</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {preview && (
            <div className="flex justify-center">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/30">
                <img
                  src={preview}
                  alt="고양이 미리보기"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col items-center gap-4">
            <label 
              htmlFor="cat-photo-input"
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Upload className="w-5 h-5" />
                <span>{preview ? "다른 사진 선택" : "사진 선택"}</span>
              </div>
              <input
                id="cat-photo-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                data-testid="input-cat-photo"
              />
            </label>

            <p className="text-sm text-muted-foreground text-center">
              고양이 사진을 업로드하여 타로 경험을 개인화하세요
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={handleClose} data-testid="button-cancel-upload">
              취소
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!preview}
              data-testid="button-save-cat-photo"
            >
              사진 저장
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
