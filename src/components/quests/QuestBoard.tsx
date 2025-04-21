import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useScrollScene } from '../../hooks/useScrollScene';
import { Trophy, Flame, Shield, Rocket, Code, Star } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  skills: string[];
  xpReward: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
  completed: boolean;
}

const quests: Quest[] = [
  {
    id: 'q1',
    title: 'School Management System',
    description: 'Developed a complete system for managing student records, attendance, and grades',
    skills: ['PHP', 'Laravel', 'MySQL'],
    xpReward: 500,
    difficulty: 'Hard',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
    completed: true,
  },
  {
    id: 'q2',
    title: 'E-commerce Platform',
    description: 'Created a fully functional online shop with product catalog and cart',
    skills: ['Laravel', 'JavaScript', 'Bootstrap'],
    xpReward: 400,
    difficulty: 'Medium',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
    completed: true,
  },
  {
    id: 'q3',
    title: 'Portfolio Website',
    description: 'Designed and developed a personal portfolio website with animations',
    skills: ['HTML', 'CSS', 'JavaScript'],
    xpReward: 200,
    difficulty: 'Easy',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    completed: true,
  },
  {
    id: 'q4',
    title: 'Mobile-First Blog',
    description: 'Responsive blog with dynamic content loading and mobile optimization',
    skills: ['PHP', 'JavaScript', 'CSS3'],
    xpReward: 350,
    difficulty: 'Medium',
    image: 'https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg',
    completed: false,
  },
];

const QuestBoard: React.FC = () => {
  const { theme } = useTheme();
  const [sectionRef, isInView] = useScrollScene<HTMLDivElement>({
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getDifficultyIcon = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
      case 'Easy':
        return <Shield className="text-green-500" size={18} />;
      case 'Medium':
        return <Flame className="text-amber-500" size={18} />;
      case 'Hard':
        return <Rocket className="text-red-500" size={18} />;
    }
  };

  return (
    <section
      id="quests"
      ref={sectionRef}
      className={`min-h-screen py-20 px-4 transition-colors duration-500 ${
        theme === 'day' 
          ? 'bg-pastel-purple/30 text-cyber-black' 
          : 'bg-cyber-black text-white'
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`font-cyber text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'day' ? 'text-cyber-purple' : 'text-cyber-pink'
          }`}>
            Quest Board
          </h2>
          <p className="font-body text-lg max-w-2xl mx-auto">
            Completed projects and future missions that await. Each quest represents a challenge overcome or to be conquered.
          </p>
        </motion.div>

        {/* Quest board */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {quests.map((quest) => (
            <motion.div
              key={quest.id}
              className={`rounded-lg overflow-hidden ${
                theme === 'day'
                  ? 'bg-white shadow-lg'
                  : 'bg-cyber-black border border-cyber-purple/50'
              }`}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={quest.image}
                  alt={quest.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {quest.completed && (
                  <div className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-cyber font-bold flex items-center ${
                    theme === 'day' 
                      ? 'bg-cyber-purple text-white' 
                      : 'bg-cyber-pink text-cyber-black'
                  }`}>
                    <Trophy size={14} className="mr-1" />
                    <span>Completed</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-1/2"></div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-cyber text-xl font-bold ${
                    theme === 'day' ? 'text-cyber-purple' : 'text-cyber-pink'
                  }`}>
                    {quest.title}
                  </h3>
                  <div className="flex items-center">
                    {getDifficultyIcon(quest.difficulty)}
                    <span className="text-xs ml-1">{quest.difficulty}</span>
                  </div>
                </div>

                <p className="font-body mb-4 text-sm">
                  {quest.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {quest.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`text-xs px-2 py-1 rounded-full font-terminal ${
                        theme === 'day'
                          ? 'bg-pastel-blue text-cyber-blue'
                          : 'bg-cyber-purple/20 text-cyber-pink border border-cyber-pink/30'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className={`flex items-center text-sm font-cyber ${
                  theme === 'day' ? 'text-cyber-blue' : 'text-cyber-teal'
                }`}>
                  <Star size={16} className="mr-1" />
                  <span>XP Reward: {quest.xpReward}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default QuestBoard;