const HEIGTH_BY_LINE = 15;
export const getBetterHeightForContent = (content: string) => {
  return HEIGTH_BY_LINE * 4 + content.split('\n').length * HEIGTH_BY_LINE;
};

const WITH_BY_LINE = 7;
export const getBetterWidthForContent = (content: string) => {
  let greaterWidth = 0;

  content.split('\n').forEach((line) => {
    if (greaterWidth < line.length) {
      greaterWidth = line.length;
    }
  });

  return WITH_BY_LINE * 2 + greaterWidth * WITH_BY_LINE;
};
