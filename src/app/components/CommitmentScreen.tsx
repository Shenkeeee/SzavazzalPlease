import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { UserPlus, Check } from 'lucide-react';

interface CommitmentScreenProps {
  userName: string;
  onNext: (friends: string[]) => void;
  onBack: () => void;
  initialFriends?: string[];
}

export function CommitmentScreen({ userName, onNext, onBack, initialFriends = ['', '', ''] }: CommitmentScreenProps) {
  const [friends, setFriends] = useState<string[]>(initialFriends);

  const handleFriendChange = (index: number, value: string) => {
    const newFriends = [...friends];
    newFriends[index] = value;
    setFriends(newFriends);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validFriends = friends.filter(f => f.trim());
    if (validFriends.length > 0) {
      onNext(friends);
    }
  };

  const filledCount = friends.filter(f => f.trim()).length;
  const canProceed = filledCount > 0;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col p-6 max-w-2xl mx-auto w-full">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900 mb-6 text-left"
        >
          ← Vissza
        </button>

        <div className="flex-1 flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Üdv, {userName}! 👋
            </h2>
            <p className="text-xl text-gray-600">
              Kit fogsz emlékeztetni a választásra?
            </p>
            <p className="text-base text-gray-500">
              Add meg 3 ismerősöd nevét, akiket mozgósítani szeretnél
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {[0, 1, 2].map((index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`friend-${index}`} className="text-lg flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-[#CE2939]" />
                  {index + 1}. személy
                  {friends[index]?.trim() && (
                    <Check className="w-5 h-5 text-[#477050] ml-auto" />
                  )}
                </Label>
                <Input
                  id={`friend-${index}`}
                  type="text"
                  value={friends[index]}
                  onChange={(e) => handleFriendChange(index, e.target.value)}
                  placeholder={`pl. ${index === 0 ? 'Kovács Anna' : index === 1 ? 'Nagy Péter' : 'Szabó Eszter'}`}
                  className="h-14 text-lg"
                />
              </div>
            ))}

            <div className="pt-4">
              <div className="mb-3 text-sm text-gray-600">
                {filledCount === 0 && 'Adj meg legalább 1 személyt'}
                {filledCount === 1 && '1 személy hozzáadva - adj meg többet!'}
                {filledCount === 2 && '2 személy hozzáadva - még 1!'}
                {filledCount === 3 && '🎉 Mind a 3 személy hozzáadva!'}
              </div>
              <Button
                type="submit"
                className="w-full h-14 text-lg bg-[#477050] hover:bg-[#3A5A40] text-white"
                disabled={!canProceed}
              >
                Tovább a tervezéshez
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
