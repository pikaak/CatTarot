import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, Share2 } from "lucide-react";
import { SiX, SiInstagram } from "react-icons/si";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { TarotCard } from "@shared/cards";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCards: TarotCard[];
  reading: string;
}

// ✅ 모든 카드 이미지를 자동으로 수집하는 glob
//   - 여기서는 "파일 이름" 기준으로 매칭할 거라 경로 alias 차이는 신경 안 써도 됨.
const cardImageModules = import.meta.glob<{ default: string }>(
  "@assets/generated_images/**/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

// ✅ 파일 이름 → 이미지 URL 로 매핑
//   예: "The_Empress_tarot_card_ee0ea80d.png" → "빌드된 실제 URL"
const cardImagesByFilename: Record<string, string> = {};
for (const [path, mod] of Object.entries(cardImageModules)) {
  const filename = path.split("/").pop();
  if (filename) {
    cardImagesByFilename[fil]()
