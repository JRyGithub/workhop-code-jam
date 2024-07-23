import InteractiveGrid from "@/components/animata/background/interactive-grid";
import GibberishText from "@/components/animata/text/gibberish-text";

const PokeBlurb = () => {
  return (
    <div>
      <InteractiveGrid>
        <div className="pointer-events-none my-24 flex h-fit text-wrap max-w-96">
          <GibberishText
            className="text-xl md:text-4xl text-black"
            text="Hello there!"
          />
        </div>
      </InteractiveGrid>
    </div>
  );
};

export default PokeBlurb;
