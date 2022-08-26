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

export function SignUpUserInput({
  username,
  displayName,
  password,
  topics,
  email,
  accountType,
}: ISignUp): boolean | string {
  if (
    !username ||
    !displayName ||
    !password ||
    !topics ||
    !email ||
    !Array.isArray(topics) ||
    !accountType
  ) {
    return "Enter Required Fieldws";
  }
  if (password.length < 6) {
    return "password too short, Must me more than six characters";
  }

  if (accountType === "teacher" || accountType === "student") {
    return false;
  } else {
    return "Invalid Account Type";
  }
}
