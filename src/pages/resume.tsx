import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import { useRouter } from 'next/router';
import StatusLayout from '@/layouts/StatusLayout';

export const getServerSideProps: GetServerSideProps = async () => {
  const PDF_URL = 'https://github.com/404Wolf/Resume/raw/master/resume.pdf';
  const pdfResponse = await fetch(PDF_URL);
  const pdfData = await pdfResponse.arrayBuffer();
  const pdfPath = path.join(process.cwd(), 'public', 'resume.pdf');
  fs.writeFileSync(pdfPath, Buffer.from(pdfData));

  return {
    props: {
      pdfPath: '/resume.pdf',
    },
  };
};

interface PDFPageProps {
  pdfPath: string;
}

const PDFPage = ({ pdfPath } : {pdfPath: string}) => {
    const router = useRouter();

    useEffect(() => {
      // Redirect the user to the PDF file URL
      router.push(pdfPath);
    }, [router, pdfPath]);

    return <StatusLayout children={"Loading resume..."} name={"Loading..."} />;
};

export default PDFPage;