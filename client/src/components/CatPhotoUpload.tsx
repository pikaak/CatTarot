import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

interface CatPhotoUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (imageDataUrl: string, catName: string) => void;
  currentImage?: string;
  currentName?: string;
}

export default function CatPhotoUpload({ isOpen, onClose, onUpload, currentImage, currentName }: CatPhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const [catName, setCatName] = useState(currentName || "");

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
    if (preview && catName.trim()) {
      onUpload(preview, catName.trim());
      onClose();
    }
  };

  const handleClose = () => {
    setPreview(currentImage || null);
    setCatName(currentName || "");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md" data-testid="cat-photo-upload-dialog">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-center">고양이 사진을 업로드하세요!</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="cat-name-input" className="text-sm font-medium">
              고양이 이름
            </label>
            <Input
              id="cat-name-input"
              type="text"
              placeholder="고양이 이름을 입력하세요"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              data-testid="input-cat-name"
            />
          </div>

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
              disabled={!preview || !catName.trim()}
              data-testid="button-save-cat-photo"
            >
              저장
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
