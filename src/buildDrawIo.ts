import fs from 'fs';
import { assemblerBase } from './assemblerBase';
import { mountBox, mountLine } from './utils';
import { Structure } from './types';

const DISTANCE_BASE = 300;

export const buildDrawIo = (connections: Structure[]) => {
  const connectionsBuilded: string[] = [];
  let currentDistance = 100;

  connections.forEach((connection) => {
    connectionsBuilded.push(
      mountBox({
        id: connection.id,
        x: currentDistance,
        y: 100,
        width: 100,
        height: 50,
        displayName: connection.displayName,
      }),
    );

    connection.connectedToIds.forEach((targetId) => {
      connectionsBuilded.push(mountLine({ source: connection.id, target: targetId }));
    });

    currentDistance += DISTANCE_BASE;
  });

  const file = assemblerBase(connectionsBuilded.map((item) => item + '\n'));

  fs.writeFileSync('./draw.drawio', file);
};
