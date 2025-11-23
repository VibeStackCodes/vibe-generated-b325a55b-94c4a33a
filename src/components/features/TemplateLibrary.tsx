import React, { useState } from 'react';
import { useTaskStore } from '@/stores/taskStore';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Card, CardBody } from '@/components/ui/Card';
import { TEMPLATES } from '@/lib/constants';
import { generateId } from '@/lib/utils';

export interface TemplateLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  listId: string;
}

export const TemplateLibrary = React.memo<TemplateLibraryProps>(({ isOpen, onClose, listId }) => {
  const { addTask } = useTaskStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(TEMPLATES.map((t) => t.category)));
  const filteredTemplates = selectedCategory
    ? TEMPLATES.filter((t) => t.category === selectedCategory)
    : TEMPLATES;

  const handleApplyTemplate = (templateId: string) => {
    const template = TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;

    template.tasks.forEach((task, index) => {
      addTask({
        title: task.title,
        description: task.description,
        listId,
        completed: false,
        priority: task.priority,
        dueDate: task.dueDate,
        order: index,
      });
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Templates" size="lg">
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === null ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardBody>
                <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                <p className="text-xs text-gray-600 mb-3">{template.description}</p>
                <p className="text-xs text-gray-500 mb-3">
                  {template.tasks.length} tasks
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleApplyTemplate(template.id)}
                  className="w-full"
                >
                  Use Template
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </Modal>
  );
});

TemplateLibrary.displayName = 'TemplateLibrary';
