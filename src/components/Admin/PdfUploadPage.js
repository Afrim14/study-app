import React, { useState } from 'react';

const PdfUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert('Please select a PDF file.');
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a PDF file first.');
      return;
    }

    console.log('Uploading file:', selectedFile.name);
    alert(`Simulating upload of ${selectedFile.name}`);

    setSelectedFile(null);
    document.getElementById('pdf-upload-input').value = null;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Upload PDF</h1>

      <div className="mb-4">
        <label htmlFor="pdf-upload-input" className="block text-sm font-medium text-gray-700 mb-1">
          Select PDF File
        </label>
        <input
          id="pdf-upload-input"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        />
      </div>

      {selectedFile && (
        <div className="mb-4 text-sm">
          Selected file: {selectedFile.name}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!selectedFile}
        className="btn btn-primary disabled:opacity-50"
      >
        Upload PDF
      </button>

    </div>
  );
};

export default PdfUploadPage; 