import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS 클래스를 병합하는 유틸리티 함수입니다.
 * (Shadcn UI 컴포넌트들이 이 함수를 사용합니다)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 브라우저 저장소(localStorage)에서 유저 ID를 가져오거나,
 * 없으면 새로 생성해서 저장하는 함수입니다.
 */
export function getUserId() {
  const STORAGE_KEY = 'moip_user_id';
  
  // 브라우저 환경이 아닐 경우를 대비한 안전장치 (선택사항)
  if (typeof window === 'undefined') {
    return 'unknown_user';
  }

  // 1. 저장된 ID가 있는지 확인
  let userId = localStorage.getItem(STORAGE_KEY);
  
  // 2. 없으면 새로 생성 (랜덤 문자열 + 현재 시간)
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    localStorage.setItem(STORAGE_KEY, userId);
  }
  
  return userId;
}