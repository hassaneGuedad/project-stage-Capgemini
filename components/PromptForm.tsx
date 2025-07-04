'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Send, Loader2 } from 'lucide-react';

interface PromptFormProps {
  onSubmit?: (prompt: string) => void;
}

export const PromptForm: React.FC<PromptFormProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const suggestedPrompts = [
    "Créer une application e-commerce avec React et Stripe",
    "Développer un blog personnel avec Next.js et Markdown",
    "Construire un tableau de bord d'analytics avec des graphiques",
    "Créer une application de chat en temps réel avec Socket.io"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (onSubmit) {
      onSubmit(prompt);
    }
    
    // Store the prompt in localStorage for the dashboard
    localStorage.setItem('currentPrompt', prompt);
    
    setIsSubmitting(false);
    router.push('/dashboard');
  };

  const handleSuggestedPrompt = (suggestedPrompt: string) => {
    setPrompt(suggestedPrompt);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/30">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Décrivez votre projet
        </CardTitle>
        <CardDescription className="text-base text-gray-600 mt-2">
          Expliquez en détail le projet web que vous souhaitez créer. Plus vous êtes précis, meilleur sera le résultat !
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="Exemple: Je veux créer une application de gestion de tâches avec authentification, possibilité de créer des projets, assigner des tâches aux membres de l'équipe, et avoir un tableau de bord avec des statistiques..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              maxLength={1000}
            />
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Minimum 10 caractères</span>
              <span>{prompt.length}/1000</span>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={prompt.trim().length < 10 || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Génération en cours...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Générer mon projet
              </>
            )}
          </Button>
        </form>

        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700 flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span>Exemples de prompts</span>
          </h3>
          <div className="grid gap-2">
            {suggestedPrompts.map((suggestedPrompt, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-blue-100 hover:border-blue-200 transition-colors duration-200 p-3 h-auto text-left justify-start text-sm"
                onClick={() => handleSuggestedPrompt(suggestedPrompt)}
              >
                {suggestedPrompt}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};