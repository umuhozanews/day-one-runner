import { useEffect, useState } from "react";

export interface SitePhotosData {
  hero: {
    video: string;
    poster: string;
  };
  mission: {
    img1: string;
    img2: string;
  };
  crewStrip: string[];
  runs: {
    easySocialRun: { imgL: string; imgR: string };
    tempoRun: { imgL: string; imgR: string };
    longRun: { imgL: string; imgR: string };
    trackSpeedRun: { imgL: string; imgR: string };
    fartlekRun: { imgL: string; imgR: string };
  };
  merches: {
    signatureBanner: string;
    featuredSinglet: string;
    jerseyBlack: string;
    jerseyWhite: string;
    tshirtBlack: string;
    tshirtWhite: string;
    duoPack: string;
  };
  about: {
    hero: string;
    story1: string;
    story2: string;
  };
  community: {
    hero: string;
    moment1: string;
    moment2: string;
  };
}

export const DEFAULT_SITE_PHOTOS: SitePhotosData = {
  hero: {
    video: "/gwiza-vd.mp4",
    poster: "/photos/SnapInsta.to_749567025_18037222802815520_4849214195941431927_n.jpg",
  },
  mission: {
    img1: "/photos/SnapInsta.to_748985982_18037222781815520_1887800587334956759_n.jpg",
    img2: "/photos/SnapInsta.to_748070875_18037222835815520_1503705550880001620_n.jpg",
  },
  crewStrip: [
    "/photos/crew/crew-1.jpg",
    "/photos/crew/crew-2.jpg",
    "/photos/crew/crew-3.jpg",
    "/photos/crew/crew-4.jpg",
    "/photos/crew/crew-5.jpg",
    "/photos/crew/crew-6.jpg",
    "/photos/crew/crew-7.jpg",
    "/photos/crew/crew-8.jpg",
    "/photos/crew/crew-9.jpg",
    "/photos/crew/crew-10.jpg",
    "/photos/crew/crew-11.jpg",
    "/photos/crew/crew-12.jpg",
  ],
  runs: {
    easySocialRun: {
      imgL: "/photos/SnapInsta.to_748985982_18037222781815520_1887800587334956759_n.jpg",
      imgR: "/photos/SnapInsta.to_749665105_18037222907815520_6383458047242768862_n.jpg",
    },
    tempoRun: {
      imgL: "/photos/SnapInsta.to_730182773_18035340857815520_1122172522890161717_n.jpg",
      imgR: "/photos/SnapInsta.to_748070875_18037222835815520_1503705550880001620_n.jpg",
    },
    longRun: {
      imgL: "/photos/SnapInsta.to_748070875_18037222835815520_1503705550880001620_n.jpg",
      imgR: "/photos/SnapInsta.to_749665105_18037222907815520_6383458047242768862_n.jpg",
    },
    trackSpeedRun: {
      imgL: "/photos/SnapInsta.to_749567025_18037222802815520_4849214195941431927_n.jpg",
      imgR: "/photos/SnapInsta.to_731093748_18035341016815520_3372942038985659629_n.jpg",
    },
    fartlekRun: {
      imgL: "/photos/SnapInsta.to_729540015_18035340809815520_4338465274389984729_n.jpg",
      imgR: "/photos/SnapInsta.to_748985982_18037222781815520_1887800587334956759_n.jpg",
    },
  },
  merches: {
    signatureBanner: "/merches/rebuke.jpeg",
    featuredSinglet: "/merches/rebuke4.jpeg",
    jerseyBlack: "/merches/harbara.jpeg",
    jerseyWhite: "/merches/rebuke1.jpeg",
    tshirtBlack: "/merches/rrre.jpeg",
    tshirtWhite: "/merches/rebuke2.jpeg",
    duoPack: "/merches/rebuke.jpeg",
  },
  about: {
    hero: "/photos/crew/crew-1.jpg",
    story1: "/photos/SnapInsta.to_748480837_18037222730815520_7938681683487494570_n.jpg",
    story2: "/photos/SnapInsta.to_746199001_18037222862815520_8006546965777207715_n.jpg",
  },
  community: {
    hero: "/photos/crew/crew-4.jpg",
    moment1: "/photos/SnapInsta.to_731442553_18035340866815520_6708322568674611942_n.jpg",
    moment2: "/photos/SnapInsta.to_730313318_18035340998815520_393394560813051781_n.jpg",
  },
};

const STORAGE_KEY = "vrc_admin_site_photos_v1";
const SYNC_EVENT = "vrc_photos_updated";

export function getStoredSitePhotos(): SitePhotosData {
  if (typeof window === "undefined") return DEFAULT_SITE_PHOTOS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_PHOTOS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SITE_PHOTOS,
      ...parsed,
      hero: { ...DEFAULT_SITE_PHOTOS.hero, ...(parsed.hero || {}) },
      mission: { ...DEFAULT_SITE_PHOTOS.mission, ...(parsed.mission || {}) },
      crewStrip: Array.isArray(parsed.crewStrip) && parsed.crewStrip.length > 0 ? parsed.crewStrip : DEFAULT_SITE_PHOTOS.crewStrip,
      runs: { ...DEFAULT_SITE_PHOTOS.runs, ...(parsed.runs || {}) },
      merches: { ...DEFAULT_SITE_PHOTOS.merches, ...(parsed.merches || {}) },
      about: { ...DEFAULT_SITE_PHOTOS.about, ...(parsed.about || {}) },
      community: { ...DEFAULT_SITE_PHOTOS.community, ...(parsed.community || {}) },
    };
  } catch {
    return DEFAULT_SITE_PHOTOS;
  }
}

export function saveStoredSitePhotos(data: SitePhotosData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: data }));
  } catch (err) {
    console.error("Failed to save photos to localStorage:", err);
  }
}

export function resetStoredSitePhotos() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: DEFAULT_SITE_PHOTOS }));
}

export function useSitePhotos() {
  const [photos, setPhotos] = useState<SitePhotosData>(DEFAULT_SITE_PHOTOS);

  useEffect(() => {
    setPhotos(getStoredSitePhotos());

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<SitePhotosData>;
      if (customEvent.detail) {
        setPhotos(customEvent.detail);
      } else {
        setPhotos(getStoredSitePhotos());
      }
    };

    window.addEventListener(SYNC_EVENT, handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener(SYNC_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return {
    photos,
    savePhotos: saveStoredSitePhotos,
    resetPhotos: resetStoredSitePhotos,
  };
}
