import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle, Trash2, Clock, AlertTriangle, Plus, X, Calendar, Edit3 } from "lucide-react";
import { format } from "date-fns";

const MainFeature = ({ tasks, onAddTask, onToggleStatus, onDeleteTask }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: ""
  });
  const [errors, setErrors] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!newTask.title.trim()) newErrors.title = "Title is required";
    if (!newTask.dueDate) newErrors.dueDate = "Due date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const taskToAdd = {
      id: editingTask ? editingTask.id : Date.now().toString(),
      ...newTask,
      status: editingTask ? editingTask.status : "pending",
      createdAt: editingTask ? editingTask.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onAddTask(taskToAdd);
    
    // Reset form
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      dueDate: ""
    });
    setErrors({});
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleEdit = (task) => {
    setNewTask({
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      dueDate: task.dueDate
    });
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const cancelForm = () => {
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      dueDate: ""
    });
    setErrors({});
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return <AlertTriangle size={14} className="text-red-600 dark:text-red-400" />;
      case "medium":
        return <Clock size={14} className="text-yellow-600 dark:text-yellow-400" />;
      default:
        return null;
    }
  };

  const taskVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  const formVariants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="space-y-6">
      {/* Task Form Toggle Button */}
      {!isFormOpen && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsFormOpen(true)}
          className="w-full py-3 px-4 bg-white dark:bg-surface-800 rounded-xl border-2 border-dashed border-surface-300 dark:border-surface-700 
          text-surface-500 dark:text-surface-400 flex items-center justify-center gap-2 hover:border-primary dark:hover:border-primary transition-colors"
        >
          <Plus size={18} />
          <span>Add New Task</span>
        </motion.button>
      )}

      {/* Task Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white dark:bg-surface-800 rounded-xl shadow-soft dark:shadow-none border border-surface-200 dark:border-surface-700 overflow-hidden"
          >
            <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
              <h3 className="font-semibold text-lg">
                {editingTask ? "Edit Task" : "Create New Task"}
              </h3>
              <button 
                onClick={cancelForm}
                className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500"
              >
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Task Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newTask.title}
                  onChange={handleChange}
                  placeholder="What needs to be done?"
                  className={`input-field ${errors.title ? "border-red-500 dark:border-red-500" : ""}`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleChange}
                  placeholder="Add details about this task..."
                  rows="3"
                  className="input-field resize-none"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={newTask.priority}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Due Date*
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleChange}
                    className={`input-field ${errors.dueDate ? "border-red-500 dark:border-red-500" : ""}`}
                  />
                  {errors.dueDate && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.dueDate}</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={cancelForm}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn btn-primary"
                >
                  {editingTask ? "Update Task" : "Add Task"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {tasks.length > 0 ? "Your Tasks" : "No tasks yet"}
        </h2>
        
        <AnimatePresence>
          {tasks.length === 0 && !isFormOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10 text-surface-500 dark:text-surface-400"
            >
              <p>You haven't added any tasks yet. Click the button above to get started!</p>
            </motion.div>
          )}
          
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              variants={taskVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className={`task-card ${
                task.status === "completed" 
                  ? "border-l-4 border-l-secondary" 
                  : task.priority === "high"
                  ? "border-l-4 border-l-red-500"
                  : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => onToggleStatus(task.id)}
                  className="mt-1 flex-shrink-0 text-surface-400 hover:text-primary dark:text-surface-500 dark:hover:text-primary transition-colors"
                >
                  {task.status === "completed" ? (
                    <CheckCircle size={20} className="text-secondary" />
                  ) : (
                    <Circle size={20} />
                  )}
                </button>
                
                <div className="flex-grow">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className={`font-medium ${
                      task.status === "completed" ? "line-through text-surface-500 dark:text-surface-500" : ""
                    }`}>
                      {task.title}
                    </h3>
                    
                    <div className="flex items-center gap-2">
                      <span className={`priority-badge flex items-center gap-1 ${getPriorityStyles(task.priority)}`}>
                        {getPriorityIcon(task.priority)}
                        <span>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
                      </span>
                      
                      <button
                        onClick={() => handleEdit(task)}
                        className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 hover:text-primary"
                      >
                        <Edit3 size={16} />
                      </button>
                      
                      <button
                        onClick={() => onDeleteTask(task.id)}
                        className="p-1.5 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-500 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {task.description && (
                    <p className={`mt-1 text-sm text-surface-600 dark:text-surface-400 ${
                      task.status === "completed" ? "line-through text-surface-500 dark:text-surface-500" : ""
                    }`}>
                      {task.description}
                    </p>
                  )}
                  
                  <div className="mt-2 flex items-center text-xs text-surface-500 dark:text-surface-500">
                    <Calendar size={14} className="mr-1" />
                    <span>Due: {format(new Date(task.dueDate), "MMM d, yyyy")}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainFeature;