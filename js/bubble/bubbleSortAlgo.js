function bubbleSortAlgo(val) {
  for (let i = 0; i < val.length - 1; i++) {
    let swapCount = 0;
    for (let j = 0; j < val.length - i - 1; j++) {
      let a = val[j];
      let b = val[j + 1];
      if (a > b) {
        frames.push([...val]);
        current.push([j, j + 1]);
        val[j] = val[j + 1] + ((val[j + 1] = val[j]), 0);
        frames.push([...val]);
        current.push([j, j + 1]);
        swapCount++;
      }
      frames.push([...val]);
      current.push([j, j + 1]);
    }
    values = val;

    if (!swapCount) {
      break;
    }
  }
  current.push([]);
}
