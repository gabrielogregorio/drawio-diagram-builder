// fix date, name, and sizes
export const assemblerBaseStructure = (children: string[]) => {
  return `<mxfile host="app.diagrams.net" modified="2024-04-18T23:43:47.106Z" agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36" etag="1_XhpMAft9xQDllUDUYI" version="24.2.5" type="device">
    <diagram name="Page-1" id="exampleId">
      <mxGraphModel dx="810" dy="447" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100" math="0" shadow="0">
        <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
  ${children.join('\n')}
        </root>
      </mxGraphModel>
    </diagram>
  </mxfile>`;
};
