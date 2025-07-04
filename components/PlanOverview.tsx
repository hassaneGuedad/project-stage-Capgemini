'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ProjectPlan } from '@/types';
import { 
  CheckCircle, 
  Clock, 
  Code, 
  Layers, 
  Target, 
  TrendingUp,
  Zap
} from 'lucide-react';

interface PlanOverviewProps {
  plan: ProjectPlan;
}

export const PlanOverview: React.FC<PlanOverviewProps> = ({ plan }) => {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'High': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getComplexityProgress = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 25;
      case 'Medium': return 60;
      case 'High': return 90;
      default: return 0;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-800">
                {plan.title}
              </CardTitle>
              <p className="text-gray-600 leading-relaxed">
                {plan.description}
              </p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{plan.estimatedTime}</span>
              </div>
              <Badge 
                variant="outline" 
                className={`${getComplexityColor(plan.complexity)} text-white border-0`}
              >
                {plan.complexity} Complexity
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Code className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Technologies</p>
                <p className="text-lg font-semibold">{plan.techStack.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-green-100">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Fonctionnalités</p>
                <p className="text-lg font-semibold">{plan.features.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Complexité</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Progress value={getComplexityProgress(plan.complexity)} className="h-2 w-16" />
                  <span className="text-sm font-medium">{plan.complexity}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tech Stack */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layers className="h-5 w-5 text-blue-600" />
            <span>Stack Technique</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {plan.techStack.map((tech, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors duration-200"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-green-600" />
            <span>Fonctionnalités Principales</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};