import React, { Fragment, useState } from "react";
import Device from "./Device";
import { BlobProvider, DocumentProps, PDFViewer } from "@react-pdf/renderer";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { nanoid } from "nanoid";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.js",
  import.meta.url,
).toString();

type Props = {
  children: React.ReactElement<DocumentProps>;
  fileName?: string;
  isUse?: boolean;
};

export function PDFShowOnDevice(props: Props) {
  const { fileName = "Document.pdf", children, isUse = false } = props;
  const [numPages, setNumPages] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number; }) {
    setNumPages(numPages);
  }

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Fragment>
      {isUse ?
        <Device>
          {({ isMobile }) => {
            if (isMobile) {
              return (
                <div className="relative overflow-x-hidden overflow-y-auto grid place-content-center">
                  <BlobProvider document={children}>
                    {({ url, loading }) =>
                      loading ? null :
                        <Fragment>
                          <Document
                            file={url}
                            renderMode="canvas"
                            onLoadSuccess={onDocumentLoadSuccess}
                          >
                            {[...Array(numPages).keys()].map((p) => (
                              <Page width={window.innerWidth - 80} key={nanoid()} pageNumber={p + 1} />
                            ))}
                          </Document>
                          <div className="sticky bottom-0 right-0 flex justify-end">
                            <button
                              type="button"
                              onClick={() => handleDownload(url ?? "")}
                              className="btn-base btn-blue"
                            >
                              ดาวโหลดเอกสาร
                            </button>
                          </div>
                        </Fragment>
                    }
                  </BlobProvider>
                </div>
              );
            } else {
              return (
                <PDFViewer style={{ width: "100%", height: "calc(100vh - 140px)" }}>
                  {children}
                </PDFViewer>
              );
            }
          }}
        </Device>
        :
        <Fragment>{children}</Fragment>
      }
    </Fragment>
  );
} 