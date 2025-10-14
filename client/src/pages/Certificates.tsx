import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Download, ExternalLink, Sparkles } from "lucide-react";

const mockCertificates = [
  {
    id: 1,
    tokenId: "NFT-001",
    title: "Neural Network Architecture Optimization",
    score: 94,
    mintDate: "2025-10-03",
    contractAddress: "0x1234...5678",
    ipfsMetadata: "Qm...",
    network: "Base",
  },
  {
    id: 2,
    tokenId: "NFT-002",
    title: "Climate Change Impact on Marine Biodiversity",
    score: 92,
    mintDate: "2025-10-08",
    contractAddress: "0x1234...5678",
    ipfsMetadata: "Qm...",
    network: "Base",
  },
  {
    id: 3,
    tokenId: "NFT-003",
    title: "CRISPR Gene Editing Techniques",
    score: 88,
    mintDate: "2025-10-05",
    contractAddress: "0x1234...5678",
    ipfsMetadata: "Qm...",
    network: "Base",
  },
];

export default function Certificates() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-display font-bold tracking-tight">Certificates</h2>
          <p className="text-muted-foreground mt-2">Your verified research certificates minted as NFTs</p>
        </div>
        <Badge variant="outline" className="gradient-accent text-white border-0 px-5 py-2 shadow-lg">
          <Sparkles className="h-4 w-4 mr-2" />
          {mockCertificates.length} NFTs
        </Badge>
      </div>

      {/* Info Card */}
      <Card className="glass glass-dark border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <div className="p-2 rounded-lg bg-primary/10">
              <Award className="h-5 w-5 text-primary" />
            </div>
            About Certificates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Each certificate is a verifiable on-chain proof of your research quality and reproducibility. 
            These NFTs contain immutable records of review scores, methodology assessments, and reproducibility 
            confirmations stored on IPFS and verified on the Base network.
          </p>
        </CardContent>
      </Card>

      {/* Certificates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockCertificates.map((cert) => (
          <Card key={cert.id} className="glass glass-dark border-border/50 hover-lift group">
            <CardHeader className="space-y-4">
              <div className="h-48 gradient-accent rounded-xl flex items-center justify-center relative overflow-hidden group-hover:shadow-2xl transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <Award className="h-24 w-24 text-white relative z-10" />
              </div>
              <div className="space-y-2">
                <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm font-mono">
                  {cert.tokenId}
                </Badge>
                <CardTitle className="text-lg leading-tight font-display">{cert.title}</CardTitle>
                <CardDescription className="text-sm">Minted on {cert.mintDate}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5">
                <span className="text-sm font-medium">Quality Score</span>
                <Badge className="gradient-primary font-display font-bold text-lg px-4 py-1">
                  {cert.score}
                </Badge>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-all">
                  <span>Network:</span>
                  <Badge variant="outline" className="text-xs">{cert.network}</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-all">
                  <span>Contract:</span>
                  <span className="font-mono">{cert.contractAddress}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 hover:bg-primary/10 transition-all">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="flex-1 hover:bg-accent/10 transition-all">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View NFT
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
