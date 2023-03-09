// const donationData details
let val1 = [];
for (let i = 0; i < donationData?.length; i++) {
  for (let j = 0; j < 12; j++) {
    if (Number(donationData[i]?._id - 1) === j) {
      if (val1[j] !== 0) {
        val1[j] = donationData[i]?.total;
      } else {
        val1[j] = 0;
      }
    }
  }
}
let chart1 = [];
for (let k = 0; k < val1.length; k++) {
  if (val1[k]) {
    chart1[k] = val1[k];
  } else {
    chart1[k] = 0;
  }
}

// const complaintCompletedData details
let val2 = [];
for (let i = 0; i < complaintCompletedData?.length; i++) {
  for (let j = 0; j < 12; j++) {
    if (Number(complaintCompletedData[i]?._id - 1) === j) {
      if (val2[j] !== 0) {
        val2[j] = complaintCompletedData[i]?.count;
      } else {
        val2[j] = 0;
      }
    }
  }
}
let chart2 = [];
for (let k = 0; k < val2.length; k++) {
  if (val2[k]) {
    chart2[k] = val2[k];
  } else {
    chart2[k] = 0;
  }
}

// const complaintCompletedData details
let val3 = [];
for (let i = 0; i < complaintPendingData?.length; i++) {
  for (let j = 0; j < 12; j++) {
    if (Number(complaintPendingData[i]?._id - 1) === j) {
      if (val3[j] !== 0) {
        val3[j] = complaintPendingData[i]?.count;
      } else {
        val3[j] = 0;
      }
    }
  }
}
let chart3 = [];
for (let k = 0; k < val3.length; k++) {
  if (val3[k]) {
    chart3[k] = val3[k];
  } else {
    chart3[k] = 0;
  }
}
