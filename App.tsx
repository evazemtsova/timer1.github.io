import { CountdownTimer } from './components/CountdownTimer';
import { ProgressBar } from './components/ProgressBar';
import backgroundImage from 'figma:asset/c86810021431d6b7b9233f5ac4dce1e069e3ba3f.png';

export default function App() {
  return (
    <div className="min-h-screen relative">
      {/* Основной фон с изображением листвы */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      />
      
      {/* Тонкий темный слой для контраста */}
      <div className="absolute inset-0 bg-black/15" />
      
      {/* Тонкие декоративные элементы для глубины */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-white/20 to-transparent rotate-12" />
        <div className="absolute bottom-1/3 right-1/4 w-px h-24 bg-gradient-to-t from-white/15 to-transparent -rotate-12" />
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white/30 rounded-full" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen py-16">
          
          {/* Компактная верхняя секция */}
          <div className="text-center mb-12 lg:mb-16 max-w-6xl w-full">
            <div className="space-y-6">
              {/* Заголовок */}
              <h1 className="font-mono text-5xl lg:text-7xl xl:text-8xl text-white/95 font-light tracking-wider leading-[0.9] drop-shadow-2xl uppercase">
                Обратный отсчет
              </h1>
              
              {/* Дата без рамки, с моноширинным шрифтом */}
              <p className="font-mono text-xl lg:text-2xl xl:text-3xl text-white/90 font-light tracking-wide drop-shadow-xl uppercase">
                до 1 марта 2026
              </p>
            </div>
          </div>
          
          {/* Прогресс-бар */}
          <div className="w-full mb-12 lg:mb-16">
            <ProgressBar />
          </div>
          
          {/* Главный таймер - центральный элемент */}
          <div className="w-full max-w-7xl">
            <CountdownTimer />
          </div>
          
        </div>
      </div>
    </div>
  );
}