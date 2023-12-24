const getUniqueElements = (originalArray) => {
    const mp = {};
    const resultArray = [];
    for (let i = 0; i < originalArray.length; i++){
        if(!mp.hasOwnProperty(originalArray[i])){
            mp[originalArray[i]] = true;
            resultArray.push(originalArray[i]);
        }
    }
    return resultArray;
}

const arr=[1,2,3,4,5,3,2,4,5,3,2,1,1,1,1,1,2,83,4,5,6,90];
console.log(getUniqueElements(arr));