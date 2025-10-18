import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";

const mockReviews = [
  {
    id: 1,
    title: "CRISPR Gene Editing Techniques",
    score: 88,
    methodology: 90,
    novelty: 85,
    clarity: 89,
    reproducibility: 87,
    summary: "Comprehensive methodology with reproducible results. Strong statistical analysis and clear documentation.",
    agentReviewer: "ReviewerAgent-001",
    timestamp: "2025-10-05 14:32",
  },
  {
    id: 2,
    title: "Neural Network Architecture Optimization",
    score: 94,
    methodology: 95,
    novelty: 92,
    clarity: 94,
    reproducibility: 95,
    summary: "Innovative approach with excellent reproducibility. Code and datasets well documented. Minor improvements needed in literature review.",
    agentReviewer: "ReviewerAgent-003",
    timestamp: "2025-10-03 09:15",
  },
  {
    id: 3,
    title: "Climate Change Impact on Marine Biodiversity",
    score: 92,
    methodology: 91,
    novelty: 88,
    clarity: 95,
    reproducibility: 93,
    summary: "Outstanding data collection and analysis. Clear methodology and well-structured presentation. Strong evidence supporting conclusions.",
    agentReviewer: "ReviewerAgent-002",
    timestamp: "2025-10-08 16:45",
  },
  {
    id: 4,
    title: "Machine Learning Applications in Drug Discovery",
    score: 85,
    methodology: 84,
    novelty: 82,
    clarity: 87,
    reproducibility: 86,
    summary: "Solid research with practical applications. Some concerns about dataset size and generalizability of results.",
    agentReviewer: "ReviewerAgent-001",
    timestamp: "2025-10-10 11:20",
  },
];

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-success";
  if (score >= 80) return "text-primary";
  if (score >= 70) return "text-warning";
  return "text-destructive";
};

export default function Reviews() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl font-display font-bold tracking-tight">Reviews</h2>
        <p className="text-muted-foreground mt-2">AI-powered evaluation results for your submissions</p>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass glass-dark border-border/50 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold">89.75</div>
            <p className="text-xs text-muted-foreground mt-1">Across all reviews</p>
          </CardContent>
        </Card>

        <Card className="glass glass-dark border-border/50 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews Completed</CardTitle>
            <div className="p-2 rounded-lg bg-success/10">
              <CheckCircle className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold">16</div>
            <p className="text-xs text-muted-foreground mt-1">By AI agents</p>
          </CardContent>
        </Card>

        <Card className="glass glass-dark border-border/50 hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Quality</CardTitle>
            <div className="p-2 rounded-lg bg-accent/10">
              <BookOpen className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-display font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Score ≥ 85</p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="grid gap-6">
        {mockReviews.map((review) => (
          <Card key={review.id} className="glass glass-dark border-border/50 hover-lift">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl font-display">{review.title}</CardTitle>
                  <CardDescription className="text-sm">
                    Reviewed by {review.agentReviewer} • {review.timestamp}
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={`text-3xl font-display font-bold px-6 py-2 gradient-primary`}>
                    {review.score}
                  </Badge>
                  {review.score >= 85 && (
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      High Quality
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground leading-relaxed">{review.summary}</p>
              
              {/* Detailed Scores */}
              <div className="space-y-4 pt-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Methodology</span>
                    <span className={`font-display font-bold ${getScoreColor(review.methodology)}`}>
                      {review.methodology}
                    </span>
                  </div>
                  <Progress value={review.methodology} className="h-2.5" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Novelty</span>
                    <span className={`font-display font-bold ${getScoreColor(review.novelty)}`}>
                      {review.novelty}
                    </span>
                  </div>
                  <Progress value={review.novelty} className="h-2.5" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Clarity</span>
                    <span className={`font-display font-bold ${getScoreColor(review.clarity)}`}>
                      {review.clarity}
                    </span>
                  </div>
                  <Progress value={review.clarity} className="h-2.5" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Reproducibility</span>
                    <span className={`font-display font-bold ${getScoreColor(review.reproducibility)}`}>
                      {review.reproducibility}
                    </span>
                  </div>
                  <Progress value={review.reproducibility} className="h-2.5" />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="outline" size="sm" className="hover:bg-primary/10 transition-all">
                  View Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
