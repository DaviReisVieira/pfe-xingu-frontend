import { Page, Text, View, Document, StyleSheet, BlobProvider } from '@react-pdf/renderer';
import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { GetServerSideProps } from 'next';

interface PDFViewerProps {
    pdfId: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ id }: any) => {
    const [pdfUrl, setPdfUrl] = useState<any>(null);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number | null>(1);

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const response = await api.get(`/download/livros/${id}`, {
                    responseType: 'blob',
                });
                console.log(response.data);

                const pdfBlob = new File([response.data], 'application/pdf');
                setPdfUrl(pdfBlob);
            } catch (error) {
                console.error('Error fetching PDF:', error);
            }
        };

        fetchPdf();
    }, [id]);



    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const goToPrevPage = () =>
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

    const goToNextPage = () =>
        setPageNumber(
            pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
        );

    return (
        <div>
            <nav>
                <button onClick={goToPrevPage}>Prev</button>
                <button onClick={goToNextPage}>Next</button>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </nav>

            <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
        </div>
    );
};

export default PDFViewer;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const id = ctx.params?.id;

    if (!id) {
        ctx.res.writeHead(404);
        ctx.res.end();
        return {
            props: {},
        };
    }

    return {
        props: {
            id,
        },
    };
};


