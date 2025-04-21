import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import IntroScene from './components/intro/IntroScene';
import VisualNovelScene from './components/novel/VisualNovelScene';
import SkillTree from './components/skills/SkillTree';
import QuestBoard from './components/quests/QuestBoard';
import WorldMap from './components/journey/WorldMap';
import TerminalContact from './components/contact/TerminalContact';
import Footer from './components/layout/Footer';
import CharacterCanvas from './components/character/CharacterCanvas';

function App() {
  return (
    <ThemeProvider>
      <div className="relative overflow-x-hidden">
        <Header />
        
        {/* Intro Scene */}
        <IntroScene />

        {/* About Scene */}
        <VisualNovelScene
          background="https://images.pexels.com/photos/2088233/pexels-photo-2088233.jpeg"
          dialog="Hai! Aku Fabian, seorang siswa RPL yang senang mengeksplorasi dunia pemrograman web. Mari ikuti perjalananku!"
          index={1}
        >
          <div className="flex items-center justify-center">
            <CharacterCanvas size={{ width: '200px', height: '300px' }} />
          </div>
        </VisualNovelScene>

        {/* Skills Tree Section */}
        <SkillTree />

        {/* Projects as Quest Board */}
        <QuestBoard />

        {/* Timeline as World Map */}
        <WorldMap />

        {/* Contact form as Terminal */}
        <TerminalContact />

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;