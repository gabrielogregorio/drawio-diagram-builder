import fs from 'fs';
import { assemblerBaseStructure } from '../assemblerBaseStructure';
import { escapeXmlValue, assembleBox, assembleLine, assembleImage, resizeMaintainingAspectRatio } from '../utils';
import { Structure } from '../types';
import { getBetterWidthForContent, getBetterHeightForContent, addEmptyLines } from './utils';

const DISTANCE_BLOCKS_DEFAULT = 300;

export const buildDrawIo = (connections: Structure[]) => {
  const connectionsBuilded: string[] = [];
  let xSpacedVisuallyGood = 100;

  connections.forEach((connection) => {
    const width = getBetterWidthForContent(connection.displayName);
    const heightTemporaryToText = getBetterHeightForContent(connection.displayName);

    let imageScaled: ReturnType<typeof resizeMaintainingAspectRatio> = {
      width: 0,
      height: 0,
    };
    if (connection.image) {
      imageScaled = resizeMaintainingAspectRatio({
        width: connection.image.width,
        height: connection.image.height,
        destinationWidth: width,
      });
    }
    let finalHeight = heightTemporaryToText + imageScaled.height;
    const yAlignedToCenter = 100 - finalHeight / 2;

    connectionsBuilded.push(
      assembleBox({
        id: connection.id,
        x: xSpacedVisuallyGood,
        y: yAlignedToCenter,
        width,
        height: finalHeight,
        displayName: escapeXmlValue(addEmptyLines(imageScaled.height - 20) + connection.displayName),
      }),
    );

    if (connection.image) {
      connectionsBuilded.push(
        assembleImage({
          image: connection.image,
          x: xSpacedVisuallyGood,
          y: yAlignedToCenter,
          width: imageScaled.width,
          height: imageScaled.height,
        }),
      );
    }

    connection.connectedToIds.forEach((targetId) => {
      connectionsBuilded.push(assembleLine({ source: connection.id, target: targetId }));
    });

    xSpacedVisuallyGood += DISTANCE_BLOCKS_DEFAULT + width;
  });

  const file = assemblerBaseStructure(connectionsBuilded.map((item) => item + '\n'));

  fs.writeFileSync('./draw.drawio', file);
};
