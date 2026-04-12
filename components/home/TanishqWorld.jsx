import TitleSection from "../common/TitleSection";
import ImageCard from "../common/ImageCard";

const tanishqWorldData = [
  { id: 1, imgUrl: "https://picsum.photos/1200/500?1", rowSpan: 1 },
  { id: 2, imgUrl: "https://picsum.photos/1200/500?3", rowSpan: 2 },
  { id: 3, imgUrl: "https://picsum.photos/1200/500?2", rowSpan: 2 },
  { id: 4, imgUrl: "https://picsum.photos/1200/500?4", rowSpan: 1 },
];

const TanishqWorld = () => {
  return (
    <TitleSection
      title="Tanishq World"
      subtitle="A companion for every occasion"
    >
      <div
        className="tanishq-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 50px 1fr",
          gap: "8px",
          padding: "0px 45px",
        }}
      >
        {tanishqWorldData.map((item) => (
          <div
            key={item.id}
            style={{
              gridRow: `span ${item.rowSpan}`,
              height: "100%",
            }}
          >
            <ImageCard imgUrl={item.imgUrl} />
          </div>
        ))}
      </div>
    </TitleSection>
  );
};

export default TanishqWorld;