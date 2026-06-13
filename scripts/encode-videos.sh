#!/usr/bin/env bash
# Transcode the ~4K source clips into a responsive, dual-codec web set.
# Per clip: H.264 MP4 + VP9 WebM at 1920w (desktop) and 1280w (mobile),
# plus a poster JPG. Audio stripped (hero is muted), +faststart for MP4.
set -euo pipefail
cd "$(dirname "$0")/../public/videos"

clips=(clip-a clip-b clip-c)

for c in "${clips[@]}"; do
  src="$c.mp4"
  echo "==== $c ===="

  # --- H.264 MP4 (universal fallback) ---
  ffmpeg -y -i "$src" -an -c:v libx264 -profile:v high -pix_fmt yuv420p \
    -vf "scale=1920:-2" -crf 23 -preset medium -movflags +faststart \
    "$c-1080.mp4"
  ffmpeg -y -i "$src" -an -c:v libx264 -profile:v high -pix_fmt yuv420p \
    -vf "scale=1280:-2" -crf 24 -preset medium -movflags +faststart \
    "$c-720.mp4"

  # --- VP9 WebM (smaller, preferred) ---
  ffmpeg -y -i "$src" -an -c:v libvpx-vp9 -pix_fmt yuv420p \
    -vf "scale=1920:-2" -crf 31 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
    "$c-1080.webm"
  ffmpeg -y -i "$src" -an -c:v libvpx-vp9 -pix_fmt yuv420p \
    -vf "scale=1280:-2" -crf 33 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 \
    "$c-720.webm"

  # --- Poster (instant paint + slow-connection fallback) ---
  ffmpeg -y -ss 0.1 -i "$src" -frames:v 1 -vf "scale=1600:-2" -q:v 3 \
    "$c-poster.jpg"
done

echo "==== DONE ===="
ls -la *-1080.mp4 *-720.mp4 *-1080.webm *-720.webm *-poster.jpg