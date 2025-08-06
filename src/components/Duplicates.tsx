import React, { useState } from 'react';
import { 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  Eye,
  FileText,
  HardDrive,
  Calendar,
  Filter,
  Search,
  MoreVertical
} from 'lucide-react';

export default function Duplicates() {
  const [selectedDuplicates, setSelectedDuplicates] = useState<Set<string>>(new Set());
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const duplicateGroups = [
    {
      id: '1',
      name: 'Visual Studio Code',
      category: 'Development',
      instances: [
        {
          id: '1a',
          path: '/Applications/Visual Studio Code.app',
          size: '245.2 MB',
          version: '1.84.2',
          lastModified: '2023-11-15',
          hash: 'sha256:a1b2c3d4...',
          keepThis: true
        },
        {
          id: '1b',
          path: '/Users/john/Downloads/Visual Studio Code.app',
          size: '245.2 MB',
          version: '1.84.2',
          lastModified: '2023-11-10',
          hash: 'sha256:a1b2c3d4...',
          keepThis: false
        },
        {
          id: '1c',
          path: '/Applications/VSCode-backup.app',
          size: '245.2 MB',
          version: '1.84.2',
          lastModified: '2023-11-08',
          hash: 'sha256:a1b2c3d4...',
          keepThis: false
        }
      ]
    },
    {
      id: '2',
      name: 'Chrome Browser',
      category: 'Web Browsers',
      instances: [
        {
          id: '2a',
          path: '/Applications/Google Chrome.app',
          size: '189.4 MB',
          version: '119.0.6045.105',
          lastModified: '2023-11-20',
          hash: 'sha256:x1y2z3w4...',
          keepThis: true
        },
        {
          id: '2b',
          path: '/Users/john/Desktop/Google Chrome.app',
          size: '189.4 MB',
          version: '119.0.6045.105',
          lastModified: '2023-11-18',
          hash: 'sha256:x1y2z3w4...',
          keepThis: false
        }
      ]
    },
    {
      id: '3',
      name: 'Photoshop 2024',
      category: 'Graphics & Design',
      instances: [
        {
          id: '3a',
          path: '/Applications/Adobe Photoshop 2024/Adobe Photoshop 2024.app',
          size: '2.1 GB',
          version: '25.0.0',
          lastModified: '2023-10-15',
          hash: 'sha256:p1q2r3s4...',
          keepThis: true
        },
        {
          id: '3b',
          path: '/Applications/Adobe Photoshop 2024 Copy.app',
          size: '2.1 GB',
          version: '25.0.0',
          lastModified: '2023-10-10',
          hash: 'sha256:p1q2r3s4...',
          keepThis: false
        }
      ]
    }
  ];

  const categories = ['all', 'Development', 'Web Browsers', 'Graphics & Design', 'Games', 'Productivity'];

  const handleSelectDuplicate = (instanceId: string) => {
    const newSelected = new Set(selectedDuplicates);
    if (newSelected.has(instanceId)) {
      newSelected.delete(instanceId);
    } else {
      newSelected.add(instanceId);
    }
    setSelectedDuplicates(newSelected);
  };

  const handleSelectAllInGroup = (groupId: string) => {
    const group = duplicateGroups.find(g => g.id === groupId);
    if (!group) return;

    const newSelected = new Set(selectedDuplicates);
    const duplicateInstances = group.instances.filter(instance => !instance.keepThis);
    
    const allSelected = duplicateInstances.every(instance => newSelected.has(instance.id));
    
    if (allSelected) {
      duplicateInstances.forEach(instance => newSelected.delete(instance.id));
    } else {
      duplicateInstances.forEach(instance => newSelected.add(instance.id));
    }
    
    setSelectedDuplicates(newSelected);
  };

  const handleRemoveSelected = () => {
    if (selectedDuplicates.size === 0) return;
    
    const confirmMessage = `Are you sure you want to remove ${selectedDuplicates.size} duplicate application(s)? This action cannot be undone.`;
    if (confirm(confirmMessage)) {
      // Simulate removal
      console.log('Removing duplicates:', Array.from(selectedDuplicates));
      setSelectedDuplicates(new Set());
    }
  };

  const filteredGroups = duplicateGroups.filter(group => {
    const matchesCategory = filterCategory === 'all' || group.category === filterCategory;
    const matchesSearch = searchTerm === '' || 
      group.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalSpaceToRecover = Array.from(selectedDuplicates).reduce((total, instanceId) => {
    for (const group of duplicateGroups) {
      const instance = group.instances.find(i => i.id === instanceId);
      if (instance) {
        const sizeInMB = parseFloat(instance.size.replace(/[^\d.]/g, ''));
        const multiplier = instance.size.includes('GB') ? 1024 : 1;
        return total + (sizeInMB * multiplier);
      }
    }
    return total;
  }, 0);

  const formatSpace = (mb: number) => {
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Duplicate Applications</h1>
        <p className="mt-2 text-gray-600">
          Manage and remove duplicate applications identified by content analysis
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-red-50 rounded-lg">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{duplicateGroups.length}</p>
              <p className="text-sm text-gray-600">Duplicate Groups</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{selectedDuplicates.size}</p>
              <p className="text-sm text-gray-600">Selected for Removal</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <HardDrive className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{formatSpace(totalSpaceToRecover)}</p>
              <p className="text-sm text-gray-600">Space to Recover</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleRemoveSelected}
              disabled={selectedDuplicates.size === 0}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove Selected ({selectedDuplicates.size})
            </button>
          </div>
        </div>
      </div>

      {/* Duplicate Groups */}
      <div className="space-y-6">
        {filteredGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                  <p className="text-sm text-gray-600">
                    {group.category} • {group.instances.length} instances found
                  </p>
                </div>
                <button
                  onClick={() => handleSelectAllInGroup(group.id)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Select All Duplicates
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {group.instances.map((instance) => (
                  <div
                    key={instance.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      instance.keepThis
                        ? 'border-green-200 bg-green-50'
                        : selectedDuplicates.has(instance.id)
                        ? 'border-red-200 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {!instance.keepThis && (
                          <input
                            type="checkbox"
                            checked={selectedDuplicates.has(instance.id)}
                            onChange={() => handleSelectDuplicate(instance.id)}
                            className="mt-1 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="font-mono text-sm text-gray-700">{instance.path}</span>
                            {instance.keepThis && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                <CheckCircle className="w-3 h-3 inline mr-1" />
                                Keep This
                              </span>
                            )}
                          </div>
                          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                            <div className="flex items-center">
                              <HardDrive className="w-3 h-3 mr-1" />
                              {instance.size}
                            </div>
                            <div className="flex items-center">
                              <FileText className="w-3 h-3 mr-1" />
                              v{instance.version}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {instance.lastModified}
                            </div>
                            <div className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {instance.hash.substring(0, 16)}...
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No duplicates found</h3>
          <p className="text-gray-600">
            {searchTerm || filterCategory !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Run a scan to detect duplicate applications.'}
          </p>
        </div>
      )}
    </div>
  );
}