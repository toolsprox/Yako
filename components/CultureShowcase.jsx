'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import TypewriterText from './TypewriterText';

export default function CultureShowcase() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothColorScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  const bgColor = useTransform(
    smoothColorScroll,
    [0, 0.09, 0.18, 0.27, 0.36, 0.45, 0.54, 0.63, 0.72, 0.81, 0.9, 1],
    [
      "rgba(255, 202, 40, 0.5)",   // 1. Cricket: Saffron Yellow (Youth, Sun, Energy)
      "rgba(255, 138, 101, 0.5)",  // 2. TV: Sunset Orange (Nostalgia, Evening Warmth)
      "rgba(255, 112, 67, 0.5)",   // 3. Kitchen: Spicy Coral (Heat, Spice, Comfort)
      "rgba(79, 195, 247, 0.5)",   // 4. Choon Paan: Sky Blue (Air, Sound, Unexpected Joy)
      "rgba(240, 98, 146, 0.5)",   // 5. Bombai Motai: Bright Pink (Sweetness, Childhood Magic)
      "rgba(255, 241, 118, 0.6)",  // 6. School Van: Canary Yellow (School, Morning Sun, Camaraderie)
      "rgba(239, 83, 80, 0.4)",    // 7. Papare: Crimson Red (Passion, Noise, Rivalry)
      "rgba(38, 166, 154, 0.4)",   // 8. Monsoon: Deep Teal (Rain, Water, Coolness)
      "rgba(255, 167, 38, 0.5)",   // 9. Avurudu: Golden Orange (Festivals, Fire, Tradition)
      "rgba(66, 165, 245, 0.4)",   // 10. Blue Train: Azure Blue (Train, Hills, Cold Breeze)
      "rgba(171, 71, 188, 0.3)",   // 11. Baila: Vibrant Magenta (Party, Dance, Nightlife)
      "rgba(255, 179, 0, 0.5)"     // 12. Sunday Lunch: Ochre / Curry Yellow (Turmeric, Fullness, Rest)
    ]
  );

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const playAudio = (filename) => {
    try {
      const audio = new Audio(`/sounds/${filename}`);
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Audio play failed or file missing:", e));
    } catch (e) {
      console.log("Audio play failed:", e);
    }
  };

  const InteractiveVisual = ({ soundFile, title, imageSrc, alt }) => (
    <motion.div 
      whileHover={!isMobile ? { scale: 1.05 } : {}}
      whileTap={{ scale: 0.95 }}
      onClick={() => playAudio(soundFile)}
      title={title}
      className="interactive-wrapper"
      style={{ cursor: 'pointer', position: 'relative', width: '100%', height: isMobile ? '250px' : '350px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', zIndex: 10 }}
    >
      <Image src={imageSrc} alt={alt} fill style={{ objectFit: 'cover', transition: 'transform 0.5s, filter 0.5s' }} className="scene-image" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent 50%)' }} />
      <div className="tooltip-overlay" style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.9)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', opacity: isMobile ? 1 : 0, transition: 'opacity 0.3s', pointerEvents: 'none', border: '1px solid var(--primary)', whiteSpace: 'nowrap' }}>
        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>▶ {title}</span>
      </div>
    </motion.div>
  );

  const FloatingParticles = () => (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: '100vh', x: `${Math.random() * 100}%` }}
          animate={{ y: '-100vh', opacity: [0, 0.8, 0] }}
          transition={{ duration: 15 + Math.random() * 25, repeat: Infinity, ease: "linear", delay: Math.random() * 15 }}
          style={{ position: 'absolute', width: `${Math.random() * 4 + 2}px`, height: `${Math.random() * 4 + 2}px`, background: 'rgba(255, 255, 255, 0.8)', borderRadius: '50%', filter: 'blur(1px)', boxShadow: '0 0 10px rgba(255,255,255,0.5)' }}
        />
      ))}
    </div>
  );

  const SceneMotionElement = ({ element, xArr, yArr, rotateArr, scaleArr, opacityArr }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const sp = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
    
    // Halve the X movement on mobile to prevent horizontal overflow clipping
    const parseX = (arr) => isMobile ? arr.map(val => val.replace(/([-\d.]+)vw/, (match, p1) => `${parseFloat(p1) / 2}vw`)) : arr;
    
    const x = useTransform(sp, [0, 0.25, 0.5, 0.75, 1], parseX(xArr || ["0vw", "0vw", "0vw", "0vw", "0vw"]));
    const y = useTransform(sp, [0, 0.25, 0.5, 0.75, 1], yArr || ["-50vh", "-25vh", "0vh", "25vh", "50vh"]);
    const rotate = useTransform(sp, [0, 1], rotateArr || [0, 360]);
    const scale = useTransform(sp, [0, 0.5, 1], scaleArr || [0.5, 1.5, 0.5]);
    const opacity = useTransform(sp, [0, 0.2, 0.8, 1], opacityArr || [0, 1, 1, 0]);

    return (
      <div ref={ref} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5, overflow: 'visible' }}>
         <motion.div style={{ position: 'absolute', top: '50%', left: '50%', x, y, rotate, scale, opacity, fontSize: isMobile ? '3rem' : '5rem', filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.2))', marginTop: isMobile ? '-1.5rem' : '-2.5rem', marginLeft: isMobile ? '-1.5rem' : '-2.5rem' }}>
           {element}
         </motion.div>
      </div>
    );
  };

  const titleStyle = { fontSize: isMobile ? '2rem' : '3rem', color: 'var(--primary)', marginBottom: '1.5rem' };

  return (
    <motion.section ref={containerRef} style={{ position: 'relative', width: '100%', padding: isMobile ? '80px 0' : '150px 0', overflow: 'hidden', backgroundColor: bgColor }}>
      <style>{`
        ${!isMobile ? '.interactive-wrapper:hover .tooltip-overlay { opacity: 1 !important; }' : ''}
        ${!isMobile ? '.interactive-wrapper:hover .scene-image { transform: scale(1.1); filter: brightness(1.2); }' : ''}
      `}</style>

      {/* Disable background particles on mobile for performance */}
      {!isMobile && <FloatingParticles />}

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: isMobile ? '100px' : '250px', background: 'linear-gradient(to bottom, var(--background) 0%, transparent 100%)', zIndex: 5, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: isMobile ? '100px' : '250px', background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)', zIndex: 5, pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '4rem' : '8rem' }}>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={textVariants} className="font-script heading-lg" style={{ color: 'var(--foreground)', marginBottom: '1rem', fontSize: isMobile ? '3rem' : '4rem' }}>
            A Journey Back Home
          </motion.h2>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ height: '2px', width: '80px', background: 'var(--primary)', margin: '0 auto', transformOrigin: 'center' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '6rem' : '15rem' }}>
          
          {/* SCENE 1 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants} style={{ position: 'relative', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '2rem' : '4rem' }}>
            <SceneMotionElement element="🏏" xArr={["-20vw", "0vw", "20vw", "0vw", "-20vw"]} yArr={["-50vh", "-20vh", "0vh", "20vh", "50vh"]} scaleArr={[0.5, 2, 0.5]} />
            <div style={{ flex: 1, zIndex: 10, width: '100%' }}><InteractiveVisual soundFile="cricket-bell.mp3" title="Play Tape-ball Sounds" imageSrc="/images/tape_ball.png" alt="Tape ball cricket" /></div>
            <div style={{ flex: 1.5, zIndex: 10 }}>
              <h3 className="font-script" style={titleStyle}>The Dust & The Games</h3>
              <TypewriterText text="Before the digital age, childhood was defined by the raw joy of the outdoors. The thrill of *tape-ball* *cricket* on dusty streets, played fiercely until the sun dipped below the horizon. The distinct, ringing bell of the ~Ice~ ~Maama's~ bicycle, and a colorful ice packet that tasted like pure summer." />
            </div>
          </motion.div>

          {/* SCENE 2 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants} style={{ position: 'relative', display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', alignItems: 'center', gap: isMobile ? '2rem' : '4rem' }}>
            <SceneMotionElement element="🎮" xArr={["20vw", "10vw", "0vw", "-10vw", "-20vw"]} yArr={["-30vh", "-10vh", "0vh", "10vh", "30vh"]} rotateArr={[0, -45]} />
            <div style={{ flex: 1.5, textAlign: isMobile ? 'left' : 'right', zIndex: 10 }}>
              <h3 className="font-script" style={titleStyle}>The Golden Era of Evenings</h3>
              <TypewriterText text="Evenings brought the entire family together around the heavy glow of the single CRT television. Waiting all week for the localized magic of *Soorapappa* or cheering for *Api* *Raja* *Ibbo*. We blew the dust out of brick-game cartridges, sharing a communal entertainment that connected us deeply." />
            </div>
            <div style={{ flex: 1, zIndex: 10, width: '100%' }}><InteractiveVisual soundFile="tv-static.mp3" title="Play TV Static" imageSrc="/images/crt_tv.png" alt="Vintage CRT TV" /></div>
          </motion.div>

          {/* SCENE 3 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants} style={{ position: 'relative', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '2rem' : '4rem' }}>
            <SceneMotionElement element="🥥" xArr={["-5vw", "5vw", "-5vw", "5vw", "-5vw"]} yArr={["40vh", "20vh", "0vh", "-20vh", "-40vh"]} scaleArr={[0.5, 1.5, 2]} opacityArr={[0, 0.4, 0.2, 0]} />
            <div style={{ flex: 1, zIndex: 10, width: '100%' }}><InteractiveVisual soundFile="kitchen-sizzle.mp3" title="Play Sizzling Sounds" imageSrc="/images/kitchen.png" alt="Sri Lankan Kitchen" /></div>
            <div style={{ flex: 1.5, zIndex: 10 }}>
              <h3 className="font-script" style={titleStyle}>The Journey & The Taste</h3>
              <TypewriterText text="We hold onto the chaotic joy of cramped family road trips to Kataragama—singing loudly to cassettes, fueled by unmatched school canteen snacks. But the ultimate comfort was always the return. The unmistakable, deeply aromatic smell of ~Amma's~ ~cooking~ drifting from the kitchen." />
            </div>
          </motion.div>

          {/* SCENE 4 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants} style={{ position: 'relative', display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', alignItems: 'center', gap: isMobile ? '2rem' : '4rem' }}>
            <SceneMotionElement element="🍞" xArr={["20vw", "5vw", "-5vw", "-20vw", "-30vw"]} yArr={["-40vh", "10vh", "-10vh", "20vh", "50vh"]} rotateArr={[-30, 30]} />
            <div style={{ flex: 1.5, textAlign: isMobile ? 'left' : 'right', zIndex: 10 }}>
              <h3 className="font-script" style={titleStyle}>The "Choon Paan" Melody</h3>
              <TypewriterText text="Few sounds trigger a stronger rush of nostalgia than the tinny, electronic notes of Beethoven’s *Für* *Elise* drifting down a dusty street. It was the siren song of the ~Choon~ ~Paan~ tuk-tuk bakery. Dropping everything and running to the gate to buy warm malu paan and sweet tea buns straight from the glass cabinet." />
            </div>
            <div style={{ flex: 1, zIndex: 10, width: '100%' }}><InteractiveVisual soundFile="choon-paan.mp3" title="Play Für Elise" imageSrc="/images/choon_paan.png" alt="Choon Paan Tuk Tuk" /></div>
          </motion.div>

          {/* SCENE 5 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants} style={{ position: 'relative', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '2rem' : '4rem' }}>
            <SceneMotionElement element="🔔" xArr={["0vw", "15vw", "0vw", "-15vw", "0vw"]} yArr={["-60vh", "-30vh", "0vh", "30vh", "60vh"]} rotateArr={[0, 720]} />
            <div style={{ flex: 1, zIndex: 10, width: '100%' }}><InteractiveVisual soundFile="bombai-motai-bell.mp3" title="Play Vendor Bell" imageSrc="/images/bombai_motai.png" alt="Bombai Motai Pink Candy" /></div>
            <div style={{ flex: 1.5, zIndex: 10 }}>
              <h3 className="font-script" style={titleStyle}>The Bombai Motai Bell</h3>
              <TypewriterText text="Before modern supermarkets, the arrival of a neighborhood vendor was an event. The rhythmic ringing of a small brass bell signaled the *Bombai* *Motai* man. We'd gather around his simple cart to buy the stringy, intensely sweet pink candy floss sandwiched between impossibly thin wafers. It was the purest form of childhood magic." />
            </div>
          </motion.div>

          {/* SCENE 6 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants} style={{ position: 'relative', display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', alignItems: 'center', gap: isMobile ? '2rem' : '4rem' }}>
            <SceneMotionElement element="🚐" xArr={["30vw", "0vw", "-20vw", "0vw", "30vw"]} yArr={["-50vh", "-20vh", "10vh", "30vh", "60vh"]} rotateArr={[15, -15]} />
            <div style={{ flex: 1.5, textAlign: isMobile ? 'left' : 'right', zIndex: 10 }}>
              <h3 className="font-script" style={titleStyle}>The School Van Camaraderie</h3>
              <TypewriterText text="For generations of children, the colorful, crowded *School* *Van* was the classroom outside the classroom. The early morning chaos, singing songs to block out the Colombo traffic, sharing half-eaten snacks, and forming unbreakable friendships in the backseat before the school bell even rang." />
            </div>
            <div style={{ flex: 1, zIndex: 10, width: '100%' }}><InteractiveVisual soundFile="school-van-traffic.mp3" title="Play Traffic Noise" imageSrc="/images/school_van.png" alt="School Van Traffic" /></div>
          </motion.div>

          {/* SCENE 7 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants} style={{ position: 'relative', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '2rem' : '4rem' }}>
            <SceneMotionElement element="🎺" xArr={["-30vw", "-10vw", "10vw", "30vw", "50vw"]} yArr={["40vh", "20vh", "0vh", "-20vh", "-40vh"]} rotateArr={[-45, 45]} />
            <div style={{ flex: 1, zIndex: 10, width: '100%' }}><InteractiveVisual soundFile="papare-band.mp3" title="Play Papare Band" imageSrc="/images/papare.png" alt="Papare Band" /></div>
            <div style={{ flex: 1.5, zIndex: 10 }}>
              <h3 className="font-script" style={titleStyle}>Big Match Fever & Papare</h3>
              <TypewriterText text="March brings an unmatched energy: the Big Match season. The sheer madness of the cycle parades winding through traffic, the roaring crowds, and most importantly, the deafening, infectious rhythm of the ~Papare~ ~brass~ ~bands~. The blaring trumpets and drums make it impossible to sit still, fueling fierce but loving school rivalries." />
            </div>
          </motion.div>

          {/* SCENE 8 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants} style={{ position: 'relative', display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', alignItems: 'center', gap: isMobile ? '2rem' : '4rem' }}>
            <SceneMotionElement element="⛵" xArr={["10vw", "20vw", "10vw", "20vw", "10vw"]} yArr={["-50vh", "-25vh", "0vh", "25vh", "50vh"]} rotateArr={[-10, 10]} />
            <div style={{ flex: 1.5, textAlign: isMobile ? 'left' : 'right', zIndex: 10 }}>
              <h3 className="font-script" style={titleStyle}>The Monsoon & Power Cuts</h3>
              <TypewriterText text="The heavy afternoon monsoons that flooded the drains, turning the streets into rivers for our paper boats. And the inevitable power cuts that followed, forcing families into the same room. We'd eat hot *pol* *rotti* by the flickering, warm light of kerosene lamps, telling ghost stories until the lights abruptly snapped back on." />
            </div>
            <div style={{ flex: 1, zIndex: 10, width: '100%' }}><InteractiveVisual soundFile="monsoon-rain.mp3" title="Play Rain Sounds" imageSrc="/images/monsoon.png" alt="Monsoon Lamp and Rotti" /></div>
          </motion.div>

          {/* SCENE 9 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants} style={{ position: 'relative', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '2rem' : '4rem' }}>
            <SceneMotionElement element="🥁" xArr={["-5vw", "10vw", "-5vw", "-15vw", "-5vw"]} yArr={["-20vh", "0vh", "20vh", "0vh", "-20vh"]} rotateArr={[0, 360]} scaleArr={[0.5, 1.5, 0.5]} />
            <div style={{ flex: 1, zIndex: 10, width: '100%' }}><InteractiveVisual soundFile="raban-beat.mp3" title="Play Raban Drum" imageSrc="/images/raban.png" alt="Avurudu Raban Drum" /></div>
            <div style={{ flex: 1.5, zIndex: 10 }}>
              <h3 className="font-script" style={titleStyle}>Avurudu Traditions</h3>
              <TypewriterText text="April brings the heat, the blooming of the Erabadu trees, and the New Year. We recall the unmistakable rhythmic beating of the *Raban* echoing through the village. The smell of oil-frying ~Kavum~ and Kokis, the competitive spirit of traditional street games, and the entire neighborhood coming together in a shared celebration." />
            </div>
          </motion.div>

          {/* SCENE 10 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants} style={{ position: 'relative', display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', alignItems: 'center', gap: isMobile ? '2rem' : '4rem' }}>
            <SceneMotionElement element="🚂" xArr={["10vw", "-10vw", "10vw", "-10vw", "10vw"]} yArr={["-50vh", "-25vh", "0vh", "25vh", "50vh"]} rotateArr={[0, 36]} />
            <div style={{ flex: 1.5, textAlign: isMobile ? 'left' : 'right', zIndex: 10 }}>
              <h3 className="font-script" style={titleStyle}>The Blue Train to the Hills</h3>
              <TypewriterText text="The cold breeze rushing through the open windows of the iconic blue train as it winds its way up to Ella or Kandy. The breathtaking, endless green of the tea estates passing by in a blur, momentarily interrupted by the frantic joy of buying heavily spiced, crispy *Iso* *Vade* wrapped in newspaper through the train window at a brief station stop." />
            </div>
            <div style={{ flex: 1, zIndex: 10, width: '100%' }}><InteractiveVisual soundFile="train-tracks.mp3" title="Play Train Tracks" imageSrc="/images/blue_train.png" alt="Blue Train Hills" /></div>
          </motion.div>

          {/* SCENE 11 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants} style={{ position: 'relative', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: isMobile ? '2rem' : '4rem' }}>
            <SceneMotionElement element="🕺" xArr={["-30vw", "0vw", "30vw", "0vw", "-30vw"]} yArr={["0vh", "30vh", "0vh", "-30vh", "0vh"]} scaleArr={[1, 2, 1]} rotateArr={[0, 720]} />
            <div style={{ flex: 1, zIndex: 10, width: '100%' }}><InteractiveVisual soundFile="baila-music.mp3" title="Play Baila Music" imageSrc="/images/baila.png" alt="Baila Dancing Party" /></div>
            <div style={{ flex: 1.5, zIndex: 10 }}>
              <h3 className="font-script" style={titleStyle}>Baila & Magical Realism</h3>
              <TypewriterText text="The magical realism of Sri Lankan weddings and grand family parties. A time when the formalities inevitably fade, the ties are loosened, and everyone—from grandparents to the youngest children—loses themselves in the energetic, impossibly infectious rhythm of ~Baila~ music. It is a pure, unadulterated celebration of life." />
            </div>
          </motion.div>

          {/* SCENE 12 */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={textVariants} style={{ position: 'relative', display: 'flex', flexDirection: isMobile ? 'column-reverse' : 'row', alignItems: 'center', gap: isMobile ? '2rem' : '4rem' }}>
            <SceneMotionElement element="🍛" xArr={["0vw", "0vw", "0vw", "0vw", "0vw"]} yArr={["-80vh", "-40vh", "0vh", "40vh", "80vh"]} rotateArr={[0, 180]} />
            <div style={{ flex: 1.5, textAlign: isMobile ? 'left' : 'right', zIndex: 10 }}>
              <h3 className="font-script" style={{ ...titleStyle, color: 'var(--primary)' }}>The Sunday Lunch</h3>
              <TypewriterText text="The ultimate cultural cornerstone. The massive Sunday spread, where the table overflows with towering mounds of rice, deeply spiced dark meat curries, creamy tempered dhal, and fresh coconut *mallum*. Eating by hand, surrounded by the loud, loving chaos of family, followed inevitably by the heavy, deeply satisfying Sunday afternoon nap." />
            </div>
            <div style={{ flex: 1, zIndex: 10, width: '100%' }}><InteractiveVisual soundFile="family-chatter.mp3" title="Play Family Chatter" imageSrc="/images/sunday_lunch.png" alt="Sunday Lunch Rice and Curry" /></div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
