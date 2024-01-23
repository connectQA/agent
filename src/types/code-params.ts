export interface CodeParams {
  testName: string;
  url: string;
  actions: Action[];
  assertions: Assertion[];
}

export interface Action {
  actionType: string;
  url?: string;
  selector?: string;
  name?: string;
}

export interface Assertion {
  assertionType: string;
  expected: string;
}
