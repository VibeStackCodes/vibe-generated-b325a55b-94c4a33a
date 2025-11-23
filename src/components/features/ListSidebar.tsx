import React, { useState } from 'react';
import { useTaskStore } from '@/stores/taskStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LIST_COLORS } from '@/lib/constants';

export interface ListSidebarProps {
  onNewListClick: () => void;
}

export const ListSidebar = React.memo<ListSidebarProps>(({ onNewListClick }) => {
  const { lists, selectedListId, selectList, deleteList, getTotalCount, getCompletedCount } =
    useTaskStore();
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [selectedColor, setSelectedColor] = useState(LIST_COLORS[0].value);

  const handleCreateList = () => {
    if (newListName.trim()) {
      useTaskStore.setState((state) => {
        const newList = {
          id: `list-${Date.now()}`,
          name: newListName.trim(),
          color: selectedColor,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          order: state.lists.length,
        };
        return { lists: [...state.lists, newList] };
      });
      setNewListName('');
      setShowNewListForm(false);
    }
  };

  const handleDeleteList = (id: string) => {
    if (confirm('Are you sure you want to delete this list and all its tasks?')) {
      deleteList(id);
    }
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Lists</h2>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowNewListForm(!showNewListForm)}
          className="w-full"
        >
          <Plus size={16} className="mr-1" />
          New List
        </Button>
      </div>

      {showNewListForm && (
        <div className="p-4 border-b border-gray-200 space-y-3">
          <Input
            placeholder="List name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2 flex-wrap">
            {LIST_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className={cn(
                  'w-6 h-6 rounded-full border-2 transition-all',
                  selectedColor === color.value ? 'border-gray-900' : 'border-gray-300'
                )}
                style={{ backgroundColor: color.value }}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowNewListForm(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreateList}
              className="flex-1"
            >
              Create
            </Button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {lists.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No lists yet. Create one to get started!
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {lists.map((list) => {
              const total = getTotalCount(list.id);
              const completed = getCompletedCount(list.id);
              const isSelected = selectedListId === list.id;

              return (
                <div
                  key={list.id}
                  className={cn(
                    'flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all group',
                    isSelected ? 'bg-white shadow-sm' : 'hover:bg-gray-100'
                  )}
                  onClick={() => selectList(list.id)}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: list.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{list.name}</p>
                    <p className="text-xs text-gray-500">
                      {completed}/{total}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteList(list.id);
                    }}
                    className="p-1 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded transition-all"
                    aria-label="Delete list"
                  >
                    <Trash2 size={14} className="text-red-600" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

ListSidebar.displayName = 'ListSidebar';
