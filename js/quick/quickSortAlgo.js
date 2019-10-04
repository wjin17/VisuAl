//let tempFrame = null;

function quickSortAlgo(arr) {
  quickSort(arr, 0, arr.length - 1);
}

function quickSort(arr, low, high) {
  if (low < high) {
    let p = partition(arr, low, high);
    quickSort(arr, low, p - 1);
    quickSort(arr, p + 1, high);
  }
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low;
  for (let j = low; j < high; j++) {
    frames.push([...arr]);
    current.push([j, high]);
    if (arr[j] < pivot) {
      frames.push([...arr]);
      current.push([i, j, high]);
      arr[i] = arr[j] + ((arr[j] = arr[i]), 0);
      frames.push([...arr]);
      current.push([i, j, high]);
      i++;
    }
  }
  frames.push([...arr]);
  current.push([i, high]);
  arr[i] = arr[high] + ((arr[high] = arr[i]), 0);
  frames.push([...arr]);
  current.push([i, high]);
  return i;
}
