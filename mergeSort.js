function mergeSort(data, start, end) {
  if (start < end) {
    let mid = Math.floor((start + end) / 2);
    mergeSort(data, start, mid);
    mergeSort(data, mid + 1, end);
    merge(data, start, mid, end);
  }
  return data;
}
function merge(data, start, mid, end) {
  let tempArr = [];
  let i = start;
  let j = mid + 1;
  let k = 0;
  while (i <= mid && j <= end) {
    if (data[i] < data[j]) {
      tempArr[k++] = data[i++];
    } else {
      tempArr[k++] = data[j++];
    }
  }
  while (i <= mid) {
    tempArr[k++] = data[i++];
  }
  while (j <= end) {
    tempArr[k++] = data[j++];
  }
  for (let i = start; i <= end; i++) {
    if (!tempArr[i - start]) return;
    data[i] = tempArr[i - start];
  }
}
function removeDuplicate(arr) {
  let tmpArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i + 1]) tmpArr.push(arr[i]);
  }
  return tmpArr;
}
export function orderArray(arr) {
  let tmp = mergeSort(arr, 0, arr.length - 1);
  tmp = removeDuplicate(tmp);
  return tmp;
}
