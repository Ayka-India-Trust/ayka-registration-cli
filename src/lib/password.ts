import generator from "generate-password";

export function generatePasswordFunction() {
  /**
    This function generates a random password using the generate-password package.
    The password is 6 characters long and contains numbers and uppercase letters.
    */

  return generator.generate({
    length: 6,
    numbers: true,
    uppercase: true,
  });
}
