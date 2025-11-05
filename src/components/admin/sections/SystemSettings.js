import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Settings, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

export default function SystemSettings({ onSectionChange }) {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {onSectionChange && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSectionChange("overview")}
                  className="text-slate-400 hover:text-slate-100 hover:bg-slate-700"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Settings className="h-6 w-6" />
                System Settings
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-12 text-center text-slate-400">
          <p>System settings functionality coming soon.</p>
          <p className="text-sm mt-2">Configure system preferences, permissions, and more</p>
        </CardContent>
      </Card>
    </div>
  );
}
