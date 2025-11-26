"use client";

import { Github, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const YEAR = new Date().getFullYear();

export const title = "Simple Footer";

export default function FooterSimple01() {
  return (
    <footer className="w-full border-t pb-8 pt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-row flex-wrap items-center justify-center gap-x-10 gap-y-2 md:justify-between">
          <p className="text-foreground text-center text-sm font-medium">
            All rights reserved. Copyright &copy; {YEAR} homepulse.io
          </p>
          <div className="flex gap-1">
            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
              <a
                href="#"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
              <a
                href="#"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
              <a
                href="#"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
              <a
                href="https://github.com/Home-Pulse-App"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
