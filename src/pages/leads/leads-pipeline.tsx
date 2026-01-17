import { MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Avatar } from "../../components/ui/avatar";

export function LeadsPage() {
  const pipeline = [
    {
      id: "new",
      title: "New Leads",
      leads: [
        {
          id: 1,
          name: "Alice Cooper",
          company: "Wonderland Inc",
          value: "$5,000",
        },
        {
          id: 2,
          name: "Bob Builder",
          company: "Construction Co",
          value: "$12,000",
        },
      ],
    },
    {
      id: "contacted",
      title: "Contacted",
      leads: [
        { id: 3, name: "Charlie Day", company: "Paddy's Pub", value: "$2,500" },
      ],
    },
    {
      id: "qualified",
      title: "Qualified",
      leads: [
        {
          id: 4,
          name: "Diana Prince",
          company: "Amazonian Tech",
          value: "$50,000",
        },
        {
          id: 5,
          name: "Bruce Wayne",
          company: "Wayne Enterprises",
          value: "$1,000,000",
        },
      ],
    },
    {
      id: "negotiation",
      title: "Negotiation",
      leads: [],
    },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Leads Pipeline</h2>
        <Button>Add Lead</Button>
      </div>

      <div className="flex h-full gap-6 overflow-x-auto pb-4">
        {pipeline.map((column) => (
          <div key={column.id} className="min-w-[300px] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-muted-foreground">
                {column.title}
              </h3>
              <Badge variant="secondary">{column.leads.length}</Badge>
            </div>

            <div className="flex flex-col gap-3">
              {column.leads.map((lead) => (
                <Card
                  key={lead.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                >
                  <CardHeader className="p-4 pb-2 space-y-0 flex flex-row items-center justify-between">
                    <Badge variant="outline" className="font-normal text-xs">
                      {lead.company}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="font-semibold mb-1">{lead.name}</div>
                    <div className="text-sm text-muted-foreground mb-3">
                      {lead.value}
                    </div>
                    <div className="flex items-center justify-between">
                      <Avatar className="h-6 w-6" fallback={lead.name[0]} />
                      <span className="text-xs text-muted-foreground">
                        2 days ago
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="ghost" className="w-full border-dashed border">
                + Add Card
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
