import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { CheckCircle, Zap, Lock, Smartphone } from 'lucide-react';

export interface OnboardingGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    icon: Smartphone,
    title: 'Offline First',
    description: 'All your tasks are stored locally on your device. No internet required!',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Capture and organize tasks instantly with our distraction-free interface.',
  },
  {
    icon: Lock,
    title: 'Privacy Focused',
    description: 'Your data stays on your device. We never collect or store your information.',
  },
  {
    icon: CheckCircle,
    title: 'Get Started',
    description: 'Create your first list and start adding tasks to boost your productivity!',
  },
];

export const OnboardingGuide = React.memo<OnboardingGuideProps>(({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];
  const Icon = step.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Welcome to MyTodo"
      size="md"
      footer={
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentStep ? 'bg-primary-600 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button variant="primary" onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </Button>
          </div>
        </div>
      }
    >
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Icon size={48} className="text-primary-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h2>
          <p className="text-gray-600">{step.description}</p>
        </div>
      </div>
    </Modal>
  );
});

OnboardingGuide.displayName = 'OnboardingGuide';
