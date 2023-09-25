import test from "ava";
import { isSupportedServerActionPayload } from "./index.js";

test("Check supported server action payload", t => {
  t.truthy(isSupportedServerActionPayload(true).ok);
})
