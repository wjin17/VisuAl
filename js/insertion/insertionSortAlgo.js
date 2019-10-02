function insertionSortAlgo(val) {
  for (let i = 0; i < val.length; i++) {
    let j = i;
    while (j > 0) {
      let swapCount = 0;
      if (val[j] < val[j - 1]) {
        swap(val, j, j - 1);
        swapCount++;
      }
      if (!swapCount) {
        break;
      }
      frames.push([...val]);
      current.push([j]);
      j--;
      frames.push([...val]);
      current.push([j]);
    }
  }
  current.push([]);
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
