/**
 * Gets the object name of given subject.
 *
 * Taken from Next.js Codebase.
 *
 * @param subject - Subject to get name of.
 */
const getObjectName = (subject: unknown) => {
  const name = Object.prototype.toString.call(subject);

  return name.replace(/^\[object (.*)\]$/, function (_m, p0) {
    return p0;
  });
};

/**
 * Checks if subject is object prototype.
 *
 * Taken from Next.js Codebase.
 *
 * @param subject - Subject to check.
 */
const isObjectPrototype = (subject: unknown) => {
  if (!subject) {
    return false;
  }

  const ObjectPrototype = Object.prototype;

  if (subject === ObjectPrototype) {
    return true;
  } // It might be an object from a different Realm which is
  // still just a plain simple object.

  if (Object.getPrototypeOf(subject)) {
    return false;
  }

  const names = Object.getOwnPropertyNames(subject);

  for (let i = 0; i < names.length; i++) {
    if (!(names[i] in ObjectPrototype)) {
      return false;
    }
  }

  return true;
};

/**
 * Checks if subject is a simple object.
 *
 * Taken from Next.js Codebase.
 *
 * @param subject - Subject to check.
 */
const isSimpleObject = (subject: unknown) => {
  if (!isObjectPrototype(Object.getPrototypeOf(subject))) {
    return false;
  }

  const names = Object.getOwnPropertyNames(subject);

  for (let i = 0; i < names.length; i++) {
    const descriptor = Object.getOwnPropertyDescriptor(subject, names[i]);

    if (!descriptor) {
      return false;
    }

    if (!descriptor.enumerable) {
      if (
        (names[i] === "key" || names[i] === "ref") &&
        typeof descriptor.get === "function"
      ) {
        // React adds key and ref getters to props objects to issue warnings.
        // Those getters will not be transferred to the client, but that's ok,
        // so we'll special case them.
        continue;
      }

      return false;
    }
  }

  return true;
};

/**
 * Checks if given subject is supported
 * server action payload.
 *
 * @param subject - The subject to check.
 */
export const isSupportedServerActionPayload = (subject: unknown) => {
  // Primitives are supported.
  if (typeof subject !== "object" && typeof subject !== "function") {
    return {
      ok: true,
    } as const;
  }

  // Null is special.
  if (subject === null) {
    return {
      ok: true,
    } as const;
  }

  const objectName = getObjectName(subject);

  // Check object name.
  if (objectName !== "Object") {
    return {
      ok: false,
      message: objectName + " objects are not supported!",
    } as const;
  }

  if (!isSimpleObject(subject)) {
    return {
      ok: false,
      message: "Classes or other objects with methods are not supported!",
    } as const;
  }

  // Check for symbols.
  if (Object.getOwnPropertySymbols) {
    const symbols = Object.getOwnPropertySymbols(subject);

    if (symbols.length > 0) {
      return {
        ok: false,
        message: "Objects with symbol properties are not supported!",
      } as const;
    }
  }

  return {
    ok: true,
  } as const;
};
