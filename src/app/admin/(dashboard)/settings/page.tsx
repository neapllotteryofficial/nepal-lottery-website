"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save, Youtube, Loader2, Globe } from "lucide-react";
// Import from the actions file we just created
import { getYoutubeLink, updateYoutubeLink } from "@/app/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Load initial settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const link = await getYoutubeLink();
        setUrl(link);
      } catch (error) {
        toast.error("Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    if (url && !url.startsWith("http")) {
      toast.error(
        "Please enter a valid URL (starting with http:// or https://)"
      );
      return;
    }

    setIsSaving(true);
    const res = await updateYoutubeLink(url);
    setIsSaving(false);

    if (res.success) {
      toast.success("Settings saved successfully");
    } else {
      toast.error(res.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    // FIX: Added container, max-width, and padding to prevent sticking to sides
    <div className="container max-w-4xl mx-auto py-10 px-4 md:px-6 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage general website configurations and external links.
        </p>
      </div>

      <Separator />

      {/* YouTube Configuration Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Youtube className="w-6 h-6 text-red-600" />
            Live Draw Configuration
          </CardTitle>
          <CardDescription>
            This link will be attached to the "Watch Live Draw" button on the
            home page. Leaving it empty will show a "Link Unavailable" message.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="youtube-url" className="text-base font-medium">
              YouTube Video or Channel URL
            </Label>
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="youtube-url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-9 h-11"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Example: <code>https://youtube.com/live/xyz123</code>
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              size="lg"
              className="w-full sm:w-auto min-w-[150px]"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
