import { Err, Ok, Result } from "@wunderwerk/ts-functional/results";

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
export type ServerActionResult = Result<ServerActionPayload, ServerActionError>;

/**
 * Create a server action ok result.
 *
 * @param val - The success payload.
 */
export const ServerActionOk = (val: ServerActionPayload) => Ok(val);

/**
 * Create a server action error result.
 *
 * @param err - The error.
 */
export const ServerActionError = (err: ServerActionError) => Err(err);
