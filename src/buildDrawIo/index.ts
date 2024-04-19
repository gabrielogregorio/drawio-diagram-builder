import fs from 'fs';
import { assemblerBaseStructure } from '../assemblerBaseStructure';
import { escapeXmlValue, assembleBox, mountLine } from '../utils';
import { Structure } from '../types';
import { getBetterWidthForContent, getBetterHeightForContent } from './utils';

const DISTANCE_BLOCKS_DEFAULT = 300;

export const buildDrawIo = (connections: Structure[]) => {
  const connectionsBuilded: string[] = [];
  let xSpacedVisuallyGood = 100;

  connections.forEach((connection) => {
    const width = getBetterWidthForContent(connection.displayName);
    const height = getBetterHeightForContent(connection.displayName);
    const yAlignedToCenter = 100 - height / 2;

    connectionsBuilded.push(
      assembleBox({
        id: connection.id,
        x: xSpacedVisuallyGood,
        y: yAlignedToCenter,
        width,
        height,
        displayName: escapeXmlValue(connection.displayName),
      }),
    );

    connection.connectedToIds.forEach((targetId) => {
      connectionsBuilded.push(mountLine({ source: connection.id, target: targetId }));
    });

    xSpacedVisuallyGood += DISTANCE_BLOCKS_DEFAULT + width;
  });

  const file = assemblerBaseStructure(connectionsBuilded.map((item) => item + '\n'));

  fs.writeFileSync('./draw.drawio', file);
};
