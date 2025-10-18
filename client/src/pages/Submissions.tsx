import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, FileText, ExternalLink, Loader2 } from "lucide-react";
import { SubmitPaperDialog } from "@/components/SubmitPaperDialog";
import { useSubmissions } from "@/hooks/useApi";

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
    case "under review":
      return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Under Review</Badge>;
    case "completed":
    case "certified":
      return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Completed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function Submissions() {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: submissions, isLoading, error } = useSubmissions();

  const filteredSubmissions = submissions?.filter(
    (sub) =>
      sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.author.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-destructive">Failed to load submissions</p>
          <p className="text-sm text-muted-foreground mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-display font-bold tracking-tight">Submissions</h2>
          <p className="text-muted-foreground mt-2">Manage and track your research submissions</p>
        </div>
        <Button onClick={() => setIsSubmitDialogOpen(true)} size="lg" className="gradient-primary hover:shadow-lg hover:shadow-primary/25 transition-all">
          Submit Paper
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search submissions by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-11 h-12 glass glass-dark border-border/50 focus:border-primary/50 transition-all"
        />
      </div>

      {/* Submissions List */}
      <div className="grid gap-4">
        {filteredSubmissions.length > 0 ? filteredSubmissions.map((submission) => (
          <Card key={submission.id} className="glass glass-dark border-border/50 hover-lift">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-display">{submission.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">{submission.author}</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(submission.status)}
                  {submission.score && (
                    <Badge className="gradient-primary font-display font-bold text-lg px-4 py-1">
                      {submission.score}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{submission.abstract}</p>
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Submitted: {formatDate(submission.dateSubmitted)}</span>
                  <span className="font-mono text-xs">IPFS: {submission.ipfs_cid}</span>
                </div>
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 transition-all">
                  View Details
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="text-center py-12">
            <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No submissions found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 'No submissions match your search criteria.' : "You haven't submitted any papers yet."}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsSubmitDialogOpen(true)} className="gradient-primary hover:shadow-lg hover:shadow-primary/25 transition-all">
                Submit Your First Paper
              </Button>
            )}
          </div>
        )}
      </div>

      <SubmitPaperDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen} />
    </div>
  );
}
