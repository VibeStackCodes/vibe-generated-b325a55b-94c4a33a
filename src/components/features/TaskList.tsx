import React, { useState } from 'react';
import { useTaskStore } from '@/stores/taskStore';
import { TaskItem } from '@/components/features/TaskItem';
import { TaskForm } from '@/components/features/TaskForm';
import { Button } from '@/components/ui/Button';
import { Task } from '@/types';
import { Plus } from 'lucide-react';

export interface TaskListProps {
  listId: string;
}

export const TaskList = React.memo<TaskListProps>(({ listId }) => {
  const { getTasksByList } = useTaskStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const tasks = getTasksByList(listId);
  const completedCount = tasks.filter((t) => t.completed).length;

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
            <p className="text-sm text-gray-600 mt-1">
              {completedCount} of {tasks.length} completed
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => {
              setEditingTask(undefined);
              setIsFormOpen(true);
            }}
          >
            <Plus size={18} className="mr-2" />
            New Task
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-gray-500 text-lg mb-4">No tasks yet</p>
            <Button
              variant="primary"
              onClick={() => {
                setEditingTask(undefined);
                setIsFormOpen(true);
              }}
            >
              Create your first task
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} onEdit={handleEditTask} />
            ))}
          </div>
        )}
      </div>

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        task={editingTask}
        listId={listId}
      />
    </div>
  );
});

TaskList.displayName = 'TaskList';
