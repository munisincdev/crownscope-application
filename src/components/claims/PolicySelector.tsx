import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Policy {
  id: string;
  name: string;
  type: string;
  number: string;
}

interface PolicySelectorProps {
  policies: Policy[];
  onSelect: (policyId: string) => void;
}

export const PolicySelector = ({ policies, onSelect }: PolicySelectorProps) => {
  return (
    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
      <div className="space-y-2">
        {policies.map((policy) => (
          <Button
            key={policy.id}
            variant="outline"
            className="w-full justify-start text-left h-auto py-3"
            onClick={() => onSelect(policy.id)}
          >
            <div className="flex flex-col gap-1">
              <span className="font-medium">{policy.name}</span>
              <span className="text-xs text-muted-foreground">
                {policy.type} - {policy.number}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};