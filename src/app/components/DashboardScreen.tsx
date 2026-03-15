import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Phone, MessageCircle, Check, Calendar, Users, Target, Trophy, Edit } from 'lucide-react';
import { Progress } from './ui/progress';

interface Friend {
  name: string;
  contacted: boolean;
  committed: boolean;
}

interface DashboardScreenProps {
  userName: string;
  friends: string[];
  scheduledTime: { date: string; time: string };
  onReset: () => void;
}

export function DashboardScreen({ userName, friends: initialFriends, scheduledTime, onReset }: DashboardScreenProps) {
  const [friends, setFriends] = useState<Friend[]>(() => {
    const saved = localStorage.getItem('friends-status');
    if (saved) {
      return JSON.parse(saved);
    }
    return initialFriends.filter(f => f.trim()).map(name => ({
      name,
      contacted: false,
      committed: false
    }));
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks-status');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, text: 'Tájékozódj a szavazóhelyedről', completed: false },
      { id: 2, text: 'Ellenőrizd a személyi igazolványod érvényességét', completed: false },
      { id: 3, text: 'Tervezd meg az utadat a szavazóhelyedre', completed: false },
    ];
  });

  useEffect(() => {
    localStorage.setItem('friends-status', JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem('tasks-status', JSON.stringify(tasks));
  }, [tasks]);

  const toggleFriendContacted = (index: number) => {
    const newFriends = [...friends];
    newFriends[index].contacted = !newFriends[index].contacted;
    setFriends(newFriends);
  };

  const toggleFriendCommitted = (index: number) => {
    const newFriends = [...friends];
    newFriends[index].committed = !newFriends[index].committed;
    setFriends(newFriends);
  };

  const toggleTask = (id: number) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const contactedCount = friends.filter(f => f.contacted).length;
  const committedCount = friends.filter(f => f.committed).length;
  const tasksCompleted = tasks.filter(t => t.completed).length;
  const totalProgress = ((contactedCount + committedCount + tasksCompleted) / (friends.length * 2 + tasks.length)) * 100;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-t-4 border-[#CE2939]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Szia, {userName}! 👋
              </h1>
              <p className="text-gray-600">
                Itt követheted a mozgósítási tervedet
              </p>
            </div>
            <button
              onClick={onReset}
              className="text-gray-500 hover:text-gray-700 p-2"
              title="Új tervezés"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Összes haladás</span>
              <span className="text-sm font-bold text-[#477050]">{Math.round(totalProgress)}%</span>
            </div>
            <Progress value={totalProgress} className="h-3" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-[#CE2939]">{contactedCount}/{friends.length}</div>
              <div className="text-xs text-gray-600 mt-1">Kapcsolatba lépve</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-[#477050]">{committedCount}/{friends.length}</div>
              <div className="text-xs text-gray-600 mt-1">Elkötelezte magát</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{tasksCompleted}/{tasks.length}</div>
              <div className="text-xs text-gray-600 mt-1">Feladat kész</div>
            </div>
          </div>
        </div>

        {/* Reminder */}
        <div className="bg-gradient-to-r from-[#CE2939] to-[#B02030] rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-6 h-6" />
            <h2 className="text-xl font-bold">Emlékeztető beállítva</h2>
          </div>
          <p className="text-lg">
            <span className="font-bold">{formatDate(scheduledTime.date)}</span> - <span className="font-bold">{scheduledTime.time}</span>
          </p>
          <p className="text-sm opacity-90 mt-2">
            Ekkor lépj kapcsolatba az ismerőseiddel!
          </p>
        </div>

        {/* Friends List */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-[#CE2939]" />
            <h2 className="text-2xl font-bold text-gray-900">
              Mozgósítandó személyek ({friends.length})
            </h2>
          </div>

          <div className="space-y-4">
            {friends.map((friend, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{friend.name}</h3>
                  {friend.contacted && friend.committed && (
                    <Trophy className="w-5 h-5 text-[#477050]" />
                  )}
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={friend.contacted}
                      onCheckedChange={() => toggleFriendContacted(index)}
                    />
                    <span className={friend.contacted ? 'text-gray-500 line-through' : 'text-gray-700'}>
                      Kapcsolatba léptem
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox
                      checked={friend.committed}
                      onCheckedChange={() => toggleFriendCommitted(index)}
                    />
                    <span className={friend.committed ? 'text-gray-500 line-through' : 'text-gray-700'}>
                      Elkötelezte magát
                    </span>
                  </label>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-[#477050] text-[#477050] hover:bg-[#477050] hover:text-white"
                      onClick={() => window.open(`tel:${friend.name}`, '_self')}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Hívás
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-[#CE2939] text-[#CE2939] hover:bg-[#CE2939] hover:text-white"
                      onClick={() => window.open(`sms:${friend.name}`, '_self')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Üzenet
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-[#477050]" />
            <h2 className="text-2xl font-bold text-gray-900">
              Saját feladataim
            </h2>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <label
                key={task.id}
                className="flex items-start gap-3 p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-all"
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="mt-1"
                />
                <span className={`flex-1 text-lg ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                  {task.text}
                </span>
                {task.completed && (
                  <Check className="w-5 h-5 text-[#477050]" />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Election Day Reminder */}
        <div className="bg-gradient-to-br from-[#477050] to-[#3A5A40] rounded-2xl shadow-lg p-8 text-white text-center">
          <div className="text-5xl font-bold mb-3">Április 12</div>
          <div className="text-xl mb-2">Választás napja</div>
          <div className="text-sm opacity-90">Ne feledd: mindenki számít! 🇭🇺</div>
        </div>
      </div>
    </div>
  );
}
