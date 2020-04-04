import Delta from "quill-delta";

function highlightDifference(first, second, color) {
  const firstDelta = new Delta(first);
  const secondDelta = new Delta(second);
  const diff = secondDelta.diff(firstDelta);
  const colored = diff.map((op) => {
    if (op.insert) {
      if (!op.attributes) op.attributes = {};
      if (op.attributes.background) return op;
      op.attributes.diff = color;
    }
    return op;
  });
  return secondDelta.compose(new Delta(colored));
}

function cleanDifference(delta) {
  return delta.ops.map((op) => {
    if (op.attributes && op.attributes.diff) {
      delete op.attributes.diff;
    }
    return op;
  });
}

export { highlightDifference, cleanDifference };
