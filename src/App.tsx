import { useState, useEffect, useCallback } from 'react';
import { Menu, X, MapPin, Phone, Instagram, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MEDIA_ASSETS = {
  logo: '/midias/imagem.logo.jpg',
  heroVideo: '/midias/video.hero.mp4',
  heroPoster: '/midias/imagem.hero-poster.jpg',
  oVillagio: '/midias/imagem.o-villagio.jpg',
  oEmpreendimento: '/midias/imagem.o-empreendimento.jpg',
  comodidades: {
    portaria: '/midias/imagem.comodidade-portaria.jpg',
    lazerNatureza: '/midias/imagem.comodidade-lazer-natureza.jpg',
    beachTennis: '/midias/imagem.comodidade-beach-tennis.jpg',
    academiaArLivre: '/midias/imagem.comodidade-academia-ar-livre.jpg',
    miniMercado: '/midias/imagem.comodidade-mini-mercado.jpg',
    petPlace: '/midias/imagem.comodidade-pet-place.jpg',
    parquinhoInfantil: '/midias/imagem.comodidade-parquinho-infantil.jpg',
    espacoZen: '/midias/imagem.comodidade-espaco-zen.jpg',
  },
  galeria: [
    '/midias/imagem.galeria-01.jpg',
    '/midias/imagem.galeria-02.jpg',
    '/midias/imagem.galeria-03.jpg',
    '/midias/imagem.galeria-04.jpg',
    '/midias/imagem.galeria-05.jpg',
    '/midias/imagem.galeria-06.jpg',
  ],
  plantas: {
    inferior: '/midias/imagem.planta-inferior.jpg',
    superior: '/midias/imagem.planta-superior.jpg',
  },
  localizacaoVideo: '/midias/video.localizacao.mp4',
  localizacaoPoster: '/midias/imagem.localizacao-poster.jpg',
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, selectedImage]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedImage(null);
      setIsMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="font-sans bg-[#F9F6F0] text-gray-800 antialiased selection:bg-[#A64322] selection:text-white">
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 top-0 left-0 transition-all duration-500 ${
          isScrolled ? 'bg-white py-4 shadow-sm' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="flex flex-col z-50">
            <img 
              src={MEDIA_ASSETS.logo} 
              alt="Villagio Entre Verdes" 
              className={`h-12 w-auto object-contain transition-all duration-500 ${isScrolled ? 'opacity-100' : 'opacity-90 brightness-0 invert'}`}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                e.currentTarget.nextElementSibling?.classList.add('flex');
              }}
            />
            <div className="hidden flex-col">
              <span className={`font-serif text-2xl md:text-3xl font-semibold tracking-widest transition-colors duration-500 ${isScrolled ? 'text-[#2C4C3B]' : 'text-white'}`}>
                VILLAGIO
              </span>
              <span className={`text-[0.65rem] md:text-xs tracking-[0.3em] font-light transition-colors duration-500 ${isScrolled ? 'text-[#2C4C3B]/70' : 'text-white/80'}`}>
                ENTRE VERDES
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {[
              { name: 'O Villagio', id: 'o-villagio' },
              { name: 'O Empreendimento', id: 'o-empreendimento' },
              { name: 'Comodidades', id: 'comodidades' },
              { name: 'Galeria', id: 'galeria' },
              { name: 'Planta 115m²', id: 'planta-115m2' },
              { name: 'Localização', id: 'localizacao' }
            ].map((item) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                className={`text-xs tracking-[0.15em] uppercase hover:text-[#A64322] transition-colors duration-300 ${isScrolled ? 'text-gray-600' : 'text-white/90'}`}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#agende-sua-visita"
              className={`px-8 py-3 rounded-full text-xs tracking-widest uppercase transition-all duration-300 ${
                isScrolled 
                  ? 'bg-[#A64322] text-white hover:bg-[#8A361A]' 
                  : 'bg-white text-[#A64322] hover:bg-white/90'
              }`}
            >
              Agende sua visita
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden z-50 focus:outline-none transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? 'text-gray-800' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 w-full h-screen bg-white flex flex-col items-center justify-center space-y-8 pt-20 z-40"
            >
              {[
                { name: 'O Villagio', id: 'o-villagio' },
                { name: 'O Empreendimento', id: 'o-empreendimento' },
                { name: 'Comodidades', id: 'comodidades' },
                { name: 'Galeria', id: 'galeria' },
                { name: 'Planta 115m²', id: 'planta-115m2' },
                { name: 'Localização', id: 'localizacao' },
                { name: 'Plantão de Vendas', id: 'plantao-de-vendas' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={`#${item.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif text-[#2C4C3B] hover:text-[#A64322] transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#agende-sua-visita"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 bg-[#A64322] text-white px-10 py-4 rounded-full text-sm tracking-widest uppercase"
              >
                Agende sua visita
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={MEDIA_ASSETS.heroPoster}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          >
            <source src={MEDIA_ASSETS.heroVideo} type="video/mp4" />
          </video>
          <motion.img 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80" 
            alt="Villagio Entre Verdes" 
            className="hidden w-full h-full object-cover" 
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <span className="font-serif text-3xl md:text-4xl text-white/95 tracking-widest uppercase">Villagio</span>
            <br/>
            <span className="font-sans text-xs md:text-sm text-white/80 tracking-[0.5em] uppercase font-light mt-2 block">Entre Verdes</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] text-white font-serif font-light mb-8 leading-[1.1] tracking-tight"
          >
            A natureza como<br/><span className="italic text-white/90">extensão da sua casa</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/80 font-light mb-16 tracking-[0.3em] uppercase"
          >
            Viva a Serenidade
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a href="#agende-sua-visita" className="inline-flex items-center justify-center text-center bg-[#A64322] hover:bg-[#8A361A] text-white px-12 py-4 rounded-full text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.02] shadow-xl w-full sm:w-auto">
              Agende sua visita
            </a>
            <a href="https://wa.me/5519998836542" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-transparent border border-white/40 hover:bg-white/10 text-white px-12 py-4 rounded-full text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.02] w-full sm:w-auto">
              Fale com um corretor
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-white/40 text-[0.65rem] uppercase tracking-[0.4em] mb-4">Descubra</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section id="o-villagio" className="py-32 md:py-48 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:col-span-5 order-2 lg:order-1"
            >
              <h2 className="text-5xl md:text-7xl font-serif text-[#2C4C3B] mb-12 leading-tight tracking-tight">
                O Villagio<br/><span className="italic text-[#A64322]">Entre Verdes</span>
              </h2>
              <div className="w-12 h-[1px] bg-[#A64322] mb-12"></div>
              <p className="text-2xl text-[#2C4C3B] font-serif italic mb-8">
                A tradução de um novo ritmo de viver.
              </p>
              <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
                Um encontro entre natureza e sofisticação, onde o tempo desacelera, o bem-estar se torna essencial e o morar ganha significado.
              </p>
              <p className="text-lg text-gray-600 font-light leading-relaxed">
                Um espaço que resgata o senso de comunidade, sem renunciar à privacidade, e transforma o cotidiano em uma experiência mais consciente, equilibrada e valiosa.
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:col-span-7 order-1 lg:order-2 h-[60vh] md:h-[80vh] overflow-hidden bg-gray-100"
            >
              <img 
                src={MEDIA_ASSETS.oVillagio} 
                alt="O Villagio Entre Verdes" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" 
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="o-empreendimento" className="py-32 md:py-48 bg-[#F9F6F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:col-span-7 relative h-[70vh] md:h-[90vh] cursor-pointer group overflow-hidden bg-gray-100"
              onClick={() => setSelectedImage(MEDIA_ASSETS.oEmpreendimento)}
            >
              <img 
                src={MEDIA_ASSETS.oEmpreendimento} 
                alt="O Empreendimento" 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
                  // Update onClick to use fallback if image fails
                  e.currentTarget.parentElement!.onclick = () => setSelectedImage("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80");
                }}
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="bg-white/90 text-[#2C4C3B] px-8 py-4 rounded-full flex items-center backdrop-blur-md uppercase tracking-widest text-sm">
                  <ZoomIn className="w-4 h-4 mr-3" /> Ampliar
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:col-span-5"
            >
              <h2 className="text-5xl md:text-7xl font-serif text-[#2C4C3B] mb-12 leading-tight tracking-tight">
                O<br/>Empreendimento
              </h2>
              <div className="w-12 h-[1px] bg-[#A64322] mb-12"></div>
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-8">
                O Villagio Entre Verdes foi planejado com foco em qualidade construtiva, conforto e valorização.
              </p>
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-8">
                Com apenas 20 unidades, oferece casas de dois pavimentos, 3 suítes e quintal privativo, com plantas inteligentes e excelente aproveitamento dos espaços. A obra segue um padrão elevado de execução, com acabamentos de qualidade e atenção aos detalhes.
              </p>
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-16">
                Um empreendimento sólido, pensado para entregar segurança, durabilidade e bem-estar em cada metro quadrado.
              </p>
              
              <div className="grid grid-cols-2 gap-y-12 gap-x-8">
                <div className="border-l border-[#A64322] pl-6">
                  <div className="text-4xl md:text-5xl font-serif text-[#2C4C3B] mb-2">20</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-500">Casas Exclusivas</div>
                </div>
                <div className="border-l border-[#A64322] pl-6">
                  <div className="text-4xl md:text-5xl font-serif text-[#2C4C3B] mb-2">115m²</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-500">Com quintal privativo</div>
                </div>
                <div className="border-l border-[#A64322] pl-6">
                  <div className="text-4xl md:text-5xl font-serif text-[#2C4C3B] mb-2">3</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-500">Suítes</div>
                </div>
                <div className="border-l border-[#A64322] pl-6">
                  <div className="text-4xl md:text-5xl font-serif text-[#2C4C3B] mb-2">2</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-500">Vagas exclusivas</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="comodidades" className="py-32 md:py-48 bg-white text-[#2C4C3B]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-serif mb-8 tracking-tight">As Comodidades</h2>
            <div className="w-12 h-[1px] bg-[#A64322] mx-auto"></div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "Portaria remota e segurança 24 horas", img: MEDIA_ASSETS.comodidades.portaria },
              { title: "Área de lazer integrada à natureza", img: MEDIA_ASSETS.comodidades.lazerNatureza },
              { title: "Quadra de beach tennis", img: MEDIA_ASSETS.comodidades.beachTennis },
              { title: "Academia ao ar livre", img: MEDIA_ASSETS.comodidades.academiaArLivre },
              { title: "Mini mercado*", img: MEDIA_ASSETS.comodidades.miniMercado },
              { title: "Pet place", img: MEDIA_ASSETS.comodidades.petPlace },
              { title: "Parquinho infantil", img: MEDIA_ASSETS.comodidades.parquinhoInfantil },
              { title: "Espaço zen", img: MEDIA_ASSETS.comodidades.espacoZen }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="group relative bg-[#F9F6F0] overflow-hidden transition-all duration-500 flex items-center justify-center text-center h-48 border border-transparent hover:border-[#2C4C3B]"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-[#2C4C3B] opacity-0 group-hover:opacity-80 transition-opacity duration-500 mix-blend-multiply"></div>
                <h3 className="relative z-10 text-lg font-serif text-[#2C4C3B] group-hover:text-white transition-colors duration-500 leading-relaxed px-6">{item.title}</h3>
              </motion.div>
            ))}
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center text-xs text-gray-400 mt-12 font-light tracking-wide uppercase"
          >
            *Preparado para mini mercado
          </motion.p>
        </div>
      </section>

      {/* Gallery Section (Editorial Layout) */}
      <section id="galeria" className="py-32 md:py-48 bg-[#F9F6F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-32 text-center"
          >
            <h2 className="text-5xl md:text-7xl font-serif text-[#2C4C3B] mb-8 tracking-tight">Galeria</h2>
            <div className="w-12 h-[1px] bg-[#A64322] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
            {/* 1 Large Dominant */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-12 h-[60vh] md:h-[85vh] cursor-pointer overflow-hidden group relative bg-gray-100"
              onClick={() => setSelectedImage(MEDIA_ASSETS.galeria[0])}
            >
              <img 
                src={MEDIA_ASSETS.galeria[0]} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                alt="Galeria 1" 
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
                  e.currentTarget.parentElement!.onclick = () => setSelectedImage("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80");
                }}
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <ZoomIn className="text-white w-12 h-12" />
              </div>
            </motion.div>
            
            {/* 2 Medium */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-6 h-[40vh] md:h-[60vh] cursor-pointer overflow-hidden group relative bg-gray-100"
              onClick={() => setSelectedImage(MEDIA_ASSETS.galeria[1])}
            >
              <img 
                src={MEDIA_ASSETS.galeria[1]} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                alt="Galeria 2" 
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                  e.currentTarget.parentElement!.onclick = () => setSelectedImage("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80");
                }}
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <ZoomIn className="text-white w-10 h-10" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:col-span-6 h-[40vh] md:h-[60vh] cursor-pointer overflow-hidden group relative bg-gray-100"
              onClick={() => setSelectedImage(MEDIA_ASSETS.galeria[2])}
            >
              <img 
                src={MEDIA_ASSETS.galeria[2]} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                alt="Galeria 3" 
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                  e.currentTarget.parentElement!.onclick = () => setSelectedImage("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80");
                }}
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <ZoomIn className="text-white w-10 h-10" />
              </div>
            </motion.div>

            {/* 1 Wide */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-12 h-[50vh] md:h-[70vh] cursor-pointer overflow-hidden group relative bg-gray-100"
              onClick={() => setSelectedImage(MEDIA_ASSETS.galeria[3])}
            >
              <img 
                src={MEDIA_ASSETS.galeria[3]} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                alt="Galeria 4" 
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
                  e.currentTarget.parentElement!.onclick = () => setSelectedImage("https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80");
                }}
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <ZoomIn className="text-white w-12 h-12" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floor Plan Section */}
      <section id="planta-115m2" className="py-32 md:py-48 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:col-span-5"
            >
              <h2 className="text-5xl md:text-7xl font-serif text-[#2C4C3B] mb-12 tracking-tight">Planta 115m²</h2>
              <div className="w-12 h-[1px] bg-[#A64322] mb-12"></div>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
                A planta de 115m² do Villagio Entre Verdes foi pensada para unir conforto, funcionalidade e sofisticação. Com dois pavimentos, separa de forma inteligente as áreas sociais e íntimas, garantindo mais privacidade no dia a dia.
              </p>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed font-light">
                No piso inferior, os ambientes são integrados, com sala de estar, jantar e cozinha em conceito aberto, trazendo amplitude e iluminação natural. No superior, são 3 suítes bem distribuídas, com destaque para a suíte master, que conta com espaço para closet.
              </p>
              <p className="text-xl text-gray-600 mb-16 leading-relaxed font-light italic">
                Um projeto que valoriza cada detalhe para proporcionar uma rotina mais prática, confortável e elegante.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-16">
                {[
                  "3 suítes",
                  "2 vagas",
                  "Closet",
                  "Cozinha integrada",
                  "Quintal privativo",
                  "Preparação para ar-condicionado"
                ].map((item, index) => (
                  <div key={index} className="flex items-center text-[#2C4C3B]">
                    <div className="w-1.5 h-1.5 bg-[#A64322] rounded-full mr-4"></div>
                    <span className="font-light tracking-wide">{item}</span>
                  </div>
                ))}
              </div>

              <a href="#agende-sua-visita" className="inline-flex items-center justify-center text-center bg-transparent border border-[#2C4C3B] text-[#2C4C3B] hover:bg-[#2C4C3B] hover:text-white px-10 py-4 rounded-full text-xs uppercase tracking-[0.2em] transition-all">
                Agendar visita ao decorado
              </a>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="bg-[#F9F6F0] p-12 flex flex-col items-center justify-center cursor-pointer group" onClick={() => setSelectedImage(MEDIA_ASSETS.plantas.inferior)}>
                <h4 className="font-serif text-xl text-[#2C4C3B] mb-8 tracking-wide">Pavimento Inferior</h4>
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-white">
                  <img 
                    src={MEDIA_ASSETS.plantas.inferior} 
                    alt="Planta Inferior" 
                    className="w-full h-full object-contain mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-700" 
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                      e.currentTarget.className = "w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-700";
                      e.currentTarget.parentElement!.parentElement!.onclick = () => setSelectedImage("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80");
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="text-[#2C4C3B] w-10 h-10 bg-white/90 rounded-full p-2" />
                  </div>
                </div>
              </div>
              <div className="bg-[#F9F6F0] p-12 flex flex-col items-center justify-center cursor-pointer group" onClick={() => setSelectedImage(MEDIA_ASSETS.plantas.superior)}>
                <h4 className="font-serif text-xl text-[#2C4C3B] mb-8 tracking-wide">Pavimento Superior</h4>
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-white">
                  <img 
                    src={MEDIA_ASSETS.plantas.superior} 
                    alt="Planta Superior" 
                    className="w-full h-full object-contain mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-700" 
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                      e.currentTarget.className = "w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 transition-transform duration-700";
                      e.currentTarget.parentElement!.parentElement!.onclick = () => setSelectedImage("https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80");
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="text-[#2C4C3B] w-10 h-10 bg-white/90 rounded-full p-2" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="localizacao" className="py-32 md:py-48 bg-[#F9F6F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:col-span-5"
            >
              <h2 className="text-5xl md:text-7xl font-serif text-[#2C4C3B] mb-12 tracking-tight">A Localização</h2>
              <div className="w-12 h-[1px] bg-[#A64322] mb-12"></div>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
                O Villagio Entre Verdes está em uma das localizações mais estratégicas de Sumaré.
              </p>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed font-light">
                Próximo à Rua Marcelo Pedroni, ao lado do parque linear da represa Marcelo Pedroni e cercado por condomínios de alto padrão, une valorização, conveniência e qualidade de vida. Uma região privilegiada, que conecta você ao melhor da cidade sem abrir mão do contato com a natureza.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="border-l border-[#A64322] pl-6">
                  <div className="text-4xl md:text-5xl font-serif text-[#2C4C3B] mb-2">40 min</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-500">de Campinas</div>
                </div>
                <div className="border-l border-[#A64322] pl-6">
                  <div className="text-4xl md:text-5xl font-serif text-[#2C4C3B] mb-2">1h20</div>
                  <div className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-500">de São Paulo</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:col-span-7"
            >
              <div className="relative h-[60vh] w-full overflow-hidden shadow-2xl bg-gray-100">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={MEDIA_ASSETS.localizacaoPoster}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                >
                  <source src={MEDIA_ASSETS.localizacaoVideo} type="video/mp4" />
                </video>
                <img 
                  src="https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                  alt="Região de Sumaré" 
                  className="hidden w-full h-full object-cover hover:scale-105 transition-transform duration-[3s]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C4C3B]/90 via-[#2C4C3B]/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-10 left-10 pointer-events-none">
                  <MapPin className="w-8 h-8 text-white mb-4" />
                  <h3 className="font-serif text-3xl text-white mb-2">Sumaré, SP</h3>
                  <p className="text-white/80 font-light tracking-wide">Região em constante valorização</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plantão de Vendas Section */}
      <section id="plantao-de-vendas" className="py-32 md:py-48 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:col-span-5 order-2 lg:order-1"
            >
              <h2 className="text-5xl md:text-7xl font-serif text-[#2C4C3B] mb-12 tracking-tight">Plantão de Vendas</h2>
              <div className="w-12 h-[1px] bg-[#A64322] mb-12"></div>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
                Nosso plantão de vendas está pronto para te receber com conforto e atenção em cada detalhe.
              </p>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed font-light">
                Venha tomar um café e conhecer de perto o Villagio Entre Verdes — um projeto pensado para quem valoriza qualidade de vida, natureza e exclusividade.
              </p>
              
              <div className="bg-[#F9F6F0] p-8 border-l-4 border-[#A64322]">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-[#A64322] mr-4 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-serif text-xl text-[#2C4C3B] mb-2">Endereço</h4>
                    <p className="text-gray-600 font-light">R. Marcelo Pedroni, 506<br/>Vila Miranda, Sumaré/SP</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:col-span-7 order-1 lg:order-2 h-[50vh] md:h-[70vh] w-full bg-gray-200"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3676.814324888031!2d-47.2693892!3d-22.8461719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8b9b8b8b8b8b8%3A0x8b8b8b8b8b8b8b8b!2sR.%20Marcelo%20Pedroni%2C%20506%20-%20Vila%20Miranda%2C%20Sumar%C3%A9%20-%20SP%2C%2013170-000!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-1000"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Agende sua Visita Section */}
      <section id="agende-sua-visita" className="py-32 md:py-48 bg-[#F9F6F0]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="bg-white p-12 md:p-24 shadow-xl border border-gray-100"
          >
            <h2 className="text-5xl md:text-7xl font-serif text-[#2C4C3B] mb-8 tracking-tight">Agende sua visita</h2>
            <div className="w-12 h-[1px] bg-[#A64322] mx-auto mb-10"></div>
            <p className="text-xl text-gray-600 mb-16 leading-relaxed font-light max-w-2xl mx-auto">
              Dê o primeiro passo para viver a serenidade. Entre em contato e descubra todos os detalhes do seu novo lar.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="https://forms.gle/BsBXaPKU7DQnjxVG6" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center text-center bg-[#2C4C3B] hover:bg-[#1A2E23] text-white px-12 py-5 rounded-full text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.02] shadow-xl w-full sm:w-auto"
              >
                Preencher Formulário
              </a>
              <a 
                href="https://wa.me/5519998836542" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center bg-transparent border border-[#2C4C3B] text-[#2C4C3B] hover:bg-[#2C4C3B] hover:text-white px-12 py-5 rounded-full text-xs uppercase tracking-[0.2em] transition-all hover:scale-[1.02] w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 mr-3" /> (19) 99883-6542
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C4C3B] text-white/90 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-5">
              <div className="flex flex-col mb-8">
                <img 
                  src={MEDIA_ASSETS.logo} 
                  alt="Villagio Entre Verdes" 
                  className="h-16 w-auto object-contain opacity-90 brightness-0 invert self-start"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    e.currentTarget.nextElementSibling?.classList.add('flex');
                  }}
                />
                <div className="hidden flex-col">
                  <span className="font-serif text-3xl font-semibold tracking-widest text-white">
                    VILLAGIO
                  </span>
                  <span className="text-xs font-sans tracking-[0.3em] font-light text-white/70">
                    ENTRE VERDES
                  </span>
                </div>
              </div>
              <div className="flex space-x-6 mt-8">
                <a href="https://instagram.com/villagioentreverdes" target="_blank" rel="noopener noreferrer" className="flex items-center text-white/70 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5 mr-3" />
                  <span className="font-light tracking-wide">@villagioentreverdes</span>
                </a>
              </div>
            </div>
            
            <div className="md:col-span-4">
              <h4 className="text-white font-medium mb-8 uppercase tracking-widest text-xs">Créditos</h4>
              <p className="font-light text-white/70 mb-3 text-sm">Villagio Entre Verdes SPE LTDA – CNPJ 58.49.479/0001-97</p>
              <p className="font-light text-white/70 mb-3 text-sm">Domus Incorporadora</p>
              <p className="font-light text-white/70 mb-3 text-sm">Nexus Construtora</p>
              <p className="font-light text-white/70 mb-3 text-sm">Arquitetura: Isabela Formigoni Interiores</p>
              <p className="font-light text-white/70 text-sm">Vendas: Domus Soluções Imobiliárias – CRECI 39490-J SP</p>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-white font-medium mb-8 uppercase tracking-widest text-xs">Contato</h4>
              <p className="font-light text-white/70 mb-4 flex items-center"><Phone className="w-4 h-4 mr-4 text-[#A64322]" /> (19) 99883-6542</p>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-12">
            <p className="font-light text-[0.65rem] md:text-xs text-white/40 leading-relaxed text-justify">
              Condomínio "RESIDENCIAL VILLAGIO ENTRE VERDES", aprovado pela Prefeitura do Município de Sumaré/SP (protocolo n⁰. 8029/2025), com alvará de aprovação n. 236/2025, expedido em 03/06/2025, será constituído de 20 (vinte) unidades autônomas (casas) assobradadas, destinadas ao uso exclusivamente residencial, todas do mesmo modelo TIPO, diferenciando-se somente na área de terreno. Todas as imagens que constam neste material são meramente ilustrativas e possuem caráter de sugestão de decoração, não representando como o empreendimento será entregue.
            </p>
          </div>
        </div>
      </footer>

      {/* Global Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 backdrop-blur-md cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X size={40} strokeWidth={1} />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              src={selectedImage}
              alt="Ampliada"
              className="max-w-full max-h-[90vh] object-contain shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
