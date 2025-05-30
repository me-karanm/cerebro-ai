
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface ImportCSVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => Promise<{ success: boolean; imported: number; errors: string[] }>;
}

export const ImportCSVModal = ({ isOpen, onClose, onImport }: ImportCSVModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        setError('Please select a valid CSV file');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setIsUploading(true);
    setError('');

    try {
      const result = await onImport(file);
      
      if (result.success) {
        onClose();
        setFile(null);
      } else {
        setError(result.errors.join(', '));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import CSV file');
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Import Contacts from CSV</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="text-sm font-medium text-gray-300 mb-2">CSV Format Requirements:</h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Required columns: Name, Email</li>
              <li>• Optional columns: Phone, Tags (semicolon-separated)</li>
              <li>• First row should contain column headers</li>
            </ul>
          </div>

          <div>
            <Label htmlFor="csv-file" className="text-gray-300">Select CSV File</Label>
            <div className="mt-2">
              <input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="csv-file"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 transition-colors"
              >
                <div className="text-center">
                  {file ? (
                    <>
                      <FileText className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-300">{file.name}</p>
                      <p className="text-xs text-gray-500">Click to change file</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Click to upload CSV file</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleImport}
              disabled={!file || isUploading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isUploading ? 'Importing...' : 'Import Contacts'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
