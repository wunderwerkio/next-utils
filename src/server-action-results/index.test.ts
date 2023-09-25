import test from "ava";

import { ServerActionErr, ServerActionOk } from "./index.js";

test("Create ok result", (t) => {
  t.truthy(ServerActionOk().ok);
  t.falsy(ServerActionOk().err);

  t.deepEqual(ServerActionOk("hello").val, "hello");
  t.deepEqual(ServerActionOk(1).val, 1);
  t.deepEqual(ServerActionOk(null).val, null);

  t.deepEqual(ServerActionOk([1, 2, 3]).val, [1, 2, 3]);
  t.deepEqual(ServerActionOk(["one", "two"]).val, ["one", "two"]);

  t.deepEqual(ServerActionOk({ hello: "world" }).val, { hello: "world" });
  t.deepEqual(ServerActionOk({ hello: { test: null } }).val, {
    hello: { test: null },
  });
});

test("Create err result", (t) => {
  const err = {
    code: "err",
    title: "Error occured",
    detail: "An unexpected error occured",
  };

  t.truthy(ServerActionErr(err).err);
  t.falsy(ServerActionErr(err).ok);

  t.deepEqual(ServerActionErr(err).val, err);
});
