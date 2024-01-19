export const menuHandler = (opt: string): number => {
  switch (opt) {
    case "start the app":
      return 1;
    case "register a new token":
      return 2;
    case "close":
      return 3;
    default:
      return 0;
  }
};
