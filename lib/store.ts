import { create } from "zustand";
import Lenis from "@studio-freight/lenis/types";

interface Store {
  scroller: Lenis | null;
  setScroller: (v: Lenis) => void;

  stage: "in" | "out" | "none";
  setStage: (v: "in" | "out" | "none") => void;

  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;

  isCotizadorOpen: boolean;
  setIsCotizadorOpen: (v: boolean) => void;

  isLight: boolean;
  setLight: (value: boolean) => void;
}

export const useGlobal = create<Store>((set) => ({
  scroller: null,
  setScroller: (scroller) => set({ scroller }),

  stage: "none",
  setStage: (stage: "in" | "out" | "none") => set({ stage }),

  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),

  isCotizadorOpen: false,
  setIsCotizadorOpen: (isCotizadorOpen) => set({ isCotizadorOpen }),

  isLight: false,
  setLight: (value) => set({ isLight: value }),
}));
