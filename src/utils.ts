type mountBoxType = {
  x: number;
  y: number;
  width: number;
  height: number;
  displayName: string;
  id: string;
};

export const mountBox = ({ x, y, id, width, height, displayName }: mountBoxType): string => {
  return `<mxCell id="${id}" value="${displayName}" style="rounded=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">
<mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry" />
</mxCell>`;
};

export const mountLine = ({ source, target }: { source: string; target: string }): string => {
  const id = Math.random().toString();
  return `<mxCell id="${id}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" edge="1" parent="1" source="${source}" target="${target}">
<mxGeometry relative="1" as="geometry">
</mxGeometry>
</mxCell>`;
};
