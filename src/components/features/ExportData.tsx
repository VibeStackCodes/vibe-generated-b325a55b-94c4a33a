import React, { useState } from 'react';
import { useTaskStore } from '@/stores/taskStore';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { downloadJSON, downloadCSV } from '@/lib/utils';
import { ExportData } from '@/types';

export interface ExportDataProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportDataComponent = React.memo<ExportDataProps>(({ isOpen, onClose }) => {
  const { tasks, lists } = useTaskStore();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportJSON = async () => {
    setIsExporting(true);
    try {
      const exportData: ExportData = {
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        tasks,
        lists,
      };
      downloadJSON(exportData, `mytodo-export-${Date.now()}.json`);
    } finally {
      setIsExporting(false);
      onClose();
    }
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      const csvData = tasks.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description || '',
        listId: task.listId,
        completed: task.completed ? 'Yes' : 'No',
        priority: task.priority,
        dueDate: task.dueDate || '',
        createdAt: task.createdAt,
      }));
      downloadCSV(csvData, `mytodo-tasks-${Date.now()}.csv`);
    } finally {
      setIsExporting(false);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Data"
      size="md"
      footer={
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Export your tasks and lists to keep your data safe and portable.
        </p>
        <div className="space-y-2">
          <Button
            variant="primary"
            onClick={handleExportJSON}
            loading={isExporting}
            className="w-full"
          >
            Export as JSON
          </Button>
          <Button
            variant="secondary"
            onClick={handleExportCSV}
            loading={isExporting}
            className="w-full"
          >
            Export as CSV
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Total: {tasks.length} tasks in {lists.length} lists
        </p>
      </div>
    </Modal>
  );
});

ExportDataComponent.displayName = 'ExportData';
