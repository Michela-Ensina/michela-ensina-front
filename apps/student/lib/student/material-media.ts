import type { Material, MaterialAttachment } from "@/types/student";

type ObjectUrlResult = {
  objectUrl: string;
  revoke: () => void;
};

export function resolveYoutubeEmbedUrl(rawUrl: string): string | null {
  try {
    const parsed = new URL(rawUrl);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        const videoId = parsed.searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      const pathParts = parsed.pathname.split("/").filter(Boolean);
      const supportedPrefixes = new Set(["embed", "shorts", "live"]);
      if (supportedPrefixes.has(pathParts[0]) && pathParts[1]) {
        return `https://www.youtube.com/embed/${pathParts[1]}`;
      }
    }

    if (host === "youtu.be") {
      const videoId = parsed.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
  } catch {
    return null;
  }

  return null;
}

export function getPrimaryMaterialFile(material: Material): MaterialAttachment | null {
  const attachments = material.attachments ?? [];

  if (material.type === "pdf") {
    return attachments.find((attachment) => attachment.type === "pdf") ?? null;
  }

  if (material.type === "attachment") {
    return attachments[0] ?? null;
  }

  return null;
}

export function getMaterialFileUrl(material: Material): string {
  return getPrimaryMaterialFile(material)?.url ?? material.url;
}

export async function createObjectUrlFromRemoteFile(
  url: string,
  signal?: AbortSignal,
): Promise<ObjectUrlResult> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Não foi possível carregar o arquivo para visualização.");
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  return {
    objectUrl,
    revoke: () => URL.revokeObjectURL(objectUrl),
  };
}

export function formatFileSize(size?: number): string | null {
  if (!size || size <= 0) return null;

  if (size < 1024 * 1024) {
    return `${Math.round(size / 1024)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}
