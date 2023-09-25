import test from "ava";

import { ServerActionError } from "../../dist/index.js";
import { ServerActionOk } from "./index.js";

test("Create ok result", (t) => {
  t.deepEqual(ServerActionOk("hello").unwrap(), "hello");
  t.deepEqual(ServerActionOk(1).unwrap(), 1);
  t.deepEqual(ServerActionOk(null).unwrap(), null);

  t.deepEqual(ServerActionOk([1, 2, 3]).unwrap(), [1, 2, 3]);
  t.deepEqual(ServerActionOk(["one", "two"]).unwrap(), ["one", "two"]);

  t.deepEqual(ServerActionOk({ hello: "world" }).unwrap(), { hello: "world" });
  t.deepEqual(ServerActionOk({ hello: { test: null } }).unwrap(), {
    hello: { test: null },
  });
});

test("Create err result", (t) => {
  const err = {
    code: "err",
    title: "Error occured",
    detail: "An unexpected error occured",
  };

  t.deepEqual(ServerActionError(err).expectErr(""), err);
});
