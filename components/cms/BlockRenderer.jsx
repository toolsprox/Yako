import HeroBlock from './blocks/HeroBlock';
import TextBlock from './blocks/TextBlock';
import GalleryBlock from './blocks/GalleryBlock';
import CTABlock from './blocks/CTABlock';
import MenuHighlightsBlock from './blocks/MenuHighlightsBlock';
import FAQBlock from './blocks/FAQBlock';

export default function BlockRenderer({ blocks }) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return <div style={{ padding: '100px 20px', textAlign: 'center', color: '#A1A1AA' }}>This page has no content.</div>;
  }

  return (
    <div>
      {blocks.map((block) => {
        switch (block.type) {
          case 'hero':
            return <HeroBlock key={block.id} data={block.data} />;
          case 'text':
            return <TextBlock key={block.id} data={block.data} />;
          case 'gallery':
            return <GalleryBlock key={block.id} data={block.data} />;
          case 'cta':
            return <CTABlock key={block.id} data={block.data} />;
          case 'menu_highlights':
            return <MenuHighlightsBlock key={block.id} data={block.data} />;
          case 'faq':
            return <FAQBlock key={block.id} data={block.data} />;
          default:
            console.warn(`Unknown block type: ${block.type}`);
            return null;
        }
      })}
    </div>
  );
}
