
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CSVUpload } from '@/components/ui/csv-upload';

interface ImportCSVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => Promise<{ success: boolean; imported: number; errors: string[] }>;
}

export const ImportCSVModal = ({ isOpen, onClose, onImport }: ImportCSVModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleUpload = async (file: File) => {
    const result = await onImport(file);
    
    if (result.success) {
      onClose();
      setSelectedFile(null);
      return {
        success: true,
        message: `Successfully imported ${result.imported} contacts${result.errors.length > 0 ? ` with ${result.errors.length} warnings` : ''}`
      };
    } else {
      return {
        success: false,
        errors: result.errors
      };
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    onClose();
  };

  const csvRequirements = [
    'Required columns: Name, Email',
    'Optional columns: Phone, Tags (semicolon-separated)',
    'First row should contain column headers'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Import Contacts from CSV</DialogTitle>
        </DialogHeader>
        
        <CSVUpload
          onFileSelect={handleFileSelect}
          onUpload={handleUpload}
          requirements={csvRequirements}
          placeholder="Click to upload CSV file"
          uploadButtonText="Import Contacts"
          maxFileSize={10}
        />

        <div className="flex justify-end pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClose}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
