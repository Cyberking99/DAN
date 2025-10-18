import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, FileText, ExternalLink } from "lucide-react";
import { SubmitPaperDialog } from "@/components/SubmitPaperDialog";

const mockSubmissions = [
  {
    id: 1,
    title: "Novel Approach to Quantum Computing Error Correction",
    status: "pending",
    score: null,
    date: "2025-10-12",
    authors: "Dr. Jane Smith, Dr. Robert Chen",
    ipfsCID: "Qm...",
    description: "This paper presents a novel error correction algorithm for quantum computers.",
  },
  {
    id: 2,
    title: "Machine Learning Applications in Drug Discovery",
    status: "reviewing",
    score: 85,
    date: "2025-10-10",
    authors: "Prof. Michael Johnson",
    ipfsCID: "Qm...",
    description: "Exploring deep learning methods for predicting drug efficacy and interactions.",
  },
  {
    id: 3,
    title: "Climate Change Impact on Marine Biodiversity",
    status: "completed",
    score: 92,
    date: "2025-10-08",
    authors: "Dr. Sarah Williams, Dr. James Brown",
    ipfsCID: "Qm...",
    description: "Comprehensive analysis of climate effects on ocean ecosystems over the past decade.",
  },
  {
    id: 4,
    title: "CRISPR Gene Editing Techniques",
    status: "completed",
    score: 88,
    date: "2025-10-05",
    authors: "Dr. Emily Davis",
    ipfsCID: "Qm...",
    description: "Advanced CRISPR methodologies for precise genetic modifications.",
  },
  {
    id: 5,
    title: "Neural Network Architecture Optimization",
    status: "completed",
    score: 94,
    date: "2025-10-03",
    authors: "Dr. Alex Turner, Dr. Maria Garcia",
    ipfsCID: "Qm...",
    description: "Novel approaches to optimizing neural network architectures for efficiency.",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
    case "reviewing":
      return <Badge variant="outline" className="bg-info/10 text-info border-info/20">Reviewing</Badge>;
    case "completed":
      return <Badge variant="outline" className="bg-success/10 text-success border-success/20">Completed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function Submissions() {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubmissions = mockSubmissions.filter(
    (sub) =>
      sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.authors.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        {filteredSubmissions.map((submission) => (
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
                  <CardDescription className="text-sm">{submission.authors}</CardDescription>
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
              <p className="text-sm text-muted-foreground leading-relaxed">{submission.description}</p>
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Submitted: {submission.date}</span>
                  <span className="font-mono text-xs">IPFS: {submission.ipfsCID}</span>
                </div>
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 transition-all">
                  View Details
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <SubmitPaperDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen} />
    </div>
  );
}
