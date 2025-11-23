import React, { useEffect, useState } from 'react';
import { useTaskStore } from '@/stores/taskStore';
import { Header } from '@/components/layout/Header';
import { ListSidebar } from '@/components/features/ListSidebar';
import { TaskList } from '@/components/features/TaskList';
import { TemplateLibrary } from '@/components/features/TemplateLibrary';
import { ExportDataComponent } from '@/components/features/ExportData';
import { OnboardingGuide } from '@/components/features/OnboardingGuide';
import { SettingsPanel } from '@/components/layout/SettingsPanel';
import { STORAGE_KEYS } from '@/lib/constants';
import { getLocalStorage, setLocalStorage } from '@/lib/utils';

function App() {
  const { lists, selectedListId, selectList, loadFromStorage } = useTaskStore();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    loadFromStorage();
    const onboardingCompleted = getLocalStorage(STORAGE_KEYS.ONBOARDING_COMPLETED, false);
    if (!onboardingCompleted) {
      setShowOnboarding(true);
    }
  }, [loadFromStorage]);

  useEffect(() => {
    if (lists.length > 0 && !selectedListId) {
      selectList(lists[0].id);
    }
  }, [lists, selectedListId, selectList]);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    setLocalStorage(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
  };

  const currentList = lists.find((l) => l.id === selectedListId);

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header
        onExport={() => setShowExport(true)}
        onHelp={() => setShowOnboarding(true)}
        onSettings={() => setShowSettings(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        <ListSidebar onNewListClick={() => setShowTemplateLibrary(true)} />

        {currentList ? (
          <TaskList listId={currentList.id} />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-lg mb-4">No lists yet</p>
              <p className="text-gray-400 text-sm">Create a list to get started</p>
            </div>
          </div>
        )}
      </div>

      <TemplateLibrary
        isOpen={showTemplateLibrary}
        onClose={() => setShowTemplateLibrary(false)}
        listId={selectedListId || ''}
      />
      <ExportDataComponent isOpen={showExport} onClose={() => setShowExport(false)} />
      <OnboardingGuide isOpen={showOnboarding} onClose={handleOnboardingClose} />
      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}

export default App;
