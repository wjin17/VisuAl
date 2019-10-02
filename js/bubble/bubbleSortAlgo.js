function bubbleSortAlgo(val) {
  for (let i = 0; i < val.length - 1; i++) {
    let swapCount = 0;
    for (let j = 0; j < val.length - i - 1; j++) {
      let a = val[j];
      let b = val[j + 1];
      if (a > b) {
        swap(val, j, j + 1);
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

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
