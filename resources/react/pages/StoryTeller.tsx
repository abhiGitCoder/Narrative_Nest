import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './StoryTeller.css';

// Set PDF.js version and worker source
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.js`;

const StoryTeller = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfText, setPdfText] = useState('');
  const [isReading, setIsReading] = useState(false);
  const [selectedGender, setSelectedGender] = useState('female');
  const [error, setError] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize speech synthesis voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setIsLoading(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const typedarray = new Uint8Array(arrayBuffer);
        
        try {
          const loadingTask = pdfjs.getDocument({ data: typedarray });
          const pdf = await loadingTask.promise;
          let fullText = '';
          
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + ' ';
          }
          
          setPdfText(fullText);
          setError(null);
        } catch (pdfError) {
          console.error('PDF processing error:', pdfError);
          setError('Error processing PDF: ' + pdfError.message);
        }
      } catch (err) {
        console.error('General error:', err);
        setError('Error loading PDF: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Please select a valid PDF file');
    }
  };

  const handleSpeak = () => {
    if (!pdfText) {
      setError('Please load a PDF first');
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(pdfText);
    
    // Find appropriate voice based on selected gender
    const selectedVoice = voices.find(voice => 
      voice.name.toLowerCase().includes(selectedGender) ||
      voice.lang.startsWith('en')
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      setIsReading(false);
    };

    utterance.onerror = (event) => {
      setError('Error during speech synthesis: ' + event.error);
      setIsReading(false);
    };

    setIsReading(true);
    window.speechSynthesis.speak(utterance);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">PDF Story Teller</h2>
      </div>
      <div className="card-content">
        <div className="controls-container">
          <div className="select-container">
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="gender-select"
            >
              <option value="" disabled>Select voice gender</option>
              <option value="female">Female Voice</option>
              <option value="male">Male Voice</option>
            </select>
          </div>

          <div className="file-controls">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="file-input"
            />
            <button 
              onClick={handleSpeak}
              disabled={!pdfText || isLoading}
              className={`action-button ${isReading ? 'reading' : ''} ${!pdfText ? 'disabled' : ''}`}
            >
              {isReading ? 'Stop Reading' : 'Start Reading'}
            </button>
          </div>

          {isLoading && (
            <div className="loading-indicator">
              Loading PDF...
            </div>
          )}

          {error && (
            <div className="error-alert">
              <p>{error}</p>
            </div>
          )}

          {selectedFile && !isLoading && (
            <div className="pdf-container">
              <Document
                file={selectedFile}
                onLoadSuccess={onDocumentLoadSuccess}
                className="pdf-document"
              >
                <Page 
                  pageNumber={pageNumber} 
                  className="pdf-page"
                />
              </Document>
              {numPages && (
                <p className="page-info">
                  Page {pageNumber} of {numPages}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryTeller;