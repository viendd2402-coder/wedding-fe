import Image from "next/image";

/**
 * Logo raster trong `public/icons/` — đúng hình thương hiệu; có thể thay file bằng asset chính thức (brand guideline).
 * - `zalo.png`: logo app Zalo (đồng kiểu thường gặp trên web VN).
 * - `tiktok.png`: logo TikTok; nên đổi bằng bản từ TikTok for Developers / brand kit nếu cần.
 */

function brandImgClass(base?: string) {
  return [base, "object-contain select-none"].filter(Boolean).join(" ");
}

export function IconZaloBrand({ className }: { className?: string }) {
  return (
    <Image
      src="/icons/zalo.png"
      alt=""
      width={64}
      height={64}
      draggable={false}
      className={brandImgClass(className)}
    />
  );
}

export function IconTiktokBrand({ className }: { className?: string }) {
  return (
    <Image
      src="/icons/tiktok.png"
      alt=""
      width={64}
      height={64}
      draggable={false}
      className={brandImgClass(className)}
    />
  );
}
