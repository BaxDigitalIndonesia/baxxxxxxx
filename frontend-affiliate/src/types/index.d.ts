declare interface SignUpValues {
  name: string;
  email: string;
  phone?: string;
  password?: string;
}

declare interface ContainerProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  reverse?: boolean;
}

declare interface SectionProps {
  className?: string;
  children: React.ReactNode;
}


declare interface SignUpUpdateValues {
  role: string;
  email: string;
  phone?: string;
  password: string;
}


declare interface SignInValues {
  email: string;
  password: string;
}


declare interface TopTeamMember {
  userId: string;
  sales: number;
  email: string;
  name: string;
}

declare interface TopIncome {
  email: string;
  name: string;
  userId: string;
  income: number;
}

declare interface Customer {
  country: string | null;
  city: string | null;
  latitude: string | null;
  longitude: string | null;
  visitorIp: string;
  createdAt: string;
  os: string;
  device: "Desktop" | "Mobile";
}
