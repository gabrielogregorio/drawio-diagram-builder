const HEIGTH_BY_LINE = 15;
export const getBetterHeightForContent = (content: string) => {
  return HEIGTH_BY_LINE + content.split('\n').length * HEIGTH_BY_LINE;
};

export const addEmptyLines = (numberLines: number) => {
  if (numberLines < 1) {
    return '';
  }

  return new Array(Math.round(numberLines / HEIGTH_BY_LINE)).fill('\n').join('');
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
