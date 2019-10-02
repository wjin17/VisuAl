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
    swap(val, i, currentMin);
  }
  current.push([]);
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
