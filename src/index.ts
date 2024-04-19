import { Structure } from './types';
import { buildDrawIo } from './buildDrawIo';

const connections: Structure[] = [
  {
    id: 'screen1',
    type: 'box',
    displayName: 'First Screen',
    connectedToIds: ['screen2'],
  },
  {
    id: 'screen2',
    type: 'box',
    displayName: 'Second Screen',
    connectedToIds: ['screen3'],
  },
  {
    id: 'screen3',
    type: 'box',
    displayName: 'Tree Screen',
    connectedToIds: [],
  },
];

buildDrawIo(connections);
