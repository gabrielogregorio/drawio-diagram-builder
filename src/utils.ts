import fs from 'fs';
import path from 'path';
import { Structure } from './types';
import { instanceId } from './instanceId';

type assembleBoxType = {
  x: number;
  y: number;
  width: number;
  height: number;
  alignLeft?: boolean;
  displayName: string;
  id: string;
};

const encodeImageToBase64 = (imagePath: string): string => {
  const pathResolved = path.resolve(imagePath);
  const buffer = fs.readFileSync(pathResolved);
  return buffer.toString('base64');
};

export const assembleBox = ({ x, y, id, width, height, displayName, alignLeft = true }: assembleBoxType): string => {
  const styleAlign = alignLeft ? 'align=left;' : '';
  return `<mxCell id="${id}" value="${displayName}" style="rounded=0;whiteSpace=wrap;html=1;${styleAlign}fillColor=#FFFFCC;" vertex="1" parent="1">
<mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry" />
</mxCell>`;
};

export const assembleLine = ({ source, target }: { source: string; target: string }): string => {
  const id = instanceId.getNextId();
  return `<mxCell id="${id}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" edge="1" parent="1" source="${source}" target="${target}">
<mxGeometry relative="1" as="geometry">
</mxGeometry>
</mxCell>`;
};

type assembleImageType = {
  width: number;
  height: number;
  x: number;
  y: number;
  image: Structure['image'];
};

export const assembleImage = ({ image, width, height, x, y }: assembleImageType): string => {
  const id = instanceId.getNextId();
  const base64 = encodeImageToBase64(image!.path);
  return `<mxCell id="${id}" value="" style="shape=image;imageAspect=0;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;image=data:image/png,${base64};imageBorder=none;" parent="1" vertex="1">
<mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/>
</mxCell>`;
};

export const escapeXmlValue = (unsafeStr: string) => {
  return unsafeStr.replace(/[<>&'"\n\s]/g, (character) => {
    switch (character) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case ' ':
        return '&amp;nbsp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      case '\n':
        return '&#10;';
    }

    return character;
  });
};

export const resizeMaintainingAspectRatio = ({
  width,
  height,
  destinationWidth,
}: {
  width: number;
  height: number;
  destinationWidth: number;
}) => {
  const scale = destinationWidth / width;

  const newHeight = Math.round(height * scale);

  return { width: destinationWidth, height: newHeight };
};
