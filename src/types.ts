export type Structure = {
  type: 'box';
  displayName: string;
  pathDetail: string;
  id: string;
  image?: { path: string; width: number; height: number };
  connectedToIds: string[];
};

export type BaseStructure = {
  testName: string;
  testFile: string;
  pathDocs: string;
  connections: Structure[];
};
