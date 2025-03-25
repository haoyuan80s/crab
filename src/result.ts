export type Result<T> = { ok: true; value: T } | { ok: false; error: string };

export function unwrapOr<T>(result: Result<T>, defaultValue: T): T {
  if (result.ok) {
    return result.value;
  } else {
    return defaultValue;
  }
}

export function isOk<T>(result: Result<T>): result is { ok: true; value: T } {
  return result.ok === true;
}

export function isError<T>(
  result: Result<T>,
): result is { ok: false; error: string } {
  return result.ok === false;
}

export function expect<T>(result: Result<T>, message: string): T {
  if (result.ok) {
    return result.value;
  } else {
    throw new Error(message);
  }
}

export function unwrap<T>(result: Result<T>): T {
  if (isOk(result)) {
    return result.value;
  } else {
    throw new Error(result.error);
  }
}
