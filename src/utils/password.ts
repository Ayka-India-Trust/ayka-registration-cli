import generator from "generate-password";

export function generatePasswordFunction() {
  return generator.generate({
    length: 6,
    numbers: true,
    uppercase: true,
  });
}
