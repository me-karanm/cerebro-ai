
import { useState, useCallback } from 'react';
import { Upload, FileText, AlertCircle, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface CSVUploadProps {
  onFileSelect: (file: File) => void;
  onUpload?: (file: File) => Promise<{ success: boolean; message?: string; errors?: string[] }>;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in MB
  requirements?: string[];
  placeholder?: string;
  uploadButtonText?: string;
  className?: string;
  disabled?: boolean;
}

export const CSVUpload = ({
  onFileSelect,
  onUpload,
  acceptedFileTypes = ['.csv'],
  maxFileSize = 5,
  requirements = ['CSV format required', 'First row should contain column headers'],
  placeholder = 'Click to upload CSV file',
  uploadButtonText = 'Upload',
  className = '',
  disabled = false
}: CSVUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const validateFile = (selectedFile: File): string | null => {
    // Check file type
    const isValidType = acceptedFileTypes.some(type => 
      selectedFile.name.toLowerCase().endsWith(type.toLowerCase())
    );
    if (!isValidType) {
      return `Invalid file type. Accepted types: ${acceptedFileTypes.join(', ')}`;
    }

    // Check file size
    const fileSizeMB = selectedFile.size / (1024 * 1024);
    if (fileSizeMB > maxFileSize) {
      return `File size too large. Maximum size: ${maxFileSize}MB`;
    }

    return null;
  };

  const handleFileChange = useCallback((selectedFile: File) => {
    setError('');
    setSuccess('');

    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      return;
    }

    setFile(selectedFile);
    onFileSelect(selectedFile);
  }, [onFileSelect, acceptedFileTypes, maxFileSize]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileChange(selectedFile);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  }, [handleFileChange]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleUpload = async () => {
    if (!file || !onUpload) return;

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const result = await onUpload(file);
      if (result.success) {
        setSuccess(result.message || 'File uploaded successfully');
        setFile(null);
      } else {
        setError(result.errors?.join(', ') || 'Upload failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setError('');
    setSuccess('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Requirements Section */}
      {requirements.length > 0 && (
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Requirements:</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            {requirements.map((requirement, index) => (
              <li key={index}>• {requirement}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Area */}
      <div className="space-y-2">
        <Label className="text-gray-300">Select File</Label>
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
            dragActive
              ? 'border-blue-400 bg-blue-950/20'
              : disabled
              ? 'border-gray-600 bg-gray-800 cursor-not-allowed'
              : 'border-gray-600 hover:border-gray-500 cursor-pointer'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept={acceptedFileTypes.join(',')}
            onChange={handleInputChange}
            disabled={disabled}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          />
          
          <div className="text-center">
            {file ? (
              <div className="space-y-2">
                <FileText className="w-8 h-8 text-green-400 mx-auto" />
                <div>
                  <p className="text-sm font-medium text-gray-300">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearFile}
                  className="text-gray-400 hover:text-red-400"
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className={`w-8 h-8 mx-auto ${disabled ? 'text-gray-600' : 'text-gray-400'}`} />
                <div>
                  <p className={`text-sm ${disabled ? 'text-gray-600' : 'text-gray-400'}`}>
                    {placeholder}
                  </p>
                  <p className="text-xs text-gray-500">
                    or drag and drop (max {maxFileSize}MB)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="flex items-start space-x-2 text-red-400 bg-red-900/20 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-start space-x-2 text-green-400 bg-green-900/20 p-3 rounded-lg">
          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm">{success}</span>
        </div>
      )}

      {/* Upload Button */}
      {onUpload && file && (
        <Button
          onClick={handleUpload}
          disabled={!file || uploading || disabled}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          {uploading ? 'Uploading...' : uploadButtonText}
        </Button>
      )}
    </div>
  );
};
