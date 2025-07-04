'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { PlanOverview } from '@/components/PlanOverview';
import { FileList } from '@/components/FileList';
import { UIPreview } from '@/components/UIPreview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { mockProjectPlan, mockProjectFiles, mockUIComponents } from '@/data/mockData';
import { 
  Download,
  Share2,
  Settings,
  Play,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [generationStatus, setGenerationStatus] = useState<'idle' | 'generating' | 'completed'>('completed');
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
      return;
    }

    // Get the current prompt from localStorage
    const prompt = localStorage.getItem('currentPrompt');
    if (prompt) {
      setCurrentPrompt(prompt);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto" />
          <p className="text-gray-600">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const getStatusIcon = () => {
    switch (generationStatus) {
      case 'generating':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusLabel = () => {
    switch (generationStatus) {
      case 'generating':
        return 'Génération en cours...';
      case 'completed':
        return 'Génération terminée';
      default:
        return 'En attente';
    }
  };

  const getStatusColor = () => {
    switch (generationStatus) {
      case 'generating':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Gérez et visualisez vos projets générés par l'IA
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Paramètres</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Partager</span>
              </Button>
              <Button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Download className="h-4 w-4" />
                <span>Télécharger</span>
              </Button>
            </div>
          </div>

          {/* Project Status */}
          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-900">Statut du projet</h3>
                    <Badge variant="outline" className={getStatusColor()}>
                      {getStatusIcon()}
                      <span className="ml-2">{getStatusLabel()}</span>
                    </Badge>
                  </div>
                  {currentPrompt && (
                    <p className="text-sm text-gray-600 max-w-2xl">
                      <span className="font-medium">Prompt utilisé:</span> {currentPrompt}
                    </p>
                  )}
                </div>
                <div className="text-right space-y-2">
                  <div className="flex items-center space-x-2">
                    <Progress value={progress} className="w-32" />
                    <span className="text-sm font-medium">{progress}%</span>
                  </div>
                  <Button size="sm" className="flex items-center space-x-2">
                    <Play className="h-3 w-3" />
                    <span>Aperçu</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Plan Overview */}
          <div className="lg:col-span-2 space-y-8">
            <PlanOverview plan={mockProjectPlan} />
            <FileList files={mockProjectFiles} />
          </div>

          {/* Right Column - UI Preview */}
          <div className="space-y-8">
            <UIPreview components={mockUIComponents} />
            
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger le code source
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Play className="h-4 w-4 mr-2" />
                  Lancer l'aperçu
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Modifier la configuration
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager le projet
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-blue-500" />
                  <span>Conseils</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Testez régulièrement votre application pendant le développement</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Personnalisez les styles selon votre charte graphique</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Ajoutez des tests unitaires pour assurer la qualité</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}