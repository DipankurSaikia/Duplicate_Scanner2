import React from 'react';
import { 
  Trash2, 
  Folder, 
  Search, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Activity,
  HardDrive
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      name: 'Duplicate Applications',
      value: '24',
      change: '+12%',
      changeType: 'increase',
      icon: Trash2,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      name: 'Space to Recover',
      value: '2.4 GB',
      change: '+8%',
      changeType: 'increase',
      icon: HardDrive,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Categories',
      value: '12',
      change: '+3',
      changeType: 'increase',
      icon: Folder,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      name: 'Scanned Applications',
      value: '156',
      change: '+45',
      changeType: 'increase',
      icon: Search,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'scan',
      message: 'Completed scan of /Applications directory',
      timestamp: '5 minutes ago',
      icon: Search,
      iconColor: 'text-blue-500',
    },
    {
      id: 2,
      type: 'duplicate',
      message: 'Found 3 duplicate applications in Games category',
      timestamp: '12 minutes ago',
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
    },
    {
      id: 3,
      type: 'removal',
      message: 'Successfully removed 2 duplicate applications',
      timestamp: '1 hour ago',
      icon: CheckCircle,
      iconColor: 'text-green-500',
    },
    {
      id: 4,
      type: 'category',
      message: 'Added new rule for Development category',
      timestamp: '2 hours ago',
      icon: Folder,
      iconColor: 'text-purple-500',
    },
  ];

  const topCategories = [
    { name: 'Development Tools', count: 32, duplicates: 8, percentage: 75 },
    { name: 'Games', count: 28, duplicates: 6, percentage: 60 },
    { name: 'Productivity', count: 24, duplicates: 4, percentage: 45 },
    { name: 'Media & Graphics', count: 18, duplicates: 3, percentage: 35 },
    { name: 'Utilities', count: 15, duplicates: 2, percentage: 25 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Overview of your application management and duplicate detection
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-600 mt-1">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <Activity className="w-5 h-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full bg-gray-50`}>
                      <Icon className={`w-4 h-4 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center">
              <Folder className="w-5 h-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Top Categories</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {category.name}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{category.count} apps</span>
                        <span>•</span>
                        <span className="text-red-600">{category.duplicates} duplicates</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${category.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Ready to Clean Up?</h2>
        <p className="text-blue-100 mb-4">
          Start a new scan or review detected duplicates to free up space
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Start New Scan
          </button>
          <button className="bg-blue-500 bg-opacity-20 backdrop-blur-sm border border-blue-400 px-6 py-2 rounded-lg font-medium hover:bg-opacity-30 transition-colors">
            Review Duplicates
          </button>
        </div>
      </div>
    </div>
  );
}