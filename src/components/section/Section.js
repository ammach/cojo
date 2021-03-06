import React from "react";
import { useTabletOrMobileSize } from "@hooks/window";
import { BoxSides } from "@components/box/BoxSides";
import { Accordion } from "@components/accordion/Accordion";
import "./section.css";

export function Section({
  title,
  paragraphs,
  style,
  imgStyle,
  imgPosition,
  source,
}) {
  const isMobileOrTablet = useTabletOrMobileSize();

  const renderedParagraphs = [];
  paragraphs.forEach((paragraph, index) => {
    renderedParagraphs.push(
      <p
        className="section-paragraph"
        key={"section-parag-" + index}
        dangerouslySetInnerHTML={{ __html: paragraph }}
      />
    );
  });

  if (isMobileOrTablet) {
    return (
      <div>
        <Accordion
          title={title}
          renderedParagraphs={renderedParagraphs}
          style={style}
          source={source}
        />
      </div>
    );
  } else {
    if (!imgStyle) {
      return (
        <div className="section-container">
          <div className="section-container-full">
            <div className="section-text-container" style={style}>
              <h1>{title}</h1>
              <div className="section-paragraphs-container-full">
                {renderedParagraphs}
              </div>
              {source && (
                <div className="section-source">
                  Source : <a href={source}>{source}</a>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      let leftContent = (
        <div className="section-text-container" style={style}>
          <h1>{title}</h1>
          <div className="section-paragraphs-container">
            {renderedParagraphs}
          </div>
        </div>
      );

      let rightContent = <div className="section-img" style={imgStyle} />;
      if (imgPosition === "left") {
        const tmp = rightContent;
        rightContent = leftContent;
        leftContent = tmp;
      }

      return (
        <div className="section-container">
          <BoxSides left={leftContent} right={rightContent} height="162vh" />
        </div>
      );
    }
  }
}
