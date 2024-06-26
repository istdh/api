type JwtTokenVerification = {
  email: string;
  full_name: string;
  phone_number: string;
  type: string;
};

type Tokens = {
  access_token: string;
  refresh_token: string;
};

type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

interface JwtPayloadWithRt extends JwtPayload {
  refresh_token: string;
}

type GoogleUser = {
  sub: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
};

type FacebookUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

type PayloadVerification = {
  full_name: string;
  email: string;
  hashPassword: string;
  name: string;
  industry: string[];
  company_size: string;
  phone: string;
  code_number: string;
  iat: number;
  exp: number;
  statusCode?: number;
  message?: string;
};
