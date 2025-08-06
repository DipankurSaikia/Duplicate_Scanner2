import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Trash2, 
  Filter,
  Search,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  Calendar,
  Clock
} from 'lucide-react';

export default function Logs() {
  const [filterLevel, setFilterLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const logs = [
    {
      id: '1',
      timestamp: '2023-11-20 14:32:15',
      level: 'info',
      category: 'scan',
      message: 'Started scanning directory /Applications',
      details: 'Initiated full scan with SHA-256 hashing enabled'
    },
    {
      id: '2',
      timestamp: '2023-11-20 14:32:45',
      level: 'success',
      category: 'scan',
      message: 'Found duplicate application: Visual Studio Code',
      details: 'Detected 3 instances with identical content hash: sha256:a1b2c3d4...'
    },
    {
      id: '3',
      timestamp: '2023-11-20 14:33:12',
      level: 'warning',
      category: 'scan',
      message: 'Unable to access file: /System/Applications/restricted.app',
      details: 'Permission denied - skipping system protected application'
    },
    {
      id: '4',
      timestamp: '2023-11-20 14:34:08',
      level: 'info',
      category: 'category',
      message: 'Auto-categorized 15 applications as Development Tools',
      details: 'Applied rule-based categorization using predefined rules'
    },
    {
      id: '5',
      timestamp: '2023-11-20 14:35:22',
      level: 'success',
      category: 'removal',
      message: 'Successfully removed duplicate application',
      details: 'Removed /Users/john/Downloads/Visual Studio Code.app (245.2 MB recovered)'
    },
    {
      id: '6',
      timestamp: '2023-11-20 14:35:23',
      level: 'info',
      category: 'backup',
      message: 'Created backup before removal',
      details: 'Backup saved to /Users/Backup/AppManager/2023-11-20_14-35-22/'
    },
    {
      id: '7',
      timestamp: '2023-11-20 14:36:45',
      level: 'error',
      category: 'removal',
      message: 'Failed to remove duplicate application',
      details: 'Error removing /Applications/Chrome-old.app: File is currently in use'
    },
    {
      id: '8',
      timestamp: '2023-11-20 14:38:15',
      level: 'success',
      category: 'scan',
      message: 'Scan completed successfully',
      details: 'Processed 156 applications, found 24 duplicates, recovered 2.4 GB'
    }
  ];

  const logLevels = [
    { value: 'all', label: 'All Levels', count: logs.length },
    { value: 'error', label: 'Errors', count: logs.filter(log => log.level === 'error').length },
    { value: 'warning', label: 'Warnings', count: logs.filter(log => log.level === 'warning').length },
    { value: 'success', label: 'Success', count: logs.filter(log => log.level === 'success').length },
    { value: 'info', label: 'Info', count: logs.filter(log => log.level === 'info').length }
  ];

  const categories = ['all', 'scan', 'removal', 'category', 'backup', 'config'];

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'border-l-red-500 bg-red-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'success':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
    const matchesSearch = searchTerm === '' || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const handleExportLogs = () => {
    const logData = filteredLogs.map(log => 
      `[${log.timestamp}] ${log.level.toUpperCase()} [${log.category}] ${log.message}\n${log.details}\n`
    ).join('\n');
    
    const blob = new Blob([logData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `app-manager-logs-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearLogs = () => {
    if (confirm('Are you sure you want to clear all logs? This action cannot be undone.')) {
      // Simulate clearing logs
      console.log('Clearing all logs');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Application Logs</h1>
          <p className="mt-2 text-gray-600">
            View system logs, scanning reports, and operation history
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExportLogs}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button
            onClick={handleClearLogs}
            className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors flex items-center"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </button>
        </div>
      </div>

      {/* Log Level Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {logLevels.map((level) => (
          <button
            key={level.value}
            onClick={() => setFilterLevel(level.value)}
            className={`p-4 rounded-lg border text-left transition-colors ${
              filterLevel === level.value
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="text-2xl font-bold">{level.count}</div>
            <div className="text-sm text-gray-600">{level.label}</div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Log Entries */}
      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className={`bg-white rounded-lg border-l-4 shadow-sm ${getLogColor(log.level)}`}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getLogIcon(log.level)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{log.message}</span>
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {log.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{log.details}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{log.timestamp.split(' ')[0]}</span>
                  <Clock className="w-3 h-3" />
                  <span>{log.timestamp.split(' ')[1]}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLogs.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No logs found</h3>
          <p className="text-gray-600">
            {searchTerm || filterLevel !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Logs will appear here when you perform operations.'}
          </p>
        </div>
      )}

      {/* Log Summary */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-2">Log Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-2xl font-bold">{logs.length}</div>
            <div className="text-gray-300">Total Entries</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">
              {logs.filter(log => log.level === 'success').length}
            </div>
            <div className="text-gray-300">Successful Operations</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">
              {logs.filter(log => log.level === 'error').length}
            </div>
            <div className="text-gray-300">Errors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">
              {logs.filter(log => log.level === 'warning').length}
            </div>
            <div className="text-gray-300">Warnings</div>
          </div>
        </div>
      </div>
    </div>
  );
}