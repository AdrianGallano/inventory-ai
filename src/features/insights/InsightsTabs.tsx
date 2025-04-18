"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface Insights {
  summary: string;
  trends: string;
  actions: string;
}

interface InsightsTabsProps {
  insights: Insights | null;
  onGenerate: () => void;
  isLoading: boolean;
}

export default function InsightsTabs({ insights, onGenerate, isLoading }: InsightsTabsProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          AI Insights
        </h4>
        <Button
          variant="outline"
          size="sm"
          onClick={onGenerate}
          disabled={isLoading}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Generate Summary
        </Button>
      </div>
      <Tabs defaultValue="summary" className="flex-1">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="mt-4">
          {insights ? (
            <p className="text-sm">{insights.summary}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Click "Generate Summary" to view insights.</p>
          )}
        </TabsContent>
        <TabsContent value="trends" className="mt-4">
          {insights ? (
            <p className="text-sm">{insights.trends}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Click "Generate Summary" to view trends.</p>
          )}
        </TabsContent>
        <TabsContent value="actions" className="mt-4">
          {insights ? (
            <p className="text-sm">{insights.actions}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Click "Generate Summary" to view actions.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}