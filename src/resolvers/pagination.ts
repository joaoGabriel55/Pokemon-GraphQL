export const convertNodeIdToCursor = (node: { id: string }) => {
  return Buffer.from(node.id, "binary").toString("base64");
};

export const convertCursorToNodeId = (cursor: string) => {
  return Buffer.from(cursor, "base64").toString("binary");
};
