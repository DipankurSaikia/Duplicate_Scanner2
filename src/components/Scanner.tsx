import React, { useState } from 'react';
import { 
  Search, 
  FolderOpen, 
  Play, 
  Pause, 
  Square,
  CheckCircle,
  AlertCircle,
  FileText,
  Clock,
  Loader
} from 'lucide-react';

export default function Scanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedDirectories, setSelectedDirectories] = useState([
    '/Applications',
    '/System/Applications',
    '/usr/local/bin'
  ]);

  const [scanResults, setScanResults] = useState({
    totalFiles: 0,
    duplicatesFound: 0,
    spaceToRecover: '0 MB',
    categories: 0
  });

  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanResults({
            totalFiles: 156,
            duplicatesFound: 24,
            spaceToRecover: '2.4 GB',
            categories: 8
          });
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handleStopScan = () => {
    setIsScanning(false);
    setScanProgress(0);
  };

  const addDirectory = () => {
    const newDir = prompt('Enter directory path:');
    if (newDir && !selectedDirectories.includes(newDir)) {
      setSelectedDirectories([...selectedDirectories, newDir]);
    }
  };

  const removeDirectory = (dirToRemove: string) => {
    setSelectedDirectories(selectedDirectories.filter(dir => dir !== dirToRemove));
  };

  const scanOptions = [
    {
      name: 'Deep Content Analysis',
      description: 'Analyze file contents using cryptographic hashing',
      enabled: true
    },
    {
      name: 'Include System Applications',
      description: 'Scan system directories for duplicate applications',
      enabled: false
    },
    {
      name: 'Analyze Dependencies',
      description: 'Check for duplicate shared libraries and frameworks',
      enabled: true
    },
    {
      name: 'Auto-categorize Results',
      description: 'Automatically categorize found applications using rules',
      enabled: true
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Application Scanner</h1>
        <p className="mt-2 text-gray-600">
          Scan directories for duplicate applications using content-based analysis
        </p>
      </div>

      {/* Scan Configuration */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <FolderOpen className="w-5 h-5 mr-2" />
            Scan Directories
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {selectedDirectories.map((directory, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-900 font-mono text-sm">{directory}</span>
                <button
                  onClick={() => removeDirectory(directory)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={addDirectory}
              className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              + Add Directory
            </button>
          </div>
        </div>
      </div>

      {/* Scan Options */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Scan Options</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scanOptions.map((option, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                <input
                  type="checkbox"
                  defaultChecked={option.enabled}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{option.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scan Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Scan Control</h2>
              <p className="text-sm text-gray-600">
                {isScanning 
                  ? `Scanning... ${scanProgress}% complete`
                  : 'Ready to start scanning for duplicate applications'
                }
              </p>
            </div>
            <div className="flex space-x-3">
              {!isScanning ? (
                <button
                  onClick={handleStartScan}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Scan
                </button>
              ) : (
                <button
                  onClick={handleStopScan}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                >
                  <Square className="w-4 h-4 mr-2" />
                  Stop Scan
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {isScanning && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-gray-900">{scanProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scan Results */}
      {scanProgress > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Scan Results
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{scanResults.totalFiles}</div>
                <div className="text-sm text-gray-600 mt-1">Files Scanned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{scanResults.duplicatesFound}</div>
                <div className="text-sm text-gray-600 mt-1">Duplicates Found</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{scanResults.spaceToRecover}</div>
                <div className="text-sm text-gray-600 mt-1">Space to Recover</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{scanResults.categories}</div>
                <div className="text-sm text-gray-600 mt-1">Categories</div>
              </div>
            </div>

            {scanProgress === 100 && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">Scan completed successfully!</span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Review the duplicates tab to manage found duplicate applications.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}