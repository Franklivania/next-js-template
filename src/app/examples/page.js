"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Typography } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Suspense, useState } from "react";

export default function Examples() {
  const [progress, setProgress] = useState(60);

  return (
    <main className="container mx-auto p-8 space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <Link href="/">
          <Button variant="ghost" size="sm">
            ← Back to Home
          </Button>
        </Link>
        <Typography.h1>Component Examples</Typography.h1>
        <Typography.p className="text-muted-foreground">
          Explore all the pre-built components included in this template
        </Typography.p>
      </div>

      <Separator />

      {/* Typography Examples */}
      <section className="space-y-4">
        <Typography.h2>Typography</Typography.h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <Typography.h1>Heading 1</Typography.h1>
            <Typography.h2>Heading 2</Typography.h2>
            <Typography.h3>Heading 3</Typography.h3>
            <Typography.h4>Heading 4</Typography.h4>
            <Typography.p>This is a paragraph with normal text.</Typography.p>
            <Typography.lead>
              This is a lead paragraph with larger text.
            </Typography.lead>
            <Typography.small>This is small text</Typography.small>
            <Typography.muted>This is muted text</Typography.muted>
          </CardContent>
        </Card>
      </section>

      {/* Button Examples */}
      <section className="space-y-4">
        <Typography.h2>Buttons</Typography.h2>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Form Examples */}
      <section className="space-y-4">
        <Typography.h2>Form Components</Typography.h2>
        <Card>
          <CardHeader>
            <CardTitle>Sample Form</CardTitle>
            <CardDescription>All form components in action</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Type your message here" />
            </div>

            <div className="space-y-2">
              <Label>Select an option</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>

            <div className="space-y-2">
              <Label>Choose one</Label>
              <RadioGroup defaultValue="option1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="r1" />
                  <Label htmlFor="r1">Option 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="r2" />
                  <Label htmlFor="r2">Option 2</Label>
                </div>
              </RadioGroup>
            </div>

            <Button>Submit</Button>
          </CardContent>
        </Card>
      </section>

      {/* Tabs Example */}
      <Suspense fallback={<div>Loading...</div>}>
        <section className="space-y-4">
          <Typography.h2>Tabs</Typography.h2>
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <Card>
                <CardContent className="pt-6">
                  <Typography.p>Content for Tab 1</Typography.p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab2">
              <Card>
                <CardContent className="pt-6">
                  <Typography.p>Content for Tab 2</Typography.p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab3">
              <Card>
                <CardContent className="pt-6">
                  <Typography.p>Content for Tab 3</Typography.p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </Suspense>

      {/* Accordion Example */}
      <section className="space-y-4">
        <Typography.h2>Accordion</Typography.h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default using CSS transitions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Progress and Skeleton */}
      <section className="space-y-4">
        <Typography.h2>Progress & Loading States</Typography.h2>
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                >
                  Decrease
                </Button>
                <Button
                  size="sm"
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                >
                  Increase
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <Typography.h4>Loading Skeletons</Typography.h4>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Card Grid */}
      <section className="space-y-4">
        <Typography.h2>Card Grid</Typography.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>Card Title {i}</CardTitle>
                <CardDescription>Card description goes here</CardDescription>
              </CardHeader>
              <CardContent>
                <Typography.p className="text-sm">
                  This is some content inside the card component.
                </Typography.p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
