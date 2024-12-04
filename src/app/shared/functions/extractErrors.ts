export function extractErrors(obj: any): string[] {
  const err = obj.error.errors;

  let errors: string[] = [];

  for (const key in err) {
    let field = key
    const message = err[key].map((errorMessage: string) => {
      return `${field}: ${errorMessage}`;
    });

    errors = [...errors, ...message];
  }

  return errors;

}
