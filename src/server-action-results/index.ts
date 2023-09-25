import { isSupportedServerActionPayload } from "../utils/index.js";

// This type defines the payload that is serializable by
// NextJS's server actions.
export type ServerActionPayload =
  | string
  | number
  | boolean
  | null
  | undefined
  | ServerActionPayload[]
  | { [key: string | number]: ServerActionPayload };

// The server action error.
export interface ServerActionError {
  code: string;
  title?: string;
  detail?: string;
}

// Defines a server action result.
export type ServerActionResult = ServerActionResultOk | ServerActionResultErr;

/**
 * Create a server action ok result.
 *
 * @param val - The success payload. Defaults to undefined if not set.
 */
export const ServerActionOk = (val: ServerActionPayload = undefined) => {
  const result = isSupportedServerActionPayload(val);
  if (!result.ok) {
    throw new Error(result.message);
  }

  return {
    ok: true,
    err: false,
    val,
  } as const;
};

export type ServerActionResultOk = ReturnType<typeof ServerActionOk>;

/**
 * Create a server action error result.
 *
 * @param err - The error.
 */
export const ServerActionErr = (err: ServerActionError) =>
  ({
    ok: false,
    err: true,
    val: err,
  }) as const;

export type ServerActionResultErr = ReturnType<typeof ServerActionErr>;
