function insertionSortAlgo(val) {
  for (let i = 0; i < val.length; i++) {
    let j = i;
    while (j > 0) {
      let swapCount = 0;
      if (val[j] < val[j - 1]) {
        frames.push([...val]);
        current.push([j]);
        val[j] = val[j - 1] + ((val[j - 1] = val[j]), 0);
        swapCount++;
      }
      if (!swapCount) {
        break;
      }

      j--;
      frames.push([...val]);
      current.push([j]);
    }
  }
  current.push([]);
}
