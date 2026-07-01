"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { fetchRemoteFileAsArrayBuffer } from "@/lib/student/material-media";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type PdfMaterialViewerProps = {
  title: string;
  url: string;
  isTheaterMode?: boolean;
  token?: string | null;
};

type PdfLoadState =
  | { status: "loading"; document: null; pageCount: 0; message: null }
  | {
      status: "ready";
      document: PDFDocumentProxy;
      pageCount: number;
      message: null;
    }
  | { status: "error"; document: null; pageCount: 0; message: string };

type PdfCanvasPageProps = {
  document: PDFDocumentProxy;
  maxPageWidth: number;
  pageNumber: number;
  zoom: number;
};

const PDF_DEFAULT_ZOOM = 0.86;
const PDF_MIN_ZOOM = 0.7;
const PDF_MAX_ZOOM = 1.3;
const PDF_ZOOM_STEP = 0.1;

function clampPdfZoom(value: number) {
  return Math.min(PDF_MAX_ZOOM, Math.max(PDF_MIN_ZOOM, value));
}

function getPageCountLabel(pageCount: number) {
  return pageCount === 1 ? "1 página" : `${pageCount} páginas`;
}

function PdfCanvasPage({
  document,
  maxPageWidth,
  pageNumber,
  zoom,
}: PdfCanvasPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => setContainerWidth(container.clientWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || containerWidth === 0) return;

    let isCancelled = false;
    let renderTask: RenderTask | null = null;

    async function renderPage() {
      const page = await document.getPage(pageNumber);
      if (isCancelled) return;

      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;

      const baseViewport = page.getViewport({ scale: 1 });
      const safeContainerWidth = Math.max(280, containerWidth - 16);
      const fitWidth = Math.min(safeContainerWidth, maxPageWidth);
      const cssScale = (fitWidth / baseViewport.width) * zoom;
      const outputScale = window.devicePixelRatio || 1;
      const viewport = page.getViewport({ scale: cssScale * outputScale });
      const context = currentCanvas.getContext("2d");

      if (!context) return;

      currentCanvas.width = Math.floor(viewport.width);
      currentCanvas.height = Math.floor(viewport.height);
      currentCanvas.style.width = `${Math.floor(baseViewport.width * cssScale)}px`;
      currentCanvas.style.height = `${Math.floor(baseViewport.height * cssScale)}px`;

      renderTask = page.render({
        canvas: currentCanvas,
        canvasContext: context,
        viewport,
      });
      await renderTask.promise;
    }

    void renderPage();

    return () => {
      isCancelled = true;
      renderTask?.cancel();
    };
  }, [containerWidth, document, maxPageWidth, pageNumber, zoom]);

  return (
    <div ref={containerRef} className="flex min-w-full justify-center">
      <canvas
        ref={canvasRef}
        aria-label={`Página ${pageNumber}`}
        className="shrink-0 rounded-[var(--radius-sm)] bg-white shadow-[var(--shadow-sm)]"
      />
    </div>
  );
}

export function PdfMaterialViewer({
  title,
  url,
  isTheaterMode = false,
  token,
}: PdfMaterialViewerProps) {
  const [loadState, setLoadState] = useState<PdfLoadState>({
    status: "loading",
    document: null,
    pageCount: 0,
    message: null,
  });
  const [zoom, setZoom] = useState(PDF_DEFAULT_ZOOM);

  useEffect(() => {
    const controller = new AbortController();
    let pdfDocument: PDFDocumentProxy | null = null;

    fetchRemoteFileAsArrayBuffer(url, controller.signal, token)
      .then((arrayBuffer) =>
        pdfjs.getDocument({ data: new Uint8Array(arrayBuffer) }).promise,
      )
      .then((nextDocument) => {
        if (controller.signal.aborted) {
          void nextDocument.cleanup();
          return;
        }

        pdfDocument = nextDocument;
        setLoadState({
          status: "ready",
          document: nextDocument,
          pageCount: nextDocument.numPages,
          message: null,
        });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;

        setLoadState({
          status: "error",
          document: null,
          pageCount: 0,
          message:
            error instanceof Error
              ? error.message
              : "Não foi possível carregar este PDF agora.",
        });
      });

    return () => {
      controller.abort();
      void pdfDocument?.cleanup();
    };
  }, [token, url]);

  if (loadState.status === "loading") {
    return (
      <div className="grid min-h-[68vh] place-items-center bg-[var(--color-surface)] p-8">
        <div className="w-full max-w-lg space-y-4">
          <div className="mx-auto grid size-14 place-items-center rounded-[var(--radius-md)] bg-[var(--color-surface-soft)] text-[var(--color-primary)]">
            <FileText size={24} aria-hidden="true" />
          </div>
          <div className="mx-auto h-4 w-44 animate-pulse rounded-full bg-[var(--color-surface-soft)]" />
          <div className="h-2 animate-pulse rounded-full bg-[var(--color-surface-soft)]" />
          <div className="h-2 w-10/12 animate-pulse rounded-full bg-[var(--color-surface-soft)]" />
        </div>
      </div>
    );
  }

  if (loadState.status === "error") {
    return (
      <div className="grid min-h-[360px] place-items-center bg-[var(--color-surface)] p-6">
        <div className="max-w-md">
          <Alert tone="error">{loadState.message}</Alert>
        </div>
      </div>
    );
  }

  const pageMaxWidth = isTheaterMode ? 960 : 820;
  const zoomPercent = Math.round(zoom * 100);

  return (
    <div
      aria-label={title}
      className={
        isTheaterMode
          ?"max-h-[min(72vh,760px)] min-h-[520px] overflow-auto bg-[rgb(13_7_24)] p-4 sm:p-6"
          : "h-[72vh] min-h-[520px] overflow-auto bg-[var(--color-surface)] p-4 sm:p-6"
      }
      onContextMenu={(event) => event.preventDefault()}
      role="region"
    >
      <div className="sticky top-0 z-20 -mx-4 -mt-4 mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 shadow-[0_10px_24px_rgb(13_7_24_/_0.24)] sm:-mx-6 sm:-mt-6 sm:px-6">
        <div>
          <p className="text-sm font-semibold text-[var(--color-text)]">
            Visualização do PDF
          </p>
          <p className="student-muted-text text-xs">
            {getPageCountLabel(loadState.pageCount)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            aria-label="Diminuir zoom"
            disabled={zoom <= PDF_MIN_ZOOM}
            onClick={() =>
              setZoom((currentZoom) =>
                clampPdfZoom(currentZoom - PDF_ZOOM_STEP),
              )
            }
            size="icon"
            title="Diminuir zoom"
            type="button"
            variant="ghost"
          >
            <ZoomOut size={18} aria-hidden="true" />
          </Button>
          <span className="min-w-14 rounded-full border border-[var(--color-border)] px-3 py-1 text-center text-xs font-semibold text-[var(--color-text)]">
            {zoomPercent}%
          </span>
          <Button
            aria-label="Aumentar zoom"
            disabled={zoom >= PDF_MAX_ZOOM}
            onClick={() =>
              setZoom((currentZoom) =>
                clampPdfZoom(currentZoom + PDF_ZOOM_STEP),
              )
            }
            size="icon"
            title="Aumentar zoom"
            type="button"
            variant="ghost"
          >
            <ZoomIn size={18} aria-hidden="true" />
          </Button>
          <Button
            className="gap-2"
            onClick={() => setZoom(PDF_DEFAULT_ZOOM)}
            size="sm"
            title="Voltar ao ajuste padrão"
            type="button"
            variant="outline"
          >
            <RotateCcw size={16} aria-hidden="true" />
            Ajustar
          </Button>
        </div>
      </div>
      <div className="mx-auto grid w-full gap-5">
        {Array.from({ length: loadState.pageCount }, (_, index) => (
          <PdfCanvasPage
            key={index + 1}
            document={loadState.document}
            maxPageWidth={pageMaxWidth}
            pageNumber={index + 1}
            zoom={zoom}
          />
        ))}
      </div>
    </div>
  );
}
