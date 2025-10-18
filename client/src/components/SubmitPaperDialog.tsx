import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Code, Database } from "lucide-react";
import { toast } from "sonner";
import { useSubmitPaper } from "@/hooks/useApi";

interface SubmitPaperDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubmitPaperDialog({ open, onOpenChange }: SubmitPaperDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    abstract: '',
    file: null as File | null
  });
  
  const submitPaperMutation = useSubmitPaper();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file) {
      toast.error("Please select a PDF file to upload");
      return;
    }

    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('abstract', formData.abstract);
    data.append('file', formData.file);

    try {
      await submitPaperMutation.mutateAsync(data);
      setFormData({ title: '', author: '', abstract: '', file: null });
      onOpenChange(false);
    } catch (error) {
      // Error handling is done in the mutation
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Submit Research Paper</DialogTitle>
          <DialogDescription>
            Upload your research paper, code, and datasets for AI-powered evaluation and on-chain verification.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Paper Title *</Label>
            <Input
              id="title"
              placeholder="Enter your research title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Authors *</Label>
            <Input
              id="author"
              placeholder="Dr. Jane Smith, Prof. John Doe"
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="abstract">Abstract *</Label>
            <Textarea
              id="abstract"
              placeholder="Provide a brief summary of your research..."
              className="min-h-[100px]"
              value={formData.abstract}
              onChange={(e) => setFormData(prev => ({ ...prev, abstract: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paper">Paper PDF *</Label>
            <div 
              className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => document.getElementById('paper')?.click()}
            >
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <FileText className="h-8 w-8" />
                <span className="text-sm">
                  {formData.file ? formData.file.name : 'Click to upload or drag and drop'}
                </span>
                <span className="text-xs">PDF (max. 50MB)</span>
              </div>
              <Input
                id="paper"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitPaperMutation.isPending}
              className="flex-1"
            >
              {submitPaperMutation.isPending ? (
                "Submitting..."
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Submit for Review
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
