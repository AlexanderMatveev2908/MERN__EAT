const lorem = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates corrupti cum reiciendis, deserunt, a non, nesciunt tempora officiis nulla perferendis explicabo eveniet similique numquam qui dignissimos eligendi dicta architecto veniam?
`;

export const genLorem = (numChars: number) => {
  let str = "";

  while (str.length < numChars) {
    str += lorem;
  }

  return `${str.slice(0, numChars)}...`;
};
