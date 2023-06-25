interface flatDeDuplicationResultType {
  groupArray: any[];
  flattenData: any[];
}

interface normalObject {
  [key: string]: any;
}

export const flatDuplicateDetectionData = (data: any[]): flatDeDuplicationResultType => {
  let groupArrayIndex = 0;
  const tempGroupArray: any[] = [];

  const tempFlattenArray: any[] = [];

  for (const duplicateDetectionData of data) {
    //detect duplication size;
    const keys = Object.keys(duplicateDetectionData);
    const lens: number[] = Object.values(duplicateDetectionData).map((item) => {
      if (Array.isArray(item)) {
        return item.length;
      } else {
        return 1;
      }
    });
    const size = Math.max(...lens);

    //group array
    const isNameArray = Array.isArray(duplicateDetectionData.Name);
    const isScoreArray = Array.isArray(duplicateDetectionData.confidence_score);
    const adultName = isNameArray ? duplicateDetectionData.Name[0] : duplicateDetectionData.Name;
    const avg_score = isScoreArray
      ? duplicateDetectionData.confidence_score.reduce((a: number, b: number) => a + b, 0) /
        duplicateDetectionData.confidence_score.length
      : duplicateDetectionData.confidence_score;
    const groupAdult = {
      id: groupArrayIndex,
      path: adultName,
      Name: adultName,
      confidence_score: (avg_score as number).toFixed(0),
      duplicates: size,
      edit: true,
    };
    groupArrayIndex++;
    tempGroupArray.push(groupAdult);
    for (let i = 0; i < size; i++) {
      //group array member
      const memberName = isNameArray ? duplicateDetectionData.Name[i] : duplicateDetectionData.Name;
      const oneMember = {
        id: groupArrayIndex,
        ID: duplicateDetectionData.ID[i],
        path: `${adultName}/${memberName}${i}`,
        Name: memberName,
        confidence_score: isScoreArray
          ? duplicateDetectionData.confidence_score[i]
          : duplicateDetectionData.confidence_score,
      };
      groupArrayIndex++;
      tempGroupArray.push(oneMember);

      //rows array member
      const oneRow: normalObject = {};
      keys.forEach((key) => {
        oneRow[key] = Array.isArray(duplicateDetectionData[key])
          ? duplicateDetectionData[key][i]
          : duplicateDetectionData[key];
      });
      tempFlattenArray.push(oneRow);
    }
  }

  return {
    groupArray: tempGroupArray,
    flattenData: tempFlattenArray,
  };
};
