import React from 'react';
import { useTaskStore } from '@/stores/taskStore';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { AlertCircle } from 'lucide-react';

export interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsPanel = React.memo<SettingsPanelProps>(({ isOpen, onClose }) => {
  const { tasks, lists, clearAllData } = useTaskStore();

  const handleClearAllData = () => {
    if (
      confirm(
        'Are you sure you want to delete all tasks and lists? This action cannot be undone.'
      )
    ) {
      clearAllData();
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Settings"
      size="md"
      footer={
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Lists</p>
              <p className="text-2xl font-bold text-gray-900">{lists.length}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Danger Zone</h3>
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <div className="flex gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-red-900 mb-2">Clear All Data</p>
                <p className="text-sm text-red-800 mb-3">
                  This will permanently delete all your tasks and lists. This action cannot be
                  undone.
                </p>
                <Button variant="danger" size="sm" onClick={handleClearAllData}>
                  Clear All Data
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
});

SettingsPanel.displayName = 'SettingsPanel';
