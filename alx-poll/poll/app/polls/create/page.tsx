'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreatePollPage() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the poll data to your backend
    console.log('New Poll:', { question, options });
    alert('Poll created successfully! (Check console for data)');
    setQuestion('');
    setOptions(['', '']);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Poll</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="question">Poll Question</Label>
          <Input
            id="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your poll question"
            required
          />
        </div>
        <div>
          <Label>Options</Label>
          {options.map((option, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <Input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                required
              />
              {options.length > 2 && (
                <Button type="button" variant="destructive" onClick={() => removeOption(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addOption}>
            Add Option
          </Button>
        </div>
        <Button type="submit">Create Poll</Button>
      </form>
    </div>
  );
}