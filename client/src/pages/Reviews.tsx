import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useReviews } from "@/hooks/useApi";

// Helper function to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-success";
  if (score >= 80) return "text-primary";
  if (score >= 70) return "text-warning";
  return "text-destructive";
};

export default function Reviews() {
  const { data: reviewsData, isLoading, error } = useReviews();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-destructive">Failed to load reviews</p>
          <p className="text-sm text-muted-foreground mt-2">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const { stats, reviews } = reviewsData || {};

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
            <div className="text-3xl font-display font-bold">{stats?.averageScore?.toFixed(1) || '0.0'}</div>
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
            <div className="text-3xl font-display font-bold">{stats?.reviewsCompleted || 0}</div>
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
            <div className="text-3xl font-display font-bold">{stats?.highQuality || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Score ≥ 80</p>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="grid gap-6">
        {reviews?.length ? reviews.map((review) => (
          <Card key={review.id} className="glass glass-dark border-border/50 hover-lift">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl font-display">{review.submission?.title || 'Review'}</CardTitle>
                  <CardDescription className="text-sm">
                    Reviewed by {review.ai_agent} • {formatDate(review.dateReviewed)}
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={`text-3xl font-display font-bold px-6 py-2 gradient-primary`}>
                    {review.score}
                  </Badge>
                  {review.score >= 80 && (
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      High Quality
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground leading-relaxed">{review.feedback}</p>
              
              {/* Detailed Scores */}
              {(review.methodology || review.novelty || review.clarity || review.reproducibility) && (
                <div className="space-y-4 pt-2">
                  {review.methodology && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Methodology</span>
                        <span className={`font-display font-bold ${getScoreColor(review.methodology)}`}>
                          {review.methodology}
                        </span>
                      </div>
                      <Progress value={review.methodology} className="h-2.5" />
                    </div>
                  )}

                  {review.novelty && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Novelty</span>
                        <span className={`font-display font-bold ${getScoreColor(review.novelty)}`}>
                          {review.novelty}
                        </span>
                      </div>
                      <Progress value={review.novelty} className="h-2.5" />
                    </div>
                  )}

                  {review.clarity && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Clarity</span>
                        <span className={`font-display font-bold ${getScoreColor(review.clarity)}`}>
                          {review.clarity}
                        </span>
                      </div>
                      <Progress value={review.clarity} className="h-2.5" />
                    </div>
                  )}

                  {review.reproducibility && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Reproducibility</span>
                        <span className={`font-display font-bold ${getScoreColor(review.reproducibility)}`}>
                          {review.reproducibility}
                        </span>
                      </div>
                      <Progress value={review.reproducibility} className="h-2.5" />
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end pt-2">
                <Button variant="outline" size="sm" className="hover:bg-primary/10 transition-all">
                  View Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="text-center py-12">
            <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
            <p className="text-muted-foreground">
              Submit papers to see AI-powered reviews and detailed analysis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
