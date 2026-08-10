import { Layers, Signal } from "lucide-react";

import type { Course } from "@/data/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="group h-full overflow-hidden border-border/80 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div
        className={`relative flex h-36 items-end bg-gradient-to-br ${course.accent} p-4 sm:h-40`}
        aria-hidden="true"
      >
        <span className="rounded-full bg-background/85 px-3 py-1 text-xs font-semibold text-primary">
          {course.category}
        </span>
      </div>
      <CardHeader className="gap-2">
        <h3 className="text-lg leading-snug font-bold">{course.title}</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{course.description}</p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="gap-1.5 rounded-full font-medium">
            <Signal className="h-3.5 w-3.5" />
            {course.level}
          </Badge>
          <Badge variant="outline" className="gap-1.5 rounded-full font-medium">
            <Layers className="h-3.5 w-3.5" />
            {course.modules} modules
          </Badge>
          <span className="text-xs text-muted-foreground">{course.duration}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full rounded-full">View Course</Button>
      </CardFooter>
    </Card>
  );
}
