// components/ProfileCard.tsx
import Image from 'next/image';
import { Mail, MapPin, Calendar, Edit2 } from 'lucide-react';

interface Stats {
  label: string;
  value: number;
}

interface ProfileCardProps {
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  role?: string;
  location?: string;
  joinedDate?: string;
  stats?: Stats[];
  editable?: boolean;
  onEdit?: () => void;
}

export default function ProfileCard({
  name,
  email,
  bio,
  avatarUrl = '/default-avatar.png',
  role,
  location,
  joinedDate,
  stats,
  editable = false,
  onEdit
}: ProfileCardProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      
      {/* Profile Content */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="flex justify-between items-start">
          <div className="relative -mt-16 mb-4">
            <div className="relative w-32 h-32 rounded-full border-4 border-white overflow-hidden">
              <Image
                src={avatarUrl}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Edit Button */}
          {editable && (
            <button
              onClick={onEdit}
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Edit2 size={16} />
              Edit Profile
            </button>
          )}
        </div>

        {/* User Info */}
        <div className="mt-2">
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>
          {role && (
            <p className="text-lg text-gray-600 mt-1">{role}</p>
          )}
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>{email}</span>
          </div>
          
          {location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{location}</span>
            </div>
          )}
          
          {joinedDate && (
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Joined {joinedDate}</span>
            </div>
          )}
        </div>

        {/* Bio */}
        {bio && (
          <div className="mt-6">
            <p className="text-gray-700 leading-relaxed">{bio}</p>
          </div>
        )}

        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}