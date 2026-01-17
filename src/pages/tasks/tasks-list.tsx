import { useState } from "react";
import { CheckCircle2, Circle, Clock, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Avatar } from "../../components/ui/avatar";

export function TasksPage() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Call John Doe about contract",
      due: "Today",
      completed: false,
      assignee: "JD",
    },
    {
      id: 2,
      title: "Prepare Q3 presentation",
      due: "Tomorrow",
      completed: false,
      assignee: "ME",
    },
    {
      id: 3,
      title: "Email marketing campaign review",
      due: "Yesterday",
      completed: true,
      assignee: "AM",
    },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Task
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Input placeholder="Add a new task..." />
                <Button>Add</Button>
              </div>

              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        ) : (
                          <Circle className="h-5 w-5" />
                        )}
                      </button>
                      <span
                        className={
                          task.completed
                            ? "line-through text-muted-foreground"
                            : ""
                        }
                      >
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <Clock className="h-3 w-3" />
                        {task.due}
                      </div>
                      <Avatar
                        className="h-6 w-6 text-[10px]"
                        fallback={task.assignee}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tasks.filter((t) => !t.completed).length}
              </div>
              <p className="text-xs text-muted-foreground">Tasks pending</p>

              <div className="mt-4 pt-4 border-t">
                <div className="text-2xl font-bold">
                  {tasks.filter((t) => t.completed).length}
                </div>
                <p className="text-xs text-muted-foreground">Tasks completed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
