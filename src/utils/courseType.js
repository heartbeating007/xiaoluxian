export const courseType = function (type) {
  let val = '';
  switch (type) {
    case 1:
      val = '初级';
      break;
    case 2:
      val = '中级';
      break;
    case 3:
      val = '高级';
      break;
    default:
      val = '';
  }

  return val;
};
