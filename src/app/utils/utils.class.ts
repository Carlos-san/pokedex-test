
export class Utils {

  public static passwordPatternValidator(password: any): any {
    if (password.pristine) {
        return null;
    }

    password.markAsTouched();

    const passwordRegExp = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!¡?¿.*]).{8,20})$/

    if (passwordRegExp.test(password.value)) {
        return null;
    }
    return {
        'invalidPassword': true
    };
  }
}
