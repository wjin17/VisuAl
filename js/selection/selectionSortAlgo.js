function selectionSortAlgo(val) {
  for (let i = 0; i < val.length; i++) {
    let currentMin = i;
    for (let j = i; j < val.length; j++) {
      if (val[j] < val[currentMin]) {
        currentMin = j;
      }
      frames.push([...val]);
      current.push([currentMin, j, i]);
    }
    frames.push([...val]);
    current.push([currentMin, i]);
    val[i] = val[currentMin] + ((val[currentMin] = val[i]), 0);
    frames.push([...val]);
    current.push([currentMin, i]);
  }
  current.push([]);
}
