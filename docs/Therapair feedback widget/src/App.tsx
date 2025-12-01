import { useState } from "react";
import { FeedbackCTA } from "./components/feedback-cta";
import { FeedbackModal } from "./components/feedback-modal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ctaPosition, setCtaPosition] = useState<"br" | "bl">(
    "br",
  );
  const [ratingStyle, setRatingStyle] = useState<
    "star" | "emoji"
  >("star");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-[#E5E7EB] bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-[#1F2937]">
            Therapair Feedback Widget System
          </h1>
          <p className="text-[#6B7280] mt-1">
            Interactive component showcase with variants and
            states
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Design Tokens Section */}
        <section className="mb-16">
          <h2 className="text-[#1F2937] mb-6">Design Tokens</h2>

          {/* Color Tokens */}
          <div className="mb-8">
            <h3 className="text-[#1F2937] mb-4">
              Color Variables
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                {
                  name: "Primary",
                  value: "#3A6EA5",
                  var: "--tp-primary",
                },
                {
                  name: "Accent",
                  value: "#6F4A8E",
                  var: "--tp-accent",
                },
                {
                  name: "Background",
                  value: "#FFFFFF",
                  var: "--tp-bg",
                },
                {
                  name: "Surface",
                  value: "#F7F9FB",
                  var: "--tp-surface",
                },
                {
                  name: "Text",
                  value: "#1F2937",
                  var: "--tp-text",
                },
                {
                  name: "Muted",
                  value: "#6B7280",
                  var: "--tp-muted",
                },
                {
                  name: "Border",
                  value: "#E5E7EB",
                  var: "--tp-border",
                },
              ].map((token) => (
                <div key={token.name} className="space-y-2">
                  <div
                    className="h-20 rounded-lg border border-[#E5E7EB]"
                    style={{ backgroundColor: token.value }}
                  />
                  <p className="text-sm text-[#1F2937]">
                    {token.name}
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    {token.value}
                  </p>
                  <code className="text-xs text-[#3A6EA5] block">
                    {token.var}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Spacing Tokens */}
          <div className="mb-8">
            <h3 className="text-[#1F2937] mb-4">
              Spacing Scale
            </h3>
            <div className="space-y-2">
              {[
                { name: "XXS", value: "4px", pixels: 4 },
                { name: "XS", value: "8px", pixels: 8 },
                { name: "SM", value: "12px", pixels: 12 },
                { name: "MD", value: "16px", pixels: 16 },
                { name: "LG", value: "20px", pixels: 20 },
              ].map((token) => (
                <div
                  key={token.name}
                  className="flex items-center gap-4"
                >
                  <span className="text-sm text-[#1F2937] w-16">
                    {token.name}
                  </span>
                  <div
                    className="h-8 bg-[#3A6EA5]/20 rounded"
                    style={{ width: `${token.pixels}px` }}
                  />
                  <span className="text-xs text-[#6B7280]">
                    {token.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Tokens */}
          <div>
            <h3 className="text-[#1F2937] mb-4">
              Typography Scale
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-[#6B7280]">
                  SM · 14/20
                </span>
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                  }}
                  className="text-[#1F2937]"
                >
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
              <div>
                <span className="text-sm text-[#6B7280]">
                  MD · 16/24
                </span>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "24px",
                  }}
                  className="text-[#1F2937]"
                >
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
              <div>
                <span className="text-sm text-[#6B7280]">
                  LG · 18/28
                </span>
                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: "28px",
                  }}
                  className="text-[#1F2937]"
                >
                  The quick brown fox jumps over the lazy dog
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section className="mb-16">
          <h2 className="text-[#1F2937] mb-6">
            Component Library
          </h2>

          {/* Controls */}
          <div className="mb-8 p-6 bg-[#F7F9FB] rounded-[14px] border border-[#E5E7EB]">
            <h3 className="text-[#1F2937] mb-4">
              Interactive Controls
            </h3>
            <div className="flex flex-wrap gap-6">
              <div>
                <label className="block text-sm text-[#1F2937] mb-2">
                  CTA Position
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCtaPosition("br")}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      ctaPosition === "br"
                        ? "bg-[#3A6EA5] text-white"
                        : "bg-white text-[#1F2937] border border-[#E5E7EB]"
                    }`}
                  >
                    Bottom Right
                  </button>
                  <button
                    onClick={() => setCtaPosition("bl")}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      ctaPosition === "bl"
                        ? "bg-[#3A6EA5] text-white"
                        : "bg-white text-[#1F2937] border border-[#E5E7EB]"
                    }`}
                  >
                    Bottom Left
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#1F2937] mb-2">
                  Rating Style
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setRatingStyle("star")}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      ratingStyle === "star"
                        ? "bg-[#3A6EA5] text-white"
                        : "bg-white text-[#1F2937] border border-[#E5E7EB]"
                    }`}
                  >
                    ⭐ Stars
                  </button>
                  <button
                    onClick={() => setRatingStyle("emoji")}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      ratingStyle === "emoji"
                        ? "bg-[#3A6EA5] text-white"
                        : "bg-white text-[#1F2937] border border-[#E5E7EB]"
                    }`}
                  >
                    😊 Emoji
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="space-y-8">
            {/* Desktop Example */}
            <div>
              <h3 className="text-[#1F2937] mb-4">
                Desktop Example (1440px)
              </h3>
              <div className="relative w-full h-[600px] bg-gradient-to-br from-[#F7F9FB] to-white rounded-[14px] border border-[#E5E7EB] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-[64px] mb-4">💬</div>
                    <p className="text-[#6B7280]">
                      This is your main application content
                    </p>
                    <p className="text-sm text-[#6B7280] mt-2">
                      The feedback widget appears in the{" "}
                      {ctaPosition === "br"
                        ? "bottom-right"
                        : "bottom-left"}{" "}
                      corner
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className={`absolute bottom-6 ${ctaPosition === "br" ? "right-6" : "left-6"} pointer-events-auto`}
                  >
                    <FeedbackCTA
                      position={ctaPosition}
                      onClick={() => setIsModalOpen(true)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Example */}
            <div>
              <h3 className="text-[#1F2937] mb-4">
                Mobile Example (390px)
              </h3>
              <div className="mx-auto w-full max-w-[390px]">
                <div className="relative w-full h-[600px] bg-gradient-to-br from-[#F7F9FB] to-white rounded-[14px] border border-[#E5E7EB] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="text-[48px] mb-3">💬</div>
                      <p className="text-sm text-[#6B7280]">
                        Mobile viewport
                      </p>
                      <p className="text-xs text-[#6B7280] mt-2">
                        Widget adapts to mobile with drawer
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className={`absolute bottom-4 ${ctaPosition === "br" ? "right-4" : "left-4"} pointer-events-auto`}
                    >
                      <FeedbackCTA
                        position={ctaPosition}
                        onClick={() => setIsModalOpen(true)}
                        compact
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dev Handoff Notes */}
        <section className="mb-16">
          <h2 className="text-[#1F2937] mb-6">
            Code Hints & Dev Handoff
          </h2>
          <div className="bg-[#F7F9FB] rounded-[14px] border border-[#E5E7EB] p-6 space-y-4">
            <div>
              <h3 className="text-[#1F2937] mb-2">
                Payload Fields (Backend)
              </h3>
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
                <code className="text-sm text-[#1F2937] block space-y-1">
                  <div>&#123;</div>
                  <div className="pl-4">
                    "rating":{" "}
                    <span className="text-[#3A6EA5]">
                      number
                    </span>
                    , // 1-5, required
                  </div>
                  <div className="pl-4">
                    "areas":{" "}
                    <span className="text-[#3A6EA5]">
                      string[]
                    </span>
                    , // optional multi-select
                  </div>
                  <div className="pl-4">
                    "feedback_text":{" "}
                    <span className="text-[#3A6EA5]">
                      string
                    </span>
                    , // optional free text
                  </div>
                  <div className="pl-4">
                    "page_url":{" "}
                    <span className="text-[#3A6EA5]">
                      string
                    </span>
                    , // auto-captured
                  </div>
                  <div className="pl-4">
                    "user_agent":{" "}
                    <span className="text-[#3A6EA5]">
                      string
                    </span>
                    , // auto-captured
                  </div>
                  <div className="pl-4">
                    "viewport_w":{" "}
                    <span className="text-[#3A6EA5]">
                      number
                    </span>
                    , // auto-captured
                  </div>
                  <div className="pl-4">
                    "viewport_h":{" "}
                    <span className="text-[#3A6EA5]">
                      number
                    </span>
                    , // auto-captured
                  </div>
                  <div className="pl-4">
                    "created_at":{" "}
                    <span className="text-[#3A6EA5]">
                      string
                    </span>{" "}
                    // ISO timestamp
                  </div>
                  <div>&#125;</div>
                </code>
              </div>
            </div>
            <div>
              <h3 className="text-[#1F2937] mb-2">
                CSS Variables Mapping
              </h3>
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
                <code className="text-sm text-[#1F2937] block space-y-1">
                  <div>--tp-primary: #3A6EA5;</div>
                  <div>--tp-accent: #6F4A8E;</div>
                  <div>--tp-bg: #FFFFFF;</div>
                  <div>--tp-surface: #F7F9FB;</div>
                  <div>--tp-text: #1F2937;</div>
                  <div>--tp-muted: #6B7280;</div>
                  <div>--tp-border: #E5E7EB;</div>
                  <div>--tp-radius-lg: 14px;</div>
                </code>
              </div>
            </div>
            <div>
              <h3 className="text-[#1F2937] mb-2">
                Component Layer Names
              </h3>
              <ul className="list-disc list-inside text-sm text-[#6B7280] space-y-1">
                <li>
                  <code>rating_group</code> - Rating selection
                  container
                </li>
                <li>
                  <code>chip_group</code> - Area chips container
                </li>
                <li>
                  <code>feedback_textarea</code> - Optional free
                  text input
                </li>
                <li>
                  <code>btn_submit</code> - Submit button
                  (disabled until rating selected)
                </li>
                <li>
                  <code>btn_cancel</code> - Cancel button
                </li>
                <li>
                  <code>feedback_cta</code> - Floating CTA
                  button
                </li>
                <li>
                  <code>feedback_modal</code> - Main modal
                  container
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Accessibility Checklist */}
        <section>
          <h2 className="text-[#1F2937] mb-6">
            Accessibility Checklist
          </h2>
          <div className="bg-white rounded-[14px] border border-[#E5E7EB] divide-y divide-[#E5E7EB]">
            {[
              {
                label: "CTA readable at 90-100% zoom",
                checked: true,
              },
              {
                label:
                  "All interactive states present (default, hover, focus, pressed)",
                checked: true,
              },
              {
                label:
                  "Modal fits 360w on desktop; full width drawer on mobile",
                checked: true,
              },
              {
                label:
                  "Text contrast meets WCAG AA standards (≥4.5:1)",
                checked: true,
              },
              { label: "Hit targets ≥44x44px", checked: true },
              {
                label: "Keyboard focus visible on all controls",
                checked: true,
              },
              {
                label:
                  "Submit button disabled until rating is selected",
                checked: true,
              },
              {
                label:
                  "Focus returns to CTA after modal closes",
                checked: true,
              },
              {
                label:
                  "Area chips wrap to next line on narrow viewports",
                checked: true,
              },
              {
                label: "Success state is calm and brief",
                checked: true,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4"
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center ${
                    item.checked
                      ? "bg-[#3A6EA5]"
                      : "bg-[#E5E7EB]"
                  }`}
                >
                  {item.checked && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-[#1F2937]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ratingStyle={ratingStyle}
      />

      {/* Actual floating CTA for demo */}
      <div
        className={`fixed bottom-6 ${ctaPosition === "br" ? "right-6" : "left-6"} z-50`}
      >
        <FeedbackCTA
          position={ctaPosition}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
    </div>
  );
}