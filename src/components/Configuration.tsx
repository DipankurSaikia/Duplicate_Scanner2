import React, { useState } from 'react';
import { 
  Settings, 
  FolderOpen, 
  Shield, 
  Database,
  Bell,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Plus,
  Trash2
} from 'lucide-react';

export default function Configuration() {
  const [config, setConfig] = useState({
    scanning: {
      maxFileSize: '10',
      hashAlgorithm: 'sha256',
      includeHidden: false,
      followSymlinks: false,
      excludeSystemApps: true,
      scanDepth: '5'
    },
    storage: {
      backupBeforeRemoval: true,
      backupLocation: '/Users/Backup/AppManager',
      retainBackups: '30',
      compressBackups: true
    },
    notifications: {
      scanComplete: true,
      duplicatesFound: true,
      removalComplete: true,
      errors: true
    },
    advanced: {
      threadCount: '4',
      cacheResults: true,
      cacheExpiry: '7',
      logLevel: 'info'
    }
  });

  const [scanDirectories, setScanDirectories] = useState([
    '/Applications',
    '/System/Applications',
    '/usr/local/bin',
    '~/Applications'
  ]);

  const [excludePatterns, setExcludePatterns] = useState([
    '*.log',
    '*.tmp',
    '*cache*',
    '*.DS_Store'
  ]);

  const [hasChanges, setHasChanges] = useState(false);

  const handleConfigChange = (section: string, key: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSaveConfig = () => {
    // Simulate saving configuration
    console.log('Saving configuration:', config);
    setHasChanges(false);
    // Show success message
  };

  const handleResetConfig = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      // Reset to default values
      setHasChanges(false);
    }
  };

  const addDirectory = () => {
    const newDir = prompt('Enter directory path:');
    if (newDir && !scanDirectories.includes(newDir)) {
      setScanDirectories([...scanDirectories, newDir]);
      setHasChanges(true);
    }
  };

  const removeDirectory = (index: number) => {
    setScanDirectories(scanDirectories.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  const addExcludePattern = () => {
    const pattern = prompt('Enter exclude pattern:');
    if (pattern && !excludePatterns.includes(pattern)) {
      setExcludePatterns([...excludePatterns, pattern]);
      setHasChanges(true);
    }
  };

  const removeExcludePattern = (index: number) => {
    setExcludePatterns(excludePatterns.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuration</h1>
          <p className="mt-2 text-gray-600">
            Customize application scanning and management settings
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleResetConfig}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </button>
          <button
            onClick={handleSaveConfig}
            disabled={!hasChanges}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Changes Alert */}
      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <span className="text-yellow-800 font-medium">You have unsaved changes</span>
          </div>
        </div>
      )}

      {/* Scan Directories */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center">
            <FolderOpen className="w-5 h-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Scan Directories</h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Configure which directories to scan for applications
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {scanDirectories.map((directory, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-mono text-sm text-gray-900">{directory}</span>
                <button
                  onClick={() => removeDirectory(index)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addDirectory}
              className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Directory
            </button>
          </div>
        </div>
      </div>

      {/* Scanning Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center">
            <Settings className="w-5 h-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Scanning Settings</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum File Size (GB)
              </label>
              <input
                type="number"
                value={config.scanning.maxFileSize}
                onChange={(e) => handleConfigChange('scanning', 'maxFileSize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hash Algorithm
              </label>
              <select
                value={config.scanning.hashAlgorithm}
                onChange={(e) => handleConfigChange('scanning', 'hashAlgorithm', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="md5">MD5</option>
                <option value="sha1">SHA-1</option>
                <option value="sha256">SHA-256</option>
                <option value="sha512">SHA-512</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scan Depth (levels)
              </label>
              <input
                type="number"
                value={config.scanning.scanDepth}
                onChange={(e) => handleConfigChange('scanning', 'scanDepth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thread Count
              </label>
              <input
                type="number"
                value={config.advanced.threadCount}
                onChange={(e) => handleConfigChange('advanced', 'threadCount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.scanning.includeHidden}
                onChange={(e) => handleConfigChange('scanning', 'includeHidden', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Include hidden files and applications</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.scanning.followSymlinks}
                onChange={(e) => handleConfigChange('scanning', 'followSymlinks', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Follow symbolic links</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.scanning.excludeSystemApps}
                onChange={(e) => handleConfigChange('scanning', 'excludeSystemApps', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Exclude system applications from removal</label>
            </div>
          </div>
        </div>
      </div>

      {/* Exclude Patterns */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Exclude Patterns</h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            File patterns to exclude from scanning
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {excludePatterns.map((pattern, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-mono text-sm text-gray-900">{pattern}</span>
                <button
                  onClick={() => removeExcludePattern(index)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addExcludePattern}
              className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Pattern
            </button>
          </div>
        </div>
      </div>

      {/* Storage & Backup */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center">
            <Database className="w-5 h-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Storage & Backup</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Backup Location
              </label>
              <input
                type="text"
                value={config.storage.backupLocation}
                onChange={(e) => handleConfigChange('storage', 'backupLocation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Retain Backups (days)
              </label>
              <input
                type="number"
                value={config.storage.retainBackups}
                onChange={(e) => handleConfigChange('storage', 'retainBackups', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.storage.backupBeforeRemoval}
                onChange={(e) => handleConfigChange('storage', 'backupBeforeRemoval', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Create backup before removing applications</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.storage.compressBackups}
                onChange={(e) => handleConfigChange('storage', 'compressBackups', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Compress backup files</label>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.notifications.scanComplete}
                onChange={(e) => handleConfigChange('notifications', 'scanComplete', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Scan completion</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.notifications.duplicatesFound}
                onChange={(e) => handleConfigChange('notifications', 'duplicatesFound', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Duplicates found</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.notifications.removalComplete}
                onChange={(e) => handleConfigChange('notifications', 'removalComplete', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Removal completion</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.notifications.errors}
                onChange={(e) => handleConfigChange('notifications', 'errors', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Errors and warnings</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}