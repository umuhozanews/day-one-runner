import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  DEFAULT_SITE_PHOTOS,
  getStoredSitePhotos,
  saveStoredSitePhotos,
  resetStoredSitePhotos,
  type SitePhotosData,
} from "@/data/site-photos";
import mediaCatalog from "@/data/media-catalog.json";
import {
  ShieldCheck,
  Lock,
  LogOut,
  Upload,
  Image as ImageIcon,
  RotateCcw,
  Save,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FolderOpen,
  Search,
  Sparkles,
  ChevronRight,
  Eye,
  Sliders,
  X,
  Download,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Club Admin Portal — Vision Run Club Kigali" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type TabKey = "overview" | "hero" | "runs" | "merches" | "pages" | "library";

interface ActivePicker {
  section: string;
  field: string;
  index?: number;
  label: string;
}

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [photos, setPhotos] = useState<SitePhotosData>(DEFAULT_SITE_PHOTOS);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Media Library Picker state
  const [pickerTarget, setPickerTarget] = useState<ActivePicker | null>(null);
  const [librarySearch, setLibrarySearch] = useState("");
  const [libraryCategory, setLibraryCategory] = useState<string>("all");
  const [previewModalImg, setPreviewModalImg] = useState<string | null>(null);

  // Hidden file input ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadTarget, setUploadTarget] = useState<ActivePicker | null>(null);

  // Check auth on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("vrc_admin_auth");
      if (auth === "true") {
        setIsAuthenticated(true);
      }
      setPhotos(getStoredSitePhotos());
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    const isMatch =
      (cleanEmail === "gwizachris@gmail.com" && cleanPass === "gwiza@12345") ||
      cleanPass === "gwiza@12345" ||
      cleanPass === "vrc2026" ||
      cleanPass === "admin2026";

    if (isMatch) {
      setIsAuthenticated(true);
      localStorage.setItem("vrc_admin_auth", "true");
      setAuthError(false);
      showToast("Welcome back, Chris! Admin Access Granted.");
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("vrc_admin_auth");
    setPassword("");
  };

  const handleSave = () => {
    saveStoredSitePhotos(photos);
    setHasUnsavedChanges(false);
    showToast("Photos successfully saved and synced live across the site!");
  };

  const handleResetAll = () => {
    if (confirm("Reset ALL site photos to their original defaults? Any custom uploads will be replaced.")) {
      resetStoredSitePhotos();
      setPhotos(DEFAULT_SITE_PHOTOS);
      setHasUnsavedChanges(false);
      showToast("All sections have been reset to factory defaults.");
    }
  };

  const updateField = (section: string, field: string, value: string, index?: number) => {
    setPhotos((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as SitePhotosData;
      if (section === "crewStrip" && typeof index === "number") {
        next.crewStrip[index] = value;
      } else if (section === "runs") {
        const [runName, side] = field.split(".");
        // @ts-expect-error dynamic access
        next.runs[runName][side] = value;
      } else {
        // @ts-expect-error dynamic access
        next[section][field] = value;
      }
      return next;
    });
    setHasUnsavedChanges(true);
  };

  // Resize uploaded image to max 1600px width/height and convert to DataURL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadTarget) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDim = 1600;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.88);

        updateField(uploadTarget.section, uploadTarget.field, dataUrl, uploadTarget.index);
        showToast(`Uploaded new photo for ${uploadTarget.label}`);
        setUploadTarget(null);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const triggerUpload = (target: ActivePicker) => {
    setUploadTarget(target);
    fileInputRef.current?.click();
  };

  const selectFromLibrary = (mediaPath: string) => {
    if (!pickerTarget) return;
    updateField(pickerTarget.section, pickerTarget.field, mediaPath, pickerTarget.index);
    showToast(`Assigned ${mediaPath.split("/").pop()} to ${pickerTarget.label}`);
    setPickerTarget(null);
  };

  const exportConfig = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(photos, null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", `vision-run-club-photos-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast("Configuration exported as JSON file.");
  };

  /* ------------------- LOGIN SCREEN ------------------- */
  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 py-12 text-white">
        <div className="w-full max-w-md space-y-8 rounded-3xl border border-white/10 bg-[#121212] p-8 shadow-2xl">
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff0000]/10 text-[#ff0000] border border-[#ff0000]/30 shadow-inner">
              <Lock className="h-8 w-8" />
            </div>
            <span className="tech text-xs tracking-widest uppercase text-[#ff0000]">
              Vision Run Club Kigali
            </span>
            <h1 className="display text-3xl sm:text-4xl text-white">Admin Dashboard</h1>
            <p className="text-xs text-white/60 max-w-xs mx-auto">
              Protected portal to update photos and visual media across all sections of the site.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="tech text-xs text-white/70 block mb-1.5 font-medium">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                autoFocus
                placeholder="gwizachris@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#ff0000] focus:outline-none focus:ring-1 focus:ring-[#ff0000]"
              />
            </div>

            <div>
              <label className="tech text-xs text-white/70 block mb-1.5 font-medium">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#ff0000] focus:outline-none focus:ring-1 focus:ring-[#ff0000]"
              />
              {authError && (
                <p className="tech text-xs text-red-400 mt-2 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Invalid email or password. Please verify your credentials.</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="snap-btn w-full py-3.5 text-center text-sm font-semibold tracking-wider uppercase cursor-pointer mt-2"
            >
              Sign In to Admin Portal
            </button>
          </form>

          <div className="border-t border-white/10 pt-4 text-center">
            <Link to="/" className="text-xs text-white/50 hover:text-white transition-colors">
              ← Return to public website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ------------------- DASHBOARD VIEW ------------------- */
  return (
    <main className="min-h-screen bg-[#0d0d0e] text-white">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl border border-[#ff0000]/40 bg-[#161618] px-5 py-3 text-xs font-medium text-white shadow-2xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="h-4 w-4 text-[#ff0000] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#111113]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3.5 sm:px-6 md:px-8">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Vision Run Club" className="h-7 w-auto" />
            <div className="h-4 w-px bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="tech text-xs font-bold text-[#ff0000] uppercase tracking-wider">
                Admin Portal
              </span>
              <span className="tech text-[0.65rem] rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-emerald-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                gwizachris@gmail.com
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {hasUnsavedChanges && (
              <span className="tech text-xs text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30 animate-pulse hidden md:inline">
                Unsaved Changes
              </span>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#ff0000] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-[#cc0000] transition-colors"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Save Changes</span>
            </button>

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="h-3 w-3" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              title="Log Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 md:px-8">
        {/* Subheader & Navigation Tabs */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="display text-3xl sm:text-4xl text-white">Section Photo Manager</h1>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Select any section to upload new photos, pick from the library, or replace images in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportConfig}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Backup JSON</span>
            </button>

            <button
              type="button"
              onClick={handleResetAll}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/60 hover:text-red-400 hover:border-red-400/40 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset All</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pt-6 pb-2 scrollbar-none">
          {[
            { id: "overview", label: "Overview & Status" },
            { id: "hero", label: "Hero & Mission" },
            { id: "runs", label: "Weekly Runs (5 Runs)" },
            { id: "merches", label: "Merches & Gear" },
            { id: "pages", label: "About & Community" },
            { id: "library", label: "Media Library (70+ Photos)" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as TabKey)}
              className={`tech shrink-0 cursor-pointer rounded-xl px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? "bg-[#ff0000] text-white shadow-lg shadow-[#ff0000]/25"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 pt-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-[#141416] p-5 space-y-2">
                <span className="tech text-xs text-[#ff0000]">Hero &amp; Home</span>
                <p className="display text-3xl font-bold">16 Photos</p>
                <p className="text-xs text-white/50">Hero video/poster, 2 mission cards, 12 crew strip photos.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#141416] p-5 space-y-2">
                <span className="tech text-xs text-[#ff0000]">Weekly Runs</span>
                <p className="display text-3xl font-bold">10 Photos</p>
                <p className="text-xs text-white/50">Left and right action photos across all 5 weekly runs.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#141416] p-5 space-y-2">
                <span className="tech text-xs text-[#ff0000]">Merches &amp; Gear</span>
                <p className="display text-3xl font-bold">7 Products</p>
                <p className="text-xs text-white/50">Jerseys (15k), Singlet (18k), T-Shirts (20k), Banner.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#141416] p-5 space-y-2">
                <span className="tech text-xs text-[#ff0000]">Media Library</span>
                <p className="display text-3xl font-bold">{mediaCatalog.length} Files</p>
                <p className="text-xs text-white/50">All scanned photos available to assign to any section.</p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="rounded-3xl border border-white/10 bg-[#141416] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="display text-xl text-white">Quick Photo Update Workflow</h3>
                  <p className="text-xs text-white/60 mt-1">How to change photos on any section:</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 pt-2">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff0000]/10 text-[#ff0000] tech text-sm font-bold">1</div>
                  <h4 className="text-sm font-semibold">Choose Section</h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Click any tab above (Hero, Weekly Runs, Merches, etc.) to view every photo slot.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff0000]/10 text-[#ff0000] tech text-sm font-bold">2</div>
                  <h4 className="text-sm font-semibold">Pick or Upload</h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Click <strong>Upload File</strong> to upload from your computer or <strong>Pick from Library</strong> to pick any existing photo.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ff0000]/10 text-[#ff0000] tech text-sm font-bold">3</div>
                  <h4 className="text-sm font-semibold">Save Changes</h4>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Click <strong>Save Changes</strong> at the top right. All pages immediately update!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HERO & MISSION */}
        {activeTab === "hero" && (
          <div className="space-y-10 pt-8">
            {/* Hero Section */}
            <div className="rounded-3xl border border-white/10 bg-[#141416] p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="tech text-xs text-[#ff0000]">Homepage Top Banner</span>
                <h3 className="display text-2xl text-white">Hero Video &amp; Poster</h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <PhotoCard
                  title="Hero Video Poster (Fallback Image)"
                  description="Displays while video loads and on low-power mobile devices"
                  currentSrc={photos.hero.poster}
                  onUpload={() => triggerUpload({ section: "hero", field: "poster", label: "Hero Poster" })}
                  onPick={() => setPickerTarget({ section: "hero", field: "poster", label: "Hero Poster" })}
                  onChangeUrl={(url) => updateField("hero", "poster", url)}
                  onReset={() => updateField("hero", "poster", DEFAULT_SITE_PHOTOS.hero.poster)}
                  onPreview={() => setPreviewModalImg(photos.hero.poster)}
                />

                <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white">Hero Video Path</h4>
                    <span className="tech text-[0.65rem] text-[#ff0000]">MP4 Video</span>
                  </div>
                  <p className="text-xs text-white/60">Currently playing: <code className="text-white">{photos.hero.video}</code></p>
                  <input
                    type="text"
                    value={photos.hero.video}
                    onChange={(e) => updateField("hero", "video", e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#ff0000] focus:outline-none"
                    placeholder="/gwiza-vd.mp4"
                  />
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10">
                    <video src={photos.hero.video} controls className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Section */}
            <div className="rounded-3xl border border-white/10 bg-[#141416] p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="tech text-xs text-[#ff0000]">Homepage Mid Section</span>
                <h3 className="display text-2xl text-white">Mission Cards (Find Your Sunday)</h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <PhotoCard
                  title="Mission Card 1 (Left Image)"
                  description="Community group running on Kigali streets"
                  currentSrc={photos.mission.img1}
                  onUpload={() => triggerUpload({ section: "mission", field: "img1", label: "Mission Card 1" })}
                  onPick={() => setPickerTarget({ section: "mission", field: "img1", label: "Mission Card 1" })}
                  onChangeUrl={(url) => updateField("mission", "img1", url)}
                  onReset={() => updateField("mission", "img1", DEFAULT_SITE_PHOTOS.mission.img1)}
                  onPreview={() => setPreviewModalImg(photos.mission.img1)}
                />

                <PhotoCard
                  title="Mission Card 2 (Right Image with Register Card)"
                  description="Runner in motion beneath the 'Find your Sunday' registration pill"
                  currentSrc={photos.mission.img2}
                  onUpload={() => triggerUpload({ section: "mission", field: "img2", label: "Mission Card 2" })}
                  onPick={() => setPickerTarget({ section: "mission", field: "img2", label: "Mission Card 2" })}
                  onChangeUrl={(url) => updateField("mission", "img2", url)}
                  onReset={() => updateField("mission", "img2", DEFAULT_SITE_PHOTOS.mission.img2)}
                  onPreview={() => setPreviewModalImg(photos.mission.img2)}
                />
              </div>
            </div>

            {/* Crew Ticker Strip */}
            <div className="rounded-3xl border border-white/10 bg-[#141416] p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="tech text-xs text-[#ff0000]">Continuous Marquee</span>
                <h3 className="display text-2xl text-white">Sliding Crew Photo Strip (12 Photos)</h3>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {photos.crewStrip.map((src, i) => (
                  <div key={i} className="space-y-2 rounded-xl border border-white/10 bg-black/40 p-2.5">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-neutral-900 group">
                      <img src={src} alt={`Crew ${i + 1}`} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 transition-opacity p-2">
                        <button
                          type="button"
                          onClick={() => triggerUpload({ section: "crewStrip", field: `item_${i}`, index: i, label: `Crew Photo #${i + 1}` })}
                          className="w-full rounded bg-[#ff0000] py-1 text-[0.65rem] font-bold text-white cursor-pointer"
                        >
                          Upload
                        </button>
                        <button
                          type="button"
                          onClick={() => setPickerTarget({ section: "crewStrip", field: `item_${i}`, index: i, label: `Crew Photo #${i + 1}` })}
                          className="w-full rounded bg-white/20 py-1 text-[0.65rem] font-bold text-white hover:bg-white/30 cursor-pointer"
                        >
                          Pick
                        </button>
                      </div>
                    </div>
                    <p className="tech text-[0.65rem] text-white/50 text-center truncate">Photo #{i + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: WEEKLY RUNS */}
        {activeTab === "runs" && (
          <div className="space-y-8 pt-8">
            {[
              { id: "easySocialRun", name: "Easy / Social Run (5.00 KM)", dist: "5K", desc: "A gentle jog connecting runners of all levels." },
              { id: "tempoRun", name: "Tempo Run (6.00 - 8.00 KM)", dist: "6-8K", desc: "Structured workout to increase speed." },
              { id: "longRun", name: "Long Run (8.00 - 12.00 KM)", dist: "8-12K", desc: "Endurance session exploring Kigali hills." },
              { id: "trackSpeedRun", name: "Track / Speed Run (5.00 - 7.00 KM)", dist: "Track", desc: "Focused pace intervals." },
              { id: "fartlekRun", name: "Fartlek Run (5.00 - 6.50 KM)", dist: "Fartlek", desc: "Dynamic speed play with recovery pacing." },
            ].map((run) => {
              // @ts-expect-error dynamic key
              const runPhotos = photos.runs[run.id];
              return (
                <div key={run.id} className="rounded-3xl border border-white/10 bg-[#141416] p-6 sm:p-8 space-y-6">
                  <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 gap-2">
                    <div>
                      <span className="tech text-xs text-[#ff0000]">{run.dist} Session</span>
                      <h3 className="display text-2xl text-white">{run.name}</h3>
                      <p className="text-xs text-white/60">{run.desc}</p>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <PhotoCard
                      title="Left Action Image"
                      description="Shown in left split reveal panel"
                      currentSrc={runPhotos.imgL}
                      onUpload={() => triggerUpload({ section: "runs", field: `${run.id}.imgL`, label: `${run.name} (Left)` })}
                      onPick={() => setPickerTarget({ section: "runs", field: `${run.id}.imgL`, label: `${run.name} (Left)` })}
                      onChangeUrl={(url) => updateField("runs", `${run.id}.imgL`, url)}
                      // @ts-expect-error dynamic default
                      onReset={() => updateField("runs", `${run.id}.imgL`, DEFAULT_SITE_PHOTOS.runs[run.id].imgL)}
                      onPreview={() => setPreviewModalImg(runPhotos.imgL)}
                    />

                    <PhotoCard
                      title="Right Action Image"
                      description="Shown in right split reveal panel"
                      currentSrc={runPhotos.imgR}
                      onUpload={() => triggerUpload({ section: "runs", field: `${run.id}.imgR`, label: `${run.name} (Right)` })}
                      onPick={() => setPickerTarget({ section: "runs", field: `${run.id}.imgR`, label: `${run.name} (Right)` })}
                      onChangeUrl={(url) => updateField("runs", `${run.id}.imgR`, url)}
                      // @ts-expect-error dynamic default
                      onReset={() => updateField("runs", `${run.id}.imgR`, DEFAULT_SITE_PHOTOS.runs[run.id].imgR)}
                      onPreview={() => setPreviewModalImg(runPhotos.imgR)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 4: MERCHES & GEAR */}
        {activeTab === "merches" && (
          <div className="space-y-8 pt-8">
            <div className="rounded-3xl border border-white/10 bg-[#141416] p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="tech text-xs text-[#ff0000]">Club Merches Hero Banner</span>
                <h3 className="display text-2xl text-white">Official Merch Banner Photo</h3>
                <p className="text-xs text-white/60">Featured at top of /merches with the 10,000 RWF membership badge</p>
              </div>

              <PhotoCard
                title="Signature Membership Banner Photo"
                description="Currently showing White & Black duo jersey runner photo"
                currentSrc={photos.merches.signatureBanner}
                onUpload={() => triggerUpload({ section: "merches", field: "signatureBanner", label: "Merch Banner" })}
                onPick={() => setPickerTarget({ section: "merches", field: "signatureBanner", label: "Merch Banner" })}
                onChangeUrl={(url) => updateField("merches", "signatureBanner", url)}
                onReset={() => updateField("merches", "signatureBanner", DEFAULT_SITE_PHOTOS.merches.signatureBanner)}
                onPreview={() => setPreviewModalImg(photos.merches.signatureBanner)}
              />
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#141416] p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="tech text-xs text-[#ff0000]">Performance Gear Collection</span>
                <h3 className="display text-2xl text-white">Product Lineup Photos</h3>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <PhotoCard
                  title="Running Jersey — Black (10,000 FRW)"
                  description="Front action shot on green track"
                  currentSrc={photos.merches.jerseyBlack}
                  onUpload={() => triggerUpload({ section: "merches", field: "jerseyBlack", label: "Jersey Black" })}
                  onPick={() => setPickerTarget({ section: "merches", field: "jerseyBlack", label: "Jersey Black" })}
                  onChangeUrl={(url) => updateField("merches", "jerseyBlack", url)}
                  onReset={() => updateField("merches", "jerseyBlack", DEFAULT_SITE_PHOTOS.merches.jerseyBlack)}
                  onPreview={() => setPreviewModalImg(photos.merches.jerseyBlack)}
                />

                <PhotoCard
                  title="Running Jersey — White (10,000 FRW)"
                  description="Runner in speed shades"
                  currentSrc={photos.merches.jerseyWhite}
                  onUpload={() => triggerUpload({ section: "merches", field: "jerseyWhite", label: "Jersey White" })}
                  onPick={() => setPickerTarget({ section: "merches", field: "jerseyWhite", label: "Jersey White" })}
                  onChangeUrl={(url) => updateField("merches", "jerseyWhite", url)}
                  onReset={() => updateField("merches", "jerseyWhite", DEFAULT_SITE_PHOTOS.merches.jerseyWhite)}
                  onPreview={() => setPreviewModalImg(photos.merches.jerseyWhite)}
                />

                <PhotoCard
                  title="Statement Singlet (18,000 FRW)"
                  description="Run Clubs Are The New Nightclubs back view"
                  currentSrc={photos.merches.featuredSinglet}
                  onUpload={() => triggerUpload({ section: "merches", field: "featuredSinglet", label: "Statement Singlet" })}
                  onPick={() => setPickerTarget({ section: "merches", field: "featuredSinglet", label: "Statement Singlet" })}
                  onChangeUrl={(url) => updateField("merches", "featuredSinglet", url)}
                  onReset={() => updateField("merches", "featuredSinglet", DEFAULT_SITE_PHOTOS.merches.featuredSinglet)}
                  onPreview={() => setPreviewModalImg(photos.merches.featuredSinglet)}
                />

                <PhotoCard
                  title="'Night Club' T-Shirt (20,000 FRW)"
                  description="Black heavyweight tee with bold white back typography"
                  currentSrc={photos.merches.tshirtBlack}
                  onUpload={() => triggerUpload({ section: "merches", field: "tshirtBlack", label: "Night Club T-Shirt" })}
                  onPick={() => setPickerTarget({ section: "merches", field: "tshirtBlack", label: "Night Club T-Shirt" })}
                  onChangeUrl={(url) => updateField("merches", "tshirtBlack", url)}
                  onReset={() => updateField("merches", "tshirtBlack", DEFAULT_SITE_PHOTOS.merches.tshirtBlack)}
                  onPreview={() => setPreviewModalImg(photos.merches.tshirtBlack)}
                />

                <PhotoCard
                  title="Classic White T-Shirt (20,000 FRW)"
                  description="Female runner active fit & cap"
                  currentSrc={photos.merches.tshirtWhite}
                  onUpload={() => triggerUpload({ section: "merches", field: "tshirtWhite", label: "Classic White T-Shirt" })}
                  onPick={() => setPickerTarget({ section: "merches", field: "tshirtWhite", label: "Classic White T-Shirt" })}
                  onChangeUrl={(url) => updateField("merches", "tshirtWhite", url)}
                  onReset={() => updateField("merches", "tshirtWhite", DEFAULT_SITE_PHOTOS.merches.tshirtWhite)}
                  onPreview={() => setPreviewModalImg(photos.merches.tshirtWhite)}
                />

                <PhotoCard
                  title="Duo Pack Edition (32,000 FRW)"
                  description="His & Hers duo runner photo"
                  currentSrc={photos.merches.duoPack}
                  onUpload={() => triggerUpload({ section: "merches", field: "duoPack", label: "Duo Pack" })}
                  onPick={() => setPickerTarget({ section: "merches", field: "duoPack", label: "Duo Pack" })}
                  onChangeUrl={(url) => updateField("merches", "duoPack", url)}
                  onReset={() => updateField("merches", "duoPack", DEFAULT_SITE_PHOTOS.merches.duoPack)}
                  onPreview={() => setPreviewModalImg(photos.merches.duoPack)}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ABOUT & COMMUNITY */}
        {activeTab === "pages" && (
          <div className="space-y-8 pt-8">
            <div className="rounded-3xl border border-white/10 bg-[#141416] p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="tech text-xs text-[#ff0000]">About Page</span>
                <h3 className="display text-2xl text-white">About Page Photos</h3>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <PhotoCard
                  title="About Hero Photo"
                  description="Displayed in top header banner"
                  currentSrc={photos.about.hero}
                  onUpload={() => triggerUpload({ section: "about", field: "hero", label: "About Hero" })}
                  onPick={() => setPickerTarget({ section: "about", field: "hero", label: "About Hero" })}
                  onChangeUrl={(url) => updateField("about", "hero", url)}
                  onReset={() => updateField("about", "hero", DEFAULT_SITE_PHOTOS.about.hero)}
                  onPreview={() => setPreviewModalImg(photos.about.hero)}
                />

                <PhotoCard
                  title="Story Photo 1"
                  description="Morning run community card"
                  currentSrc={photos.about.story1}
                  onUpload={() => triggerUpload({ section: "about", field: "story1", label: "About Story 1" })}
                  onPick={() => setPickerTarget({ section: "about", field: "story1", label: "About Story 1" })}
                  onChangeUrl={(url) => updateField("about", "story1", url)}
                  onReset={() => updateField("about", "story1", DEFAULT_SITE_PHOTOS.about.story1)}
                  onPreview={() => setPreviewModalImg(photos.about.story1)}
                />

                <PhotoCard
                  title="Story Photo 2"
                  description="Kigali landscape run moments"
                  currentSrc={photos.about.story2}
                  onUpload={() => triggerUpload({ section: "about", field: "story2", label: "About Story 2" })}
                  onPick={() => setPickerTarget({ section: "about", field: "story2", label: "About Story 2" })}
                  onChangeUrl={(url) => updateField("about", "story2", url)}
                  onReset={() => updateField("about", "story2", DEFAULT_SITE_PHOTOS.about.story2)}
                  onPreview={() => setPreviewModalImg(photos.about.story2)}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#141416] p-6 sm:p-8 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="tech text-xs text-[#ff0000]">Community Page</span>
                <h3 className="display text-2xl text-white">Guide &amp; Community Photos</h3>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <PhotoCard
                  title="Community Hero Photo"
                  description="Top hero banner on /community"
                  currentSrc={photos.community.hero}
                  onUpload={() => triggerUpload({ section: "community", field: "hero", label: "Community Hero" })}
                  onPick={() => setPickerTarget({ section: "community", field: "hero", label: "Community Hero" })}
                  onChangeUrl={(url) => updateField("community", "hero", url)}
                  onReset={() => updateField("community", "hero", DEFAULT_SITE_PHOTOS.community.hero)}
                  onPreview={() => setPreviewModalImg(photos.community.hero)}
                />

                <PhotoCard
                  title="Community Moment 1"
                  description="Social coffee & meetup photo"
                  currentSrc={photos.community.moment1}
                  onUpload={() => triggerUpload({ section: "community", field: "moment1", label: "Community Moment 1" })}
                  onPick={() => setPickerTarget({ section: "community", field: "moment1", label: "Community Moment 1" })}
                  onChangeUrl={(url) => updateField("community", "moment1", url)}
                  onReset={() => updateField("community", "moment1", DEFAULT_SITE_PHOTOS.community.moment1)}
                  onPreview={() => setPreviewModalImg(photos.community.moment1)}
                />

                <PhotoCard
                  title="Community Moment 2"
                  description="Group running moment"
                  currentSrc={photos.community.moment2}
                  onUpload={() => triggerUpload({ section: "community", field: "moment2", label: "Community Moment 2" })}
                  onPick={() => setPickerTarget({ section: "community", field: "moment2", label: "Community Moment 2" })}
                  onChangeUrl={(url) => updateField("community", "moment2", url)}
                  onReset={() => updateField("community", "moment2", DEFAULT_SITE_PHOTOS.community.moment2)}
                  onPreview={() => setPreviewModalImg(photos.community.moment2)}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: MEDIA LIBRARY */}
        {activeTab === "library" && (
          <div className="space-y-6 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-3 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={librarySearch}
                  onChange={(e) => setLibrarySearch(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/60 pl-10 pr-4 py-2.5 text-xs text-white focus:border-[#ff0000] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto w-full sm:w-auto">
                {["all", "Merches & Apparel", "Crew & Ticker", "Community Runs"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setLibraryCategory(cat)}
                    className={`tech shrink-0 px-3.5 py-1.5 rounded-lg text-xs cursor-pointer ${
                      libraryCategory === cat
                        ? "bg-white text-black font-bold"
                        : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {cat === "all" ? "All Media" : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {mediaCatalog
                .filter((item) => {
                  const matchCat = libraryCategory === "all" || item.category === libraryCategory;
                  const matchSearch =
                    !librarySearch ||
                    item.name.toLowerCase().includes(librarySearch.toLowerCase()) ||
                    item.category.toLowerCase().includes(librarySearch.toLowerCase());
                  return matchCat && matchSearch;
                })
                .map((item) => (
                  <div
                    key={item.id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141416] p-2.5 transition-all hover:border-[#ff0000]/60 hover:shadow-lg"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-black">
                      <img src={item.path} alt={item.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <button
                        type="button"
                        onClick={() => setPreviewModalImg(item.path)}
                        className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
                        title="Enlarge"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="mt-2 space-y-1 px-1">
                      <p className="tech text-[0.65rem] text-[#ff0000] truncate">{item.category}</p>
                      <p className="text-xs font-semibold text-white truncate" title={item.name}>{item.name}</p>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(item.path);
                          showToast(`Copied path ${item.path} to clipboard!`);
                        }}
                        className="text-[0.65rem] text-white/50 hover:text-white pt-1 block cursor-pointer"
                      >
                        Copy Path
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* MEDIA PICKER MODAL */}
      {pickerTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-4xl max-h-[88vh] flex flex-col rounded-3xl border border-white/15 bg-[#141416] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <span className="tech text-xs text-[#ff0000]">Assign Media</span>
                <h3 className="text-lg font-bold text-white">
                  Choose Photo for: <span className="text-[#ff0000]">{pickerTarget.label}</span>
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPickerTarget(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4">
              <input
                type="text"
                placeholder="Search media library..."
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                className="w-full max-w-sm rounded-xl border border-white/15 bg-black/60 px-4 py-2 text-xs text-white focus:border-[#ff0000] focus:outline-none"
              />
              <span className="tech text-xs text-white/50">{mediaCatalog.length} photos available</span>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {mediaCatalog
                  .filter((item) => !librarySearch || item.name.toLowerCase().includes(librarySearch.toLowerCase()))
                  .map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectFromLibrary(item.path)}
                      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-black p-2 text-left hover:border-[#ff0000] hover:ring-2 hover:ring-[#ff0000]/30 transition-all cursor-pointer"
                    >
                      <div className="aspect-square w-full overflow-hidden rounded-lg">
                        <img src={item.path} alt={item.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                      </div>
                      <p className="mt-1.5 tech text-[0.65rem] text-[#ff0000] truncate">{item.category}</p>
                      <p className="text-[0.7rem] font-medium text-white truncate">{item.name}</p>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN PREVIEW LIGHTBOX */}
      {previewModalImg && (
        <div
          onClick={() => setPreviewModalImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md cursor-pointer animate-in fade-in"
        >
          <div className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <img src={previewModalImg} alt="Preview" className="max-h-[85vh] w-auto object-contain" />
            <button
              type="button"
              onClick={() => setPreviewModalImg(null)}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white hover:bg-black cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

/* ------------------- PHOTO CARD COMPONENT ------------------- */
interface PhotoCardProps {
  title: string;
  description: string;
  currentSrc: string;
  onUpload: () => void;
  onPick: () => void;
  onChangeUrl: (newUrl: string) => void;
  onReset: () => void;
  onPreview: () => void;
}

function PhotoCard({
  title,
  description,
  currentSrc,
  onUpload,
  onPick,
  onChangeUrl,
  onReset,
  onPreview,
}: PhotoCardProps) {
  const isCustom = currentSrc.startsWith("data:") || currentSrc.startsWith("http");

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-5 space-y-4 hover:border-white/20 transition-all">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">{title}</h4>
          {isCustom ? (
            <span className="tech text-[0.6rem] bg-[#ff0000]/10 text-[#ff0000] border border-[#ff0000]/30 px-2 py-0.5 rounded-full">
              Custom Asset
            </span>
          ) : (
            <span className="tech text-[0.6rem] bg-white/10 text-white/70 px-2 py-0.5 rounded-full">
              Stock Asset
            </span>
          )}
        </div>
        <p className="text-xs text-white/50">{description}</p>
      </div>

      {/* Preview Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900 border border-white/10 group">
        <img
          src={currentSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        <button
          type="button"
          onClick={onPreview}
          className="absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-lg bg-black/80 backdrop-blur-md px-2.5 py-1.5 text-[0.65rem] font-medium text-white hover:bg-black transition-colors cursor-pointer"
        >
          <Eye className="h-3 w-3" />
          <span>Zoom</span>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2.5 pt-1">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onUpload}
            className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#ff0000] px-3 py-2 text-xs font-semibold text-white hover:bg-[#cc0000] transition-colors"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload Photo</span>
          </button>

          <button
            type="button"
            onClick={onPick}
            className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
          >
            <ImageIcon className="h-3.5 w-3.5" />
            <span>Media Library</span>
          </button>
        </div>

        {/* URL Input & Reset Button */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={currentSrc.startsWith("data:") ? "(Uploaded local image data)" : currentSrc}
            onChange={(e) => onChangeUrl(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-1.5 text-[0.7rem] text-white/70 focus:border-[#ff0000] focus:outline-none truncate"
            placeholder="/photos/..."
          />
          <button
            type="button"
            onClick={onReset}
            title="Reset to default photo"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
