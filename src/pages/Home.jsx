import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainFeature from "../components/MainFeature";

const Home = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [filter, setFilter] = useState("all");
  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };
  
  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "completed" ? "pending" : "completed" }
          : task
      )
    );
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.status === "completed";
    if (filter === "pending") return task.status === "pending";
    if (filter === "high") return task.priority === "high";
    return true;
  });
  
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === "completed").length,
    pending: tasks.filter(task => task.status === "pending").length,
    highPriority: tasks.filter(task => task.priority === "high").length
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Manage Your Tasks with Ease
          </h1>
          <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Stay organized and boost your productivity with TaskTide's intuitive task management system.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Tasks", value: taskStats.total, color: "bg-primary/10 dark:bg-primary/20" },
            { label: "Completed", value: taskStats.completed, color: "bg-secondary/10 dark:bg-secondary/20" },
            { label: "Pending", value: taskStats.pending, color: "bg-yellow-500/10 dark:bg-yellow-500/20" },
            { label: "High Priority", value: taskStats.highPriority, color: "bg-accent/10 dark:bg-accent/20" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.color} rounded-xl p-4 text-center shadow-sm border border-surface-200 dark:border-surface-700`}
            >
              <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-surface-600 dark:text-surface-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Filter Controls */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          {[
            { value: "all", label: "All Tasks" },
            { value: "pending", label: "Pending" },
            { value: "completed", label: "Completed" },
            { value: "high", label: "High Priority" }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${filter === option.value
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300"
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        {/* Main Feature Component */}
        <MainFeature 
          tasks={filteredTasks} 
          onAddTask={addTask} 
          onToggleStatus={toggleTaskStatus} 
          onDeleteTask={deleteTask}
        />
      </motion.div>
    </div>
  );
};

export default Home;