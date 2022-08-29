export interface ISignUp {
  username: string;
  email: string;
  accountType: "teacher" | "student";
  displayName: string;
  password: string;
  topics: string[];
  profileImageUrl?: string;
  websiteLink?: string;
}

export function SignUpUserInput(body: ISignUp): boolean | string {
  if (
    !body.username ||
    !body.displayName ||
    !body.password ||
    !body.topics ||
    !body.email ||
    !Array.isArray(body.topics) ||
    !body.accountType
  ) {
    return "Enter Required Fieldws";
  }
  if (body.password.length < 6) {
    return "password too short, Must me more than six characters";
  }

  if (body.accountType === "teacher" || body.accountType === "student") {
    return false;
  } else {
    return "Invalid Account Type";
  }
}
