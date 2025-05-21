import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const generatePalette = (count = 6) => {
  return Array.from({ length: count }, () => generateRandomColor());
};

const rgbToHex = (rgb) => {
  const [r, g, b] = rgb
    .match(/\d+/g)
    .map((val) => parseInt(val).toString(16).padStart(2, "0"));
  return `#${r}${g}${b}`;
};

const fallbackCopyToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("execCommand copy failed", err);
  }
  document.body.removeChild(textArea);
};

const ColorBox = ({ color }) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const hexColor = rgbToHex(color);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(hexColor);
      } else {
        fallbackCopyToClipboard(hexColor);
      }
      setCopied(true);
      setError(null);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setError("Kopyalama başarısız.");
      console.error("Kopyalama başarısız:", err);
    }
  };

  return (
    <motion.div
      className="relative rounded-2xl w-28 h-28 cursor-pointer shadow-md group"
      style={{ backgroundColor: color }}
      whileHover={{ scale: 1.05 }}
      onClick={handleCopy}
    >
      <div className="absolute bottom-2 right-2 bg-white/80 text-black text-xs px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? "Kopyalandı!" : error || hexColor}
      </div>
    </motion.div>
  );
};

const VibePalette = () => {
  const [palette, setPalette] = useState(generatePalette());

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center gap-8 p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {palette.map((color, idx) => (
          <ColorBox key={idx} color={color} />
        ))}
      </div>
      <Button onClick={() => setPalette(generatePalette())}>
        Generate
      </Button>
	  <p className="text-xs text-neutral-600 dark:text-neutral-400 opacity-60 mt-8">
  created by TF
      </p>
    </div>
  );
};

export default VibePalette;
