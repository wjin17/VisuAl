let tempFrame = null;

function mergeSortAlgo(arr, indices) {
  if (!tempFrame) {
    tempFrame = indices;
  }
  if (indices.length < 2) {
    return indices;
  } else {
    const middle = Math.ceil(indices.length / 2);
    let left = mergeSortAlgo(arr, indices.slice(0, middle));
    let right = mergeSortAlgo(arr, indices.slice(middle));
    return merge(arr, indices, left, right);
  }
}

function merge(arrM, indicesM, l, r) {
  let i = 0,
    j = 0,
    k = 0;
  while (i < l.length && j < r.length) {
    if (arrM[l[i]] < arrM[r[j]]) {
      indicesM[k] = l[i];
      i++;
    } else {
      indicesM[k] = r[j];
      j++;
    }
    k++;
  }
  while (i < l.length) {
    indicesM[k] = l[i];
    i++;
    k++;
  }
  while (j < r.length) {
    indicesM[k] = r[j];
    j++;
    k++;
  }
  tempFrame.splice(Math.min(...indicesM), indicesM.length, ...indicesM);
  frames.push([...tempFrame]);
  current.push([...indicesM]);

  return indicesM;
}
