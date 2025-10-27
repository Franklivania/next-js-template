"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";

const contents = [
  {
    title: "Next.js",
    image: "/vercel.svg",
    link: "https://nextjs.org/docs",
  },
  {
    title: "Tailwind CSS",
    image: "/tailwind.jpg",
    link: "https://tailwindcss.com",
  },
  {
    title: "Shadcn/UI",
    image: "/shadcn.avif",
    link: "https://ui.shadcn.com/docs/installation",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24">
      <div className="max-w-4xl w-full space-y-8 text-center">
        {/* Hero Section */}
        <div className="space-y-4">
          <Typography.h1 className="text-4xl! md:text-6xl!">
            Welcome to Your
            <span className="block text-primary">Next.js Template</span>
          </Typography.h1>

          <Typography.lead className="text-muted-foreground max-w-2xl mx-auto">
            A modern, production-ready starter template with shadcn/ui
            components, Tailwind CSS, and everything you need to build amazing
            applications.
          </Typography.lead>
        </div>

        <div className="w-max mx-auto flex flex-wrap items-center justify-center gap-6">
          {contents.map((content) => (
            <Link
              key={content.title}
              href={content.link}
              target="_blank"
              className="flex flex-col items-center justify-center"
            >
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src={content.image}
                  alt={content.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <Typography.p className="text-sm text-muted-foreground">
                {content.title}
              </Typography.p>
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/examples">
            <Button size="lg" className="w-full sm:w-auto">
              View Examples
            </Button>
          </Link>
          <Link
            href="https://github.com/Franklivania/nextjs-starter-template"
            target="_blank"
          >
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Documentation
            </Button>
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">🧩 Components</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography.p className="text-sm text-muted-foreground">
                20+ pre-built components ready to use in your project
              </Typography.p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">🎨 Customizable</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography.p className="text-sm text-muted-foreground">
                Easy theming with CSS variables and Tailwind CSS
              </Typography.p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">♿ Accessible</CardTitle>
            </CardHeader>
            <CardContent>
              <Typography.p className="text-sm text-muted-foreground">
                WCAG compliant components with keyboard navigation
              </Typography.p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <div className="pt-8">
          <Typography.p className="text-sm text-muted-foreground">
            Start by editing{" "}
            <code className="bg-muted px-2 py-1 rounded">src/app/page.js</code>
          </Typography.p>
        </div>
      </div>
    </main>
  );
}
