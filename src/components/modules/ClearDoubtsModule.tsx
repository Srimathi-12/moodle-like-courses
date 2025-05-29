
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import ModuleSectionLayout from './ModuleSectionLayout';

interface Question {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
  module: string;
}

interface ClearDoubtsModuleProps {
  moduleTitle: string;
  questions: Question[];
  onAskQuestion: (question: Question) => void;
}

const ClearDoubtsModule: React.FC<ClearDoubtsModuleProps> = ({ 
  moduleTitle, 
  questions, 
  onAskQuestion 
}) => {
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [isAskQuestionDialogOpen, setIsAskQuestionDialogOpen] = useState<boolean>(false);

  const handleAskQuestion = () => {
    if (!newQuestionText.trim()) {
      toast({
        title: "Error",
        description: "Question cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: newQuestionText,
      author: "Student",
      timestamp: new Date(),
      module: moduleTitle,
    };
    onAskQuestion(newQuestion);
    setNewQuestionText('');
    setIsAskQuestionDialogOpen(false);
    toast({
      title: "Success",
      description: "Your question has been submitted!",
    });
  };

  const moduleQuestions = questions.filter(q => q.module === moduleTitle);

  return (
    <ModuleSectionLayout
      icon={<MessageSquare className="h-5 w-5 text-academic-blue" />}
      title="Clear All Your Doubts"
    >
      <p>Welcome to the Doubts Clarification Hub for this course!</p>
      <p>Here, you can post your questions about any topic covered in the "{moduleTitle}" module. Our instructors and fellow learners will help you resolve them.</p>
      
      <Dialog open={isAskQuestionDialogOpen} onOpenChange={setIsAskQuestionDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mt-4">Ask a Question</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Ask a New Question</DialogTitle>
            <DialogDescription>
              Type your question about "{moduleTitle}" below. It will be visible to instructors and other students.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              id="questionText"
              placeholder="Type your question here..."
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setNewQuestionText('')}>Cancel</Button>
            </DialogClose>
            <Button onClick={handleAskQuestion}>Submit Question</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-6">
        <h4 className="text-md font-semibold text-gray-700 mb-3">Asked Questions:</h4>
        {moduleQuestions.length > 0 ? (
          <div className="space-y-4">
            {moduleQuestions.map((question) => (
              <div key={question.id} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <p className="text-sm text-gray-800">{question.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Asked by: {question.author} on {question.timestamp.toLocaleDateString()} at {question.timestamp.toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No questions have been asked for this module yet. Be the first!</p>
        )}
      </div>
      
      <p className="mt-6"><strong>Other Features (Placeholder):</strong></p>
      <ul className="list-disc list-inside ml-4 text-sm">
        <li>FAQ section for common queries.</li>
        <li>Direct messaging with instructors (subject to availability).</li>
        <li>Scheduled Q&A sessions.</li>
      </ul>
    </ModuleSectionLayout>
  );
};

export default ClearDoubtsModule;
