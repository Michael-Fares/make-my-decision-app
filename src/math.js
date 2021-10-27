export const calculateCriteriaWeightings = (criteria) => {
  // store all criterion importance values in numbers array
  let numbersArray = []
  // store criterion_text, and its caluculated weighting in the results array as an array of objects with 2 keys each
  let results = []
  for(let i=0; i<criteria.length; i++) {
    numbersArray.push(criteria[i].criterion_importance)
  }
  const denominator = numbersArray.reduce((previousValue, currentValue) => previousValue + currentValue)

  for(let j=0; j < criteria.length; j++) {
    const item = {
      criterion: criteria[j].criterion_text,
      weightingPercent: Number(((numbersArray[j]/denominator)*100).toFixed(2))
    }
    results.push(item)
  }

   return results
}

export const chunkRankings = (array, size) => {
  const chunked_arr = [];
  for (let i = 0; i < array.length; i++) {
    const last = chunked_arr[chunked_arr.length - 1];
    if (!last || last.length === size) {
      chunked_arr.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  return chunked_arr;
}

export const finalResults = (arr) => {
  let results = []
 for(let i=0; i<arr.length; i++) {
   const final = arr[i].map((option) => {
     return option.weight * option.option_rank_on_criterion
   }).reduce((prev, curr)=> prev + curr)/5

   results.push({
     option: arr[i][0].option,
     final: Number(final.toFixed(2))
   })
 }
  return results
}