'use client';

import React, { useState, useRef } from 'react';
import styles from './EvaluationForm.module.css';
import { Send, Loader2, Upload, FileText, X, CheckCircle } from 'lucide-react';

const EvaluationForm = ({ onEvaluate, isLoading }) => {
  const [formData, setFormData] = useState({
    idea: '',
    targetMarket: '',
    businessModel: '',
    founderBackground: '',
    stage: 'idea'
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractError, setExtractError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = async (file) => {
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ];
    const allowedExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const ext = '.' + file.name.split('.').pop().toLowerCase();

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(ext)) {
      setExtractError('Please upload a PDF, DOCX, or TXT file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setExtractError('File size must be under 10MB.');
      return;
    }

    setUploadedFile(file);
    setExtractError('');
    setIsExtracting(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const response = await fetch('/api/extract', {
        method: 'POST',
        body: formDataUpload,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to extract text');
      }

      setExtractedText(result.text);

      // Auto-fill the idea field with extracted text if it's empty
      if (!formData.idea.trim()) {
        setFormData(prev => ({
          ...prev,
          idea: result.text.substring(0, 3000)
        }));
      }
    } catch (err) {
      setExtractError(err.message);
      setUploadedFile(null);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setExtractedText('');
    setExtractError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.idea.trim()) {
      // Include extracted file content in the submission
      const submissionData = {
        ...formData,
        ...(extractedText && {
          fileContent: extractedText,
          fileName: uploadedFile?.name || '',
        })
      };
      onEvaluate(submissionData);
    }
  };

  return (
    <div className={`${styles.formContainer} glass animate-fadeIn`}>
      <h2 className={styles.title}>Submit your Startup Idea</h2>
      <p className={styles.subtitle}>Our AI will analyze your vision and provide a detailed business evaluation.</p>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* File Upload Zone */}
        <div className={styles.field}>
          <label>Upload Document (Optional)</label>
          <div
            className={`${styles.dropZone} ${isDragOver ? styles.dropZoneActive : ''} ${uploadedFile ? styles.dropZoneHasFile : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !uploadedFile && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              onChange={handleFileInputChange}
              className={styles.fileInput}
              id="file-upload"
            />

            {isExtracting ? (
              <div className={styles.dropZoneContent}>
                <Loader2 className={styles.uploadSpinner} size={32} />
                <span className={styles.dropZoneText}>Extracting text from document...</span>
              </div>
            ) : uploadedFile ? (
              <div className={styles.fileAttached}>
                <div className={styles.fileInfo}>
                  <div className={styles.fileIconWrapper}>
                    <FileText size={20} />
                  </div>
                  <div className={styles.fileDetails}>
                    <span className={styles.fileName}>{uploadedFile.name}</span>
                    <span className={styles.fileMeta}>
                      {formatFileSize(uploadedFile.size)}
                      {extractedText && (
                        <> · <CheckCircle size={12} className={styles.checkIcon} /> Text extracted</>
                      )}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.removeFileBtn}
                  onClick={(e) => { e.stopPropagation(); removeFile(); }}
                  title="Remove file"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className={styles.dropZoneContent}>
                <div className={styles.uploadIconWrapper}>
                  <Upload size={24} />
                </div>
                <span className={styles.dropZoneText}>
                  Drag & drop or <span className={styles.browseLink}>browse</span>
                </span>
                <span className={styles.dropZoneHint}>PDF, DOCX, or TXT · Max 10MB</span>
              </div>
            )}
          </div>
          {extractError && (
            <span className={styles.extractError}>{extractError}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="idea">Startup Idea *</label>
          <textarea
            id="idea"
            name="idea"
            required
            placeholder="Describe your startup in a few sentences... or upload a document above to auto-fill."
            value={formData.idea}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="targetMarket">Target Market (Optional)</label>
          <input
            type="text"
            id="targetMarket"
            name="targetMarket"
            placeholder="e.g. Fintech for Gen Z, B2B SaaS for Logistics"
            value={formData.targetMarket}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="businessModel">Business Model (Optional)</label>
          <input
            type="text"
            id="businessModel"
            name="businessModel"
            placeholder="e.g. Subscription, Marketplace, Freemium"
            value={formData.businessModel}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="founderBackground">Founder Background (Optional)</label>
          <textarea
            id="founderBackground"
            name="founderBackground"
            placeholder="Describe your expertise or team background..."
            value={formData.founderBackground}
            onChange={handleChange}
            rows={2}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="stage">Current Stage</label>
          <select id="stage" name="stage" value={formData.stage} onChange={handleChange}>
            <option value="idea">Concept / Idea</option>
            <option value="mvp">MVP Ready</option>
            <option value="early-traction">Early Traction</option>
            <option value="scaling">Scaling</option>
          </select>
        </div>

        <button 
          type="submit" 
          className={styles.submitBtn}
          disabled={isLoading || !formData.idea.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className={styles.spinner} />
              Evaluating...
            </>
          ) : (
            <>
              <Send size={18} />
              Analyze Idea
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EvaluationForm;
