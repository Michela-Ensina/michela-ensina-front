"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileText,
  Maximize2,
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { fetchRemoteFileAsArrayBuffer } from "@/lib/student/material-media";
import { cn } from "@/lib/utils/cn";

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
  availableHeight: number;
  document: PDFDocumentProxy;
  fitMode: PdfFitMode;
  isPageMode?: boolean;
  maxPageWidth: number;
  pageNumber: number;
  zoom: number;
};

type PdfFitMode = "page" | "width";

const PDF_DEFAULT_ZOOM = 1;
const PDF_MIN_ZOOM = 0.85;
const PDF_MAX_ZOOM = 1.5;
const PDF_ZOOM_STEP = 0.1;

function clampPdfZoom(value: number) {
  return Math.min(PDF_MAX_ZOOM, Math.max(PDF_MIN_ZOOM, value));
}

function getPageCountLabel(pageCount: number) {
  return pageCount === 1 ? "1 página" : `${pageCount} páginas`;
}

function PdfCanvasPage({
  availableHeight,
  document,
  fitMode,
  isPageMode = false,
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
      const safeContainerWidth = Math.max(
        280,
        containerWidth - (isPageMode ? 12 : 16),
      );
      const safeContainerHeight = Math.max(
        420,
        availableHeight - (isPageMode ? 12 : 32),
      );
      const fitWidth = Math.min(safeContainerWidth, maxPageWidth);
      const widthScale = fitWidth / baseViewport.width;
      const pageScale = Math.min(
        widthScale,
        safeContainerHeight / baseViewport.height,
      );
      const cssScale = (fitMode === "page" ? pageScale : widthScale) * zoom;
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
  }, [
    availableHeight,
    containerWidth,
    document,
    fitMode,
    isPageMode,
    maxPageWidth,
    pageNumber,
    zoom,
  ]);

  return (
    <div
      ref={containerRef}
      className={
        isPageMode
          ? "mx-auto flex w-full max-w-[980px] justify-center"
          : "mx-auto flex w-full max-w-[1180px] justify-center"
      }
    >
      <canvas
        ref={canvasRef}
        aria-label={`Página ${pageNumber}`}
        className="shrink-0 rounded-[var(--radius-sm)] bg-white shadow-[var(--shadow-sm)]"
      />
    </div>
  );
}

type PdfThumbnailProps = {
  document: PDFDocumentProxy;
  isActive: boolean;
  pageNumber: number;
  onSelect: (pageNumber: number) => void;
};

function PdfThumbnail({
  document,
  isActive,
  pageNumber,
  onSelect,
}: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isCancelled = false;
    let renderTask: RenderTask | null = null;

    async function renderThumbnail() {
      const page = await document.getPage(pageNumber);
      if (isCancelled) return;

      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;

      const context = currentCanvas.getContext("2d");
      if (!context) return;

      const baseViewport = page.getViewport({ scale: 1 });
      const scale = 84 / baseViewport.width;
      const outputScale = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({ scale: scale * outputScale });

      currentCanvas.width = Math.floor(viewport.width);
      currentCanvas.height = Math.floor(viewport.height);
      currentCanvas.style.width = `${Math.floor(baseViewport.width * scale)}px`;
      currentCanvas.style.height = `${Math.floor(baseViewport.height * scale)}px`;

      renderTask = page.render({
        canvas: currentCanvas,
        canvasContext: context,
        viewport,
      });
      await renderTask.promise;
    }

    void renderThumbnail();

    return () => {
      isCancelled = true;
      renderTask?.cancel();
    };
  }, [document, pageNumber]);

  return (
    <button
      type="button"
      onClick={() => onSelect(pageNumber)}
      className="group flex w-full flex-col items-center gap-2 rounded-[var(--radius-sm)] px-2 py-2 text-center"
      aria-current={isActive ? "page" : undefined}
    >
      <span
        className="overflow-hidden rounded-[10px] border shadow-[0_12px_30px_rgb(10_5_20_/_0.08)] transition-transform duration-200 group-hover:-translate-y-0.5"
        style={{
          borderColor: isActive ? "var(--color-secondary)" : "var(--color-border)",
        }}
      >
        <canvas ref={canvasRef} className="block bg-white" aria-hidden="true" />
      </span>
      <span
        className="text-[11px] font-semibold"
        style={{
          color: isActive ? "var(--color-secondary)" : "var(--color-text-muted)",
        }}
      >
        {pageNumber}
      </span>
    </button>
  );
}

export function PdfMaterialViewer({
  title,
  url,
  isTheaterMode = false,
  token,
}: PdfMaterialViewerProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [loadState, setLoadState] = useState<PdfLoadState>({
    status: "loading",
    document: null,
    pageCount: 0,
    message: null,
  });
  const [fitMode, setFitMode] = useState<PdfFitMode>("width");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewerHeight, setViewerHeight] = useState(0);
  const [zoom, setZoom] = useState(PDF_DEFAULT_ZOOM);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (!scrollArea) return;

    const updateHeight = () => setViewerHeight(scrollArea.clientHeight);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(scrollArea);

    return () => observer.disconnect();
  }, []);

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
        setCurrentPage(1);
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

  const pageMaxWidth = isTheaterMode ? 1440 : 1280;
  const zoomPercent = Math.round(zoom * 100);
  const isPageMode = fitMode === "page";
  const pageNumbers = isPageMode
    ? [currentPage]
    : Array.from({ length: loadState.pageCount }, (_, index) => index + 1);

  return (
    <div
      aria-label={title}
      className={
        isTheaterMode
          ? "flex h-[calc(100vh-5.5rem)] min-h-[760px] flex-col overflow-hidden bg-[rgb(18_10_31)]"
          : "flex h-[min(92vh,1080px)] min-h-[720px] flex-col overflow-hidden bg-[var(--color-surface)]"
      }
      onContextMenu={(event) => event.preventDefault()}
      role="region"
    >
      <div className="z-10 flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 shadow-[0_10px_24px_rgb(13_7_24_/_0.18)] sm:px-5">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--color-text)]">
            Visualização do PDF
          </p>
          <p className="student-muted-text text-xs">
            {isPageMode
              ? `Página ${currentPage} de ${loadState.pageCount}`
              : getPageCountLabel(loadState.pageCount)}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold text-[var(--color-text)]">
            {isPageMode
              ? `${currentPage}/${loadState.pageCount}`
              : `${loadState.pageCount} páginas`}
          </span>
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
            aria-pressed={isPageMode}
            className="gap-2"
            onClick={() =>
              setFitMode((current) => (current === "page" ? "width" : "page"))
            }
            size="sm"
            title={isPageMode ? "Ler preenchendo a largura" : "Ver página inteira"}
            type="button"
            variant="outline"
          >
            {isPageMode ? (
              <Maximize2 size={16} aria-hidden="true" />
            ) : (
              <Minimize2 size={16} aria-hidden="true" />
            )}
            {isPageMode ? "Preencher largura" : "Página inteira"}
          </Button>
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
            onClick={() => {
              setFitMode("page");
              setZoom(PDF_DEFAULT_ZOOM);
            }}
            size="sm"
            title="Voltar para página inteira"
            type="button"
            variant="outline"
          >
            <RotateCcw size={16} aria-hidden="true" />
            Ajustar página
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex flex-1 overflow-hidden">
        {isPageMode && loadState.pageCount > 1 ? (
          <aside
            className="hidden w-[108px] shrink-0 overflow-y-auto border-r px-2 py-3 md:block"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor:
                "color-mix(in oklab, var(--color-surface-soft) 48%, var(--color-surface))",
            }}
          >
            <div className="flex flex-col gap-2">
              {Array.from({ length: loadState.pageCount }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <PdfThumbnail
                    key={pageNumber}
                    document={loadState.document}
                    isActive={currentPage === pageNumber}
                    pageNumber={pageNumber}
                    onSelect={setCurrentPage}
                  />
                ),
              )}
            </div>
          </aside>
        ) : null}

        <div
          ref={scrollAreaRef}
          className={cn(
            "min-h-0 flex-1 overflow-auto",
            isPageMode
              ? "bg-[color-mix(in_oklab,var(--color-surface-soft)_52%,var(--color-background))] p-3 sm:p-4"
              : "bg-[var(--color-surface)] p-2 sm:p-3",
          )}
        >
          <div className="mx-auto grid w-full gap-5">
            {pageNumbers.map((pageNumber) => (
              <PdfCanvasPage
                key={pageNumber}
                availableHeight={viewerHeight}
                document={loadState.document}
                fitMode={fitMode}
                isPageMode={isPageMode}
                maxPageWidth={pageMaxWidth}
                pageNumber={pageNumber}
                zoom={zoom}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
