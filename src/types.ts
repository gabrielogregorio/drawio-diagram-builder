export type Structure = {
  type: 'box';
  displayName: string;
  id: string;
  image?: { path: string; width: number; height: number };
  connectedToIds: string[];
};
