import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PdfReader = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

PdfReader.propTypes = {
  onFileUpload: PropTypes.func.isRequired, // Define the expected type for onFileUpload
};

export default PdfReader;
