import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function MobileFilters() {
  return (
    <div className="mb-4 flex items-center justify-between lg:hidden">
      <Button variant="outline" className="flex items-center gap-2">
        Filter
        <ChevronDown className="h-4 w-4" />
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        Sort By
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
