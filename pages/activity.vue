<script setup lang="ts">
useHead({
  title: "Activity",
});

function findMostFrequent(arr) {
  // Create an object to store the count of each item
  var countObj = {};

  // Iterate through the array and count the occurrences of each item
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    if (countObj[item]) {
      countObj[item]++;
    } else {
      countObj[item] = 1;
      if (i === 0) {
        console.log(countObj);
      }
    }
  }
  return countObj;

  // Find the item with the highest count
  var mostFrequentItem;
  var highestCount = 0;

  for (var key in countObj) {
    if (countObj[key] > highestCount) {
      mostFrequentItem = key;
      highestCount = countObj[key];
    }
  }

  return countObj;
}

var arr1 = [3, "a", "a", "a", 2, 3, "a", 3, "a", 2, 4, 9, 3];
var mostFrequent = findMostFrequent(arr1);
</script>

<template>
  <div>
    <h1>Exercises</h1>
    <div class="flex items-center justify-center h-screen text-5xl">
      {{ mostFrequent }}
    </div>
  </div>
</template>
