import React, { useState } from 'react';
import { Task } from '@/types';
import { useTaskStore } from '@/stores/taskStore';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRIORITY_LEVELS } from '@/lib/constants';

export interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export const TaskItem = React.memo<TaskItemProps>(({ task, onEdit }) => {
  const { toggleTaskComplete, deleteTask } = useTaskStore();
  const [isHovering, setIsHovering] = useState(false);

  const handleToggle = () => {
    toggleTaskComplete(task.id);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const priorityConfig = PRIORITY_LEVELS[task.priority];

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-3 rounded-lg border border-gray-200 transition-all',
        'hover:shadow-md hover:border-gray-300',
        task.completed && 'bg-gray-50'
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Checkbox
        checked={task.completed}
        onChange={handleToggle}
        aria-label={`Toggle task: ${task.title}`}
      />
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'font-medium text-sm break-words',
            task.completed && 'line-through text-gray-500'
          )}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-gray-600 mt-1 break-words">{task.description}</p>
        )}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <Badge variant="secondary" className={priorityConfig.color}>
            {priorityConfig.label}
          </Badge>
          {task.dueDate && (
            <span className="text-xs text-gray-500">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      {isHovering && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onEdit(task)}
            aria-label="Edit task"
          >
            <Edit2 size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDelete}
            aria-label="Delete task"
          >
            <Trash2 size={16} className="text-red-600" />
          </Button>
        </div>
      )}
    </div>
  );
});

TaskItem.displayName = 'TaskItem';
