import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { CalendarIcon, Clock, ArrowUpRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface LotteryCardProps {
  id: string; // ✅ Added ID for linking
  title: string;
  description?: string;
  imageUrl: string;
  date: Date;
  category: string;
  className?: string;
}

export function LotteryCard({
  id,
  title,
  description,
  imageUrl,
  date,
  category,
  className,
}: LotteryCardProps) {
  return (
    <Link href={`/results/${id}`} className="block h-full group">
      <Card
        className={cn(
          "overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-primary/50 relative",
          className
        )}
      >
        {/* Hover Effect Icon */}
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
          <ArrowUpRight className="w-4 h-4 text-primary" />
        </div>

        <CardHeader className="p-4 pb-2 space-y-2">
          <div className="flex items-center justify-between">
            <Badge
              variant="outline"
              className="w-fit bg-primary/5 border-primary/20 text-primary"
            >
              <Clock className="mr-1 h-3 w-3" />
              {category}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center bg-muted/50 px-2 py-0.5 rounded-md">
              <CalendarIcon className="mr-1.5 h-3 w-3" />
              {format(date, "MMM dd, yyyy")}
            </span>
          </div>
          <CardTitle className="line-clamp-1 text-base font-semibold group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 flex-1 flex flex-col">
          {/* Image Section */}
          <div className="w-full bg-muted/30 border-y border-border/50 relative">
            <AspectRatio ratio={3 / 2}>
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Optional Description Preview */}
          {description && (
            <div className="p-4 pt-3">
              <CardDescription className="line-clamp-2 text-xs md:text-sm">
                {description}
              </CardDescription>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
