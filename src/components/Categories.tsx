import React, { useState } from 'react';
import { Folder, Plus, Edit3, Trash2, Save, X, FileText, Filter, Code, Gamepad2, Briefcase, Palette, PenTool as Tool } from 'lucide-react';

export default function Categories() {
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Development Tools',
      icon: 'Code',
      color: 'blue',
      rules: [
        'Contains "code", "IDE", or "developer" in name',
        'Located in /Developer/ directory',
        'File extension matches common dev tools'
      ],
      applications: 32,
      description: 'Programming and development applications'
    },
    {
      id: '2',
      name: 'Games',
      icon: 'Gamepad2',
      color: 'green',
      rules: [
        'Contains "game" in name or description',
        'Located in ~/Games/ directory',
        'Executable has game-related metadata'
      ],
      applications: 18,
      description: 'Gaming applications and entertainment'
    },
    {
      id: '3',
      name: 'Productivity',
      icon: 'Briefcase',
      color: 'purple',
      rules: [
        'Office suite applications',
        'Note-taking and document editors',
        'Task and project management tools'
      ],
      applications: 24,
      description: 'Office and productivity applications'
    },
    {
      id: '4',
      name: 'Graphics & Design',
      icon: 'Palette',
      color: 'pink',
      rules: [
        'Adobe Creative Suite applications',
        'Image and video editing software',
        'Contains "photo", "design", or "graphics" in name'
      ],
      applications: 15,
      description: 'Creative and design software'
    }
  ]);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: 'Folder',
    color: 'gray',
    rules: ['']
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const iconOptions = [
    { name: 'Folder', component: Folder },
    { name: 'Code', component: Code },
    { name: 'Gamepad2', component: Gamepad2 },
    { name: 'Briefcase', component: Briefcase },
    { name: 'Palette', component: Palette },
    { name: 'Tool', component: Tool }
  ];

  const colorOptions = [
    { name: 'blue', bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
    { name: 'green', bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' },
    { name: 'purple', bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
    { name: 'pink', bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200' },
    { name: 'yellow', bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-200' },
    { name: 'gray', bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' }
  ];

  const getIcon = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.name === iconName);
    return iconOption ? iconOption.component : Folder;
  };

  const getColorClasses = (colorName: string) => {
    return colorOptions.find(color => color.name === colorName) || colorOptions[0];
  };

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return;

    const category = {
      id: Date.now().toString(),
      name: newCategory.name,
      description: newCategory.description,
      icon: newCategory.icon,
      color: newCategory.color,
      rules: newCategory.rules.filter(rule => rule.trim() !== ''),
      applications: 0
    };

    setCategories([...categories, category]);
    setNewCategory({ name: '', description: '', icon: 'Folder', color: 'gray', rules: [''] });
    setShowAddForm(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const addRule = (rules: string[], setRules: (rules: string[]) => void) => {
    setRules([...rules, '']);
  };

  const updateRule = (index: number, value: string, rules: string[], setRules: (rules: string[]) => void) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const removeRule = (index: number, rules: string[], setRules: (rules: string[]) => void) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Application Categories</h1>
          <p className="mt-2 text-gray-600">
            Define rules to automatically categorize applications
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </button>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Add New Category</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe this category"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <select
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon.name} value={icon.name}>
                        {icon.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <select
                    value={newCategory.color}
                    onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {colorOptions.map(color => (
                      <option key={color.name} value={color.name}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categorization Rules
              </label>
              <div className="space-y-2">
                {newCategory.rules.map((rule, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={rule}
                      onChange={(e) => updateRule(index, e.target.value, newCategory.rules, (rules) => setNewCategory({ ...newCategory, rules }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter categorization rule"
                    />
                    <button
                      onClick={() => removeRule(index, newCategory.rules, (rules) => setNewCategory({ ...newCategory, rules }))}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addRule(newCategory.rules, (rules) => setNewCategory({ ...newCategory, rules }))}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  + Add Rule
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCategory}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Category
            </button>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = getIcon(category.icon);
          const colorClasses = getColorClasses(category.color);

          return (
            <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colorClasses.bg}`}>
                    <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditing(category.id)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{category.applications} applications</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${colorClasses.bg} ${colorClasses.text}`}>
                    {category.rules.length} rules
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                    <Filter className="w-4 h-4 mr-1" />
                    Rules
                  </h4>
                  <div className="space-y-1">
                    {category.rules.slice(0, 2).map((rule, index) => (
                      <p key={index} className="text-xs text-gray-500">• {rule}</p>
                    ))}
                    {category.rules.length > 2 && (
                      <p className="text-xs text-gray-400">+{category.rules.length - 2} more rules</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {categories.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Folder className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No categories defined</h3>
          <p className="text-gray-600 mb-4">
            Create categories to automatically organize your applications
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your First Category
          </button>
        </div>
      )}
    </div>
  );
}