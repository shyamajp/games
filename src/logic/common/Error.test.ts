import { describe, test, expect } from "vitest";
import {
  NoCardsLeftError,
  IllegalCardError,
  CardAlreadyExistsError,
  CardDoesNotExistError,
} from "./Error";

describe("Error", () => {
  test.each([
    ["NoCardsLeftError", NoCardsLeftError, "No cards left"],
    ["IllegalCardError", IllegalCardError, "This card is illegal"],
    [
      "CardAlreadyExistsError",
      CardAlreadyExistsError,
      "This card already exists",
    ],
    [
      "CardDoesNotExistError",
      CardDoesNotExistError,
      "This card does not exist",
    ],
  ])("should instantiate %s", (name, Class, message) => {
    const error = new Class();
    expect(error).toBeInstanceOf(Class);
    expect(error.name).toBe(name);
    expect(error.message).toBe(message);
  });
});
