'use client';

import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createPoll } from '@/app/actions/poll-actions';

export default function CreatePollPage() {
  const [options, setOptions] = useState<string[]>(['', '']);
  const [state, formAction] = useActionState(createPoll, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.error) {
      alert(state.error);
    } else if (state?.pollId) {
      router.push(`/polls/${state.pollId}`);
    }
  }, [state, router]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, '']);
  const removeOption = (index: number) => setOptions(options.filter((_, i) => i !== index));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Poll</h1>
      <form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="question">Poll Question</Label>
          <Input
            id="question"
            name="question"
            type="text"
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
                name="options"
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

        {state?.error && <p className="text-red-500">{state.error}</p>}
      </form>
    </div>
  );
}
