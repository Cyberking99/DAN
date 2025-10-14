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

interface SubmitPaperDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubmitPaperDialog({ open, onOpenChange }: SubmitPaperDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      toast.success("Paper submitted successfully!", {
        description: "Your submission is being uploaded to IPFS and will be reviewed by our AI agents.",
      });
      setIsSubmitting(false);
      onOpenChange(false);
    }, 2000);
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
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="authors">Authors *</Label>
            <Input
              id="authors"
              placeholder="Dr. Jane Smith, Prof. John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="abstract">Abstract *</Label>
            <Textarea
              id="abstract"
              placeholder="Provide a brief summary of your research..."
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paper">Paper PDF *</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <FileText className="h-8 w-8" />
                <span className="text-sm">Click to upload or drag and drop</span>
                <span className="text-xs">PDF (max. 50MB)</span>
              </div>
              <Input
                id="paper"
                type="file"
                accept=".pdf"
                className="hidden"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Code Repository (optional)</Label>
            <div className="flex gap-2">
              <div className="flex-1 border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Code className="h-5 w-5" />
                  <span className="text-sm">Upload code or provide GitHub URL</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataset">Dataset (optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Database className="h-5 w-5" />
                <span className="text-sm">Upload dataset or provide link</span>
              </div>
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
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
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
