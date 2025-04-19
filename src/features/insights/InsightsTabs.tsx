"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileClock, AlertTriangle, RefreshCw, ChartSpline, Settings } from "lucide-react";
import ReactMarkdown, { Components } from "react-markdown";


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
  const components: Components = {
    p: ({ children, ...props }) => (
      <p className="text-sm text-foreground" {...props}>
        {children}
      </p>
    ),
    strong: ({ children, ...props }) => {
      const text = children?.toString() || "";
      if (text.includes("❗")) {
        return (
          <strong className="font-semibold text-foreground flex items-center gap-1" {...props}>
            <AlertTriangle className="h-4 w-4 text-red-500" />
            {text.replace("❗", "").trim()}
          </strong>
        );
      }
      if (text.includes("⚠️")) {
        return (
          <strong className="font-semibold text-foreground flex items-center gap-1 mt-5" {...props}>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            {text.replace("⚠️", "").trim()}
          </strong>
        );
      }
      if (text.includes("💡")) {
        return (
          <strong className="font-semibold text-foreground flex items-center gap-1 mt-5" {...props}>
            <Settings className="h-4 w-4 text-gray-500" />
            {text.replace("💡", "").trim()}
          </strong>
        );
      }
    },
    ul: ({ children, ...props }) => (
      <ul className="list-none pl-0 space-y-2 mt-1" {...props}>
        {children}
      </ul>
    ),
    li: ({ children, ...props }) => (
      <li className="flex items-start text-sm text-foreground gap-2" {...props}>
        <span className="flex-shrink-0 text-foreground">•</span>
        <span className="flex-1">{children}</span>
      </li>
    )
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            AI Insights
          </h4>
          <p className="text-sm text-muted-foreground">
            Get insights about your inventory items
          </p>
        </div>
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
            <ReactMarkdown components={components}>
              {insights.summary}
            </ReactMarkdown>
          ) : (
            <p className="text-sm text-muted-foreground">
              Click "Generate Summary" to view insights.
            </p>
          )}
        </TabsContent>
        <TabsContent value="trends" className="mt-4">
          {insights ? (
            <ReactMarkdown components={components}>
              {insights.trends}
            </ReactMarkdown>
          ) : (
            <p className="text-sm text-muted-foreground">
              Click "Generate Summary" to view trends.
            </p>
          )}
        </TabsContent>
        <TabsContent value="actions" className="mt-4">
          {insights ? (
            <ReactMarkdown components={components}>
              {insights.actions}
            </ReactMarkdown>
          ) : (
            <p className="text-sm text-muted-foreground">
              Click "Generate Summary" to view actions.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}