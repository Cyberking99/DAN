import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, Clock, Award } from "lucide-react";
import { useState } from "react";
import { SubmitPaperDialog } from "@/components/SubmitPaperDialog";

const mockSubmissions = [
  {
    id: 1,
    title: "Novel Approach to Quantum Computing Error Correction",
    status: "pending",
    score: null,
    date: "2025-10-12",
  },
  {
    id: 2,
    title: "Machine Learning Applications in Drug Discovery",
    status: "reviewing",
    score: 85,
    date: "2025-10-10",
  },
  {
    id: 3,
    title: "Climate Change Impact on Marine Biodiversity",
    status: "completed",
    score: 92,
    date: "2025-10-08",
  },
];

const mockReviews = [
  {
    id: 1,
    title: "CRISPR Gene Editing Techniques",
    score: 88,
    summary: "Comprehensive methodology with reproducible results. Strong statistical analysis.",
  },
  {
    id: 2,
    title: "Neural Network Architecture Optimization",
    score: 94,
    summary: "Innovative approach with excellent reproducibility. Code and datasets well documented.",
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

export default function Dashboard() {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-display font-bold tracking-tight mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your research submissions and activity</p>
        </div>
        <Button onClick={() => setIsSubmitDialogOpen(true)} size="lg" className="gradient-primary hover:shadow-lg hover:shadow-primary/25 transition-all">
          Submit Paper
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass glass-dark border-border/50 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">+3 from last month</p>
          </CardContent>
        </Card>

        <Card className="glass glass-dark border-border/50 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <div className="p-2 rounded-lg bg-info/10">
              <Clock className="h-4 w-4 text-info" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">AI agents processing</p>
          </CardContent>
        </Card>

        <Card className="glass glass-dark border-border/50 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <div className="p-2 rounded-lg bg-success/10">
              <CheckCircle className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold">16</div>
            <p className="text-xs text-muted-foreground mt-1">Average score: 87</p>
          </CardContent>
        </Card>

        <Card className="glass glass-dark border-border/50 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <div className="p-2 rounded-lg bg-accent/10">
              <Award className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">NFTs minted</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Submissions */}
      <Card className="glass glass-dark border-border/50">
        <CardHeader>
          <CardTitle className="font-display">Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground border-b border-border/50 pb-3">
              <div className="col-span-5">Title</div>
              <div className="col-span-3">Status</div>
              <div className="col-span-2">Score</div>
              <div className="col-span-2">Date</div>
            </div>
            {mockSubmissions.map((submission) => (
              <div key={submission.id} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-border/50 last:border-0 hover:bg-primary/5 rounded-lg px-2 -mx-2 transition-all">
                <div className="col-span-5 font-medium">{submission.title}</div>
                <div className="col-span-3">{getStatusBadge(submission.status)}</div>
                <div className="col-span-2">
                  {submission.score ? (
                    <span className="font-display font-bold text-primary">{submission.score}</span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </div>
                <div className="col-span-2 text-muted-foreground text-sm">{submission.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      <div>
        <h3 className="text-2xl font-display font-bold tracking-tight mb-4">Recent Reviews</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {mockReviews.map((review) => (
            <Card key={review.id} className="glass glass-dark border-border/50 hover-lift">
              <CardHeader>
                <CardTitle className="text-lg font-display">{review.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">{review.summary}</p>
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-sm font-medium">Score:</span>
                  <Badge className="gradient-primary font-display font-bold text-base px-3 py-1">{review.score}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <SubmitPaperDialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen} />
    </div>
  );
}
