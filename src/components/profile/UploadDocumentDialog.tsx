import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface UploadDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UploadDocumentDialog = ({ open, onOpenChange }: UploadDocumentDialogProps) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      // Here you would typically make an API call to upload the document
      console.log("Uploading document...", file);
      toast({
        title: "Document uploaded",
        description: "Your identification document has been uploaded successfully.",
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white p-0 gap-0">
        <DialogHeader className="p-4 space-y-0 border-b">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary hover:text-primary-light hover:bg-primary/10"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <DialogTitle className="text-lg font-headers text-primary">Upload Document</DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="document">Identification Document</Label>
            <Input
              id="document"
              type="file"
              onChange={handleFileChange}
              className="border-gray-200"
              accept=".pdf,.jpg,.jpeg,.png"
            />
            <p className="text-sm text-gray-500">
              Accepted formats: PDF, JPG, PNG
            </p>
          </div>

          <Button 
            className="w-full bg-secondary hover:bg-secondary-light text-white mt-4"
            onClick={handleUpload}
            disabled={!file}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};